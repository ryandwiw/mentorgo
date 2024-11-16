import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Link } from '@inertiajs/react';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { FaRegClock, FaRegMoneyBillAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MyBookings = ({ bookings }) => {
    return (
        <AuthLayout>
            <div className="container mx-auto px-4 py-8">
                <Link
                    href={route('student.dashboard')}
                    className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6 transition duration-200"
                >
                    <BiArrowBack className="w-5 h-5 mr-2" />
                    Kembali ke Dashboard
                </Link>
                <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-8">Daftar Pemesanan Saya</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {bookings.length > 0 ? (
                            bookings.map(booking => (
                                <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                                    {booking.mentoring_session ? (
                                        <>
                                            <img
                                                className="m-auto clipPath w-full h-44 object-cover rounded-md"
                                                src={booking.mentoring_session.subject?.profile_matkul ? `/storage/${booking.mentoring_session.subject.profile_matkul}` : '/default-image.png'}
                                                alt={booking.mentoring_session.subject?.name || 'Default Image'}
                                            />
                                            <div className="px-2">
                                                <h2 className="text-xl font-bold my-2">{booking.mentoring_session.title}</h2>
                                                <p className="mt-2 text-gray-600 flex items-center">
                                                    {booking.status === 'canceled' ? <FaTimesCircle className="mr-2 text-red-500" /> : <FaCheckCircle className="mr-2 text-green-500" />}
                                                    <span className={`font-semibold uppercase ${booking.status === 'canceled' ? 'text-red-500' : 'text-green-500'}`}>{booking.status}</span>
                                                </p>
                                                <div className='flex items-center'>
                                                    <FaRegMoneyBillAlt className='mr-2 w-4 h-4' />
                                                    <span className="font-bold">Rp {parseFloat(booking.total_price).toLocaleString()}</span>
                                                </div>
                                                <p className="mt-2 text-gray-600 flex items-center">
                                                    <FaRegClock className="mr-2 w-4 h-4" />
                                                    <span className="text-sm">{new Date(booking.booking_time).toLocaleString()}</span>
                                                </p>
                                                {booking.status === 'pending' ? (
                                                    <div className="flex justify-between pt-6">
                                                        <div className="flex gap-4">
                                                            <img src={'/assets/courses/book-open.svg'} alt="kelas" width={24} height={24} className="inline-block m-auto" />
                                                            <Link
                                                                href={route('student.sessions.bookings.show', booking.id)}
                                                                className="text-base font-medium text-black opacity-75 hover:text-blue-500"
                                                            >
                                                                Lihat Detail
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="mt-4 text-gray-600">
                                                        Pemesanan telah <span className="font-bold">{booking.status === 'canceled' ? 'dibatalkan' : 'dikonfirmasi'}</span>
                                                    </p>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-red-500">Sesi mentoring tidak ditemukan.</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center col-span-full">Tidak ada pemesanan yang ditemukan.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default MyBookings;
