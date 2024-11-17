import AuthLayout from "@/Layouts/AuthenticatedLayout/AuthLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import StarRatingShow from '@/Components/Auth/Fragments/StarRatingShow';
import { BiArrowBack } from "react-icons/bi";

export default function Index({ mentordetails }) {
    return (
        <AuthLayout>
            <Link
                href={route('mentor.dashboard')}
                className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6"
            >
                <BiArrowBack className="w-5 h-5 mr-2" />
                Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold mb-4 text-center">Daftar Student</h1>
            <hr className=" border-gray-200 border-t py-3 bg-gray-50"/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mentor-list">
                {mentordetails.map((mentor) => (
                    <div key={mentor.id} className="mentor-card bg-white shadow-lg rounded-lg flex flex-col">
                        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>

                        <div className="p-4 relative px-6">
                            <img
                                className="relative -top-16 w-24 h-24 rounded-full border-4 border-yellow-200 dark:border-gray-800 object-cover  mx-auto"
                                src={
                                    mentor.profile_picture
                                        ? `/storage/${mentor.profile_picture}`
                                        : '/default-avatar.png'
                                }
                                alt={mentor.name}
                            />

                            <div className="text-center mb-2 mt-[-40px]">
                                <h3 className="text-xl font-semibold">{mentor.name}</h3>
                                <p className="text-gray-600">{mentor.asal || 'Tidak diketahui'}</p>
                            </div>

                            {/* Wrapper untuk StarRatingShow */}
                            <div className="flex justify-center mb-2">
                                <StarRatingShow rating={mentor.average_rating} className="w-5 h-8 text-xl" />
                            </div>

                            <div className="my-2 text-center flex-grow">
                                {mentor.subjects && mentor.subjects.length > 0 && (
                                    <div className="mt-2">
                                        <h4 className="font-medium">Bidang Keahlian</h4>
                                        <div className="flex flex-wrap gap-1 justify-center">
                                            {mentor.subjects.map(subject => (
                                                <span
                                                    key={subject.id}
                                                    className="inline-flex items-center justify-center text-xs text-white bg-green-400 hover:bg-green-500 font-medium rounded-lg px-2 py-1 capitalize"
                                                >
                                                    {subject.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Link href={` /students/${mentor.slug}`} className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-lg text-center text-white p-2">
                            Lihat Lebih Rinci
                        </Link>
                    </div>
                ))}
            </div>
        </AuthLayout>
    );
}
