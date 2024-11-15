<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Booking;
use App\Models\MentorRating;
use App\Models\MentoringSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RatingController extends Controller
{

    public function studentIndex()
    {
        $student = Auth::guard('student')->user();

        $ratings = Rating::with('mentor', 'booking') // Assuming relationships are defined
            ->where('student_id', Auth::guard('student')->id())
            ->get();

        return Inertia::render('Authenticated/Student/Ratings/Index', [
            'ratings' => $ratings,
            'student' => $student,
        ]);
    }

    // Method for mentors to view ratings they have received
    public function mentorIndex()
    {
        $mentor = Auth::guard('mentor')->user();

        $ratings = Rating::with('student', 'booking')
            ->where('mentor_id', Auth::guard('mentor')->id())
            ->get();

        return Inertia::render('Authenticated/Mentor/Ratings/Index', [
            'ratings' => $ratings,
            'mentor' => $mentor,

        ]);
    }

    // Ubah aksesibilitas metode ini menjadi public
    public function create($bookingId)
    {
        // Ambil booking berdasarkan ID
        $student = Auth::guard('student')->user();

        $booking = Booking::with('mentoringSession.mentor')->findOrFail($bookingId);
        $mentoringSession = $booking->mentoringSession;

        // Cek apakah sesi mentoring sudah selesai
        if (!$mentoringSession->is_completed) {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'Sesi belum selesai.']);
        }

        // Cek apakah siswa memiliki booking yang terkonfirmasi
        if ($booking->status !== 'confirmed') {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'Anda tidak memiliki akses untuk memberi rating pada sesi ini.']);
        }

        // Cek apakah siswa sudah memberi rating untuk booking ini
        $existingRating = Rating::where('booking_id', $bookingId)->first();
        if ($existingRating) {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'Anda sudah memberi rating untuk sesi ini.']);
        }

        return Inertia::render('Authenticated/Student/Ratings/Create', [
            'booking' => $booking,
            'mentoringSession' => $mentoringSession,
            'student' => $student,
        ]);
    }

    public function storeRating(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'rating' => 'required|numeric|min:0|max:5', // Misalnya, rating dari 0 hingga 5
            'comment' => 'nullable|string',
        ]);

        // Ambil booking berdasarkan ID
        $booking = Booking::findOrFail($validated['booking_id']);
        $mentoringSession = $booking->mentoringSession;

        // Cek apakah sesi mentoring sudah selesai
        if (!$mentoringSession->is_completed) {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'Session is not completed yet.']);
        }

        // Cek apakah siswa memiliki booking yang terkonfirmasi
        if ($booking->status !== 'confirmed') {
            return redirect()->route('student.sessions.bookings.index')->withErrors(['error' => 'You do not have access to rate this session.']);
        }

        // Simpan rating
        $rating = new Rating();
        $rating->booking_id = $validated['booking_id'];
        $rating->student_id = Auth::guard('student')->id();
        $rating->mentor_id = $mentoringSession->mentor_id; // Ambil mentor dari sesi mentoring
        $rating->rating = $validated['rating'];
        $rating->comment = $validated['comment'];
        $rating->save();

        // Update rata-rata rating mentor
        $this->updateMentorRating($mentoringSession->mentor_id);

        return redirect()->route('student.session.dashboard')->with('success', 'Rating berhasil diberikan.');
    }

    private function updateMentorRating($mentorId)
    {
        // Ambil semua rating untuk mentor ini
        $ratings = Rating::where('mentor_id', $mentorId)->get();

        // Hitung total rating dan rata-rata
        $totalRatings = $ratings->count();
        $averageRating = $totalRatings > 0 ? $ratings->sum('rating') / $totalRatings : 0;

        // Update atau buat entri di tabel mentor_ratings
        MentorRating::updateOrCreate(
            ['mentor_id' => $mentorId],
            ['average_rating' => $averageRating, 'total_ratings' => $totalRatings]
        );
    }
}
