
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        profile_matkul: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('subjects.store'));
    };

    return (
        <AuthLayout>
            <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Create Subject</h2>
                        <Link
                            href={route('subjects.index')}
                            className="text-blue-500 hover:text-blue-600 transition duration-200"
                        >
                            Kembali ke Daftar
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.name && <div className="text-red-500 mt-1 text-sm">{errors.name}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Foto Matkul</label>
                            <input
                                type="file"
                                onChange={e => setData('profile_matkul', e.target.files[0])}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.profile_matkul && <div className="text-red-500 mt-1 text-sm">{errors.profile_matkul}</div>}
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-auto max-w-xs rounded-lg border border-gray-200 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {processing ? 'Processing ...' : 'Create Subject'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </AuthLayout>
    );
};

export default Create;
