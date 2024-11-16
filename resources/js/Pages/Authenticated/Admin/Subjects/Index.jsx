import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Link, useForm } from '@inertiajs/react';
import React from 'react';

const Index = ({ subjects }) => {
    const { delete: deleteSubject } = useForm();

    const confirmDelete = (id) => {
        if (confirm("Are you sure you want to delete this subject?")) {
            deleteSubject(route('subjects.destroy', id));
        }
    };

    return (
        <AuthLayout>
            <section className="bg-gray-50 dark:bg-gray-900 py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Subjects</h2>
                        <Link
                            href={route('subjects.create')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Create Subject
                        </Link>
                    </div>
                    <div className="overflow-hidden bg-white shadow rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Matkul</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                {subjects.map(subject => (
                                    <tr key={subject.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{subject.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{subject.description}</td>
                                        <td className="px-6 py-4">
                                            {subject.profile_matkul ? (
                                                <img
                                                    src={`/storage/${subject.profile_matkul}`}
                                                    alt="Profile Matkul"
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <p className="text-gray-500">No image uploaded</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-4">
                                                <Link href={`subjects/${subject.id}/edit`} className="text-blue-500 hover:text-blue-600">Edit</Link>
                                                <Link href={`subjects/${subject.id}`} className="text-blue-500 hover:text-blue-600">View</Link>
                                                <button onClick={() => confirmDelete(subject.id)} className="text-red-500 hover:text-red-600">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </AuthLayout>
    );
};

export default Index;
