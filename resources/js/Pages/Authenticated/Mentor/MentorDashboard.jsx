import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { usePage, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { BiRightArrow } from 'react-icons/bi';
import { format } from 'date-fns';
import ModalCheck from '@/Components/Auth/Fragments/ModalCheck';
import { MdDateRange, MdPerson } from 'react-icons/md';
import { FaInfoCircle } from 'react-icons/fa';

const MentorDashboard = ({ activeSessions }) => {
    const { mentor, mentoringsessions = [] } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!mentor) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    const isProfileComplete = mentor.location;

    const handleCreateSessionClick = () => {
        if (!isProfileComplete) {
            setIsModalOpen(true);
        } else {
            window.location.href = route('mentor.session.create');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AuthLayout>
            <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-2 text-gray-600">Mentor Dashboard</h1>
                <p className="text-center text-lg text-gray-500 mb-6">
                    Platform for educational mentoring, connecting you with experienced mentors to guide your learning journey.
                </p>

                {activeSessions && activeSessions.length > 0 ? (
                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-5 mb-6 rounded-lg shadow-lg">
                        <strong className="font-semibold text-lg flex items-center">
                            <FaInfoCircle className="mr-2 text-blue-500" />
                            Anda memiliki sesi mentoring aktif dengan pembayaran yang sudah dikonfirmasi!
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
                                                ? `/mentor/sessions/online/${session.id}`
                                                : `/mentor/sessions/offline/${session.id}`
                                        }
                                        className="block hover:text-blue-600"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start">
                                            <div className="flex-1">
                                                <span className="font-medium text-gray-900 text-lg">
                                                    {session.title || 'Tidak ada Sesi'}
                                                </span>
                                                <div className="text-sm text-gray-600 mt-1">

                                                    <div className="flex items-center mt-1">
                                                        <MdDateRange className="mr-2 text-blue-400" />
                                                        {new Date(session.date).toLocaleString() || 'Tidak ada Tanggal'}
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <FaInfoCircle className="mr-2 text-blue-400" />
                                                        Tipe Sesi: {session.session_type || 'Tidak ada Tipe'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    ""
                )}

                <div className="flex flex-col md:flex-row justify-between border-t border-gray-400 pt-4">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Mentoring Sessions</h2>
                    <button
                        onClick={handleCreateSessionClick}
                        className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6 md:mb-0"
                    >
                        <BiRightArrow className="w-5 h-5 mr-2" />
                        Buat Sesi Mentoring
                    </button>
                </div>
                <ModalCheck isOpen={isModalOpen} onClose={handleCloseModal} user={mentor} role="mentor" />

                {mentoringsessions.length === 0 ? (
                    <p className="text-gray-600 text-center">Belum ada sesi mentoring yang dibuat.</p>
                ) : (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {mentoringsessions.map((session) => (
                                        <tr key={session.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{session.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{format(new Date(session.date), 'dd MMM yyyy')}</td>
                                            <td className="px-6 py- 4 whitespace-nowrap capitalize">{session.session_type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(session.status)}`}>
                                                    {session.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    href={route('mentor.session.show', session.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                >
                                                    Lihat
                                                </Link>
                                                <Link
                                                    href={route('mentor.session.edit', session.id)}
                                                    className="text-yellow-600 hover:text-yellow-900"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {session.session_type === 'online' ? (
                                                        <Link
                                                            href={`/mentor/sessions/online/${session.session_online?.id}`} // Ambil ID dari sessionOnline
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            Lihat Sesi Online
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            href={`/mentor/sessions/offline/${session.session_offline?.id}`} // Ambil ID dari sessionOffline
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            Lihat Sesi Offline
                                                        </Link>
                                                    )}
                                                </td>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AuthLayout>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'available':
            return 'bg-green-100 text-green-800';
        case 'full':
            return 'bg-yellow-100 text-yellow-800';
        case 'completed':
            return 'bg-blue-100 text-blue-800';
        case 'canceled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default MentorDashboard;
