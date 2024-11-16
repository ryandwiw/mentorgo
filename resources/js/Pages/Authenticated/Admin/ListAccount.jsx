// resources/js/Pages/Admin/ListAccount.jsx
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import React from 'react';

const ListAccount = ({ mentors, students }) => {
    return (
        <AuthLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center">List Account</h1>

                <h2 className="mt-4 text-xl">Mentors</h2>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300">Name</th>
                            <th className="border border-gray-300">Email</th>
                            <th className="border border-gray-300">Rating</th>
                            <th className="border border-gray-300">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mentors.map(mentor => (
                            <tr key={mentor.id}>
                                <td className="border border-gray-300">{mentor.name}</td>
                                <td className="border border-gray-300">{mentor.email}</td>
                                <td className="border border-gray-300">{mentor.rating}</td>
                                <td className="border border-gray-300">{mentor.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2 className="mt-4 text-xl">Students</h2>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300">Name</th>
                            <th className="border border-gray-300">Email</th>
                            <th className="border border-gray-300">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td className="border border-gray-300">{student.name}</td>
                                <td className="border border-gray-300">{student.email}</td>
                                <td className="border border-gray-300">{student.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthLayout>
    );
};

export default ListAccount;
