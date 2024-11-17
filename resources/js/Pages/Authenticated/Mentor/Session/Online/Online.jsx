import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import React from 'react';
import GoogleMeetForm from './CreateOnline';
import { FaPhone, FaUniversity } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

const OnlineSessionShow = ({ sessionOnline, mentor, bookings }) => {
    const sessionId = sessionOnline.mentoring_session.id;

    return (
        <AuthLayout>
            <section className='py-8 antialiased dark:bg-gray-900 md:py-16'>
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{sessionOnline.mentoring_session.title}</h1>
                    <div>
                        {sessionOnline.mentoring_session.subject?.profile_matkul && (
                            <img
                                src={`/storage/${sessionOnline.mentoring_session.subject.profile_matkul}`}
                                alt={sessionOnline.mentoring_session.subject.name}
                                className="m-auto clipPath w-full h-64 object-cover"
                            />
                        )}
                    </div>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">{sessionOnline.mentoring_session.description}</p>

                    <GoogleMeetForm sessionId={sessionId} />

                    <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Peserta:</h2>
                    <ul className="mt-4 space-y-2">
                        {bookings && bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <Link
                                    key={booking.id}
                                    href={`/mentor/students/${booking.student.slug}`}
                                    className='relative group flex items-center border-b py-4'
                                >
                                    <img
                                        src={booking.student.profile_picture
                                            ? `/storage/${booking.student.profile_picture}`
                                            : '/default-avatar.png'}
                                        alt={booking.student.name}
                                        className="w-16 h-16 rounded-full object-cover mr-4 shadow-sm"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800 capitalize">{booking.student.name}</p>
                                        <div className="flex items-center text-gray-500 mt-1">
                                            <FaUniversity className="w-3 h-3 text-blue-500 mr-2" />
                                            <p className="text-sm">{booking.student.asal}</p>
                                        </div>
                                        <div className="flex items-center text-gray-500 mt-1">
                                            <FaPhone className="w-3 h-3 text-blue-500 mr-2" />
                                            <p className="text-sm">{booking.student.phone}</p>
                                        </div>
                                    </div>
                                    <span className="absolute transform translate-x-8 -translate-y-9 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Lihat lebih detail
                                    </span>
                                </Link>
                            ))
                        ) : (
                            <li className="text-base font-normal text-gray-500 dark:text-gray-400">Tidak ada peserta yang terdaftar.</li>
                        )}
                    </ul>
                </div>
            </section>
        </AuthLayout>
    );
};

export default OnlineSessionShow;
