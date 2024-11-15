import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Link } from '@inertiajs/react';
import React from 'react';

const Show = ({ subject }) => {
    return (
        <AuthLayout>
            <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Subject Details</h2>
                        <Link
                            href={route('subjects.index')}
                            className="text-blue-500 hover:text-blue-600 transition duration-200"
                        >
                            Kembali ke Daftar
                        </Link>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Name</h3>
                        <p className="mt-1 text-gray-600">{subject.name}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Description</h3>
                        <p className="mt-1 text-gray-600">{subject.description}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Profile Matkul</h3>
                        {subject.profile_matkul ? (
                            <img
                                src={`/storage/${subject.profile_matkul}`}
                                alt="Profile Matkul"
                                className="mt-1 w-full h-auto rounded-md"
                            />
                        ) : (
                            <p className="mt-1 text-gray-600">No image uploaded</p>
                        )}
                    </div>
                </div>
            </section>
        </AuthLayout>
    );
};

export default Show;
