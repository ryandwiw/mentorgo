import { Link } from "@inertiajs/react";
import React from "react";

const Index = ({ materials }) => {
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Materials</h1>
            <Link
                href={route('materials.create')}
                className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
            >
                Create New Material
            </Link>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Subjects</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map(material => (
                        <tr key={material.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{material.title}</td>
                            <td className="border border-gray-300 px-4 py-2 flex justify-start space-x-2">
                                {material.subjects.map(subject => (
                                    <Link
                                        key={subject.id}
                                        className="inline-block px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        {subject.name}
                                    </Link>
                                ))}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link
                                    href={route('materials.edit', material.id)}
                                    className="text-blue-600 hover:underline mr-2"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route('materials.show', material.id)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Show
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
