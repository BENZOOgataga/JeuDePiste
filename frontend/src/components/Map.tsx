import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  center: [number, number];
  markers?: {
    position: [number, number];
    title: string;
    description?: string;
    radius?: number;
  }[];
  zoom?: number;
  height?: string;
}

const Map: React.FC<MapProps> = ({ center, markers = [], zoom = 13, height = '400px' }) => {
  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <React.Fragment key={index}>
            <Marker position={marker.position}>
              <Popup>
                <strong>{marker.title}</strong>
                {marker.description && <p>{marker.description}</p>}
              </Popup>
            </Marker>
            {marker.radius && (
              <Circle
                center={marker.position}
                radius={marker.radius}
                pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
              />
            )}
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
