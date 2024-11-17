import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const GoogleMeetForm = ({ sessionId }) => {
    const { data, setData, post, processing, errors } = useForm({
        google_meet_link: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [isEditable, setIsEditable] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mentor.sessions.online.google-meet.store', sessionId), {
            onSuccess: () => {
                setSuccessMessage('Link Google Meet berhasil disimpan!');
                setIsEditable(false);
                setIsFormVisible(false);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            },
            onError: () => {
                setSuccessMessage('Gagal menyimpan link Google Meet.');
            },
        });
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
        if (isFormVisible) {
            setSuccessMessage('');
        } else {
            setData({ google_meet_link: '' });
            setIsEditable(true);
        }
    };

    return (
        <div className="">
            <button
                onClick={toggleFormVisibility}
                className="text-blue-600 font-semibold hover:underline mb-4"
            >
                {isFormVisible ? "Batal" : "Update Link Google Meet"}
            </button>

            {isFormVisible && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="google_meet_link" className="block text-gray-700 font-medium mb-2">Link Google Meet</label>
                        <input
                            type="url"
                            id="google_meet_link"
                            value={data.google_meet_link}
                            onChange={(e) => setData('google_meet_link', e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={!isEditable}
                        />
                        {errors.google_meet_link && <div className="text-red-500 text-sm mt-1">{errors.google_meet_link}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing || !isEditable}
                        className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${processing || !isEditable ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                        Simpan Link
                    </button>
                </form>
            )}
            {successMessage && (
                <div className="mt-4 text-green-600 font-semibold">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default GoogleMeetForm;
