import React, { useEffect, useRef, useState } from 'react';
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

const OfflineShow = ({ sessionOffline, mentorLocation, studentsLocations, bookings }) => {
    const mentorPosition = [mentorLocation.latitude, mentorLocation.longitude];
    const mapRef = useRef(null);
    const routingControlRef = useRef(null);
    const { post } = useForm();

    useEffect(() => {
        // Initialize the map only once
        mapRef.current = L.map('map').setView(mentorPosition, 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);

        // Marker untuk Mentor
        const mentorMarker = L.marker(mentorPosition, { icon: customIcon }).addTo(mapRef.current)
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

        // Marker untuk setiap siswa
        studentsLocations.forEach(studentLocation => {
            const studentPosition = [studentLocation.latitude, studentLocation.longitude];
            const studentMarker = L.marker(studentPosition, { icon: customIcon }).addTo(mapRef.current)
                .bindPopup(`
                    <div class="flex flex-col items-center">
                        <div class="text-base font-bold">Lokasi Siswa</div>
                        <div class="border-b border-gray-100 w-full my-1"></div>
                        <div class="flex flex-col items-center mt-2">
                            <img src="${studentLocation.profile_picture ? `/storage/${studentLocation.profile_picture}` : '/default-avatar.png'}"
                                 alt="${studentLocation.name}'s Profile"
                                 class="w-12 h-12 rounded-full object-cover" />
                            <div class="mt-2">
                                <strong>${studentLocation.name}</strong>
                            </div>
                        </div>
                    </div>
                `);

            // Click event for student marker
            studentMarker.on('click', () => {
                // Remove existing routing control if it exists
                if (routingControlRef.current) {
                    mapRef.current.removeControl(routingControlRef.current);
                }

                // Create new routing control
                routingControlRef.current = L.Routing.control({
                    waypoints: [
                        L.latLng(studentPosition[0], studentPosition[1]),
                        L.latLng(mentorPosition[0], mentorPosition[1]),
                    ],
                    routeWhileDragging: true,
                    draggableWaypoints: false,
                    createMarker: () => null, // No additional marker for route
                }).addTo(mapRef.current);
            });
        });

        return () => {
            mapRef.current.remove();
        };
    }, [mentorPosition, mentorLocation, studentsLocations]);

    return (
        <AuthLayout>
            <section className='antialiased dark:bg-gray-900'>
                <div className="bg-white p-8 rounded-lg">
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
                        <dl className="mt-4">
                            <dt className="text-lg font-semibold text-gray-900 dark:text-white">Peserta Terdaftar:</dt>
                            <dd>
                                {bookings && bookings.length > 0 ? (
                                    <ul className=" mt-2 space-y-1">
                                        {bookings.map((booking) => (
                                            <li key={booking.id} className=" p-2 rounded-md shadow-sm">
                                                <span className="text-gray-800 dark:text-gray-200">
                                                    {booking.student.name}
                                                </span>
                                                <span className={`ml-5 font-medium ${booking.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {booking.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-2 text-gray-500 dark:text-gray-400">Tidak ada peserta yang terdaftar.</p>
                                )}
                            </dd>
                        </dl>
                    </div>
                    <div className="h-[500px] w-full relative z-10" id="map"></div>
                </div>
            </section>
        </AuthLayout>
    );
};

export default OfflineShow;
