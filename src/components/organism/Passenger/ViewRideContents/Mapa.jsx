import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import StartLocation from '../../../../assets/startLocation.png';
import Location from '../../../../assets/Location.png';

const Mapa = ({ mapRef, selectedPosition, selectedPositionDest, routingControlRef, customIcon }) => {

    useEffect(() => {
        if (!mapRef.current) return;

        const map = L.map(mapRef.current, {
            center: [selectedPosition?.lat || 10.3157, selectedPosition?.lon || 123.8854],
            zoom: 13,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Check if selected positions are available
        if (selectedPosition && selectedPositionDest) {
            const startIcon = customIcon(StartLocation);  // Use your custom icon for start
            const endIcon = customIcon(Location);    // Use your custom icon for end

            // Add markers for start and destination positions
            L.marker([selectedPosition?.lat, selectedPosition?.lon], { icon: startIcon }).addTo(map);
            L.marker([selectedPositionDest?.lat, selectedPositionDest?.lon], { icon: endIcon }).addTo(map);

            // Remove any previous routing control before adding new one
            if (routingControlRef.current) {
                try {
                    // Check if the routing control and route layer exist before removal
                    if (routingControlRef.current.getPlan()) {
                        const plan = routingControlRef.current.getPlan();
                        if (plan._routeLayer) {
                            plan._routeLayer.remove(); // Safely remove the route layer
                        }
                    }
                    map.removeControl(routingControlRef.current); // Safely remove the existing routing control
                } catch (error) {
                    console.error('Error removing routing control or route layer:', error);
                }
            }

            // Create routing control and store it in the ref
            routingControlRef.current = L.Routing.control({
                waypoints: [
                    L.latLng(selectedPosition?.lat, selectedPosition?.lon),
                    L.latLng(selectedPositionDest?.lat, selectedPositionDest?.lon)
                ],
                createMarker: function () {
                    return null;
                },
                show: false,
                routeWhileDragging: true,
                lineOptions: {
                    styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }]
                }
            }).addTo(map);
        }

        // Cleanup the map on unmount
        return () => {
            // Safely check if routingControlRef.current exists before calling remove
            if (routingControlRef.current) {
                try {
                    // Check if the routing control and route layer exist before removal
                    const plan = routingControlRef.current.getPlan();
                    if (plan && plan._routeLayer) {
                        plan._routeLayer.remove(); // Safely remove the route layer
                    }
                    map.removeControl(routingControlRef.current); // Ensure routing control is removed on unmount
                } catch (error) {
                    console.error('Error during routing control cleanup:', error);
                }
            }
            map.remove(); // Remove the map instance
        };
    }, []);

    return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default Mapa;
