import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {getUser} from '../../services/slices/getUserSlice'
import ModalSwitch from "../ModalSwitch/ModalSwitch";
import {fetchIngredients} from "../../services/slices/IngerdientSlice";

function App() {
    const dispatch = useDispatch()
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


//TODO Раскидать компоненты UI..

//TODO Доработать  валидацию в редактировании профиля + посмотреть на иконку она должна пропадать при клике
// TODO все таки разобраться с модалкой ORDER
//
