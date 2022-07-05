import React, { createContext, useState, useEffect } from 'react'


export const ClickedVisContext = createContext(null);

const ClickedVisProvider = ({ children }) => {


    const [visible, setVisible] = useState(false)
    const [clickedFarm, setClickedFarm] = useState([])
    //const [info, setInfo] = useState([])

    useEffect(() => {

        console.log(clickedFarm);

    }, [clickedFarm])

    return (
        <ClickedVisContext.Provider value={{ visible, setVisible, clickedFarm, setClickedFarm }}>
            {children}
        </ClickedVisContext.Provider>
    )
}

export default ClickedVisProvider;