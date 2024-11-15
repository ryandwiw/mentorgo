import React from 'react';
import { Head } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';

const MentorRatingsIndex = ({ ratings }) => {
    return (
        <AuthLayout>
            <div className="container mx-auto p-4">
                <Head title="Daftar Review yang Diterima" />
                <h1 className="text-2xl font-bold mb-4">Daftar Review yang Diterima</h1>

                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border-b p-4 text-left text-gray-600">ID Booking</th>
                            <th className="border-b p-4 text-left text-gray-600">Siswa</th>
                            <th className="border-b p-4 text-left text-gray-600">Rating</th>
                            <th className="border-b p-4 text-left text-gray-600">Komentar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ratings.length === 0 ? (
                            <tr>
                                <td colSpan="4" classname="border-b p-4 text-center text-gray-500">Belum ada review yang diterima.</td>
                            </tr>
                        ) : (
                            ratings.map(rating => (
                                <tr key={rating.id} className="hover:bg-gray-100 transition-colors">
                                    <td className="border-b p-4">{rating.booking.id}</td>
                                    <td className="border-b p-4">{rating.student.name}</td>
                                    <td className="border-b p-4">{rating.rating}</td>
                                    <td className="border-b p-4">{rating.comment}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AuthLayout>
    );
};

export default MentorRatingsIndex;
