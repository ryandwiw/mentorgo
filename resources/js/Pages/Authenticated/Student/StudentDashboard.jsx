import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { usePage, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import SessionCard from './Session/SessionCard';
import { BiRightArrow } from 'react-icons/bi';
import ModalCheck from '@/Components/Auth/Fragments/ModalCheck';
import { FaInfoCircle } from 'react-icons/fa';
import { MdPerson, MdDateRange } from 'react-icons/md';

const StudentDashboard = ({ hasActiveSessions, activeSessions }) => {
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

    console.log(activeSessions);

    return (
        <AuthLayout>
            <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-2 text-gray-600">Student Dashboard</h1>
                <p className="text-center text-lg text-gray-500 mb-6">
                    platform for educational mentoring, connecting you with experienced mentors to guide your learning journey.
                </p>

                {hasActiveSessions && Array.isArray(activeSessions) && activeSessions.length > 0 && (
                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-5 mb-6 rounded-lg shadow-lg">
                        <strong className="font-semibold text-lg flex items-center">
                            <FaInfoCircle className="mr-2 text-blue-500" />
                            Anda memiliki sesi mentoring aktif!
                        </strong>
                        <ul className="mt-4 space-y-4">
                            {activeSessions.map((session) => (
                                <li
                                    key={session.id}
                                    className="p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-all ease-in-out duration-200"
                                >
                                    <Link
                                        href={
                                            session.session_type === 'online'
                                                ? `/student/sessions/online/${session.session_online?.id}` // Menggunakan session_online.id
                                                : `/student/sessions/offline/${session.session_offline?.id}` // Menggunakan session_offline.id
                                        }
                                        className="block hover:text-blue-600"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start">
                                            <div className="flex-1">
                                                <span className="font-medium text-gray-900 text-lg">
                                                    {session.title || 'Tidak ada Sesi'}
                                                </span>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    <div className="flex items-center">
                                                        <MdPerson className="mr-2 text-blue-400" />
                                                        Mentor - {session.mentor?.name || 'Tidak ada Mentor'}
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <MdDateRange className="mr-2 text-blue-400" />
                                                        {new Date(session.date).toLocaleString() || 'Tidak ada Tanggal'}
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <FaInfoCircle className="mr-2 text-blue-400" />
                                                        Tipe Sesi {session.session_type || 'Tidak ada Tipe'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


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
