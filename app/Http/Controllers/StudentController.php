<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\MentoringSession;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    public function showRegister()
    {
        if (Auth::guard('student')->check()) {
            return redirect()->route('student.dashboard');
        }

        return Inertia::render('Authenticated/Student/RegisterStudent');
    }

    public function showLogin()
    {
        if (Auth::guard('student')->check()) {
            return redirect()->route('student.dashboard');
        }
        return Inertia::render('Authenticated/Student/LoginStudent');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:students',
            'password' => 'required|string|min:8|confirmed',
        ]);

        Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('student.login')->with('success', 'Registration successful. Please log in.');
    }

    // Login Student
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::guard('student')->attempt($request->only('email', 'password'))) {
            return redirect()->route('student.dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function dashboard()
    {
        $student = Auth::guard('student')->user();

        // Fetch available mentoring sessions
        $sessions = MentoringSession::with('mentor')
            ->whereRaw('student_limit - current_participants > 0')
            ->orderBy('date', 'desc')
            ->get();

        // Check for active bookings
        $hasActiveBooking = Booking::where('student_id', $student->id)
            ->where('status', 'pending')
            ->exists();

        return Inertia::render('Authenticated/Student/StudentDashboard', [
            'student' => $student,
            'sessions' => $sessions,
            'hasActiveBooking' => $hasActiveBooking,
        ]);
    }

    public function setting()
    {
        $student = Auth::guard('student')->user();

        return Inertia::render('Authenticated/Student/SettingsStudent', [
            'student' => $student,
        ]);
    }

    public function show($slug)
    {
        $student = Student::where('slug', $slug)->firstOrFail();

        return Inertia::render('Authenticated/Student/ShowStudent', [
            'student' => $student,
        ]);
    }

    public function edit($slug)
    {
        $student = Student::where('slug', $slug)->firstOrFail();

        return Inertia::render('Authenticated/Student/EditStudent', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, $slug)
    {
        $student = Student::where('slug', $slug)->firstOrFail();

        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:students,email,' . $student->id,
            'bio' => 'nullable|string',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        // Update the student's information
        $student->name = $request->name;
        $student->email = $request->email;
        $student->bio = $request->bio;
        $student->location = $request->location;
        $student->latitude = $request->latitude;
        $student->longitude = $request->longitude;

        // Handle the profile picture upload
        if ($request->hasFile('profile_picture')) {
            // Delete the old profile picture if it exists
            if ($student->profile_picture) {
                Storage::disk('public')->delete($student->profile_picture);
            }

            // Store the new profile picture
            $filePath = $request->file('profile_picture')->store('profile_pictures', 'public');
            $student->profile_picture = $filePath; // Save the new file path
        }

        // Save the updated student information
        $student->save();

        return redirect()->route('student.dashboard')->with('success', 'Profile updated successfully!');
    }

    // public function logout(Request $request)
    // {
    //     auth()->guard('student')->logout();

    //     return redirect()->route('student.login')->with('success', 'You have been logged out.');
    // }

    public function logout(Request $request)
    {
        Auth::guard('student')->logout();
        return redirect()->route('student.login')->with('success', 'You have been logged out.');
    }


    public function destroy($slug)
    {
        $student = Student::where('slug', $slug)->firstOrFail();
        $student->delete();

        Auth::guard('student')->logout();

        return redirect()->route('student.login')->with('success', 'Student deleted successfully!');
    }
}
