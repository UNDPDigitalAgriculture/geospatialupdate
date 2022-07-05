import React, { createContext, useState, useEffect } from 'react'
import Leaflet from 'leaflet';
import {
    getDatabase,
    ref,
    onValue,

} from "firebase/database";
import { initializeApp } from "firebase/app";
//import { gjnData } from '../components/test'

const firebaseConfig = {
    apiKey: "AIzaSyANvYurLON2pl8b_XO3i3EuvYA-N4TrssM",
    authDomain: "agtest-cb996.firebaseapp.com",
    projectId: "agtest-cb996",
    storageBucket: "agtest-cb996.appspot.com",
    messagingSenderId: "720408516443",
    appId: "1:720408516443:web:5a94d6fa4fa4c85c4eac7e",
    measurementId: "G-RYK6SVH6SE",
};


const app = initializeApp(firebaseConfig);

export const DataContext = createContext(null);


const DataProvider = ({ children }) => {
    const [gjn, setGjn] = useState();
    const [cornCount, setCornCount] = useState();
    const [barleyCount, setBarleyCount] = useState();
    const [riceCount, setRiceCount] = useState();
    const [wheatCount, setWheatCount] = useState();
    const [pieData, setPieData] = useState();
    const [farmCount, setFarmCount] = useState();

    const callDb = () => {
        const database = getDatabase();
        const dbref = ref(database, "/features/");
        onValue(dbref, (snapshot) => {
            const data = snapshot.val();
            //console.log(data);
            setGjn(data);
            const corn1 = data.filter((x) => x.properties.crop_type == "0");
            const barley1 = data.filter((x) => x.properties.crop_type == "1");
            const rice1 = data.filter((x) => x.properties.crop_type == "2");
            const wheat1 = data.filter((x) => x.properties.crop_type == "3");
            //console.log(corn1);
            //console.log(corn1.filter((x) => x === true));
            setCornCount(corn1);
            setBarleyCount(barley1);
            setRiceCount(rice1);
            setWheatCount(wheat1);
            //setStats(data);
            setFarmCount(data.length);

        });
    };






    useEffect(() => {
        callDb()
    }, [])


    return (
        <DataContext.Provider value={{ gjn, setGjn }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;