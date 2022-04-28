import React from "react";
import { MapContainer } from "react-leaflet";
import Layers from "./Layers";
import Legend from "./Legend";
import DropDown from "./DropDown";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
L.PM.initialize({ optIn: true });
// import '@geoman-io/leaflet-geoman-free';
// import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
// delete L.Icon.Default.prototype._getIconUrl

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// })

const NewMap = () => {
  //const location = [-33.78, 24.83];
  const location = [-29.07, 24.32];
  const zoom = 6;
  return (
    <>
      <MapContainer
        center={location}
        zoom={zoom}
        zoomControl={false}
        zoomDelta={0.2}
        zoomSnap={0.2}
        pmIgnore={false}
        style={{
          top: "0px",
          left: "30vw",
          height: "100vh",
          width: "70vw",
          position: "absolute",
        }}>
        <DropDown />
        <Layers />
        {/* <Legend /> */}
      </MapContainer>
    </>
  );
};

export default NewMap;
