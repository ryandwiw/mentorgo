import AuthLayout from "@/Layouts/AuthenticatedLayout/AuthLayout";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

const StudentChat = ({ mentorId, studentId }) => {
    const { chats } = usePage().props; // Assuming `chats` is passed as props
    const { data, setData, post } = useForm({
        mentor_id: mentorId,
        student_id: studentId || '', // Ensure studentId is defined
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/student/chat', data, {
            onSuccess: () => {
                setData('message', ''); // Reset message input
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // Logic to refresh chat messages can go here
            console.log("Refreshing chats...");
            // You might want to implement a function to fetch chats here
        }, 5000); // Refresh every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <AuthLayout>
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Chat with Mentor</h1>
                <div className="border border-gray-300 rounded-lg h-96 overflow-y-scroll p-4 bg-gray-50">
                    {Array.isArray(chats) && chats.length > 0 ? (
                        chats.map(chat => (
                            <div key={chat.id} className={`mb-2 ${chat.student_id === studentId ? 'text-right' : 'text-left'}`}>
                                <strong className={`${chat.student_id === studentId ? 'text-blue-600' : 'text-green-600'}`}>
                                    {chat.student_id === studentId ? 'You' : chat.mentor.name}:
                                </strong>
                                <p className="inline-block bg-white rounded-lg px-3 py-1 shadow-sm">
                                    {chat.message}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No messages yet.</p>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="mt-4 flex">
                    <input
                        type="text"
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        placeholder="Type your message..."
                        required
                        className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button type="submit" className="ml-2 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition">
                        Send
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default StudentChat;
