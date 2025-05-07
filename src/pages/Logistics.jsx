import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './Logistics.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const ORS_API_KEY = '5b3ce3597851110001cf6248258a8ee1ba8d4194b87a3e028efda88f'; // Replace with your key

function Logistics() {
  const [profile, setProfile] = useState('cycling-regular');
  const [userLocation, setUserLocation] = useState([10.961, 77.010]); // Example: origin
  const [deliveryLocation] = useState([10.250, 77.483]); // Example: destination
  const [route, setRoute] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const routeIndex = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setUserLocation([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await axios.post(
          `https://api.openrouteservice.org/v2/directions/${profile}`,
          {
            coordinates: [userLocation, deliveryLocation],
          },
          {
            headers: {
              Authorization: ORS_API_KEY,
              'Content-Type': 'application/json',
            },
          }
        );
        const coordinates = res.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRoute(coordinates);
        setMarkerPosition(coordinates[0]);
        routeIndex.current = 0;
      } catch (err) {
        console.error('Route fetch error:', err);
      }
    };

    fetchRoute();
  }, [userLocation, deliveryLocation, profile]);

  useEffect(() => {
    if (route.length > 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        routeIndex.current += 1;
        if (routeIndex.current < route.length) {
          setMarkerPosition(route[routeIndex.current]);
        } else {
          clearInterval(intervalRef.current);
        }
      }, 1000); // 1 second delay between moves
    }

    return () => clearInterval(intervalRef.current);
  }, [route]);

  const FlyToMarker = () => {
    const map = useMap();
    useEffect(() => {
      if (markerPosition) {
        map.flyTo(markerPosition, 13);
      }
    }, [markerPosition, map]);
    return null;
  };

  return (
    <div className="logistics-container">
      <h2>📦 Tracking Eco-Friendly Delivery</h2>
      <div className="transport-buttons">
        <button onClick={() => setProfile('foot-walking')}>🚶 Walk</button>
        <button onClick={() => setProfile('cycling-regular')}>🚴 Cycle</button>
        <button onClick={() => setProfile('driving-car')}>🚗 EV</button>
      </div>

      <MapContainer center={userLocation} zoom={10} style={{ height: '450px', marginTop: '20px' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerPosition && <Marker position={markerPosition}><Popup>Delivery en route</Popup></Marker>}
        <Marker position={deliveryLocation}><Popup>Destination</Popup></Marker>
        <Polyline positions={route} color="green" />
        <FlyToMarker />
      </MapContainer>
    </div>
  );
}

export default Logistics;
