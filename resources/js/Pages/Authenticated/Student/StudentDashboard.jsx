import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { usePage, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import SessionCard from './Session/SessionCard';
import { BiRightArrow } from 'react-icons/bi';
import ModalCheck from '@/Components/Auth/Fragments/ModalCheck';

const StudentDashboard = () => {
    const { student, sessions, hasActiveBooking } = usePage().props;
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
            <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-2 text-gray-600">Student Dashboard</h1>
                <p className="text-center text-lg text-gray-500 mb-6">
                    platform for educational mentoring, connecting you with experienced mentors to guide your learning journey.
                </p>
                <div className="flex flex-col md:flex-row md:items-start items-center justify-between border-t border-gray-400 pt-4">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center md:text-left">Available Mentoring Sessions</h2>
                    <Link
                        onClick={handleCreateSessionClick2}
                        className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6 md:mb-0"
                    >
                        <BiRightArrow className="w-5 h-5 mr-2" />
                        Lihat Pesanan Anda
                    </Link>
                </div>
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
                <ModalCheck isOpen={isModalOpen} onClose={handleCloseModal} user={student} role="student" />
            </div>
        </AuthLayout>
    );
};

export default StudentDashboard;
