import { Link, useForm } from '@inertiajs/react';
import React from 'react';
import StarRatingShow from '@/Components/Auth/Fragments/StarRatingShow';

export default function SessionCard({ session, hasActiveBooking, hasCanceledBooking, onOpenModal, isProfileComplete, totalClassesCreated, average_rating }) {
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
        <div id="courses">
            <div className='bg-white m-3 p-4 shadow-courses rounded-2xl max-w-sm mx-auto transition-transform transform hover:scale-105'>
                <div className="relative rounded-3xl">
                    {session.subject && session.subject.profile_matkul && (
                        <img
                            className="m-auto clipPath w-full h-44 object-cover transition-opacity duration-300 hover:opacity-80"
                            src={session.subject?.profile_matkul ? `/storage/${session.subject.profile_matkul}` : '/default-image.png'}
                            alt={session.subject?.name || 'Default Image'}
                        />
                    )}
                    {!(hasCanceledBooking || hasActiveBooking) && (
                        <div className="absolute right-5 -bottom-2 bg-ultramarine rounded-full p-6 transition-transform duration-300 hover:scale-110">
                            <button
                                onClick={handleBooking}
                                className="text-white uppercase text-center text-sm font-medium block transition-colors duration-300 hover:text-gray-200"
                                disabled={processing}
                            >
                                {processing ? ('Booking...') : (<>Ikuti <br /> Kelas</>)}
                            </button>
                        </div>
                    )}
                </div>

                <div className="px-2">
                    <div className='flex justify-between items-end '>
                        <div className="flex">
                            <h4 className='text-2xl font-bold pt-6 text-black'>{session.title}</h4>
                        </div>
                    </div>

                    <Link href={`/student/mentors/${session.mentor.slug}`} className='hover:opacity-80'>
                        <div className="flex items-center my-4 transition-transform duration-300 hover:scale-105">
                            <img
                                src={
                                    session.mentor.profile_picture
                                        ? `/storage/${session.mentor.profile_picture}`
                                        : '/default-avatar.png'
                                }
                                alt={session.mentor.name}
                                className="w-12 h-12 rounded-full object-cover mr-4 shadow-sm"
                            />
                            <div className='text-sm'>
                                <h3 className='font-bold opacity-75 '>
                                    {session.mentor.name}
                                </h3>
                                <h3 className='font-normal opacity-75'>{session.mentor.asal}</h3>
                            </div>
                        </div>
                    </Link>

                    <div className='text-gray-900 capitalize py-2'>
                        <div className="flex justify-between items-center">
                            <p className="font-bold">
                                {session.session_type}
                            </p>
                            <p className="text-gray-900 font-bold">{session.duration} menit</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-6">
                        <div className="flex gap-4">
                            <h3 className="text-red text-22xl font-medium">
                                {session.mentor.average_rating ? parseFloat(session.mentor.average_rating).toFixed(1) : '0'}
                            </h3>
                            <div className="flex">
                                <StarRatingShow rating={session.mentor.average_rating} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium">Rp {session.price.toLocaleString().replace(/,/g, '.')}</h3>
                        </div>
                    </div>

                    <hr style={{ color: "#C4C4C4" }} />

                    <div className="flex justify-between pt-6">
                        <div className="flex gap-4">
                            <img src={'/assets/courses/book-open.svg'} alt="kelas" width={24} height={24} className="inline-block m-auto" />
                            <Link
                                onClick={handleBookingShow}
                                className="text-base font-medium text-black opacity-75 transition-colors duration-300 hover:text-blue-600"
                            >
                                Lihat Detail
                            </Link>
                        </div>
                        <div className="flex gap-4">
                            <img src={'/assets/courses/users.svg'} alt="siswa" width={24} height={24} className="inline-block m-auto" />
                            <h3 className="text-base font-medium text-black opacity-75">{session.student_limit - session.current_participants} Siswa</h3>
                        </div>
                    </div>

                    {hasCanceledBooking ? (
                        <p className="text-red-500 font-bold text-sm pt-3">
                            Anda telah membatalkan sesi ini. Anda tidak dapat memesan sesi ini lagi.
                        </p>
                    ) : hasActiveBooking ? (
                        <p className="text-red-500 font-bold text-sm pt-3">
                            Anda telah memesan salah satu sesi, mohon untuk menyelesaikan atau membatalkan sesi tersebut.
                        </p>
                    ) : null}

                    {errors && (
                        <div className="text-red-500 font-semibold">
                            {Object.keys(errors).map((key, index) => (
                                <p key={index}>{errors[key]}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
