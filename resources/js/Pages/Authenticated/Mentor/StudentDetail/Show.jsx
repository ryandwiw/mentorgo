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
                    href={route('mentor.students.index')}
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
                                    <a
                                        href={`https://wa.me/62${mentordetail.phone.replace(/^0/, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        {mentordetail.phone}
                                    </a>
                                </div>
                            )}


                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                                <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                                <span>{mentordetail.location || 'Tidak diketahui'}</span>
                            </div>


                            {mentordetail.bio && (
                                <div className="my-6">
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



                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
