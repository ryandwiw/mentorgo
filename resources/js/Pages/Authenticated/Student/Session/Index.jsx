import React from 'react';
import SessionCard from './SessionCard';
import { Head, Link } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { BiArrowBack , BiRightArrow } from 'react-icons/bi';

export default function Index({ sessions, hasActiveBooking }) {
    return (
        <AuthLayout>
            <Head title="Available Sessions" />
            <div className='flex justify-between'>
                <Link
                    href={route('student.dashboard')}
                    className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6"
                >
                    <BiArrowBack className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>
                <Link
                    href={route('student.sessions.bookings.index')}
                    className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6"
                >
                    <BiRightArrow className="w-5 h-5 mr-2" />
                    Lihat Pesanan Anda
                </Link>
            </div>
            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-6">Available Mentoring Sessions</h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {sessions.map(session => (
                            <SessionCard
                                key={session.id}
                                session={session}
                                hasActiveBooking={hasActiveBooking}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
