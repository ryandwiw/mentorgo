import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Link } from '@inertiajs/react';
import React from 'react';
import { BiArrowBack, BiUser , BiMoney, BiTime, BiCheckCircle, BiXCircle, BiAlarm } from 'react-icons/bi';

const Show = ({ booking, student }) => {
    return (
        <AuthLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out">
                    <div className="flex justify-between items-center mb-6 p-6 pb-0">
                        <h1 className="text-2xl font-bold text-gray-800">Detail Pemesanan</h1>
                        <Link
                            href={route('student.sessions.bookings.index')}
                            className="flex items-center text-gray-500 hover:text-blue-700 transition duration-200 transform hover:scale-105"
                        >
                            <BiArrowBack className="mr-1" /> Kembali
                        </Link>
                    </div>
                    <hr />
                    <div className="px-8 py-6 space-y-6">
                        <h2 className="text-3xl font-semibold text-gray-900">{booking.mentoring_session.title}</h2>
                        <img
                            className="m-auto w-full h-72 object-cover rounded-md transition-transform duration-300 transform hover:scale-105"
                            src={booking.mentoring_session.subject?.profile_matkul ? `/storage/${booking.mentoring_session.subject.profile_matkul}` : '/default-image.png'}
                            alt={booking.mentoring_session.subject?.name || 'Default Image'}
                        />
                        <hr />
                        <p className="text-gray-700 flex items-center">
                            <BiAlarm className="mr-2" />
                            <span>Tipe Sesi :</span>
                            <span className='font-bold ml-3'>{booking.mentoring_session.session_type}</span>
                        </p>
                        <p className="text-gray-700 flex items-center">
                            <BiMoney className="mr-2" />
                            <span>Total Harga :</span>
                            <span className='font-bold ml-3'>Rp {booking.total_price.toLocaleString()}</span>
                        </p>
                        <p className="text-gray-700 flex items-center">
                            <BiCheckCircle className="mr-2" />
                            <span>Status :</span>
                            <span className='font-bold ml-3'>{booking.status}</span>
                        </p>
                        <p className="text-gray-700 flex items-center">
                            <BiTime className="mr-2" />
                            <span>Waktu Pemesanan :</span>
                            <span className='font-bold ml-3'>{new Date(booking.booking_time).toLocaleString()}</span>
                        </p>
                    </div>

                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                        {booking.status === 'pending' && (
                            <div className="mt-4 flex space-x-4">
                                <Link
                                    href={route('student.sessions.bookings.cancel', booking.id)}
                                    method='put'
                                    className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
                                >
                                    <BiXCircle className="mr-2" /> Batalkan Pemesanan
                                </Link>
                                <Link
                                    href={route('student.payments.create', booking.id)}
                                    className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
                                >
                                    <BiCheckCircle className="mr-2" /> Lanjutkan Pembayaran
                                </Link>
                            </div>
                        )}
                        {booking.status === 'completed' && (
                            <p className="text-green-600 font-semibold mt-4">
                                <BiCheckCircle className="inline mr-1" /> Sesi ini telah selesai. Terima kasih telah menggunakan layanan kami!
                            </p>
                        )}
                        {booking.status === 'canceled' && (
                            <p className="text-red-600 font-semibold mt-4">
                                <BiXCircle className="inline mr-1" /> Pesanan ini telah dibatalkan. Anda dapat memesan sesi ini lagi.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Show;
