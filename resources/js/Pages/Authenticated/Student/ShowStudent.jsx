// resources/js/Pages/Students/Show.jsx
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Link } from '@inertiajs/react';
import { FaMapMarkerAlt, FaEnvelope, FaEdit, FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { RiUserLocationFill } from "react-icons/ri";

export default function StudentShow({ student }) {
    return (
        <AuthLayout>
            <div className="container mx-auto px-4 ">
                <Link
                    href={route('student.dashboard')}
                    className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6"
                >
                    <BiArrowBack className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                    <div className="relative px-6 pb-6">
                        <div className="absolute -top-16 left-6">
                            <img
                                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                                src={
                                    student.profile_picture
                                        ? `/storage/${student.profile_picture}`
                                        : '/default-avatar.png'
                                }
                                alt={student.name}
                            />
                        </div>

                        <div className="text-right mt-4">
                            <Link
                                href={route('student.edit', { slug: student.slug })}
                                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                <FaEdit className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Link>
                        </div>

                        <div className="mt-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {student.name}
                            </h1>

                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                                <MdEmail className="w-5 h-5 mr-2" />
                                <span>{student.email}</span>
                            </div>

                            {student.asal && (
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                                    <RiUserLocationFill className="w-5 h-5 mr-2" />
                                    <span>{student.asal}</span>
                                </div>
                            )}

                            {student.phone && (
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                                    <MdPhone className="w-5 h-5 mr-2" />
                                    <span>{student.phone}</span>
                                </div>
                            )}

                            {student.location && (
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                                    <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                                    <span>{student.location}</span>
                                </div>
                            )}

                            {student.bio && (
                                <div className="mt-6">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        About Me
                                    </h2>
                                    <div className=" bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                            {student.bio}
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
