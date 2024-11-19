import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Link, useForm } from '@inertiajs/react';
import StarRatingShow from '@/Components/Auth/Fragments/StarRatingShow';
import { FaUniversity } from 'react-icons/fa';

import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';

const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const OfflineShow = ({ sessionOffline, mentorLocation, studentLocation , average_rating}) => {
    const mentorPosition = [mentorLocation.latitude, mentorLocation.longitude];
    const studentPosition = [studentLocation.latitude, studentLocation.longitude];

    useEffect(() => {
        const map = L.map('map').setView(studentPosition, 18);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const mentorMarker = L.marker(mentorPosition, { icon: customIcon, draggable: false }).addTo(map)
            .bindPopup(`
            <div class="flex flex-col items-center">
                <div class="text-base font-bold">Lokasi Mentor</div>
                <div class="border-b border-gray-100 w-full my-1"></div>
                <div class="flex flex-col items-center mt-2">
                    <img src="${mentorLocation.profile_picture ? `/storage/${mentorLocation.profile_picture}` : '/default-avatar.png'}"
                         alt="${mentorLocation.name}'s Profile"
                         class="w-12 h-12 rounded-full object-cover" />
                    <div class="mt-2">
                        <strong>${mentorLocation.name}</strong>
                    </div>
                </div>
            </div>
        `);

        const studentMarker = L.marker(studentPosition, { icon: customIcon, draggable: false }).addTo(map)
            .bindPopup(`
            <div class="flex flex-col items-center">
                <div class="text-base font-bold">Lokasi Saya</div>
                <div class="border-b border-gray-100 w-full my-1"></div>
                <div class="flex flex-col items-center mt-2">
                    <img src="${studentLocation.profile_picture ? `/storage/${studentLocation.profile_picture}` : '/default-avatar.png'}"
                         alt="${studentLocation.name} Profile"
                         class="w-12 h-12 rounded-full object-cover" />
                    <div class="mt-2">
                        <strong>${studentLocation.name}</strong>
                    </div>
                </div>
            </div>
        `);

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(studentPosition[0], studentPosition[1]),
                L.latLng(mentorPosition[0], mentorPosition[1]),
            ],
            routeWhileDragging: false,
            draggableWaypoints: false,
            createMarker: () => null,
        }).addTo(map);

        map.setView(studentPosition, 18);

        const showPopups = () => {
            studentMarker.openPopup();
            map.setView(studentPosition, 17);
            setTimeout(() => {
                mentorMarker.openPopup();
                map.setView(mentorPosition, 18);
                setTimeout(() => {
                    studentMarker.openPopup();
                    map.setView(studentPosition, 14);
                }, 2000);
            }, 2000);
        };

        showPopups();

        return () => {
            map.remove();
        };
    }, [mentorPosition, studentPosition, mentorLocation.name, studentLocation.name]);

    const { post } = useForm();
    const handleCompleteSession = (sessionId) => {
        post(route('sessions.offline.complete', sessionId), {
            onSuccess: () => {
                console.log('Session marked as complete ');
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <AuthLayout>
            <section className='py-8 antialiased dark:bg-gray-900'>
                <div className="mx-auto  bg-white p-8 rounded-lg">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Sesi Offline</h1>
                        <Link
                            href={route('student.session.dashboard')}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            Kembali ke Daftar
                        </Link>
                    </div>
                    {sessionOffline.mentoring_session ? (
                        <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                            <dl className='text-3xl text-center text-black '>
                                <dd className="mt-1 font-bold ">{sessionOffline.mentoring_session.title}</dd>
                            </dl>
                            <dl>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                                    {sessionOffline.mentoring_session.subject?.profile_matkul && (
                                        <img
                                            src={`/storage/${sessionOffline.mentoring_session.subject.profile_matkul}`}
                                            alt={sessionOffline.mentoring_session.subject.name}
                                            className="m-auto clipPath w-full h-64 object-cover"
                                        />
                                    )}
                                </dd>
                            </dl>

                            <Link href={`/student/mentors/${sessionOffline.mentoring_session.mentor.slug}`} className='relative group '>
                                <div className="my-5  border-t border-b py-5">
                                    <h3 className="text-lg font-medium text-gray-600">Informasi Mentor</h3>
                                    <div className="flex items-center mt-4">
                                        <img
                                            src={
                                                sessionOffline.mentoring_session.mentor.profile_picture
                                                    ? `/storage/${sessionOffline.mentoring_session.mentor.profile_picture}`
                                                    : '/default-avatar.png'
                                            }
                                            alt={sessionOffline.mentoring_session.mentor.name}
                                            className="w-16 h-16 rounded-full object-cover mr-4 shadow-sm"
                                        />
                                        <div>
                                            <p className="text-lg font-semibold text-gray-800 capitalize">{sessionOffline.mentoring_session.mentor.name}</p>
                                            <div className="flex items-center text-gray-500 mt-1">
                                                <FaUniversity className="w-5 h-5 text-blue-500 mr-2" />
                                                <p className="text-sm">{sessionOffline.mentoring_session.mentor.asal}</p>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <StarRatingShow rating={sessionOffline.mentoring_session.mentor.average_rating} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="absolute  transform translate-x-3/4 -translate-y-9 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Lihat lebih detail
                                </span>
                            </Link>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Deskripsi</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{sessionOffline.mentoring_session.description}</dd>
                            </dl>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Durasi</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{sessionOffline.mentoring_session.duration} Menit</dd>
                            </dl>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Hubungi Mentor</dt>
                                <dd className="mt-1 text-base font-normal text-blue-500 dark:text-blue-400">
                                    {sessionOffline.mentoring_session.mentor.phone ? (
                                        <a
                                            href={`https://wa.me/${sessionOffline.mentoring_session.mentor.phone.startsWith('0')
                                                ? '62' + sessionOffline.mentoring_session.mentor.phone.slice(1)
                                                : sessionOffline.mentoring_session.mentor.phone}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {sessionOffline.mentoring_session.mentor.phone.startsWith('0')
                                                ? '62' + sessionOffline.mentoring_session.mentor.phone.slice(1)
                                                : sessionOffline.mentoring_session.mentor.phone}
                                        </a>
                                    ) : (
                                        'Belum ada link'
                                    )}
                                </dd>
                            </dl>
                            <div className="h-[500px] w-full" id="map"></div>


                            <div className="flex justify-center gap-4 sm:flex sm:items-center">
                                <button
                                    onClick={() => handleCompleteSession(sessionOffline.id)}
                                    className="w-auto max-w-xs rounded-lg border border-gray-200 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                >
                                    Complete Session
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading mentoring session data...</p>
                    )}
                </div>
            </section>
        </AuthLayout >
    );
};

export default OfflineShow;
