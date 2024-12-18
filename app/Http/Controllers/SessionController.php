<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\MentoringSession;
use App\Models\SessionOnline;
use App\Models\SessionOffline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function showOnline($id)
    {
        $student = Auth::guard('student')->user();
        $studentId = Auth::guard('student')->id();
        $sessionOnline = SessionOnline::with(['mentoringSession.mentor', 'mentoringSession.subject','mentoringSession.material'])->findOrFail($id);

        $hasAccess = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $sessionOnline->mentoring_session_id)
            ->where('status', 'confirmed')
            ->exists();

        if (!$hasAccess) {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'You do not have access to this session.']);
        }

        // Menghitung rata-rata rating untuk mentor
        $averageRating = $sessionOnline->mentoringSession->mentor->ratings()->avg('rating'); // Menghitung rata-rata rating
        $sessionOnline->mentoringSession->mentor->average_rating = $averageRating ?: 0; // Jika tidak ada rating, set 0

        return Inertia::render('Authenticated/Student/Session/Online/Online', [
            'sessionOnline' => $sessionOnline,
            'student' => $student,
            'averageRating' => $sessionOnline->mentoringSession->mentor->average_rating, // Mengirimkan rata-rata rating ke komponen
        ]);
    }

    public function showOffline($id)
    {
        $student = Auth::guard('student')->user();
        $studentId = Auth::guard('student')->id();
        $sessionOffline = SessionOffline::with('mentoringSession.mentor','mentoringSession.material','mentoringSession.subject')->findOrFail($id);

        $hasAccess = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $sessionOffline->mentoring_session_id)
            ->where('status', 'confirmed')
            ->exists();

        if (!$hasAccess) {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'You do not have access to this session.']);
        }

        $student = Auth::guard('student')->user();

        $averageRating = $sessionOffline->mentoringSession->mentor->ratings()->avg('rating'); // Menghitung rata-rata rating
        $sessionOffline->mentoringSession->mentor->average_rating = $averageRating ?: 0;

        return Inertia::render('Authenticated/Student/Session/Offline/Offline', [
            'sessionOffline' => $sessionOffline,
            'averageRating' => $sessionOffline->mentoringSession->mentor->average_rating, // Mengirimkan rata-rata rating ke komponen
            'student' => $student,
            'mentorLocation' => [
                'latitude' => $sessionOffline->mentoringSession->latitude,
                'longitude' => $sessionOffline->mentoringSession->longitude,
                'name' => $sessionOffline->mentoringSession->mentor->name,
            ],
            'studentLocation' => [
                'latitude' => $student->latitude,
                'longitude' => $student->longitude,
                'name' => $student->name,
            ],
        ]);
    }

    public function completeon($id)
    {
        $studentId = Auth::guard('student')->id();
        $sessionOnline = SessionOnline::with('mentoringSession')->findOrFail($id);

        $hasAccess = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $sessionOnline->mentoring_session_id)
            ->where('status', 'confirmed')
            ->exists();

        if (!$hasAccess) {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'You do not have access to this session.']);
        }

        $mentoringSession = $sessionOnline->mentoringSession;
        $mentoringSession->is_completed = true;
        $mentoringSession->save();

        $booking = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $mentoringSession->id)
            ->where('status', 'confirmed')
            ->first();

        return redirect()->route('sessions.online.rating.create', ['bookingId' => $booking->id])
            ->with('success', 'Session completed successfully. Please provide your rating.');
    }

    public function completeoff($id)
    {
        $studentId = Auth::guard('student')->id();
        $sessionOffline = SessionOffline::with('mentoringSession')->findOrFail($id);

        $hasAccess = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $sessionOffline->mentoring_session_id)
            ->where('status', 'confirmed')
            ->exists();

        if (!$hasAccess) {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'You do not have access to this session.']);
        }

        $mentoringSession = $sessionOffline->mentoringSession;
        $mentoringSession->is_completed = true;
        $mentoringSession->save();

        $booking = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $mentoringSession->id)
            ->where('status', 'confirmed')
            ->first();

        return redirect()->route('sessions.offline.rating.create', ['bookingId' => $booking->id])
            ->with('success', 'Session completed successfully. Please provide your rating.');
    }


    public function createGoogleMeetLink(Request $request, $id)
    {
        $validated = $request->validate([
            'google_meet_link' => 'required|url',
        ]);

        $sessionOnline = SessionOnline::where('mentoring_session_id', $id)->firstOrFail();
        $sessionOnline->google_meet_link = $validated['google_meet_link'];
        $sessionOnline->save();

        return redirect()->route('mentor.session.dashboard')
            ->with('success', 'Link Google Meet berhasil ditambahkan.');
    }

    public function storeGoogleMeetLink(Request $request, $mentoringSessionId)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'google_meet_link' => 'required|url',
        ]);

        // Find or create the session_online entry for the given mentoring session
        $sessionOnline = SessionOnline::firstOrCreate(
            ['mentoring_session_id' => $mentoringSessionId],
            ['google_meet_link' => $validated['google_meet_link']]
        );

        // If the session already exists, update the google_meet_link
        if (!$sessionOnline->wasRecentlyCreated) {
            $sessionOnline->google_meet_link = $validated['google_meet_link'];
            $sessionOnline->save();
        }

        // Return a response, e.g., redirect back with a success message
        return redirect()->back()->with('success', 'Google Meet link saved successfully.');
    }

    public function mentorShowOnline($id)
{
    $mentor = Auth::guard('mentor')->user();
    $sessionOnline = SessionOnline::with(['mentoringSession.mentor', 'mentoringSession.subject', 'mentoringSession.bookings.student'])->findOrFail($id);

    // Pastikan sesi ini milik mentor
    if ($sessionOnline->mentoringSession->mentor_id !== $mentor->id) {
        return redirect()->route('mentor.session.dashboard')->withErrors(['error' => 'Anda tidak memiliki akses ke sesi ini.']);
    }

    // Ambil booking dan filter yang tidak canceled
    $bookings = $sessionOnline->mentoringSession->bookings->filter(function ($booking) {
        return $booking->status !== 'canceled'; // Ganti 'canceled' dengan status yang sesuai
    });

    // Menghitung rata-rata rating untuk mentor
    $averageRating = $sessionOnline->mentoringSession->mentor->ratings()->avg('rating'); // Menghitung rata-rata rating
    $sessionOnline->mentoringSession->mentor->average_rating = $averageRating ?: 0; // Jika tidak ada rating, set 0

    return Inertia::render('Authenticated/Mentor/Session/Online/Online', [
        'sessionOnline' => $sessionOnline,
        'mentor' => $mentor,
        'bookings' => $bookings->values()->all(), // Konversi kembali ke array jika diperlukan
        'averageRating' => $sessionOnline->mentoringSession->mentor->average_rating, // Mengirimkan rata-rata rating ke komponen
    ]);
}

    public function mentorShowOffline($id)
    {
        $mentor = Auth::guard('mentor')->user();
        $sessionOffline = SessionOffline::with('mentoringSession.mentor', 'mentoringSession.bookings.student')->findOrFail($id);

        // Pastikan sesi ini milik mentor
        if ($sessionOffline->mentoringSession->mentor_id !== $mentor->id) {
            return redirect()->route('mentor.session.dashboard')->withErrors(['error' => 'Anda tidak memiliki akses ke sesi ini.']);
        }

        // Ambil booking dan filter yang tidak canceled
        $bookings = $sessionOffline->mentoringSession->bookings->filter(function ($booking) {
            return $booking->status !== 'canceled'; // Ganti 'canceled' dengan status yang sesuai
        });

        return Inertia::render('Authenticated/Mentor/Session/Offline/Offline', [
            'sessionOffline' => $sessionOffline,
            'mentor' => $mentor,
            'bookings' => $bookings->values()->all(), // Konversi kembali ke array jika diperlukan
            'mentorLocation' => [
                'latitude' => optional($sessionOffline->mentoringSession)->latitude,
                'longitude' => optional($sessionOffline->mentoringSession)->longitude,
                'name' => optional($sessionOffline->mentoringSession->mentor)->name,
            ],
            // Jika Anda ingin menambahkan lokasi siswa, Anda bisa melakukannya dengan cara ini:
            'studentsLocations' => $bookings->map(function ($booking) {
                return [
                    'latitude' => optional($booking->student)->latitude,
                    'longitude' => optional($booking->student)->longitude,
                    'name' => optional($booking->student)->name,
                ];
            })->values()->all(), // Konversi kembali ke array jika diperlukan
        ]);
    }
}
