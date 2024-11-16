import AuthLayout from "@/Layouts/AuthenticatedLayout/AuthLayout";
import { Link } from "@inertiajs/react";
import React from "react";

const Index = ({ materials }) => {
    return (
        <AuthLayout>
            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Materials</h1>
                <Link
                    href={route('materials.create')}
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 mb-6"
                >
                    Create New Material
                </Link>
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {materials.map(material => (
                                <tr key={material.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            {material.subjects.map(subject => (
                                                <Link
                                                    key={subject.id}
                                                    href={route('subjects.show', subject.id)}
                                                    className="inline-block px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                                                >
                                                    {subject.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                        <Link
                                            href={route('materials.edit', material.id)}
                                            className="text-blue-600 hover:underline mr-4"
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
            </div>
        </AuthLayout>
    );
};

export default Index;
