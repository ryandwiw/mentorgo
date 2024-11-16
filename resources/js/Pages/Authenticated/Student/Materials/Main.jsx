import AuthLayout from "@/Layouts/AuthenticatedLayout/AuthLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaBookOpen } from 'react-icons/fa'; // Import icon from react-icons

const Main = ({ materials, student }) => {
    return (
        <AuthLayout>
            <Link
                href={route('student.dashboard')}
                className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6"
            >
                <BiArrowBack className="w-5 h-5 mr-2" />
                Kembali
            </Link>
            <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold mb-8 text-center text-blue-600">Materi Pembelajaran</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {materials.map(material => (
                        <div key={material.id} className="bg-gray-50 border border-gray-300 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 group">
                            <div className="flex items-center mb-4">
                                <FaBookOpen className="text-blue-500 text-4xl mr-3" />
                                <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-green-400 transition duration-200">{material.title}</h2>
                            </div>
                            <div className="mb-4 flex flex-wrap">
                                {material.subjects.map(subject => (
                                    <div key={subject.id} className="mb-4 w-full">
                                        {subject.profile_matkul ? (
                                            <img
                                                src={`/storage/${subject.profile_matkul}`}
                                                alt="Profile Matkul"
                                                className="m-auto clipPath w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-600 italic">No image uploaded</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center">
                                <Link
                                    href={route('student.materials.show', material.id)}
                                    className="text-blue-600 hover:text-green-400 font-semibold transition duration-200"
                                >
                                    Lihat Lebih Detail
                                </Link>
                                <span className="text-gray-500 text-sm">{material.subjects.length} Subjek</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthLayout>
    );
};

export default Main;
