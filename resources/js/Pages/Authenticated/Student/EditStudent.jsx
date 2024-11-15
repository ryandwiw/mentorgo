import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Input } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaUser, FaEnvelope, FaInfo, FaImage, FaMapMarkerAlt, FaMapPin } from 'react-icons/fa';
import { RiUserLocationFill } from "react-icons/ri";

// Import icon URLs
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Fungsi untuk reverse geocoding
const reverseGeocode = async (lat, lon) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
            {
                headers: {
                    'Accept-Language': 'id'
                }
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in reverse geocoding:", error);
        return null;
    }
};

const CurrentLocationControl = ({ onLocationFound }) => {
    const map = useMap();

    useEffect(() => {
        const control = L.control({ position: 'topright' });

        control.onAdd = () => {
            const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
            div.innerHTML = '<button style="background-color: #fff; border: none; border-radius: 5px; padding: 5px;">📍</button>';
            div.onclick = async () => {
                try {
                    const position = await getCurrentLocation();
                    onLocationFound(position.lat, position.lng);
                } catch (error) {
                    console.error("Error getting location:", error);
                    alert("Could not get your location. Please check your permissions.");
                }
            };
            return div;
        };

        control.addTo(map);

        return () => {
            map.removeControl(control);
        };
    }, [map, onLocationFound]);

    return null;
};

const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, map.getZoom());
    }, [center, map]);
    return null;
};

