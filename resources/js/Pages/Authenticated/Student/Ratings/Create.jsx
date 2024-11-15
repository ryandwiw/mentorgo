import StarRating from '@/Components/Auth/Fragments/Rating';
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { useForm } from '@inertiajs/react';
import React from 'react';

const Create = ({ booking, mentoringSession }) => {
    const { data, setData, post, errors } = useForm({
        booking_id: booking.id,
        rating: '',
        comment: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('sessions.rating.store'), data);
    };

    return (
        <AuthLayout>
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 text-center">Beri Rating Sesi</h1>

                {/* Mentor Information Section */}
                <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                    <img
                        src={mentoringSession.mentor.profile_picture ? `/storage/${mentoringSession.mentor.profile_picture}` : '/default-avatar.png'}
                        alt={`${mentoringSession.mentor.name}'s Profile`}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                        <p className="text-gray-600">Mentor</p>
                        <h2 className="text-xl font-semibold">{mentoringSession.mentor.name}</h2>
                    </div>
                </div>

                {/* Rating Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rating Mentor</label>
                        <StarRating rating={data.rating} setRating={(value) => setData('rating', value)} />
                        {errors.rating && <div className="text-red-500 text-sm mt-1">{errors.rating}</div>}
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comments:</label>
                        <textarea
                            id="comment"
                            value={data.comment}
                            onChange={(e) => setData('comment', e.target.value)}
                            rows="4"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-blue-300"
                            placeholder='Tulis komentar Anda di sini...'
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition duration-200">
                        Kirim Rating
                    </button>
                </form>
                {errors.error && <div className="text-red-500 text-sm mt-4">{errors.error}</div>}
            </div>
        </AuthLayout>
    );
};

export default Create;
