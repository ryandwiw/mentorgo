import React, { useState } from 'react';
import SessionCard from './SessionCard';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { BiArrowBack, BiRightArrow } from 'react-icons/bi';

export default function Index({ sessions, hasActiveBooking }) {
    const { student } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedSession, setSelectedSession] = useState(null);

    if (!student) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    const isProfileComplete = student.location;


    const handleCreateSessionClick = () => {
        if (!isProfileComplete) {
            setIsModalOpen(true);
        } else {
            console.log('test');
        }
    };

    const handleCreateSessionClick2 = (e) => {
        e.preventDefault();
        if (!isProfileComplete) {
            setIsModalOpen(true);
        } else {
            window.location.href = route('student.sessions.bookings.index');
        }
    };

    const handleCloseModal = () => {
        console.log("Modal is closing");
        setIsModalOpen(false);
    };

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
                        {sessions.length > 0 ? (
                            sessions.map(session => {
                                // Check if canceledBookings exists and is an array
                                const hasCanceledBooking = Array.isArray(student.canceledBookings) && student.canceledBookings.includes(session.id);
                                return (
                                    <SessionCard
                                        key={session.id}
                                        session={session}
                                        hasActiveBooking={hasActiveBooking}
                                        hasCanceledBooking={hasCanceledBooking}
                                        onOpenModal={handleCreateSessionClick}
                                        isProfileComplete={isProfileComplete}
                                        user={student} role="student"
                                    />
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center text-lg text-gray-500">
                                No available sessions at the moment.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
