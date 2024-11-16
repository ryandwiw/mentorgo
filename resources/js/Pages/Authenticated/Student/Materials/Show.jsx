import AuthLayout from "@/Layouts/AuthenticatedLayout/AuthLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const Show = ({ material }) => {
    return (
        <AuthLayout>
            <Link
                href={route('student.materials.index')}
                className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6"
            >
                <BiArrowBack className="w-5 h-5 mr-2" />
                Kembali
            </Link>
            <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">{material.title}</h1>
                <div className="mb-6">
                    {material.subjects && material.subjects.length > 0 ? (
                        material.subjects.map(subject => (
                            <div key={subject.id} className="mb-6">
                                {subject.profile_matkul ? (
                                    <img
                                        src={`/storage/${subject.profile_matkul}`}
                                        alt="Profile Matkul"
                                        className="mt-1 w-full h-64 object-cover rounded-lg shadow-md "
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-600 italic">No image uploaded</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No subjects available.</p>
                    )}
                </div>

                <div className="mb-6">
                    <p className="text-lg text-gray-700 leading-relaxed">{material.content}</p>
                </div>

                <div className="mb-4 border-t border-gray-200 pt-4">
                    <p className="font-semibold text-lg mb-2">{material.format}</p>
                    {material.file && (
                        <p className="font-medium mb-2">
                            <strong>File:</strong> <a href={material.file} className="text-blue-600 hover:underline">Download File</a>
                        </p>
                    )}
                    {material.link && (
                        <p className="font-medium mb-2">
                            <strong>Link:</strong> <a href={material.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{material.link}</a>
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <p className="font-semibold text-md mb-2">Tag:</p>
                    <ul className="mb-4">
                        {material.subjects.map(subject => (
                            <button key={subject.id} className="bg-green-300 rounded-lg p-3 text-sm">{subject.name}</button>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Show;
