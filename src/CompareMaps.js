import React, { useEffect, useState } from "react";
// import {
//   MapContainer,
//   useMap,
//   useMapEvents,
//   TileLayer,
//   LayersControl,
//   LayerGroup,
//   GeoJSON,
//   Polygon,
// } from "react-leaflet";
import {
  getDatabase,
  ref,
  onValue,
  set,
  setValue,
  child,
  push,
  update,
} from "firebase/database";
import L from "leaflet";
import { vividColors } from "./utils/colors";
import "leaflet-side-by-side";
import "leaflet/dist/leaflet.css";
const CompareMaps = () => {
  const [gjn, setGjnData] = useState();

  const gjnStyle = (feature) => {
    if (feature.properties.crop_type === "0") {
      return {
        fillOpacity: 0,
        color: vividColors[0],
        fillColor: vividColors[0],
        weight: 2,
      };
    } else if (feature.properties.crop_type === "1") {
      return {
        fillOpacity: 0,
        color: vividColors[1],
        fillColor: vividColors[1],
        weight: 2,
      };
    } else if (feature.properties.crop_type === "2") {
      return {
        fillOpacity: 0,
        color: vividColors[2],
        fillColor: vividColors[2],
        weight: 2,
      };
    } else {
      return {
        fillOpacity: 0,
        color: vividColors[3],
        fillColor: vividColors[3],
        weight: 2,
      };
    }
  };

  useEffect(() => {
    const database = getDatabase();
    const dbref = ref(database, "/features/");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      //console.log(data);

      setGjnData(data);
      const cartodb = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      );
      const map = L.map("compare-map", {
        center: [-33.78, 24.83],
        zoom: 13,
        zoomSnap: 0.1,
        zoomDelta: 0.1,
        zoomControl: false,
      });

      const osmLayer = L.tileLayer(
        "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2ViYXN0aWFuLWNoIiwiYSI6ImNpejkxdzZ5YzAxa2gyd21udGpmaGU0dTgifQ.IrEd_tvrl6MuypVNUGU5SQ",
        {
          minZoom: 1,
          maxZoom: 17,
        }
      ).addTo(map);

      const stamenLayer = L.tileLayer(
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          minZoom: 1,
          maxZoom: 17,
        }
      ).addTo(map);
      const gjnLayer = L.geoJSON(data, {
        style: gjnStyle,
      }); //.addTo(map);
      const sidebyside = L.control.sideBySide(stamenLayer, osmLayer).addTo(map);
      //L.control.layers({ carto: cartodb }).addTo(map);

      //sidebyside.setLeftLayers([gjnLayer]);
    });
  }, []);

  return (
    <div
      style={{
        top: "0px",
        left: "30vw",
        height: "500px",
        width: "70vw",
        position: "absolute",
      }}
      id="compare-map"
    />
  );
};

export default CompareMaps;
