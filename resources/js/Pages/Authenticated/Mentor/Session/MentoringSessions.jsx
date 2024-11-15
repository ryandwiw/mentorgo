import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';

const MentoringSessionsIndex = () => {
    const { mentoringsessions } = usePage().props;

    return (
        <AuthLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Daftar Sesi Mentoring</h1>
                    <Link
                        href={route('mentor.session.create')}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Buat Sesi Baru
                    </Link>
                </div>

                {mentoringsessions.length === 0 ? (
                    <p className="text-gray-600">Belum ada sesi mentoring yang dibuat.</p>
                ) : (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {mentoringsessions.map((session) => (
                                    <tr key={session.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{session.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{format(new Date(session.date), 'dd MMM yyyy')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap capitalize">{session.session_type}</td>
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
                                                    Detail
                                                </Link>
                                                <Link
                                                    href={route('mentor.session.edit', session.id)}
                                                    className="text-yellow-600 hover:text-yellow-900"
                                                >
                                                    Edit
                                                </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default MentoringSessionsIndex;