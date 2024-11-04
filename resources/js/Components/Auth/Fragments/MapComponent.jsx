import React, { useEffect } from 'react';
import { useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getCurrentLocation } from './LocationUtils';

export const CurrentLocationControl = ({ onLocationFound }) => {
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

export const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, map.getZoom());
    }, [center, map]);
    return null;
};

export const LocationMarker = ({ position, onLocationSelect }) => {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onLocationSelect(lat, lng);
        },
    });

    return null;
};
