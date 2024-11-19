import AuthLayout from "@/Layouts/AuthenticatedLayout/AuthLayout";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

const MentorChat = ({ mentorId, studentId }) => {
    const { chats } = usePage().props; // Assuming `refreshChats` is a function to fetch chats
    const { data, setData, post } = useForm({
        mentor_id: mentorId || '',
        student_id: studentId,
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/mentor/chat', data, {
            onSuccess: () => {
                setData('message', '');
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // Logic to refresh chat messages can go here
            // For example, you could call an API to fetch the latest chats
            console.log("Refreshing chats...");
            // You might want to implement a function to fetch chats here
        }, 5000); // Refresh every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);


    return (
        <AuthLayout>
            <div>
                <h1>Chat with Student</h1>
                <div style={{ border: '1px solid #ccc', height: '400px', overflowY: 'scroll', padding: '10px' }}>
                    {Array.isArray(chats) && chats.length > 0 ? (
                        chats.map(chat => (
                            <div key={chat.id} className={chat.mentor_id === mentorId ? 'text-right' : 'text-left'}>
                                <strong>{chat.mentor_id === mentorId ? 'Student' : chat.student.name}:</strong>
                                <p>{chat.message}</p>
                            </div>
                        ))
                    ) : (
                        <p>No messages yet.</p>
                    )}
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '10px' }}>
                    <input
                        type="text"
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        placeholder="Type your message..."
                        required
                        style={{ flex: 1, marginRight: '10px' }}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default MentorChat;
