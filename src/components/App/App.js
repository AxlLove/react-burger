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

function App() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUser())
    },[dispatch])

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
                    <Route path={'/profile'}>
                        <ProfilePage/>
                    </Route>
                </Switch>
            </div>

    );
}

export default App;

//TODO наладить работать сслок
//TODO Наименование переменных
//TODO Обработка ошибок
//TODO Сделать кастомные инпуты

//TODO очистить стор при выходе
// Раскидать компоненты UI..