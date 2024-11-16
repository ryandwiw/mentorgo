<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\MentoringSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $student = Auth::guard('student')->user();

        $bookings = Booking::with('mentoringSession.mentor', 'mentoringSession.subject') // Menambahkan subject
            ->where('student_id', $student->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Authenticated/Student/Booking/MyBookings', [
            'bookings' => $bookings,
            'student' => $student,
        ]);
    }

    public function show($id)
    {
        $booking = Booking::with('mentoringSession.mentor', 'mentoringSession.subject')->findOrFail($id);
        // $studentId = Auth::guard('student')->id();
        $student = Auth::guard('student')->user();

        return Inertia::render('Authenticated/Student/Booking/Show', [
            'booking' => $booking,
            'student' => $student,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mentoring_session_id' => 'required|exists:mentoring_sessions,id',
            'total_price' => 'required|numeric|min:0',
        ]);

        $studentId = Auth::guard('student')->id();

        // Ambil pemesanan terakhir dari siswa
        $lastBooking = Booking::where('student_id', $studentId)
            ->orderBy('created_at', 'desc')
            ->first();

        // Cek apakah ada pemesanan aktif
        if ($lastBooking && $lastBooking->status === 'pending') {
            return redirect()->back()->withErrors(['error' => 'Anda sudah memiliki pemesanan aktif.']);
        }

        // Cek apakah ada pemesanan sebelumnya
        if ($lastBooking && $lastBooking->status === 'confirmed') {
            // Ambil sesi mentoring yang telah dipesan sebelumnya
            $previousSession = MentoringSession::findOrFail($lastBooking->mentoring_session_id);

            // Cek apakah sesi mentoring sebelumnya sudah selesai
            if (!$previousSession->is_completed) {
                return redirect()->back()->withErrors(['error' => 'Sesi mentoring sebelumnya belum selesai.']);
            }
        }

        // Cek apakah siswa telah membatalkan sesi yang sama sebelumnya
        $hasCanceledBooking = Booking::where('student_id', $studentId)
            ->where('mentoring_session_id', $validated['mentoring_session_id'])
            ->where('status', 'canceled')
            ->exists();

        if ($hasCanceledBooking) {
            return redirect()->back()->withErrors(['error' => 'Anda telah membatalkan sesi ini. Anda tidak dapat memesan sesi ini lagi.']);
        }

        // Ambil sesi mentoring yang akan dipesan
        $session = MentoringSession::findOrFail($validated['mentoring_session_id']);

        // Cek status sesi mentoring yang akan dipesan
        if ($session->status !== 'available') {
            return redirect()->back()->withErrors(['error' => 'Sesi sudah selesai atau telah mencapai batas peserta.']);
        }

        // Buat pemesanan baru
        $booking = Booking::create([
            'student_id' => $studentId,
            'mentoring_session_id' => $validated['mentoring_session_id'],
            'total_price' => $validated['total_price'],
            'status' => 'pending',
            'booking_time' => now(),
        ]);

        // Update jumlah peserta di sesi mentoring
        $session->current_participants += 1;

        // Cek apakah jumlah peserta sudah mencapai batas
        if ($session->current_participants >= $session->student_limit) {
            $session->status = 'completed';
        }

        $session->save();

        return redirect()->route('student.sessions.bookings.index')
            ->with('success', 'Pemesan berhasil dibuat.');
    }

    public function cancel($id)
    {
        $booking = Booking::findOrFail($id);

        if ($booking->student_id !== Auth::guard('student')->id()) {
            return redirect()->back()->withErrors(['error' => 'Anda tidak memiliki akses untuk membatalkan pemesanan ini.']);
        }

        $booking->status = 'canceled';
        $booking->save();

        $session = $booking->mentoringSession;
        $session->current_participants -= 1;
        $session->status = $session->current_participants < $session->student_limit ? 'available' : 'booked';
        $session->save();

        return redirect()->route('student.sessions.bookings.index')
            ->with('success', 'Pemesanan berhasil dibatalkan.');
    }

    public function mentorBookings()
    {
        $mentor = Auth::guard('mentor')->user();

        // Fetch bookings for the mentor's sessions with payments and ratings
        $bookings = Booking::with(['mentoringSession', 'student', 'payment', 'rating'])
            ->whereHas('mentoringSession', function ($query) use ($mentor) {
                $query->where('mentor_id', $mentor->id);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Authenticated/Mentor/Booking/MyBookings', [
            'bookings' => $bookings,
            'mentor' => $mentor,
        ]);
    }
}
