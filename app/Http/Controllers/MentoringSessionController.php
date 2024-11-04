<?php

namespace App\Http\Controllers;

use App\Models\MentoringSession;
use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MentoringSessionController extends Controller
{

    public function studentSessions()
    {
        $student = Auth::guard('student')->user();

        $hasActiveBooking = Booking::where('student_id', $student->id)
            ->where('status', 'pending')
            ->exists();

        $sessions = MentoringSession::with('mentor')
            ->where(function ($query) {
                $query->whereRaw('student_limit - current_participants > 0');
            })
            ->orderBy('date', 'desc')
            ->get();

        return Inertia::render('Authenticated/Student/Session/Index', [
            'sessions' => $sessions,
            'student' => $student,
            'mentor' => null,
            'hasActiveBooking' => $hasActiveBooking,
        ]);
    }



    public function studentShow($id)
    {
        $student = Auth::guard('student')->user();
        $session = MentoringSession::with('mentor')->findOrFail($id);

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
        $sessions = MentoringSession::where('mentor_id', $mentor->id)
            ->orderBy('date', 'desc')
            ->get();

        return Inertia::render('Authenticated/Mentor/Session/MentoringSessions', [
            'mentoringsessions' => $sessions,
            'mentor' => $mentor,
            'student' => null,
        ]);
    }

    public function create()
    {
        return Inertia::render('Authenticated/Mentor/Session/CreateSession');
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
        ]);

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
        $mentoringsession = MentoringSession::findOrFail($id);

        return Inertia::render('Authenticated/Mentor/Session/EditSession', [
            'mentoringsession' => $mentoringsession,
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
        ]);

        $mentoringsession->update($request->all());

        return redirect()->route('mentor.session.dashboard')
            ->with('success', 'Sesi mentoring berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $mentoringsession = MentoringSession::findOrFail($id);
        $mentoringsession->delete();

        return redirect()->route('mentor.session.dashboard')
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
