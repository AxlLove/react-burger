import React, {useEffect} from 'react';
import { useAppDispatch } from '../../services/hooks/hooks';
import {getUser} from '../../services/slices/getUserSlice'
import ModalSwitch from "../ModalSwitch/ModalSwitch";
import {fetchIngredients} from "../../services/slices/IngerdientSlice";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    return (
        <ModalSwitch/>
    );
}

export default App;


