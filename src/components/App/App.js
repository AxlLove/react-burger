import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {getUser} from '../../services/slices/getUserSlice'
import {getCookie} from '../../utils/coockie'
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "../../utils/constants";
import ModalSwitch from "../ModalSwitch/ModalSwitch";
import {fetchIngredients} from "../../services/slices/IngerdientSlice";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        if (!getCookie(ACCESS_TOKEN_NAME) || !localStorage.getItem(REFRESH_TOKEN_NAME)) {
            return
        }
        console.log(getCookie(ACCESS_TOKEN_NAME))
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
