// resources/js/Pages/Admin/Dashboard.js
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import React from 'react';

const Dashboard = ({ mentors, students, bookings, payments, ratings }) => {
    const renderTable = (data, columns, noDataMessage) => {
        if (data.length === 0) {
            return <tr><td colSpan={columns.length} className="border border-gray-300 text-center py-4">{noDataMessage}</td></tr>;
        }

        return data.map(item => (
            <tr key={item.id}>
                {columns.map((col, index) => (
                    <td key={index} className="border border-gray-300">{item[col]}</td>
                ))}
            </tr>
        ));
    };

    return (
        <AuthLayout>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-center mb-2 text-gray-600">Admin Dashboard</h1>
                <p className="text-center text-lg text-gray-500 mb-6">
                    platform for educational mentoring, connecting you with experienced mentors to guide your learning journey.
                </p>

                <Section title="Mentors">
                    <table className="min-w-full border-collapse border border-gray-200 mb-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-300">Name</th>
                                <th className="border border-gray-300">Email</th>
                                <th className="border border-gray-300">Rating</th>
                                <th className="border border-gray-300">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTable(mentors, ['name', 'email', 'rating', 'location'], 'No mentors available')}
                        </tbody>
                    </table>
                </Section>

                <Section title="Students">
                    <table className="min-w-full border-collapse border border-gray-200 mb-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-300">Name</th>
                                <th className="border border-gray-300">Email</th>
                                <th className="border border-gray-300">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTable(students, ['name', 'email', 'location'], 'No students available')}
                        </tbody>
                    </table>
                </Section>

                <Section title="Bookings">
                    <table className="min-w-full border-collapse border border-gray-200 mb-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-300">Student</th>
                                <th className="border border-gray-300">Mentoring Session</th>
                                <th className="border border-gray-300">Status</th>
                                <th className="border border-gray-300">Booking Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTable(bookings, ['student.name', 'mentoringSession.title', 'status', 'booking_time'], 'No bookings available')}
                        </tbody>
                    </table>
                </Section>

                <Section title="Payments">
                    <table className="min-w-full border-collapse border border-gray-200 mb-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-300">Booking</th>
                                <th className="border border-gray-300">Amount</th>
                                <th className="border border-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTable(payments, ['booking.id', 'amount', 'status'], 'No payments available')}
                        </tbody>
                    </table>
                </Section>

                <Section title="Ratings">
                    <table className="min-w-full border-collapse border border-gray-200 mb-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-300">Student</th>
                                <th className="border border-gray-300">Mentor</th>
                                <th className="border border-gray-300">Rating</th>
                                <th className="border border-gray-300">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTable(ratings, ['student.name', 'mentor.name', 'rating', 'comment'], 'No ratings available')}
                        </tbody>
                    </table>
                </Section>
            </div>
        </AuthLayout>
    );
};

const Section = ({ title, children }) => (
    <div className="mb-6 bg-white p-2 rounded-lg shadow-lg">
        <h2 className="mt-4 text-xl font-semibold">{title}</h2>
        {children}
    </ div>
);

export default Dashboard;
