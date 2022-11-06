import React, { useEffect } from 'react';
import styles from './App.module.css';
import MainPage from "../../pages/MainPage/MainPage";
import {Switch, Route} from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LognPage";
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import {useDispatch} from 'react-redux'
import {getUser} from '../../services/slices/userSlice'
import {getCookie} from '../../utils/coockie'
import ProtetedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
    const dispatch = useDispatch()
    useEffect(()=>{
        if (!getCookie('token') || !localStorage.getItem('refreshToken')) {
            return
        }
        dispatch(getUser())
    },[dispatch])

    useEffect(()=>{
        console.log('=>',getCookie('token'))
        console.log(localStorage.getItem('=>>', 'refreshToken'))
    },[])

    return (
            <div className={styles.App}>
                <Switch>
                   <Route exact={true} path={'/'}>
                       <MainPage/>
                   </Route>
                    <Route path={'/login'}>
                        <LoginPage/>
                    </Route>
                    <Route path={'/register'}>
                        <RegisterPage/>
                    </Route>
                    <Route path={'/forgot-password'}>
                        <ForgotPasswordPage/>
                    </Route>
                    <Route path={'/reset-password'}>
                        <ResetPasswordPage/>
                    </Route>
                    <ProtetedRoute path={'/profile'}>
                        <ProfilePage/>
                    </ProtetedRoute>
                </Switch>
            </div>

    );
}

export default App;

//TODO наладить работать сслок
//TODO Наименование переменных
//TODO Обработка ошибок
//TODO Сделать кастомные инпуты +

//TODO очистить стор при выходе
//TODO Раскидать компоненты UI..

//TODO проверить работу функции refreshToken есть сомгнения

//TODO положить в костанту имя токена

//TODO все таки вынести логику из userSlice

//TODO Доработать  валидацию в редактировании профиля + посмотреть на иконку она должна пропадать при клике
//TODO Мможно переписать функциии сабмита на useCallback