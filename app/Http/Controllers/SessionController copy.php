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
        $studentId = Auth::guard('student')->id(); // Get the currently authenticated student's ID
        $sessionOnline = SessionOnline::with('mentoringSession')->findOrFail($id);

        // Check if the student has a confirmed and paid booking for this session
        $hasAccess = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $sessionOnline->mentoring_session_id)
            ->where('status', 'confirmed') // Ensure the booking is confirmed
            ->exists();

        if (!$hasAccess) {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'You do not have access to this session.']);
        }

        return Inertia::render('Authenticated/Student/Session/Online/Online', [
            'sessionOnline' => $sessionOnline,
        ]);
    }

    public function showOffline($id)
    {
        $studentId = Auth::guard('student')->id(); // Get the currently authenticated student's ID
        $sessionOffline = SessionOffline::with('mentoringSession.mentor')->findOrFail($id);

        // Check if the student has a confirmed and paid booking for this session
        $hasAccess = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $sessionOffline->mentoring_session_id)
            ->where('status', 'confirmed') // Ensure the booking is confirmed
            ->exists();

        if (!$hasAccess) {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'You do not have access to this session.']);
        }

        // Fetch the student's location
        $student = Auth::guard('student')->user();

        return Inertia::render('Authenticated/Student/Session/Offline/Offline', [
            'sessionOffline' => $sessionOffline,
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

        // Check if the student has a confirmed and paid booking for this session
        $hasAccess = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $sessionOnline->mentoring_session_id)
            ->where('status', 'confirmed')
            ->exists();

        if (!$hasAccess) {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'You do not have access to this session.']);
        }

        // Mark session as completed
        $mentoringSession = $sessionOnline->mentoringSession;
        $mentoringSession->is_completed = true;
        // $mentoringSession->end_time = $mentoringSession->start_time->addMinutes($mentoringSession->duration);
        $mentoringSession->save();

        return redirect()->route('student.sessions.bookings.index')->with('success', 'Session completed successfully.');
    }

    public function completeoff($id)
    {
        $studentId = Auth::guard('student')->id();
        $sessionOffline = SessionOffline::with('mentoringSession')->findOrFail($id);

        // Check if the student has a confirmed and paid booking for this session
        $hasAccess = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $sessionOffline->mentoring_session_id)
            ->where('status', 'confirmed')
            ->exists();

        if (!$hasAccess) {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'You do not have access to this session.']);
        }

        // Mark session as completed
        $mentoringSession = $sessionOffline->mentoringSession;
        $mentoringSession->is_completed = true;
        // $mentoringSession->end_time = $mentoringSession->start_time->addMinutes($mentoringSession->duration);
        $mentoringSession->save();

        // Dapatkan booking terkait untuk mengarahkan ke halaman rating
        $booking = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $mentoringSession->id)
            ->where('status', 'confirmed')
            ->first();

            $url = route('sessions.offline.rating.create', ['bookingId' => $booking->id]);
            dd('Redirecting to:', $url);

        // Redirect ke halaman rating
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
}
