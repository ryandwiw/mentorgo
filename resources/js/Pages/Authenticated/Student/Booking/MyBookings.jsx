import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Link } from '@inertiajs/react';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

const MyBookings = ({ bookings }) => {

    return (
        <AuthLayout>
            <div className="container mx-auto px-4 py-8">
                <Link
                    href={route('student.dashboard')}
                    className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6"
                >
                    <BiArrowBack className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold mb-6">Daftar Pemesanan Saya</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map(booking => (
                        <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6">
                            {booking.mentoring_session ? (
                                <>
                                    <h2 className="text-lg font-semibold">{booking.mentoring_session.title}</h2>
                                    <p className="mt-2 text-gray-600">Harga: Rp {parseFloat(booking.total_price).toLocaleString()}</p>
                                    <p className="mt-2 text-gray-600">Status: {booking.status}</p>
                                    <p className="mt-2 text-gray-600">Waktu Pemesanan: {new Date(booking.booking_time).toLocaleString()}</p>
                                    {booking.status === 'pending' ? (
                                        <Link
                                            href={route('student.sessions.bookings.show', booking.id)}
                                            className="mt-4 inline-block bg-green-600 text-white py-2 px-4 rounded"
                                        >
                                            Lihat Detail
                                        </Link>

                                    ) : (
                                        <p className="mt-4 text-gray-600">
                                            Pemesanan telah
                                            <span className={booking.status === 'canceled' ? 'font-bold text-red-500' : 'font-bold text-green-500'}>
                                                {booking.status === 'canceled' ? ' dibatalkan' : ' dikonfirmasi'}
                                            </span>
                                        </p>

                                    )}
                                </>
                            ) : (
                                <p className="text-red-500">Sesi mentoring tidak ditemukan.</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AuthLayout>
    );
};

export default MyBookings;
