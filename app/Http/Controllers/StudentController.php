<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\MentoringSession;
use App\Models\MentorRating;
use App\Models\Booking;
use App\Models\Mentor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{

    public function mentors()
    {
        $student = Auth::guard('student')->user();

        // Ambil semua mentor
        $mentordetails = Mentor::with('ratings', 'subjects')->get(); // Pastikan relasi 'ratings' sudah didefinisikan di model Mentor

        // Menghitung rating rata-rata untuk setiap mentor
        $mentordetails->transform(function ($mentor) {
            $averageRating = $mentor->ratings()->avg('rating'); // Menghitung rata-rata rating
            $mentor->average_rating = $averageRating ?: 0; // Jika tidak ada rating, set 0
            return $mentor;
        });

        return Inertia::render('Authenticated/Student/MentorDetail/Index', [
            'mentordetails' => $mentordetails,
            'student' => $student,

        ]);
    }

    public function mentorDetail($slug)
    {
        $student = Auth::guard('student')->user();

        // Mengambil detail mentor berdasarkan slug
        $mentordetail = Mentor::with('ratings', 'subjects')->where('slug', $slug)->firstOrFail();

        // Menghitung rating rata-rata
        $averageRating = $mentordetail->ratings()->avg('rating'); // Menghitung rata-rata rating
        $mentordetail->average_rating = $averageRating ?: 0; // Jika tidak ada rating, set 0
        $ratings = $mentordetail->ratings()->with('student', 'booking')->get();

        return Inertia::render('Authenticated/Student/MentorDetail/Show', [
            'mentordetail' => $mentordetail,
            'student' => $student,
            'ratings' => $ratings,
        ]);
    }



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

        // Generate a unique slug
        $slug = $this->generateUniqueStudentSlug($request->name);

        Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'slug' => $slug,
        ]);

        return redirect()->route('student.login')->with('success', 'Registration successful. Please log in.');
    }

    private function generateUniqueStudentSlug($name)
    {
        $slug = Str::slug($name);
        $count = Student::where('slug', $slug)->count();

        // If the slug already exists, append a number to make it unique
        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }

        return $slug;
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

        // Ambil sesi mentoring yang tersedia
        $sessions = MentoringSession::with(['mentor', 'subject','mentor.ratings']) // Include subject relationship
            ->whereRaw('student_limit - current_participants > 0')
            ->where('status', '!=', 'completed') // Exclude completed sessions
            ->orderBy('date', 'desc')
            ->get();


        // Menghitung rata-rata rating untuk setiap mentor
        $sessions->transform(function ($session) {
            // Menghitung rata-rata rating
            $averageRating = $session->mentor->ratings()->avg('rating');

            // Menggunakan null coalescing operator untuk menetapkan average_rating
            $session->mentor->average_rating = $averageRating ?? 0; // Jika tidak ada rating, set 0

            return $session;
        });


        // Check for active bookings
        $hasActiveBooking = Booking::where('student_id', $student->id)
            ->whereIn('status', ['pending']) // Memeriksa status booking yang aktif
            // ->whereIn('status', ['pending', 'confirmed'])
            ->exists();

        // Check for active sessions with bookings and payments
        $activeSessions = MentoringSession::with(['mentor', 'sessionOnline', 'sessionOffline'])
            ->whereHas('bookings', function ($query) use ($student) {
                $query->where('student_id', $student->id)
                    ->whereIn('status', ['pending', 'confirmed']) // Include pending bookings
                    ->whereHas('payments', function ($paymentQuery) {
                        $paymentQuery->where('status', 'paid'); // Only include paid payments
                    });
            })
            ->whereDoesntHave('bookings.ratings', function ($query) use ($student) {
                $query->where('student_id', $student->id)
                    ->where('mentor_id', '<>', null); // Pastikan mentor_id ada
            })
            ->with('mentor')
            ->get();

        // Notifikasi jika ada sesi aktif
        $hasActiveSessions = $activeSessions->isNotEmpty();

        return Inertia::render('Authenticated/Student/StudentDashboard', [
            'student' => $student,
            'sessions' => $sessions,
            'hasActiveBooking' => $hasActiveBooking,
            'hasActiveSessions' => $hasActiveSessions, // Menambahkan informasi sesi aktif
            'activeSessions' => $activeSessions, // Menambahkan daftar sesi aktif
        ]);
    }

    public function help()
    {
        $student = Auth::guard('student')->user();

        return Inertia::render('Authenticated/Student/Help', [
            'student' => $student,
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
            'phone' => 'nullable|string|max:20',
            'asal' => 'nullable|string|max:50'

        ]);

        // Update the student's information
        $student->name = $request->name;
        $student->email = $request->email;
        $student->bio = $request->bio;
        $student->location = $request->location;
        $student->latitude = $request->latitude;
        $student->longitude = $request->longitude;
        $student->phone = $request->phone;
        $student->asal = $request->asal;

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

        $student->save();

        return redirect()->route('student.dashboard')->with('success', 'Profile updated successfully!');
    }

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
