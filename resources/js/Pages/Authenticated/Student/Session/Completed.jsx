import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

const CompleteSession = ({ sessionId }) => {
    const { post } = useForm();

    const handleComplete = () => {
        post(`/sessions/${sessionId}/complete`);
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Complete the Session</h1>
            <p>Are you sure you want to mark this session as completed?</p>
            <button
                onClick={handleComplete}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
                Complete Session
            </button>
        </div>
    );
};

export default CompleteSession;
