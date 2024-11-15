<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Booking;
use App\Models\MentoringSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{

    public function updateSessionEnd($id)
    {
        $mentoringsession = MentoringSession::findOrFail($id);

        // Check if the current time is greater than or equal to the end time of the session
        if ($mentoringsession->end_time <= now()) {
            $mentoringsession->is_completed = true; // Set is_completed to true
            $mentoringsession->status = 'completed'; // Update status to completed

            $mentoringsession->save(); // Save the changes to the database
        }

        return redirect()->route('mentor.session.dashboard')
            ->with('success', 'Sesi mentoring berhasil diperbarui.');
    }

    public function createOnline($id)
    {
        $session = MentoringSession::findOrFail($id);
        return inertia('Ratings/Create', ['session' => $session]);
    }

    public function createOffline($id)
    {
        $session = MentoringSession::findOrFail($id);
        return inertia('Ratings/Create', ['session' => $session]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'session_id' => 'required|exists:mentoring_sessions,id',
            'mentor_id' => 'required|exists:mentors,id',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string|max:255',
        ]);

        // Create the rating
        Rating::create([
            'session_id' => $validated['session_id'],
            'student_id' => Auth::id(),
            'mentor_id' => $validated['mentor_id'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return redirect()->route('student.sessions.index')->with('success', 'Rating submitted successfully!');
    }
}
