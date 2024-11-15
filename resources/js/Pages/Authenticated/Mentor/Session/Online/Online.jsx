import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import React from 'react';

const OnlineSessionShow = ({ sessionOnline, mentor, bookings }) => {
    return (
        <AuthLayout>
            <section className='py-8 antialiased dark:bg-gray-900 md:py-16'>
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{sessionOnline.mentoring_session.title}</h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">{sessionOnline.mentoring_session.description}</p>
                    <p className="mt-2 text-base font-medium text-gray-900 dark:text-white">
                        Status: {sessionOnline.mentoring_session.is_completed ? 'Selesai' : 'Belum Selesai'}
                    </p>

                    <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Peserta:</h2>
                    <ul className="mt-4 space-y-2">
                        {bookings && bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <li key={booking.id} className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    {booking.student.name} - {booking.status}
                                </li>
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
