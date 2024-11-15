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
        $subjects = Subject::all();

        $materials = Material::with('subjects')->get(); // Ambil semua materi dengan relasi subjek
        return inertia('Authenticated/Materials/Index', [
            'materials' => $materials,
            'subjects' => $subjects,
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
        $subjects = Subject::all();
        return inertia('Authenticated/Materials/Create', [
            'subjects' => $subjects,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'mentor_id' => 'nullable|exists:mentors,id',
            'file' => 'required|file|mimes:jpg,png,pdf,mp4|max:2048', // Ubah validasi file
            'subject_id' => 'required|exists:subjects,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'format' => 'required|in:video,pdf,link',
        ]);

        // Menyimpan file dan mendapatkan path-nya
        $filePath = $request->file('file')->store('materials');

        // Menyimpan materi
        $material = Material::create([
            'mentor_id' => $request->mentor_id,
            'title' => $request->title,
            'content' => $request->content,
            'format' => $request->format,
            'file' => $filePath, // Menyimpan path file
        ]);

        // Lampirkan subjek ke materi
        if (!empty($request->subject_id)) {
            $material->subjects()->attach($request->subject_id);
        }

        return redirect()->route('materials.index')->with('success', 'Material created successfully.');
    }

    public function edit(Material $material)
    {

        $subjects = Subject::all()->toArray();
        return inertia('Authenticated/Materials/Edit', [
            'material' => $material,
            'subjects' => $subjects
        ]);
    }

    public function update(Request $request, Material $material)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'format' => 'required|in:video,pdf,link',
            'file' => 'nullable|file|mimes:jpg,png,pdf,mp4|max:2048', // Ubah validasi file
            'subject_id' => 'required|exists:subjects,id',
        ]);

        // Jika ada file baru yang diunggah, hapus file lama dan simpan file baru
        if ($request->hasFile('file')) {
            // Hapus file lama jika ada
            if ($material->file) {
                Storage::delete($material->file);
            }
            // Menyimpan file dan mendapatkan path-nya
            $filePath = $request->file('file')->store('materials');
            $material->file = $filePath; // Update path file
        }

        // Update data materi lainnya
        $material->update([
            'title' => $request->title,
            'content' => $request->content,
            'format' => $request->format,
            // 'file' => $filePath, // Sudah ditangani di atas
        ]);

        // Sync subjects with the material
        if (!empty($request->subject_id)) {
            $material->subjects()->sync($request->subject_id);
        } else {
            $material->subjects()->detach(); // Hapus semua subjek jika tidak ada yang dipilih
        }

        return redirect()->route('materials.index')->with('success', 'Material updated successfully.');
    }

    public function show(Material $material)
    {
        $material->load('subjects');
        return inertia('Authenticated/Materials/Show', [
            'material' => $material,
        ]);
    }

    public function showMentor(Material $material)
    {
        $mentor = Auth::guard('mentor')->user();
        $material->load('subjects');
        return inertia('Authenticated/Student/Materials/Show', [
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