// Fungsi untuk geocoding
const geocode = async (searchText) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&limit=1`,
            {
                headers: {
                    'Accept-Language': 'id'
                }
            }
        );
        const data = await response.json();
        return data[0] || null;
    } catch (error) {
        console.error("Error in geocoding:", error);
        return null;
    }
};

// Fungsi untuk mendapatkan lokasi sekarang
const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        }
    });
};

// Component untuk menghandle events pada map
const LocationMarker = ({ position, onLocationSelect }) => {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onLocationSelect(lat, lng);
        },
    });

    return null; // Tidak perlu mengembalikan Marker di sini
};


export default function StudentEdit({ student }) {
    const { data, setData, post, processing, errors } = useForm({
        name: student.name,
        email: student.email,
        bio: student.bio || '',
        profile_picture: null,
        location: student.location || '',
        latitude: student.latitude || '',
        longitude: student.longitude || '',
        phone: student.phone || '',
        asal: student.asal || '',
        _method: 'PUT',
    });

    const [mapCenter, setMapCenter] = useState([
        student.latitude ? parseFloat(student.latitude) : -6.200000,
        student.longitude ? parseFloat(student.longitude) : 106.816666
    ]);

    const [isLoading, setIsLoading] = useState(false);

    // Effect untuk load initial location
    useEffect(() => {
        const loadInitialLocation = async () => {
            if (data.latitude && data.longitude) {
                setIsLoading(true);
                try {
                    const geoData = await reverseGeocode(data.latitude, data.longitude);
                    if (geoData && geoData.address) {
                        const suburb = geoData.address.suburb || geoData.address.town || geoData.address.village || '';
                        const city = geoData.address.city || geoData.address.county || '';
                        const state = geoData.address.state || '';
                        const locationString = `${suburb}, ${city}, ${state}`.replace(/^[,\s]+|[,\s]+$/g, '');
                        setData(prevData => ({
                            ...prevData,
                            location: locationString
                        }));
                    }
                } catch (error) {
                    console.error("Error loading initial location:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadInitialLocation();
    }, []);

    const handleLocationSelect = async (lat, lng) => {
        setIsLoading(true);
        try {
            setData(prevData => ({
                ...prevData,
                latitude: lat.toString(),
                longitude: lng.toString()
            }));
            setMapCenter([lat, lng]); // Update map center

            const geoData = await reverseGeocode(lat, lng);
            if (geoData && geoData.address) {
                const suburb = geoData.address.suburb || geoData.address.town || geoData.address.village || '';
                const city = geoData.address.city || geoData.address.county || '';
                const state = geoData.address.state || '';
                const locationString = `${suburb}, ${city}, ${state}`.replace(/^[,\s]+|[,\s]+$/g, '');
                setData(prevData => ({
                    ...prevData,
                    location: locationString
                }));
            }
        } catch (error) {
            console.error("Error selecting location:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('bio', data.bio);
        formData.append('location', data.location);
        formData.append('latitude', data.latitude);
        formData.append('longitude', data.longitude);
        formData.append('phone', data.phone);

        if (data.profile_picture) {
            formData.append('profile_picture', data.profile_picture);
        }

        post(route('student.update', { slug: student.slug }), formData);
    };

    return (
        <AuthLayout>
            <Head title={`Edit ${student.name}`} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Edit Profile</h1>

                {/* Profile Preview Section */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 mb-6 text-center">
                    <img
                        src={student.profile_picture ? `/storage/${student.profile_picture}` : '/default-avatar.png'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
                    />
                    <h2 className="text-2xl font-semibold text-white mb-2">{data.name}</h2>
                    <p className="text-white opacity-90">{data.email}</p>
                </div>

                {/* Edit Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <FaUser className="w-6 h-6 text-gray-500 mr-3" />
                                <div className="flex-1">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaEnvelope className="w-6 h-6 text-gray-500 mr-3" />
                                <div className="flex-1">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full text-gray-500"
                                        onChange={(e) => setData('email', e.target.value)}
                                        readOnly
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaUser className="w-6 h-6 text-gray-500 mr-3" />
                                <div className="flex-1">
                                    <InputLabel htmlFor="phone" value="Phone" />
                                    <TextInput
                                        id="phone"
                                        name="phone"
                                        value={data.phone}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <RiUserLocationFill className="w-6 h-6 text-gray-500 mr-3" />
                                <div className="flex-1">
                                    <InputLabel htmlFor="asal" value="Asal Sekolah" />
                                    <TextInput
                                        id="asal"
                                        name="asal"
                                        value={data.asal}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('asal', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.asal} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaInfo className="w-6 h-6 text-gray-500 mr-3" />
                                <div className="flex-1">
                                    <InputLabel htmlFor="bio" value="Bio" />
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={data.bio}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        onChange={(e) => setData('bio', e.target.value)}
                                        rows="3"
                                    />
                                    <InputError message={errors.bio} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaImage className="w-6 h-6 text-gray-500 mr-3" />
                                <div className="flex-1">
                                    <InputLabel htmlFor="profile_picture" value="Profile Picture" />
                                    <Input
                                        type="file"
                                        id="profile_picture"
                                        onChange={(e) => {
                                            if (e.target.files[0]) {
                                                setData('profile_picture', e.target.files[0]);
                                            }
                                        }}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.profile_picture} className="mt-2 " />
                                </div>
                            </div>
                        </div>

                        {/* Location Information */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-6">
                            <div className="flex items-center space-x-4">
                                <FaMapMarkerAlt className="w-6 h-6 text-gray-500 mr-3" />
                                <div className="flex-1">
                                    <InputLabel htmlFor="location" value="Location" />
                                    <div className="flex space-x-2">
                                        <TextInput
                                            id="location"
                                            name="location"
                                            value={data.location}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="Search location..."

                                        />
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                setIsLoading(true);
                                                try {
                                                    const geoData = await geocode(data.location);
                                                    if (geoData) {
                                                        const lat = parseFloat(geoData.lat);
                                                        const lon = parseFloat(geoData.lon);
                                                        handleLocationSelect(lat, lon);
                                                    }
                                                } catch (error) {
                                                    console.error("Error searching location:", error);
                                                } finally {
                                                    setIsLoading(false);
                                                }
                                            }}
                                            className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Search
                                        </button>

                                    </div>
                                    <InputError message={errors.location} className="mt-2" />
                                </div>
                            </div>

                            <div className="hidden ">
                                <div className="flex items-center">
                                    <FaMapPin className="w-6 h-6 text-gray-500 mr-3" />
                                    <div className="flex-1">
                                        <InputLabel htmlFor="latitude" value="Latitude" />
                                        <TextInput
                                            id="latitude"
                                            name="latitude"
                                            type="number"
                                            value={data.latitude}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('latitude', e.target.value)}
                                        />
                                        <InputError message={errors.latitude} className="mt-2" />
                                    </div>
                                </div>

                                <div className="hidden items-center">
                                    <FaMapPin className="w-6 h-6 text-gray-500 mr-3" />
                                    <div className="flex-1">
                                        <InputLabel htmlFor="longitude" value="Longitude" />
                                        <TextInput
                                            id="longitude"
                                            name="longitude"
                                            type="number"
                                            value={data.longitude}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('longitude', e.target.value)}
                                        />
                                        <InputError message={errors.longitude} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <MapContainer center={mapCenter} zoom={15} className="h-96 w-full ">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <MapController center={mapCenter} />
                                <Marker position={mapCenter} />
                                <LocationMarker position={mapCenter} onLocationSelect={handleLocationSelect} />
                                <CurrentLocationControl onLocationFound={handleLocationSelect} />
                            </MapContainer>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Link
                                href={route('student.show', { slug: student.slug })}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton disabled={processing}>
                                Update Profile
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-md">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-2">Loading...</p>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}
