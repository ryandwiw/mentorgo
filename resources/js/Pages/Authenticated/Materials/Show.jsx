import AuthLayout from "@/Layouts/AuthenticatedLayout/AuthLayout";
import { Link } from "@inertiajs/react";
import React from "react";

const Show = ({ material }) => {
    return (
        <AuthLayout>
            <div className="mx-auto p-8 bg-white rounded-lg shadow-lg max-w-4xl">
                <h1 className="text-5xl font-bold mb-6 text-center text-gray-800">{material.title}</h1>
                <div className="mb-6">
                    {material.subjects && material.subjects.length > 0 ? (
                        material.subjects.map(subject => (
                            <div key={subject.id} className="mb-6">
                                {subject.profile_matkul ? (
                                    <img
                                        src={`/storage/${subject.profile_matkul}`}
                                        alt="Profile Matkul"
                                        className="mt-1 w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
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

                <div className="mb-6 border-t border-gray-200 pt-4">
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
