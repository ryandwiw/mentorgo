import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';

const ShowSession = () => {
    const { mentoringsession } = usePage().props;

    return (
        <AuthLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">Detail Sesi Mentoring</h1>
                            <Link
                                href={route('mentor.dashboard')}
                                className="text-blue-500 hover:text-blue-600"
                            >
                                Kembali ke Daftar
                            </Link>
                        </div>
                    </div>

                    <div className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Judul</h3>
                                    <p className="mt-1 text-lg text-gray-900">{mentoringsession.title}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Deskripsi</h3>
                                    <p className="mt-1 text-gray-900">{mentoringsession.description}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Tipe Sesi</h3>
                                    <p className="mt-1 text-gray-900 capitalize">{mentoringsession.session_type}</p>
                                </div>

                                {mentoringsession.session_type === 'offline' && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Lokasi</h3>
                                        <p className="mt-1 text-gray-900">{mentoringsession.location}</p>
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Peserta Sekarang</h3>
                                    <p className="mt-1 text-gray-900">{mentoringsession.current_participants} orang</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Tanggal</h3>
                                    <p className="mt-1 text-gray-900">
                                        {format(new Date(mentoringsession.date), 'dd MMMM yyyy')}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Durasi</h3>
                                    <p className="mt-1 text-gray-900">{mentoringsession.duration} menit</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Harga</h3>
                                    <p className="mt-1 text-gray-900">Rp {mentoringsession.price.toLocaleString()}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Maksimal Peserta</h3>
                                    <p className="mt-1 text-gray-900">{mentoringsession.student_limit} orang</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                    <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(mentoringsession.status)}`}>
                                        {mentoringsession.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-end space-x-3">
                            <Link
                                href={route('mentor.session.edit', mentoringsession.id)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Edit Sesi
                            </Link>
                        </div>
                    </div>
                </div>
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

export default ShowSession;
