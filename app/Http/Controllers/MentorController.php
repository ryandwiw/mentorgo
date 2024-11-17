<?php

namespace App\Http\Controllers;

use App\Models\Mentor;
use App\Models\Student;
use App\Models\Subject;
use App\Models\MentorRating;
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

        // Ambil sesi mentoring untuk mentor yang sedang login, termasuk sesi online dan offline
        $sessions = MentoringSession::with(['sessionOnline', 'sessionOffline', 'bookings.payments', 'students']) // Memuat relasi yang diperlukan
            ->where('mentor_id', $mentor->id)
            ->orderBy('date', 'desc')
            ->get();

        // Filter sesi aktif yang belum selesai
        $activeSessions = $sessions->filter(function ($session) {
            // Pastikan sesi tidak dalam status 'completed'
            if ($session->is_completed) {
                return false;
            }

            return $session->bookings->contains(function ($booking) {
                return $booking->status === 'confirmed' &&
                    $booking->payments &&
                    $booking->payments->status === 'paid';
            });
        });

        return Inertia::render('Authenticated/Mentor/MentorDashboard', [
            'mentor' => $mentor,
            'mentoringsessions' => $sessions, // Kirim sesi ke dashboard
            'activeSessions' => $activeSessions->values()->all(), // Kirim sesi aktif jika perlu
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

        // Generate a unique slug
        $slug = $this->generateUniqueMentorSlug($request->name);

        Mentor::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'slug' => $slug,
        ]);

        return redirect()->route('mentor.login')->with('success', 'Registration successful. Please log in.');
    }

    private function generateUniqueMentorSlug($name)
    {
        $slug = Str::slug($name);
        $count = Mentor::where('slug', $slug)->count();

        // If the slug already exists, append a number to make it unique
        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }

        return $slug;
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


    public function setting()
    {
        $mentor = Auth::guard('mentor')->user();

        return Inertia::render('Authenticated/Mentor/SettingsMentor', [
            'mentor' => $mentor,
        ]);
    }

    public function show($slug)
    {
        // Memuat mentor beserta subjects-nya
        $mentor = Mentor::with('subjects')->where('slug', $slug)->firstOrFail();
        $mentorRating = MentorRating::where('mentor_id', $mentor->id)->first();

        return Inertia::render('Authenticated/Mentor/ShowMentor', [
            'mentor' => $mentor,
            'average_rating' => $mentorRating ? $mentorRating->average_rating : 0,
        ]);
    }

    public function edit($slug)
    {
        $mentor = Mentor::with('subjects')->where('slug', $slug)->firstOrFail();

        $subjects = Subject::all();

        return Inertia::render('Authenticated/Mentor/EditMentor', [
            'mentor' => $mentor,
            'subjects' => $subjects,

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
            'subjects' => 'nullable|array', // Mengubah menjadi array
            'subjects.*' => 'exists:subjects,id', // Validasi setiap ID subject
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'phone' => 'nullable|string|max:20',
            'asal' => 'nullable|string|max:50',
        ]);

        // Update the mentor's information
        $mentor->name = $request->name;
        $mentor->email = $request->email;
        $mentor->bio = $request->bio;
        $mentor->location = $request->location;
        $mentor->latitude = $request->latitude;
        $mentor->longitude = $request->longitude;
        $mentor->phone = $request->phone;
        $mentor->asal = $request->asal;

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

        // Update the subjects associated with the mentor
        if ($request->has('subjects')) {
            $mentor->subjects()->sync($request->subjects); // Mengaitkan mata pelajaran
        }

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

    public function help()
    {
        $mentor = Auth::guard('mentor')->user();

        return Inertia::render('Authenticated/Mentor/Help', [
            'mentor' => $mentor,
        ]);
    }

    public function students()
    {
        $mentor = Auth::guard('mentor')->user();

        $mentordetails = Student::all();

        return Inertia::render('Authenticated/Mentor/StudentDetail/Index', [
            'mentordetails' => $mentordetails,
            'mentor' => $mentor,

        ]);
    }

    public function studentDetail($slug)
    {
        $mentor = Auth::guard('mentor')->user();

        $mentordetail = Student::all()->where('slug', $slug)->firstOrFail();

        return Inertia::render('Authenticated/Mentor/StudentDetail/Show', [
            'mentordetail' => $mentordetail,
            'mentor' => $mentor,
        ]);
    }
}
