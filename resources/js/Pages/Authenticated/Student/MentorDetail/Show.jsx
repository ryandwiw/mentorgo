// resources/js/Pages/mentors/Show.jsx
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Link } from '@inertiajs/react';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import StarRatingShow from '@/Components/Auth/Fragments/StarRatingShow';
import { MdPhone } from 'react-icons/md';
import { RiUserLocationFill } from "react-icons/ri";

export default function MentorShow({ mentordetail, ratings }) {
    return (
        <AuthLayout>
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <Link
                    href={route('student.mentors.index')}
                    className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6"
                >
                    <BiArrowBack className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">

                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>


                    <div className="relative px-6 ">

                        <div className="relative -top-16 left-6">
                            <img
                                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                                src={
                                    mentordetail.profile_picture
                                        ? `/storage/${mentordetail.profile_picture}`
                                        : '/default-avatar.png'
                                }
                                alt={mentordetail.name}
                            />
                        </div>

                        <div className="mt-[-32px]">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {mentordetail.name}
                            </h1>

                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                                <RiUserLocationFill className="w-5 h-5 mr-2" />
                                <span>{mentordetail.asal}</span>
                            </div>

                            {mentordetail.phone && (
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                                    <MdPhone className="w-5 h-5 mr-2" />
                                    <span>{mentordetail.phone}</span>
                                </div>
                            )}

                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                                <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                                <span>{mentordetail.location || 'Tidak diketahui'}</span>
                            </div>


                            {mentordetail.bio && (
                                <div className="mt-6">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        About Me
                                    </h2>
                                    <div className=" dark:bg-gray-700 rounded-lg ">
                                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                            {mentordetail.bio}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {mentordetail.subjects && mentordetail.subjects.length > 0 && (
                                <div className="mt-2">
                                    <h4 className="text-lg font-semibold mb-1">Bidang Keahlian</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {mentordetail.subjects.map(subject => (
                                            <span
                                                key={subject.id}
                                                className="inline-flex items-center justify-center text-sm text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg px-2 py-1 capitalize"
                                            >
                                                {subject.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <section className="mt-6">
                                <div className=''>

                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Reviews
                                    </h2>
                                    <div className="flex items-center gap-2 ">
                                        <StarRatingShow rating={mentordetail.average_rating} className="text-xl w-5 h-5" />
                                        <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400 mx-2">
                                            ({parseFloat(mentordetail.average_rating).toFixed(2)})
                                        </p>
                                        <span className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                                            {ratings.length} Reviews
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                                    {ratings.length === 0 ? (
                                        <p className="py-4 text-gray-500 dark:text-gray-400">Belum ada review yang diterima.</p>
                                    ) : (
                                        ratings.map((rating) => (
                                            <div key={rating.id} className="gap-3 py-6 sm:flex sm:items-start">
                                                <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                                                    <div className="flex items-center gap-0.5">
                                                        <StarRatingShow rating={rating.rating} className="text-lg" />
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <p className="text-base font-semibold text-gray-900 dark:text-white">{rating.student.name}</p>
                                                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                            {new Date(rating.created_at).toLocaleString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: false
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                                                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">{rating.comment}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
