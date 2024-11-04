import React from 'react'

const LocationUtils = () => {

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

    return (
        <>
        </>
    )
}

export default LocationUtils


