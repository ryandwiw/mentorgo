import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { usePage } from '@inertiajs/react';
import React from 'react';

const MyBookings = () => {
    const { bookings, mentor } = usePage().props;

    return (
        <AuthLayout>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Daftar Booking Sesi Saya</h1>
                {bookings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {bookings.map((booking, index) => {
                            // Tentukan warna latar belakang berdasarkan indeks
                            const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50'; // Ganti dengan warna yang diinginkan
                            return (
                                <div key={booking.id} className={`${bgColor} shadow-lg rounded-lg p-4 border border-gray-200`}>
                                    <h3 className="text-xl font-semibold">{booking.mentoring_session.title || 'Tidak Ada Judul'}</h3>
                                    <p className="text-gray-600">{booking.mentoring_session.description || 'Tidak Ada Deskripsi'}</p>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Status:</p>
                                            <p className="text-sm text-gray-700 font-medium">{booking.mentoring_session.status || 'Status Tidak Diketahui'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Waktu Booking:</p>
                                            <p className="text-sm text-gray-700 font-medium">{new Date(booking.created_at).toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Tanggal Sesi:</p>
                                            <p className="text-sm text-gray-700 font-medium">{new Date(booking.mentoring_session.date).toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Durasi:</p>
                                            <p className="text-sm text-gray-700 font-medium">{booking.mentoring_session.duration} menit</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Harga:</p>
                                            <p className="text-sm text-gray-700 font-medium">Rp {booking.mentoring_session.price.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Peserta:</p>
                                            <p className="text-sm text-gray-700 font-medium">{booking.mentoring_session.current_participants}/{booking.mentoring_session.student_limit || 'Tidak Terbatas'}</p>
                                        </div>
                                        {/* Hide location for online sessions */}
                                        {booking.mentoring_session.session_type === 'offline' && booking.mentoring_session.location && (
                                            <div>
                                                <p className="text-sm text-gray-500">Lokasi:</p>
                                                <p className="text-sm text-gray-700 font-medium">{booking.mentoring_session.location}</p>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500">Tidak ada booking yang ditemukan.</p>
                )}
            </div>
        </AuthLayout>
    );
}

export default MyBookings;
