<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SubjectController extends Controller
{
    public function index()
    {
        $admin = Auth::guard('admin')->user();
        $subjects = Subject::all();
        return Inertia::render('Authenticated/Admin/Subjects/Index', [
            'subjects' => $subjects,
            'admin' => $admin,
        ]);
    }

    public function create()
    {
        $admin = Auth::guard('admin')->user();
        return Inertia::render(
            'Authenticated/Admin/Subjects/Create',
            [
                'admin' => $admin,
            ],
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:subjects,name',
            'description' => 'nullable|string',
            'profile_matkul' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validasi untuk file gambar
        ]);

        // Buat subject baru
        $subject = new Subject();
        $subject->name = $request->name;
        $subject->description = $request->description;

        // Simpan file jika ada
        if ($request->hasFile('profile_matkul')) {
            // Simpan file baru
            $filePath = $request->file('profile_matkul')->store('profile_matkul', 'public');
            $subject->profile_matkul = $filePath; // Simpan path file baru
        }

        $subject->save(); // Simpan subject ke database

        return redirect()->route('subjects.index')->with('success', 'Subject created successfully.');
    }

    public function show($id)
    {
        $admin = Auth::guard('admin')->user();

        $subject = Subject::findOrFail($id);
        return Inertia::render('Authenticated/Admin/Subjects/Show', [
            'subject' => $subject,
            'admin' => $admin,
        ]);
    }

    public function edit($id)
    {
        $admin = Auth::guard('admin')->user();

        $subject = Subject::findOrFail($id);
        return Inertia::render('Authenticated/Admin/Subjects/Edit', [
            'subject' => $subject,
            'admin' => $admin,
        ]);
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);

        $request->validate([
            'name' => 'required|string|unique:subjects,name,' . $subject->id,
            'description' => 'nullable|string',
            'profile_matkul' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validasi untuk file gambar
        ]);

        // Update data subject
        $subject->name = $request->name;
        $subject->description = $request->description;

        // Simpan file jika ada
        if ($request->hasFile('profile_matkul')) {
            // Hapus file lama jika ada
            if ($subject->profile_matkul) {
                Storage::disk('public')->delete($subject->profile_matkul);
            }

            // Simpan file baru
            $filePath = $request->file('profile_matkul')->store('profile_matkul', 'public');
            $subject->profile_matkul = $filePath; // Simpan path file baru
        }

        $subject->save(); // Simpan perubahan ke database

        return redirect()->route('subjects.index')->with('success', 'Subject updated successfully.');
    }

    public function destroy($id)
    {
        $subject = Subject::findOrFail($id);
        $subject->delete();
        return redirect()->route('subjects.index')->with('success', 'Subject deleted successfully.');
    }
}
