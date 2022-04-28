import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { vividColors } from "./utils/colors";
const Legend = (props) => {
  const map = useMap();

  useEffect(() => {
    // map.eachLayer((layer) => {
    //   console.log(layer.feature);
    // });
  }, [map]);

  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <div className="legend-wrap">
      <div className="leaflet-bottom leaflet-left">
        <div
          style={{ backgroundColor: "whitesmoke" }}
          className="leaflet-control leaflet-bar">
          <ul
            style={{
              width: "50px",
              listStyleType: "none",
              padding: "6px 12px",
            }}>
            <li
              className="legend-item"
              style={{ color: `${vividColors[0]}` }}
              onClick={handleClick}>
              Corn
            </li>
            <li
              className="legend-item"
              style={{ color: `${vividColors[1]}` }}
              onClick={handleClick}>
              Barley
            </li>
            <li
              className="legend-item"
              style={{ color: `${vividColors[2]}` }}
              onClick={handleClick}>
              Rice
            </li>
            <li
              className="legend-item"
              style={{ color: `${vividColors[3]}` }}
              onClick={handleClick}>
              Wheat
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Legend;
