import "./MapComponent.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Link } from "react-router-dom";
import MAP_TOKEN from "../constants";

const REACT_APP_MAP_TOKEN = MAP_TOKEN;

mapboxgl.accessToken = REACT_APP_MAP_TOKEN;

function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.56);
  const [lat, setLat] = useState(12.98);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12", //mapbox://styles/mapbox/streets-v12
      center: [lng, lat],
      zoom: zoom,
    });
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    geocoder.addTo(map.current);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude:{lng} | Latitude:{lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container"></div>

      <Link to="/cube" state={{ latitude: lat, longitude: lng, zoom: zoom }}>
        <button type="button" className="button">
          Render 3D Cube
        </button>
      </Link>
    </div>
  );
}

export default MapComponent;
