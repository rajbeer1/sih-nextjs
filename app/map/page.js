'use client';
import {
  GoogleMap,
  HeatmapLayer,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useState } from 'react';

function Home() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAN6b_-hDFORuqIbR3NITLQOv9L8IMmHzs', // Replace with your actual API key
    libraries: ['visualization'],
  });

  const [map, setMap] = useState(null);

  if (loadError) {
    return <div>Error loading the map</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const generateRandomDataPoint = (baseLat, baseLng, spread = 0.01) => ({
    lat: parseFloat((baseLat + (Math.random() - 0.5) * spread).toFixed(5)),
    lng: parseFloat((baseLng + (Math.random() - 0.5) * spread).toFixed(5)),
  });

  // Coordinates approximately 800m apart
  const cluster1Center = { lat: 17.3334, lng: 78.331 };
  const cluster2Center = { lat: 17.3334, lng: 78.331 + 0.0072 };

  const heatMapDataCluster1 = Array(12)
    .fill(0)
    .map(() =>
      generateRandomDataPoint(cluster1Center.lat, cluster1Center.lng, 0.003)
    );
  const heatMapDataCluster2 = Array(12)
    .fill(0)
    .map(() =>
      generateRandomDataPoint(cluster2Center.lat, cluster2Center.lng, 0.003)
    );

  // Gradient for each cluster
  const gradientColorsCluster1 = [
    'rgba(0, 0, 255, 0)', // Transparent Blue
    'rgba(0, 0, 255, 1)', // Light Blue
    'rgba(0, 0, 150, 1)', // Dark Blue
  ];

  const gradientColorsCluster2 = [
    'rgba(255, 0, 0, 0)', // Transparent Red
    'rgba(255, 0, 0, 1)', // Light Red
    'rgba(150, 0, 0, 1)', // Dark Red
  ];

  return (
    <main>
      <GoogleMap
        mapContainerStyle={{
          position: 'relative',
          height: '100vh',
          width: '100%',
        }}
        zoom={14}
        onLoad={(map) => setMap(map)}
        center={{ lat: 17.3334, lng: 78.331 + 0.0036 }} // Center between the two clusters
      >
        {map && (
          <>
            <HeatmapLayer
              data={heatMapDataCluster1.map((data) => ({
                location: new google.maps.LatLng(data.lat, data.lng),
                weight: 1,
              }))}
              options={{
                radius: 40, // Adjusted radius for better visualization
                gradient: gradientColorsCluster1,
              }}
            />
            <HeatmapLayer
              data={heatMapDataCluster2.map((data) => ({
                location: new google.maps.LatLng(data.lat, data.lng),
                weight: 1,
              }))}
              options={{
                radius: 40, // Adjusted radius for better visualization
                gradient: gradientColorsCluster2,
              }}
            />
          </>
        )}
      </GoogleMap>
    </main>
  );
}

export default Home;
