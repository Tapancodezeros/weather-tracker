import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const WeatherMap = ({ lat, lon, city }) => {
  return (
    <div className="weather-card map-card">
      <h3>Live Radar Location</h3>
      <MapContainer 
        center={[lat, lon]} 
        zoom={10} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%" }}
        key={`${lat}-${lon}`}
      >
        <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]}><Popup>{city}</Popup></Marker>
      </MapContainer>
    </div>
  );
};
export default WeatherMap;