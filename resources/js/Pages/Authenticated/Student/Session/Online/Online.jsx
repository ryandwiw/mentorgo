import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { useForm } from '@inertiajs/react';
import React from 'react';

const Online = ({ sessionOnline }) => {
    const { post } = useForm();

    const handleCompleteSession = (sessionId) => {
        post(route('sessions.online.complete', sessionId), {
            onSuccess: () => {
                console.log('Session marked as complete');
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <AuthLayout>
            <section className='py-8 antialiased dark:bg-gray-900 md:py-16'>
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sesi Online</h1>
                    {sessionOnline.mentoring_session ? (
                        <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Session Information</h4>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Mentoring Session</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{sessionOnline.mentoring_session.title}</dd>
                            </dl>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Deskripsi</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{sessionOnline.mentoring_session.description}</dd>
                            </dl>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Google Meet Link</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{sessionOnline.google_meet_link || 'Belum ada link'}</dd>
                            </dl>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Hubungi Mentor</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{sessionOnline.google_meet_link || 'Belum ada link'}</dd>
                            </dl>

                            <div className="flex justify-center gap-4 sm:flex sm:items-center">
                                <button
                                    onClick={() => handleCompleteSession(sessionOnline.id)}
                                    className="w-auto max-w-xs rounded-lg border border-gray-200 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                >
                                    Complete Session
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading mentoring session data...</p>
                    )}
                </div>
            </section>
        </AuthLayout>
    );
};

export default Online;
