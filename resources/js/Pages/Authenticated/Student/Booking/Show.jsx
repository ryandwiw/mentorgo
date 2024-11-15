import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Link } from '@inertiajs/react';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

const Show = ({ booking, student }) => {
    return (
        <AuthLayout>
            <div className="container mx-auto px-4 py-8">
                <Link
                    href={route('student.sessions.bookings.index')}
                    className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6"
                >
                    <BiArrowBack className="w-5 h-5 mr-2" />
                    Kembali
                </Link>

                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-800">Detail Pemesanan</h1>
                    </div>

                    <div className="px-8 py-6 space-y-6">
                        <h2 className="text-3xl font-semibold text-gray-900">{booking.mentoring_session.title}</h2>
                        <div className='font-bold text-xl'>
                            Mentor:
                        </div>
                        <div className="flex items-center space-x-4">

                            <img
                                src={
                                    booking.mentoring_session.mentor.profile_picture
                                        ? `/storage/${booking.mentoring_session.mentor.profile_picture}`
                                        : '/default-avatar.png'
                                }
                                alt={booking.mentoring_session.mentor.name}
                                className="w-16 h-16 rounded-full object-cover shadow-sm"
                            />
                            <div>
                                <p className="text-gray-700 font-medium">{booking.mentoring_session.mentor.name}</p>
                                <p className="text-gray-700">Tipe Sesi: {booking.mentoring_session.session_type}</p>
                            </div>
                        </div>

                        <p className="text-gray-700">Total Harga: <span className='font-bold'> Rp  {booking.total_price.toLocaleString()}</span></p>
                        <p className="text-gray-700">Status: <span className='font-bold'>{booking.status}</span></p>
                        <p className="text-gray-700">Waktu Pemesanan: <span className='font-bold'>{new Date(booking.booking_time).toLocaleString()}</span></p>
                    </div>

                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                        {booking.status === 'pending' && (
                            <div className="mt-4 flex space-x-4">
                                <Link
                                    href={route('student.sessions.bookings.cancel', booking.id)}
                                    method='put'
                                    className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Batalkan Pemesanan
                                </Link>
                                <Link
                                    href={route('student.payments.create', booking.id)}
                                    className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Lanjutkan Pembayaran
                                </Link>
                            </div>
                        )}
                        {booking.status === 'completed' && (
                            <p className="text-green-600 font-semibold mt-4">
                                Sesi ini telah selesai. Terima kasih telah menggunakan layanan kami!
                            </p>
                        )}
                        {booking.status === 'canceled' && (
                            <p className="text-red-600 font-semibold mt-4">
                                Pesanan ini telah dibatalkan. Anda dapat memesan sesi ini lagi.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Show;
