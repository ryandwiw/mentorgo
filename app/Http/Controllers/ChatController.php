<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index($mentorId)
    {
        // Get the authenticated student using the 'student' guard
        $student = Auth::guard('student')->user();

        $chats = Chat::where('mentor_id', $mentorId)
            ->orWhere('student_id', $student->id)
            ->with(['mentor', 'student'])
            ->get();

        return Inertia::render('Authenticated/Chat/StudentChat', [
            'chats' => $chats,
            'mentorId' => $mentorId,
            'studentId' => $student->id,
            'student' => $student,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'mentor_id' => 'required|exists:mentors,id',
            'student_id' => 'required|exists:students,id',
        ]);

        Chat::create($request->all());

        return redirect()->back()->with('success', 'Message sent successfully!');
    }

    public function indexMentor($studentId)
    {

        $mentor = Auth::guard('mentor')->user();

        $chats = Chat::where('student_id', $studentId)
            ->orWhere('mentor_id', $mentor->id) // Use the authenticated student's ID
            ->with(['student', 'mentor'])
            ->get();

        return Inertia::render('Authenticated/Chat/MentorChat', [
            'chats' => $chats,
            'studentId' => $studentId,
            'mentorId' => $mentor->id,
            'mentor' => $mentor,
        ]);
    }

    public function storeMentor(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'student_id' => 'required|exists:students,id',
            'mentor_id' => 'required|exists:mentors,id',
        ]);

        Chat::create($request->all());

        return redirect()->back()->with('success', 'Message sent successfully!');
    }
}
