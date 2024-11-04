<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Mentor;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;

class GoogleController extends Controller
{
    public function redirectToGoogle($role)
    {
        // Simpan role di session
        session(['role' => $role]);
        $redirectUri = $role === 'student' ? env('GOOGLE_REDIRECT_URI_STUDENT') : env('GOOGLE_REDIRECT_URI_MENTOR');
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser  = Socialite::driver('google')->user();
        $role = session('role'); // Ambil role dari session

        if ($role === 'student') {
            // Cek apakah pengguna sudah ada
            $user = Student::where('email', $googleUser ->getEmail())->first();

            if (!$user) {
                // Buat pengguna baru jika tidak ada
                $user = Student::create([
                    'name' => $googleUser ->getName(),
                    'email' => $googleUser ->getEmail(),
                    'google_id' => $googleUser ->getId(),
                    'password' => bcrypt(Str::random(16)), // Password acak
                    'slug' => Str::slug($googleUser ->getName()), // Buat slug
                ]);
            }

            // Login menggunakan guard 'student'
            Auth::guard('student')->login($user);
            return redirect()->route('student.dashboard'); // Redirect ke dashboard student

        } elseif ($role === 'mentor') {
            // Cek apakah pengguna sudah ada
            $user = Mentor::where('email', $googleUser ->getEmail())->first();

            if (!$user) {
                // Buat pengguna baru jika tidak ada
                $user = Mentor::create([
                    'name' => $googleUser ->getName(),
                    'email' => $googleUser ->getEmail(),
                    'google_id' => $googleUser ->getId(),
                    'password' => bcrypt(Str::random(16)), // Password acak
                    'slug' => Str::slug($googleUser ->getName()), // Buat slug
                ]);
            }

            // Login menggunakan guard 'mentor'
            Auth::guard('mentor')->login($user);
            return redirect()->route('mentor.dashboard'); // Redirect ke dashboard mentor
        }

        return redirect('/'); // Redirect ke halaman utama jika role tidak dikenali
    }
}
