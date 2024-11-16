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

    // paymentgateway shi
    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'booking_id' => 'required|exists:bookings,id',
    //         'amount' => 'required|numeric|min:0',
    //     ]);

    //     $booking = Booking::with('mentoringSession.sessionOnline', 'mentoringSession.sessionOffline')->findOrFail($validated['booking_id']);

    //     // Pastikan booking ini milik siswa yang sedang login
    //     if ($booking->student_id !== Auth::guard('student')->id()) {
    //         return redirect()->back()->withErrors(['error' => 'Anda tidak memiliki akses untuk melakukan pembayaran ini.']);
    //     }

    //     // Konfigurasi Midtrans
    //     Config::$serverKey = config('midtrans.server_key');
    //     Config::$clientKey = config('midtrans.client_key');
    //     Config::$isProduction = config('midtrans.is_production');

    //     // Buat transaksi Midtrans
    //     $transactionDetails = [
    //         'order_id' => uniqid(), // Anda dapat menggunakan ID booking atau ID unik lainnya
    //         'gross_amount' => $validated['amount'],
    //     ];

    //     $itemDetails = [
    //         [
    //             'id' => $booking->id,
    //             'price' => $validated['amount'],
    //             'quantity' => 1,
    //             'name' => 'Pembayaran untuk ' . $booking->mentoringSession->title,
    //         ],
    //     ];

    //     $customerDetails = [
    //         'first_name' => Auth::guard('student')->user()->name,
    //         'email' => Auth::guard('student')->user()->email,
    //     ];

    //     $midtransTransaction = [
    //         'transaction_details' => $transactionDetails,
    //         'item_details' => $itemDetails,
    //         'customer_details' => $customerDetails,
    //     ];

    //     // Dapatkan URL pembayaran Midtrans
    //     $snapToken = Snap::getSnapToken($midtransTransaction);

    //     // Simpan data pembayaran ke database
    //     $payment = Payment::create([
    //         'booking_id' => $booking->id,
    //         'amount' => $validated['amount'],
    //         'transaction_id' => $transactionDetails['order_id'],
    //         'status' => 'pending', // Status sementara sebelum pembayaran selesai
    //     ]);

    //     return Inertia::render('Payments/Create', [
    //         'snapToken' => $snapToken,
    //     ]);
    // }

    // public function callback(Request $request)
    // {
    //     $json = $request->getContent();
    //     $data = json_decode($json, true);

    //     // Verifikasi status pembayaran
    //     if ($data['transaction_status'] == 'settlement') {
    //         // Pembayaran berhasil
    //         $payment = Payment::where('transaction_id', $data['order_id'])->first();
    //         if ($payment) {
    //             $payment->status = 'paid';
    //             $payment->payment_date = now();
    //             $payment->response = $json;
    //             $payment->save();

    //             // Update status booking
    //             $booking = Booking::find($payment->booking_id);
    //             $booking->status = 'confirmed';
    //             $booking->save();
    //         }
    //     } elseif ($data['transaction_status'] == 'cancel' || $data['transaction_status'] == 'deny') {
    //         // Pembayaran gagal
    //         $payment = Payment::where('transaction_id', $data['order_id'])->first();
    //         if ($payment) {
    //             $payment->status = 'failed';
    //             $payment->response = $json;
    //             $payment->save();
    //         }
    //     }

    //     return response()->json(['status' => 'success']);
    // }
}
