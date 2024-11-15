<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $student = Auth::guard('student')->user();
        $payments = Payment::with('booking')
            ->whereHas('booking', function ($query) use ($student) {
                $query->where('student_id', $student->id);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Authenticated/Student/Payment/Index', [
            'payments' => $payments,
            'student' => $student,
        ]);
    }

    public function create($bookingId)
    {
        $student = Auth::guard('student')->user();
        $booking = Booking::with('mentoringSession.mentor')->findOrFail($bookingId);
        return Inertia::render('Authenticated/Student/Payment/Create', [
            'booking' => $booking,
            'student' => $student,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:credit_card,e-wallet,bank_transfer',
        ]);

        $booking = Booking::with('mentoringSession.sessionOnline', 'mentoringSession.sessionOffline')->findOrFail($validated['booking_id']);

        // Pastikan booking ini milik siswa yang sedang login
        if ($booking->student_id !== Auth::guard('student')->id()) {
            return redirect()->back()->withErrors(['error' => 'Anda tidak memiliki akses untuk melakukan pembayaran ini.']);
        }

        // Buat pembayaran
        $payment = Payment::create([
            'booking_id' => $booking->id,
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'status' => 'paid',
        ]);

        // Update status booking
        $booking->status = 'confirmed';
        $booking->save();

        // Ambil sesi mentoring yang terkait dengan booking
        $mentoringSession = $booking->mentoringSession;

        // Pastikan mentoringSession ada sebelum mengakses relasi
        if (!$mentoringSession) {
            return redirect()->back()->withErrors(['error' => 'Sesi mentoring tidak ditemukan.']);
        }

        $sessionOnline = optional($mentoringSession->sessionOnline)->id;
        $sessionOffline = optional($mentoringSession->sessionOffline)->id;

        if ($mentoringSession->session_type === 'online') {
            if ($sessionOnline) {
                return redirect()->to('student/sessions/online/' . $sessionOnline . '/')
                    ->with('success', 'Pembayaran berhasil dilakukan. Anda sekarang dapat mengakses sesi online.');
            } else {
                return redirect()->back()->withErrors(['error' => 'Sesi online tidak ditemukan.']);
            }
        } else {
            if ($sessionOffline) {
                return redirect()->to('student/sessions/offline/' . $sessionOffline . '/')
                    ->with('success', 'Pembayaran berhasil dilakukan. Anda sekarang dapat mengakses sesi offline.');
            } else {
                return redirect()->back()->withErrors(['error' => 'Sesi offline tidak ditemukan.']);
            }
        }
    }
}
