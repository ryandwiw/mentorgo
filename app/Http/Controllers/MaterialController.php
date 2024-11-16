<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class MaterialController extends Controller
{
    public function index()
    {
        $admin = Auth::guard('admin')->user();

        $subjects = Subject::all();

        $materials = Material::with('subjects')->get(); // Ambil semua materi dengan relasi subjek
        return inertia('Authenticated/Materials/Index', [
            'materials' => $materials,
            'subjects' => $subjects,
            'admin' => $admin,
        ]);
    }

    public function indexforMentor()
    {
        $mentor = Auth::guard('mentor')->user();
        $subjects = Subject::all();

        $materials = Material::with('subjects')->get(); // Ambil semua materi dengan relasi subjek
        return inertia('Authenticated/Mentor/Materials/Main', [
            'materials' => $materials,
            'mentor' => $mentor,
            'subjects' => $subjects,
        ]);
    }

    public function indexforStudent()
    {
        $student = Auth::guard('student')->user();
        $subjects = Subject::all();

        $materials = Material::with('subjects')->get();
        return inertia('Authenticated/Student/Materials/Main', [
            'materials' => $materials,
            'student' => $student,
            'subjects' => $subjects,

        ]);
    }



    public function create()
    {
        $admin = Auth::guard('admin')->user();
        $subjects = Subject::all();

        return inertia('Authenticated/Materials/Create', [
            'subjects' => $subjects,
            'admin' => $admin,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'mentor_id' => 'nullable|exists:mentors,id',
            'file' => 'nullable|file|mimes:jpg,png,pdf,mp4,mkv|max:2048',
            'subject_id' => 'required|exists:subjects,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'format' => 'nullable|in:video,pdf,link',
            'link' => 'nullable|string',
        ]);

        // Initialize an array for storing material data
        $materialData = [
            'mentor_id' => $request->mentor_id,
            'title' => $request->title,
            'content' => $request->content,
            'format' => $request->format,
        ];

        // Handle file upload if the format is video or pdf
        if ($request->format !== 'link' && $request->hasFile('file')) {
            $filePath = $request->file('file')->store('materials');
            $materialData['file'] = $filePath; // Store the file path
        }

        // Handle link if the format is link
        if ($request->format === 'link') {
            $materialData['link'] = $request->link; // Store the link
        }

        // Create the material
        $material = Material::create($materialData);

        // Attach subject to material
        if (!empty($request->subject_id)) {
            $material->subjects()->attach($request->subject_id);
        }

        return redirect()->route('materials.index')->with('success', 'Material created successfully.');
    }

    public function edit(Material $material)
    {
        $admin = Auth::guard('admin')->user();

        $subjects = Subject::all()->toArray();
        return inertia('Authenticated/Materials/Edit', [
            'material' => $material,
            'subjects' => $subjects,
            'admin' => $admin,
        ]);
    }

    public function update(Request $request, Material $material)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'format' => 'nullable|in:video,pdf,link',
            'file' => 'nullable|file|mimes:jpg,png,pdf,mp4|max:2048',
            'link' => 'nullable|url',
            'subject_id' => 'required|exists:subjects,id',
        ]);

        // Update the material data
        $materialData = [
            'title' => $request->title,
            'content' => $request->content,
            'format' => $request->format,
        ];

        // Handle file upload if the format is video or pdf
        if ($request->format !== 'link') {
            if ($request->hasFile('file')) {
                // Delete old file if it exists
                if ($material->file) {
                    Storage::delete($material->file);
                }
                $filePath = $request->file('file')->store('materials');
                $materialData['file'] = $filePath; // Update the file path
            }
        } else {
            // Handle link if the format is link
            $materialData['link'] = $request->link; // Update the link
        }

        // Update the material
        $material->update($materialData);

        // Sync subjects with the material
        if (!empty($request->subject_id)) {
            $material->subjects()->sync($request->subject_id);
        } else {
            $material->subjects()->detach(); // Detach if no subject is selected
        }

        return redirect()->route('materials.index')->with('success', 'Material updated successfully.');
    }

    public function show(Material $material)
    {
        $admin = Auth::guard('admin')->user();

        $material->load('subjects');
        return inertia('Authenticated/Materials/Show', [
            'material' => $material,
            'admin' => $admin,
        ]);
    }

    public function showMentor(Material $material)
    {
        $mentor = Auth::guard('mentor')->user();
        $material->load('subjects');
        return inertia('Authenticated/Mentor/Materials/Show', [
            'material' => $material,
            'mentor' => $mentor,
        ]);
    }

    public function showStudent(Material $material)
    {
        $student = Auth::guard('student')->user();
        $material->load('subjects');
        return inertia('Authenticated/Student/Materials/Show', [
            'material' => $material,
            'student' => $student,
        ]);
    }

    public function destroy(Material $material)
    {
        $material->delete();
        return redirect()->route('materials.index')->with('success', 'Material deleted successfully.');
    }


}
