import StarRatingShow from '@/Components/Auth/Fragments/StarRatingShow';
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Link, useForm } from '@inertiajs/react';
import React from 'react';
import { FaUniversity } from 'react-icons/fa';

const Online = ({ sessionOnline, averageRating }) => {
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
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Sesi Online</h1>
                        <Link
                            href={route('student.session.dashboard')}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            Kembali ke Daftar
                        </Link>
                    </div>
                    {sessionOnline.mentoring_session ? (
                        <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                            <dl className='text-3xl text-center text-black '>
                                <dd className="mt-1 font-bold ">{sessionOnline.mentoring_session.title}</dd>
                            </dl>
                            <dl>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                                    {sessionOnline.mentoring_session.subject?.profile_matkul && (
                                        <img
                                            src={`/storage/${sessionOnline.mentoring_session.subject.profile_matkul}`}
                                            alt={sessionOnline.mentoring_session.subject.name}
                                            className="m-auto clipPath w-full h-64 object-cover"
                                        />
                                    )}
                                </dd>
                            </dl>

                            <Link href={`/student/mentors/${sessionOnline.mentoring_session.mentor.slug}`} className='relative group '>
                                <div className="my-5  border-t border-b py-5">
                                    <h3 className="text-lg font-medium text-gray-600">Informasi Mentor</h3>
                                    <div className="flex items-center mt-4">
                                        <img
                                            src={
                                                sessionOnline.mentoring_session.mentor.profile_picture
                                                    ? `/storage/${sessionOnline.mentoring_session.mentor.profile_picture}`
                                                    : '/default-avatar.png'
                                            }
                                            alt={sessionOnline.mentoring_session.mentor.name}
                                            className="w-16 h-16 rounded-full object-cover mr-4 shadow-sm"
                                        />
                                        <div>
                                            <p className="text-lg font-semibold text-gray-800 capitalize">{sessionOnline.mentoring_session.mentor.name}</p>
                                            <div className="flex items-center text-gray-500 mt-1">
                                                <FaUniversity className="w-5 h-5 text-blue-500 mr-2" />
                                                <p className="text-sm">{sessionOnline.mentoring_session.mentor.asal}</p>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <StarRatingShow rating={sessionOnline.mentoring_session.mentor.average_rating} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="absolute  transform translate-x-3/4 -translate-y-9 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Lihat lebih detail
                                </span>
                            </Link>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Deskripsi</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{sessionOnline.mentoring_session.description}</dd>
                            </dl>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Durasi</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{sessionOnline.mentoring_session.duration} Menit</dd>
                            </dl>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Google Meet Link</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                                    {sessionOnline.google_meet_link ? (
                                        <a
                                            href={sessionOnline.google_meet_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-green-500"
                                        >
                                            {sessionOnline.google_meet_link}
                                        </a>
                                    ) : (
                                        'Belum ada link'
                                    )}
                                </dd>
                            </dl>
                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Hubungi Mentor</dt>
                                <dd className="mt-1 text-base font-normal text-blue-500 dark:text-blue-400">
                                    {sessionOnline.mentoring_session.mentor.phone ? (
                                        <a
                                            href={`https://wa.me/${sessionOnline.mentoring_session.mentor.phone.startsWith('0')
                                                ? '62' + sessionOnline.mentoring_session.mentor.phone.slice(1)
                                                : sessionOnline.mentoring_session.mentor.phone}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {sessionOnline.mentoring_session.mentor.phone.startsWith('0')
                                                ? '62' + sessionOnline.mentoring_session.mentor.phone.slice(1)
                                                : sessionOnline.mentoring_session.mentor.phone}
                                        </a>
                                    ) : (
                                        'Belum ada link'
                                    )}
                                </dd>
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
