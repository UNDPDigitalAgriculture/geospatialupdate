import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  useMap,
  useMapEvents,
  TileLayer,
  LayersControl,
  LayerGroup,
  GeoJSON,
  Polygon,
  Popup,
} from "react-leaflet";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { vividColors } from "./utils/colors";

const firebaseConfig = {
  apiKey: "AIzaSyANvYurLON2pl8b_XO3i3EuvYA-N4TrssM",
  authDomain: "agtest-cb996.firebaseapp.com",
  projectId: "agtest-cb996",
  storageBucket: "agtest-cb996.appspot.com",
  messagingSenderId: "720408516443",
  appId: "1:720408516443:web:5a94d6fa4fa4c85c4eac7e",
  measurementId: "G-RYK6SVH6SE",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const app = initializeApp(firebaseConfig);

const Layers = () => {
  const [gjnData, setGjnData] = useState();
  const [cropType, setCropType] = useState();
  const [addedPoly, setAddedPoly] = useState();
  const [addedLayer, setAddedLayer] = useState();
  const [clickedLayer, setClickedLayer] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    console.log(event.target.value);
    setCropType(event.target.value);
  };

  const map = useMapEvents({
    zoomend: () => {
      // Get the zoom level once zoom ended:
      console.log(map.getZoom());
    },
    moveend: () => {
      // Get bounds once move has ended:
      //console.log(map.getBounds());
    },
    "pm:create": (e) => {
      console.log("createa");
      console.log(e);
      console.log(e.layer._latlngs[0]);
      const newFormat = [];
      e.layer._latlngs[0].map((x) => {
        //console.log(x);
        newFormat.push([Number(x.lng.toFixed(4)), Number(x.lat.toFixed(4))]);
      });

      //console.log(newFormat);
      console.log(e.layer.feature);
      setOpen(true);
      setAddedPoly(newFormat);
      setAddedLayer(e.layer);
      console.log(open);
      //addToDb(newFormat);
    },
    "pm:globaleditmodetoggled": (e) => {
      console.log(e);
    },
  });

  const callDb = () => {
    const database = getDatabase();
    const dbref = ref(database, "/features/");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      //console.log(data);

      setGjnData(data);
    });
  };

  const addToDb = () => {
    //latlng.push(latlng[0]);
    addedPoly.push(addedPoly[0]);

    console.log(gjnData.length);
    const db = getDatabase();
    const postData = {
      geometry: {
        coordinates: [addedPoly],
        type: "Polygon",
      },
      properties: {
        id: gjnData.length,
        crop_type: cropType,
        2017: null,
        2018: null,
        2019: null,
      },
      type: "Feature",
    };
    handleClose();
    const key = gjnData.length;
    const updates = {};
    updates["/features/" + key] = postData;
    console.log(addedLayer);
    console.log(cropType);
    addedLayer.setStyle({
      color:
        cropType === "0"
          ? vividColors[0]
          : cropType === "1"
          ? vividColors[1]
          : cropType === "2"
          ? vividColors[2]
          : vividColors[3],
    });

    update(ref(db), updates);
    //callDb();
  };

  const updateDb = (f, updateKey) => {
    const db = getDatabase(app);
    const dbRef = ref(db, `/features/${updateKey}`);
    const newFormat = [];
    console.log(f._latlngs);
    f._latlngs[0].map((x) => {
      //console.log(x);
      newFormat.push([Number(x.lng.toFixed(4)), Number(x.lat.toFixed(4))]);
    });
    newFormat.push(newFormat[0]);
    console.log(newFormat);
    const postData = {
      geometry: {
        coordinates: [newFormat],
        type: "Polygon",
      },
      properties: f.feature.properties,
      type: f.feature.type,
    };
    update(dbRef, postData)
      .then(() => {
        console.log("updated");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    callDb();
    // map.pm.Toolbar.createCustomControl({
    //   name: "sebastian",
    //   title: "stop edits",
    //   onClick: turnOffEditing(),
    // });
  }, []);

  // const turnOffEditing = () => {
  //   //clickedLayer.pm.toggleEdi
  //   if (clickedLayer) {
  //     clickedLayer.pm.disable();
  //     setClickedLayer();
  //   }
  // };

  map.pm.addControls({
    position: "topright",
    drawCircle: false,
    drawMarker: false,
    drawCircleMarker: false,
    cutPolygon: false,
    drawPolyline: false,
    dragMode: false,
    rotateMode: false,
    removalMode: false,
    editMode: false,
  });

  map.pm.setGlobalOptions({
    limitMarkersToCount: 8,
  });

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const handleEditLayer = (e) => {
    const editedId = e.layer.feature.properties.id;
    //console.log(e);
    //console.log(gjnData);
    const f = gjnData.find((o) => o.properties.id === editedId);
    //console.log(f);
    const updateKey = getKeyByValue(gjnData, f);
    //console.log(updateKey);
    updateDb(e.layer, updateKey);
  };

  const gjnStyle = (feature) => {
    if (feature.properties.crop_type === "0") {
      return {
        color: vividColors[0],
        fillColor: vividColors[0],
        weight: 2,
      };
    } else if (feature.properties.crop_type === "1") {
      return {
        color: vividColors[1],
        fillColor: vividColors[1],
        weight: 2,
      };
    } else if (feature.properties.crop_type === "2") {
      return {
        color: vividColors[2],
        fillColor: vividColors[2],
        weight: 2,
      };
    } else {
      return {
        color: vividColors[3],
        fillColor: vividColors[3],
        weight: 2,
      };
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 120,
            }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Crop Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cropType}
                label="Crop Type"
                onChange={handleChange}>
                <MenuItem value={"0"}>Corn</MenuItem>
                <MenuItem value={"1"}>Barley</MenuItem>
                <MenuItem value={"2"}>Rice</MenuItem>
                <MenuItem value={"3"}>wheat</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{ mt: 1 }}
              variant={"contained"}
              disabled={!cropType}
              onClick={addToDb}>
              Add New Farm
            </Button>
          </Box>
        </Box>
      </Modal>
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Imagery">
          <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2ViYXN0aWFuLWNoIiwiYSI6ImNpejkxdzZ5YzAxa2gyd21udGpmaGU0dTgifQ.IrEd_tvrl6MuypVNUGU5SQ" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Light Map">
          <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2ViYXN0aWFuLWNoIiwiYSI6ImNpejkxdzZ5YzAxa2gyd21udGpmaGU0dTgifQ.IrEd_tvrl6MuypVNUGU5SQ" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Topo Map">
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="Imagery with Labels">
          <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2ViYXN0aWFuLWNoIiwiYSI6ImNpejkxdzZ5YzAxa2gyd21udGpmaGU0dTgifQ.IrEd_tvrl6MuypVNUGU5SQ" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Carto Layer">
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>

        {gjnData ? (
          <>
            <LayersControl.Overlay checked name={"Corn"}>
              <GeoJSON
                //pmIgnore
                key={"geojsonLayer"}
                eventHandlers={{
                  click: (e) => {
                    e.layer.setStyle({ pmIgnore: false });
                    //map.pm.enableGlobalEditMode();
                    setClickedLayer(e.layer);
                    // e.layer.pm.enable({
                    //   allowSelfIntersection: false,
                    // });
                    e.layer.pm.toggleEdit();
                    console.log(e.layer);
                  },

                  // mouseout: (e) => {
                  //   Popup.close();
                  // },
                  "pm:edit": (e) => {
                    handleEditLayer(e);
                  },
                }}
                data={gjnData.filter((x) => x.properties.crop_type === "0")}
                //onEachFeature={onEach}

                style={gjnStyle}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name={"Barley"}>
              <GeoJSON
                //pmIgnore
                key={"geojsonLayer"}
                eventHandlers={{
                  click: (e) => {
                    e.layer.setStyle({ pmIgnore: false });
                    //map.pm.enableGlobalEditMode();
                    setClickedLayer(e.layer);
                    // e.layer.pm.enable({
                    //   allowSelfIntersection: false,
                    // });
                    e.layer.pm.toggleEdit();
                    console.log(e.layer);
                  },

                  // mouseout: (e) => {
                  //   Popup.close();
                  // },
                  "pm:edit": (e) => {
                    handleEditLayer(e);
                  },
                }}
                data={gjnData.filter((x) => x.properties.crop_type === "1")}
                //onEachFeature={onEach}

                style={gjnStyle}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name={"Rice"}>
              <GeoJSON
                //pmIgnore
                key={"geojsonLayer"}
                eventHandlers={{
                  click: (e) => {
                    e.layer.setStyle({ pmIgnore: false });
                    //map.pm.enableGlobalEditMode();
                    setClickedLayer(e.layer);
                    // e.layer.pm.enable({
                    //   allowSelfIntersection: false,
                    // });
                    e.layer.pm.toggleEdit();
                    console.log(e.layer);
                  },

                  // mouseout: (e) => {
                  //   Popup.close();
                  // },
                  "pm:edit": (e) => {
                    handleEditLayer(e);
                  },
                }}
                data={gjnData.filter((x) => x.properties.crop_type === "2")}
                //onEachFeature={onEach}

                style={gjnStyle}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name={"Wheat"}>
              <GeoJSON
                //pmIgnore
                key={"geojsonLayer"}
                eventHandlers={{
                  click: (e) => {
                    e.layer.setStyle({ pmIgnore: false });
                    //map.pm.enableGlobalEditMode();
                    setClickedLayer(e.layer);
                    // e.layer.pm.enable({
                    //   allowSelfIntersection: false,
                    // });
                    e.layer.pm.toggleEdit();
                    console.log(e.layer);
                  },

                  // mouseout: (e) => {
                  //   Popup.close();
                  // },
                  "pm:edit": (e) => {
                    handleEditLayer(e);
                  },
                }}
                data={gjnData.filter((x) => x.properties.crop_type === "3")}
                //onEachFeature={onEach}

                style={gjnStyle}
              />
            </LayersControl.Overlay>
          </>
        ) : (
          <></>
        )}
      </LayersControl>
    </>
  );
};

export default Layers;
