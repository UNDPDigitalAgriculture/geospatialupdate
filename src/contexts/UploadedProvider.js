import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet'

export const UploadedContext = createContext({});


function UploadedProvider({ children }) {
    const [uploadedGeojson, setUploadedGeojson] = useState();
    const map = useMap()
    console.log(map.getCenter());

    useEffect(() => {

        console.log(uploadedGeojson);
        if (uploadedGeojson) {
            const gjnUpload = L.geoJSON(uploadedGeojson)
            map.fitBounds(gjnUpload.getBounds())
            gjnUpload.addTo(map);
        }


    }, [uploadedGeojson])

    return (
        <UploadedContext.Provider value={{ uploadedGeojson, setUploadedGeojson }}>
            {children}
        </UploadedContext.Provider>
    )

}

export default UploadedProvider;