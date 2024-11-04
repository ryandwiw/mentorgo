import { Link, useForm } from '@inertiajs/react';
import React from 'react';

export default function SessionCard({ session, hasActiveBooking, onOpenModal, isProfileComplete}) {

    const { post, processing, reset, errors } = useForm({
        mentoring_session_id: session.id,
        total_price: session.price,
    });

    const handleBooking = (e) => {
        e.preventDefault();
        if (!isProfileComplete) {
            onOpenModal(session);
        } else {
            post(route('student.sessions.bookings.store', session.id), {
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    const handleBookingShow = (e) => {
        e.preventDefault();
        if (!isProfileComplete) {
            onOpenModal(session);
        } else {
            const sessionUrl = route('student.session.show', session.id);
            window.location.href = sessionUrl;
        }
    };

    return (
        <div className="bg-white border-t border-gray-300 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
            <p className="text-gray-600 mb-4">{session.description}</p>

            <div className="space-y-1 mb-4 border-t border-gray-200 pt-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-600">Type</h3>
                    <p className="text-gray-900 capitalize font-bold">
                        {session.session_type}
                        {session.session_type === 'offline' && ` (${session.location})`}
                    </p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-600">Duration</h3>
                    <p className="text-gray-900 font-bold">{session.duration} minutes</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-600">Slot Tersedia</h3>
                    <p className="text-gray-900 font-semibold text-lg">{session.student_limit - session.current_participants} orang</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-600">Price</h3>
                    <p className="text-gray-900 font-semibold text-lg">Rp {session.price.toLocaleString()}</p>
                </div>
            </div>

            <div className="flex justify-start space-x-3 mb-4">
                <Link
                    onClick={handleBookingShow}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Lihat Detail
                </Link>

                {!hasActiveBooking ? (
                    <button
                        onClick={handleBooking}
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        disabled={processing}
                    >
                        {processing ? 'Booking...' : 'Book Now'}
                    </button>
                ) : null}
            </div>

            {hasActiveBooking && (
                <p className="text-red-500 font-bold text-sm border-t border-gray-300 pt-3">
                    Anda telah memesan sesi, mohon untuk menyelesaikan atau mencancel sesi tersebut.
                </p>
            )}
        </div>
    );
}
