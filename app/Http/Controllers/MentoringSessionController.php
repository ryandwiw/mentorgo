<?php

namespace App\Http\Controllers;

use App\Models\MentoringSession;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Subject;
use App\Models\SessionOffline;
use App\Models\SessionOnline;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MentoringSessionController extends Controller
{

    public function studentSessions()
    {
        $student = Auth::guard('student')->user();

        // Check if the student has active bookings
        $hasActiveBooking = Booking::where('student_id', $student->id)
            ->where('status', 'pending')
            ->exists();

        // Get available mentoring sessions that do not have canceled bookings by the student
        $sessions = MentoringSession::with(['mentor', 'subject']) // Include the subject relationship
            ->where(function ($query) use ($student) {
                $query->whereRaw('student_limit - current_participants > 0')
                    ->whereDoesntHave('bookings', function ($query) use ($student) {
                        $query->where('student_id', $student->id)
                            ->where('status', 'canceled'); // Exclude sessions that have been canceled
                    });
            })
            ->orderBy('date', 'desc')
            ->get();

        // Get the mentor_id from the sessions
        $mentorId = $sessions->first()->mentor_id ?? null;

        // Count the number of mentoring sessions created by the mentor
        $mentorSessionCount = MentoringSession::where('mentor_id', $mentorId)->count();

        return Inertia::render('Authenticated/Student/Session/Index', [
            'sessions' => $sessions,
            'student' => $student,
            'mentor' => null,
            'hasActiveBooking' => $hasActiveBooking,
            'mentorSessionCount' => $mentorSessionCount, // Include the count in the response
        ]);
    }


    public function studentShow($id)
    {
        $student = Auth::guard('student')->user();
        $session = MentoringSession::with(['mentor', 'subject', 'mentor.ratings'])->findOrFail($id);

        // Menghitung rating rata-rata
        $averageRating = $session->mentor->ratings()->avg('rating');
        $session->mentor->average_rating = $averageRating ?: 0; // Jika tidak ada rating, set 0

        $bookings = Booking::where('student_id', $student->id)->get();

        $activeBooking = Booking::where('student_id', $student->id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->first();

        $hasActiveBooking = $activeBooking !== null;
        $activeBookingId = $hasActiveBooking ? $activeBooking->mentoring_session_id : null;

        return Inertia::render('Authenticated/Student/Session/Show', [
            'session' => $session,
            'student' => $student,
            'hasActiveBooking' => $hasActiveBooking,
            'activeBookingId' => $activeBookingId,
            'bookings' => $bookings,
        ]);
    }

    public function mentorSessions()
    {
        $mentor = Auth::guard('mentor')->user();

        // Ambil sesi mentoring yang dimiliki oleh mentor
        $sessions = MentoringSession::with(['sessionOnline', 'sessionOffline', 'bookings.payments']) // Memuat relasi yang diperlukan
            ->where('mentor_id', $mentor->id)
            ->orderBy('date', 'desc')
            ->get();

        // Ambil sesi aktif (yang memiliki booking yang dikonfirmasi dan pembayaran yang sudah dibayar)
        $activeSessions = $sessions->filter(function ($session) {
            return $session->bookings->contains(function ($booking) {
                return $booking->status === 'confirmed' &&
                       $booking->payments && // Memastikan ada pembayaran
                       $booking->payments->status === 'paid'; // Memeriksa status pembayaran
            });
        });

        return Inertia::render('Authenticated/Mentor/Session/MentoringSessions', [
            'mentoringsessions' => $sessions,
            'mentor' => $mentor,
            'activeSessions' => $activeSessions->values()->all(),
            'student' => null,
        ]);
    }

    public function create()
    {
        $mentor = Auth::guard('mentor')->user();
        $subjects = Subject::all();
        return Inertia::render('Authenticated/Mentor/Session/CreateSession', [
            'mentor' => $mentor,
            'subjects' => $subjects,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'session_type' => 'required|in:online,offline',
            'location' => 'nullable|string|required_if:session_type,offline',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'duration' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'student_limit' => 'required|integer|min:1',
            'subject_id' => 'nullable|exists:subjects,id',

        ]);

        $mentoring = MentoringSession::create([
            'mentor_id' => Auth::guard('mentor')->id(),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'session_type' => $validated['session_type'],
            'location' => $validated['location'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'date' => now(),
            'duration' => $validated['duration'],
            'price' => $validated['price'],
            'student_limit' => $validated['student_limit'],
            'current_participants' => 0,
            'status' => 'available',
            'subject_id' => $validated['subject_id'],
        ]);

        if ($validated['session_type'] === 'offline') {
            SessionOffline::create([
                'mentoring_session_id' => $mentoring->id,
                'latitude' => $mentoring->latitude,
                'longitude' => $mentoring->longitude,
            ]);
        } else {
            SessionOnline::create(['mentoring_session_id' => $mentoring->id]);
        }

        return redirect()->route('mentor.session.dashboard')
            ->with('success', 'Sesi mentoring berhasil dibuat.');
    }

    public function show($id)
    {
        $mentoringsession = MentoringSession::findOrFail($id);

        $mentor = Auth::guard('mentor')->user();

        return Inertia::render('Authenticated/Mentor/Session/ShowSession', [
            'mentoringsession' => $mentoringsession,
            'mentor' => $mentor,
        ]);
    }

    public function edit($id)
    {
        $mentor = Auth::guard('mentor')->user();
        $subjects = Subject::all();
        $mentoringsession = MentoringSession::findOrFail($id);

        return Inertia::render('Authenticated/Mentor/Session/EditSession', [
            'mentoringsession' => $mentoringsession,
            'mentor' => $mentor,
            'subjects' => $subjects,
        ]);
    }

    public function update(Request $request, $id)
    {
        $mentoringsession = MentoringSession::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'session_type' => 'required|in:online,offline',
            'location' => 'nullable|string|required_if:session_type,offline',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'duration' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'student_limit' => 'required|integer|min:1',
            'subject_id' => 'nullable|exists:subjects,id',
        ]);

        $mentoringsession->update($request->all());

        return redirect()->route('mentor.session.dashboard')
            ->with('success', 'Sesi mentoring berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $mentoringsession = MentoringSession::findOrFail($id);
        $mentoringsession->delete();

        return redirect()->route('mentor.dashboard')
            ->with('success', 'Sesi mentoring berhasil dihapus.');
    }

    public function updateSessionStart($id)
    {
        $mentoringsession = MentoringSession::findOrFail($id);

        if ($mentoringsession->current_participants >= $mentoringsession->student_limit) {
            $mentoringsession->start_time = $mentoringsession->date;
            $mentoringsession->end_time = $mentoringsession->start_time->addMinutes($mentoringsession->duration);
            $mentoringsession->status = 'booked';

            $mentoringsession->save();
        }

        return redirect()->route('mentor.session.dashboard')
            ->with('success', 'Sesi mentoring berhasil diperbarui.');
    }

    public function updateSessionEnd($id)
    {
        $mentoringsession = MentoringSession::findOrFail($id);

        if ($mentoringsession->end_time <= now()) {
            $mentoringsession->is_completed = true;
            $mentoringsession->status = 'completed';

            $mentoringsession->save();
        }

        return redirect()->route('mentor.session.dashboard')
            ->with('success', 'Sesi mentoring berhasil diperbarui.');
    }
}
