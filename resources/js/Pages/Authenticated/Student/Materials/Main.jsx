import AuthLayout from "@/Layouts/AuthenticatedLayout/AuthLayout";
import { Link } from "@inertiajs/react";
import React from "react";

const Main = ({ materials, student }) => {
    return (
        <AuthLayout>
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Materi</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {materials.map(material => (
                        <div key={material.id} className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
                            <h2 className="text-xl font-bold mb-2">{material.title}</h2>
                            <div className="mb-4 flex flex-wrap">
                                {material.subjects.map(subject => (
                                    <Link
                                        key={subject.id}
                                        className="inline-block mr-2 mb-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        {subject.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="flex space-x-2">
                                <Link
                                    href={route('student.materials.show', material.id)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Lihat Lebih Detail
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthLayout>
    );
};

export default Main;
