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
            <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Subjects</h2>
                        <Link
                            href={route('subjects.create')}
                            className="text-blue-500 hover:text-blue-600 transition duration-200"
                        >
                            Create Subject
                        </Link>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Matkul</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {subjects.map(subject => (
                                <tr key={subject.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{subject.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{subject.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {subject.profile_matkul ? (
                                            <img
                                                src={`/storage/${subject.profile_matkul}`}
                                                alt="Profile Matkul"
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        ) : (
                                            <p>No image uploaded</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link href={`subjects/${subject.id}/edit`} className="text-blue-500 hover:text-blue-600">Edit</Link>
                                        <Link href={`subjects/${subject.id}`} className="text-blue-500 hover:text-blue-600 ml-3">Lihat</Link>
                                        <button onClick={() => confirmDelete(subject.id)} className="text-red-500 hover:text-red-600 ml-4">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </AuthLayout>
    );
};

export default Index;
