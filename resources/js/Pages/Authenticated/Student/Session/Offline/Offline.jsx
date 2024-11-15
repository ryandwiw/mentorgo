import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useForm } from '@inertiajs/react';
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

const OfflineShow = ({ sessionOffline, mentorLocation, studentLocation }) => {
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
            <section className='antialiased dark:bg-gray-900'>
                <div className=" bg-white p-8 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{sessionOffline.mentoring_session.title}</h1>
                    <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Session Information</h4>
                        <dl>
                            <dt className="text-base font-medium text-gray-900 dark:text-white">Mentor</dt>
                            <dl className="flex items-center space-x-4">
                                <dt className="flex-shrink-0 mt-3">
                                    <img
                                        src={mentorLocation.profile_picture ? `/storage/${mentorLocation.profile_picture}` : '/default-avatar.png'}
                                        alt={`${mentorLocation.name}'s Profile`}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                                    <strong className="text-base font-medium text-gray-900 dark:text-white">{mentorLocation.name}</strong>
                                </dd>
                            </dl>
                        </dl>
                        <dl>
                            <dt className="text-base font-medium text-gray-900 dark:text-white">Deskripsi</dt>
                            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{sessionOffline.mentoring_session.description}</dd>
                        </dl>
                        <div className="flex justify-start gap-4 sm:flex sm:items-center">
                            <button
                                onClick={() => handleCompleteSession(sessionOffline.id)}
                                className="w-auto max-w-xs rounded-lg border border-gray-200 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                            >
                                Complete Session
                            </button>
                        </div>
                    </div>
                    <div className="h-[500px] w-full" id="map"></div>
                </div>
            </section>
        </AuthLayout>
    );
};

export default OfflineShow;
