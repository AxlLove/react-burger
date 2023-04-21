import React, {useEffect, useState} from 'react';
import { useAppDispatch } from '../../services/hooks/hooks';
import {getUser} from '../../services/slices/getUserSlice'
import ModalSwitch from "../ModalSwitch/ModalSwitch";
import {fetchIngredients} from "../../services/slices/IngerdientSlice";
import {getWidths} from "../../services/slices/getWidthSlice";


function App() {
    const dispatch = useAppDispatch()
    const [screenSize, getDimension] = useState({
        dynamicWidth: window.innerWidth,
    });

    const getResize = (e: Event) => {
        return setTimeout(() => {
            dispatch(getWidths(window.innerWidth))
        }, 500)
    }

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    useEffect(() => {
        window.addEventListener('resize', getResize)
        return (()=> {
            window.addEventListener('resize', getResize)
        })
    }, [screenSize])

    return (
            <ModalSwitch/>
    );
}

export default App;


