import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaUser, FaEnvelope, FaInfo, FaImage, FaMapMarkerAlt, FaMapPin } from 'react-icons/fa';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

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

const LocationMarker = ({ position, onLocationSelect }) => {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onLocationSelect(lat, lng);
        },
    });

    return null;
};

const EditSession = ({ mentoringsession }) => {
    const { data, setData, put, errors, processing } = useForm({
        title: mentoringsession.title,
        description: mentoringsession.description,
        session_type: mentoringsession.session_type,
        location: mentoringsession.location,
        duration: mentoringsession.duration,
        price: mentoringsession.price,
        student_limit: mentoringsession.student_limit,
        status: mentoringsession.status,
        latitude: mentoringsession.latitude,
        longitude: mentoringsession.longitude,
    });

    const [mapCenter, setMapCenter] = useState([parseFloat(mentoringsession.latitude) || -6.200000, parseFloat(mentoringsession.longitude) || 106.816666]);
    const [showMap, setShowMap] = useState(mentoringsession.session_type === 'offline');
    const [isLoading, setIsLoading] = useState(false);

    const calculatePrice = (studentLimit, duration, sessionType) => {
        const basePrice30Min = 28500;
        const basePrice45Min = 31000;
        const basePrice60Min = 33500;
        const basePrice75Min = 36000;
        const basePrice90Min = 38500;

        const additionalStudentPrice = 1500;
        const offlineLocationPrice = 5000; // Biaya tambahan untuk lokasi offline

        let basePrice;

        switch (duration) {
            case 30:
                basePrice = basePrice30Min;
                break;
            case 45:
                basePrice = basePrice45Min;
                break;
            case 60:
                basePrice = basePrice60Min;
                break;
            case 75:
                basePrice = basePrice75Min;
                break;
            case 90:
                basePrice = basePrice90Min;
                break;
            default:
                basePrice = basePrice30Min;
        }

        let totalPrice = basePrice;

        // Tambahkan biaya untuk jumlah siswa tambahan
        if (studentLimit > 1) {
            totalPrice += (studentLimit - 1) * additionalStudentPrice;
        }

        // Tambahkan biaya lokasi offline jika tipe sesi offline
        if (sessionType === 'offline') {
            totalPrice += offlineLocationPrice;
        }

        return totalPrice;
    };

    // Ubah useEffect untuk menyertakan session_type
    useEffect(() => {
        const newPrice = calculatePrice(data.student_limit, data.duration, data.session_type);
        setData((prevData) => ({ ...prevData, price: newPrice }));
    }, [data.duration, data.student_limit, data.session_type]);

    const handleInputChange = (e, field) => {
        const value = field === 'duration' ? Number(e.target.value) : e.target.value;
        setData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    useEffect(() => {
        setShowMap(data.session_type === 'offline');
    }, [data.session_type]);

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
            setMapCenter([lat, lng]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('mentor.session.update', mentoringsession.id), {
            onSuccess: () => {
                console.log('Berhasil mengupdate sesi!');
                // Redirect ke halaman detail atau daftar sesi
            },
            onError: (errors) => {
                console.log('Error:', errors);
            }
        });
    };

    return (
        <AuthLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="mx-auto bg-white p-8 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Edit Sesi Mentoring</h1>
                        <Link
                            href={route('mentor.dashboard')}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            &larr; Kembali
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Judul */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Judul Sesi
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan judul sesi"
                            />
                            {errors.title && (
                                <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan deskripsi sesi"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tipe Sesi
                            </label>
                            <select
                                value={data.session_type}
                                onChange={e => setData('session_type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>

                        {showMap && (
                            <div>
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
                                <div className="mt-4">
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

                                <div className="hidden">
                                    <div className="flex items-center">
                                        <FaMapPin className="w-6 h-6 text-gray-500 mr-3" />
                                        <div className="flex-1">
                                            <InputLabel htmlFor="latitude " value="Latitude" />
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
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {/* Durasi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Durasi (menit)
                                </label>
                                <select
                                    value={data.duration}
                                    onChange={(e) => handleInputChange(e, 'duration')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={30}>30</option>
                                    <option value={45}>45</option>
                                    <option value={60}>60</option>
                                    <option value={90}>90</option>
                                </select>
                                {errors.duration && (
                                    <div className="text-red-500 text-sm mt-1">{errors.duration}</div>
                                )}
                            </div>

                            {/* Harga */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Harga (dalam Rupiah)
                                </label>
                                <input
                                    type="number"
                                    value={data.price}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Harga akan dihitung otomatis"
                                />
                                {errors.price && (
                                    <div className="text-red-500 text-sm mt-1">{errors.price}</div>
                                )}
                            </div>

                            {/* Batas Siswa */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Batas Siswa
                                </label>
                                <select
                                    value={data.student_limit}
                                    onChange={(e) => handleInputChange(e, 'student_limit')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={5}>5</option>
                                </select>
                                {errors.student_limit && (
                                    <div className="text-red-500 text-sm mt-1">{errors.student_limit}</div>
                                )}
                            </div>
                        </div>

                        {/* Tombol Submit */}
                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                            >
                                Update Sesi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
};

export default EditSession;