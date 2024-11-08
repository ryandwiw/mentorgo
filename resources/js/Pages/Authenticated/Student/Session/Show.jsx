import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Link } from '@inertiajs/react';

const Show = ({ session, hasActiveBooking, activeBookingId, student, bookings = [] }) => {
    const { post, processing, reset, errors } = useForm({
        mentoring_session_id: session.id,
        total_price: session.price,
    });

    const handleBooking = (e) => {
        e.preventDefault();
        post(route('student.sessions.bookings.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    let message;

    const activeBooking = bookings.find(booking =>
        booking.student_id === student.id &&
        booking.mentoring_session_id === session.id
    );

    const hasPendingBooking = bookings.some(booking =>
        booking.student_id === student.id && booking.status === 'pending'
    );

    if (hasPendingBooking) {
        message = "Anda memiliki sesi yang sedang diproses. Mohon selesaikan atau batalkan sesi tersebut.";
    } else if (activeBooking) {
        if (activeBooking.status === 'completed') {
            message = "Anda telah menyelesaikan sesi ini sebelumnya.";
        } else if (activeBooking.status === 'canceled') {
            message = "Pesanan ini telah dibatalkan. Anda dapat memesan sesi ini lagi.";
        }
    } else {
        if (session.status === 'available') {
            message = "Silakan pesan sesi ini.";
        }
    }

    const canBookSession = !hasPendingBooking;

    return (
        <AuthLayout>
            <div className="container mx-auto px-4 py-8">

                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">Detail Sesi Mentoring</h1>
                            <Link
                                href={route('student.dashboard')}
                                className="text-blue-500 hover:text-blue-600"
                            >
                                Kembali ke Daftar
                            </Link>
                        </div>
                    </div>

                    <div className="px-8 py-6 space-y-6">
                        <h2 className="text-3xl font-semibold text-gray-900">{session.title}</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-600">Deskripsi</h3>
                                <p className="mt-1 text-gray-700 leading-relaxed">{session.description}</p>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-medium text-gray-600">Informasi Mentor</h3>
                                <div className="flex items-center mt-4">
                                    <img
                                        src={
                                            session.mentor.profile_picture
                                                ? `/storage/${student.profile_picture}`
                                                : '/default-avatar.png'
                                        }
                                        alt={session.mentor.name}
                                        className="w-16 h-16 rounded-full object-cover mr-4 shadow-sm"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800 capitalize">{session.mentor.name}</p>
                                        {session.mentor.location && (
                                            <div className="flex items-center text-gray-500 mt-1">
                                                <svg
                                                    className="w-5 h-5 text-blue-500 mr-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18l-4.95-4.95a7 7 0 010-9.9zM10 8a2 2 0 100 4 2 2 0 000-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <p className="text-sm">{session.mentor.location}</p>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t border-gray-200 pt-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600">Tipe Sesi</h3>
                                    <p className="mt-1 text-gray-900 capitalize font-bold">{session.session_type}</p >
                                </div>
                                {session.session_type === 'offline' && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-600">Lokasi</h3>
                                        <p className="mt-1 text-gray-900 font-bold">{session.location}</p>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600">Durasi </h3>
                                    <p className="mt-1 text-gray-900 font-bold">{session.duration} menit</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600">Harga</h3>
                                    <p className="mt-1 text-gray-900 font-semibold text-lg">Rp {session.price.toLocaleString()}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600">Slot Tersedia</h3>
                                    <p className="mt-1 text-gray-900 font-semibold">{session.student_limit - session.current_participants} orang</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                        {errors && (
                            <div className="text-red-500 font-semibold mb-4">
                                {Object.keys(errors).map((key, index) => (
                                    <p key={index}>{errors[key]}</p>
                                ))}
                            </div>
                        )}
                        {session.status === 'available' && canBookSession ? (
                            <button
                                onClick={handleBooking}
                                disabled={processing}
                                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 ease-in-out disabled:opacity-50 transform hover:scale-105"
                            >
                                {processing ? 'Memproses...' : 'Booking Sesi'}
                            </button>
                        ) : (
                            <p className="text-red-500 font-semibold">
                                {message}
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </AuthLayout>
    );
};

export default Show;
