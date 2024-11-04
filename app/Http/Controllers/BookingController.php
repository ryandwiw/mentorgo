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

        $bookings = Booking::with('mentoringSession.mentor')
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
        $booking = Booking::with('mentoringSession.mentor')->findOrFail($id);
        $studentId = Auth::guard('student')->id();
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

        $activeBooking = Booking::where('student_id', $studentId)
            ->whereIn('status', ['pending', 'confirmed'])
            ->first();

        $canceledBooking = Booking::where('student_id', $studentId)
            ->where('status', 'canceled')
            ->first();

        if ($activeBooking && !$canceledBooking) {
            return redirect()->back()->withErrors(['error' => 'Anda sudah memiliki pemesanan aktif.']);
        }

        $session = MentoringSession::findOrFail($validated['mentoring_session_id']);

        if ($session->status !== 'available') {
            return redirect()->back()->withErrors(['error' => 'Sesi sudah selesai atau telah mencapai batas peserta.']);
        }

        $booking = Booking::create([
            'student_id' => $studentId,
            'mentoring_session_id' => $session->id,
            'total_price' => $validated['total_price'],
            'status' => 'pending',
            'booking_time' => now(),
        ]);

        $session->current_participants += 1;

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
}
