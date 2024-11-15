<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function showRegister()
    {
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('Authenticated/Admin/RegisterAdmin');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'password' => 'required|string|min:8|confirmed',
        ]);

        Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'slug' => Str::slug($request->name),

        ]);

        return redirect()->route('admin.login')->with('success', 'Registration successful. Please log in.');
    }

    public function showLogin()
    {
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('Authenticated/Admin/LoginAdmin');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::guard('admin')->attempt($request->only('email', 'password'))) {
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function dashboard()
    {
        $admin = Auth::guard('admin')->user();

        // $admins = Admin::all();

        return Inertia::render('Authenticated/Admin/AdminDashboard', [
            'admin' => $admin,
        ]);
    }

    public function setting()
    {
        $admin = Auth::guard('admin')->user();

        return Inertia::render('Authenticated/Admin/SettingsAdmin', [
            'admin' => $admin,
        ]);
    }

    public function show($slug)
    {
        $admin = Admin::where('slug', $slug)->firstOrFail();

        return Inertia::render('Authenticated/Admin/ShowAdmin', [
            'admin' => $admin,
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        return redirect()->route('admin.login')->with('success', 'You have been logged out.');
    }

    public function storeSubject(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:subjects,name',
            'description' => 'nullable|string',
        ]);

        $subject = new Subject();
        $subject->name = $request->name;
        $subject->description = $request->description;
        $subject->save();

        return redirect()->back()->with('success', 'Subject added successfully!');
    }
}
