import Box from "@mui/material/Box";
import Button from '@mui/material/Button'
import { useContext, useState, useEffect } from "react";
import { faker } from '@faker-js/faker';
import { ClickedVisContext } from "./contexts/ClickedVisProvider";


export default function SelectedPanel() {
    const cropTypes = ['Corn', 'Barley', 'Rice', 'Wheat']
    const { visible, setVisible } = useContext(ClickedVisContext);
    const { clickedFarm, setClickedFarm } = useContext(ClickedVisContext);
    const [fakeName, setFakeName] = useState('')
    const [value, setValue] = useState('-200vw')
    useEffect(() => {
        console.log(visible);
        if (visible) {
            setValue('0')
        } else {
            setValue('-200vw')
        }
    }, [visible])


    useEffect(() => {
        setFakeName(faker.name.findName())
    }, [clickedFarm])


    return (
        <Box
            sx={{
                display: 'flex',
                webkitTransition: 'all .5s ease',
                mozTransition: 'all .5s ease',
                transition: 'all .5s ease',
                fontFamily: 'Helvetica',
                paddingLeft: '10px',
                backgroundColor: 'whitesmoke',
                left: value,
                bottom: 0,
                position: 'absolute',
                zIndex: 10000
            }}
            height='25vh'
            //width={vis}

            width='320px'
            //display='flex'
            flexDirection='column'
            alignItems='start'
            id='farm-menu'>
            <Box
                display='flex'
                flexDirection='row'
                width='320px'
                position='relative'
            >
                <h2>Farm Information</h2>
                <Button className='last-item' onClick={() => setVisible(false)} >X</Button>
            </Box>
            <p id='clicked-words'>Farm Owner: <b>{fakeName}</b> </p>
            <p id='clicked-words'>Boundary Last updated: <b>01/21/2021</b> </p>
            <p id='clicked-words'>Area of Farm: <b>{clickedFarm['area']} m <sup>2</sup></b> </p>
            <p id='clicked-words'>Most Recent Crop Type: <b>{cropTypes[clickedFarm['crop_type']]}</b>  </p>
            <p id='clicked-words'>Accuracy of ML:</p>
            <p id='clicked-words'>Avg NDVI during 2017 Growing Season: <b>.{clickedFarm['2017']} </b> </p>
            <p id='clicked-words'>Avg NDVI during 2018 Growing Season: <b>.{clickedFarm['2018']} </b></p>
            <p id='clicked-words'>Avg NDVI during 2019 Growing Season: <b>.{clickedFarm['2019']} </b></p>

        </Box>
    )

}