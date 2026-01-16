import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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
