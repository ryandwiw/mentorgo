<?php

namespace App\Http\Controllers;

use App\Models\Mentor;
use App\Models\MentoringSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class MentorController extends Controller
{

    public function dashboard()
    {
        $mentor = Auth::guard('mentor')->user();

        // Fetch mentoring sessions for the logged-in mentor
        $sessions = MentoringSession::where('mentor_id', $mentor->id)
            ->orderBy('date', 'desc')
            ->get();

        return Inertia::render('Authenticated/Mentor/MentorDashboard', [
            'mentor' => $mentor,
            'mentoringsessions' => $sessions, // Pass the sessions to the dashboard
        ]);
    }

    // Menampilkan tampilan registrasi Mentor
    public function showRegister()
    {
        return Inertia::render('Authenticated/Mentor/RegisterMentor');
    }

    // Menampilkan tampilan login Mentor
    public function showLogin()
    {
        return Inertia::render('Authenticated/Mentor/LoginMentor');
    }

    // Registrasi Mentor
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:mentors',
            'password' => 'required|string|min:8|confirmed',
        ]);

        Mentor::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('mentor.login')->with('success', 'Registration successful. Please log in.');
    }

    // Login Mentor
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::guard('mentor')->attempt($request->only('email', 'password'))) {
            return redirect()->route('mentor.dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser  = Socialite::driver('google')->user();

        // Logic to handle mentor authentication
        $mentor = Mentor::where('email', $googleUser->getEmail())->first();

        if (!$mentor) {
            $mentor = Mentor::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'password' => Hash::make(Str::random(16)),
                'google_id' => $googleUser->getId(),
                'slug' => Str::slug($googleUser->getName()),
            ]);
        }

        Auth::guard('mentor')->login($mentor, true);
        return redirect()->route('mentor.dashboard');
    }

    public function setting()
    {
        $mentor = Auth::guard('mentor')->user();

        return Inertia::render('Authenticated/Mentor/SettingsMentor', [
            'mentor' => $mentor,
        ]);
    }

    public function show($slug)
    {
        $mentor = Mentor::where('slug', $slug)->firstOrFail();

        return Inertia::render('Authenticated/Mentor/ShowMentor', [
            'mentor' => $mentor,
        ]);
    }

    public function edit($slug)
    {
        $mentor = Mentor::where('slug', $slug)->firstOrFail();

        return Inertia::render('Authenticated/Mentor/EditMentor', [
            'mentor' => $mentor,
        ]);
    }

    public function update(Request $request, $slug)
    {
        $mentor = Mentor::where('slug', $slug)->firstOrFail();

        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:mentors,email,' . $mentor->id,
            'bio' => 'nullable|string',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'subjects' => 'nullable|string',
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        // Update the mentor's information
        $mentor->name = $request->name;
        $mentor->email = $request->email;
        $mentor->bio = $request->bio;
        $mentor->subjects = $request->subjects;
        $mentor->location = $request->location;
        $mentor->latitude = $request->latitude;
        $mentor->longitude = $request->longitude;

        // Handle the profile picture upload
        if ($request->hasFile('profile_picture')) {
            // Delete the old profile picture if it exists
            if ($mentor->profile_picture) {
                Storage::disk('public')->delete($mentor->profile_picture);
            }

            // Store the new profile picture
            $filePath = $request->file('profile_picture')->store('profile_pictures', 'public');
            $mentor->profile_picture = $filePath; // Save the new file path
        }

        // Save the updated mentor information
        $mentor->save();

        return redirect()->route('mentor.dashboard')->with('success', 'Profile updated successfully!');
    }

    public function logout(Request $request)
    {
        Auth::guard('mentor')->logout();
        return redirect()->route('mentor.login')->with('success', 'You have been logged out.');
    }


    public function destroy($slug)
    {
        $mentor = Mentor::where('slug', $slug)->firstOrFail();
        $mentor->delete();

        Auth::guard('mentor')->logout();

        return redirect()->route('mentor.login')->with('success', 'mentor deleted successfully!');
    }
}
