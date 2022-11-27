import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {getUser} from '../../services/slices/getUserSlice'
import ModalSwitch from "../ModalSwitch/ModalSwitch";
import {fetchIngredients} from "../../services/slices/IngerdientSlice";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchIngredients())
    }, [dispatch])

    return (
        <ModalSwitch/>
    );
}

export default App;


//TODO Раскидать компоненты на UI и прочие..
//TODO Доработать  валидацию в редактировании профиля + посмотреть на иконку она должна пропадать при клике
//TODO Удалить APP.module.css

