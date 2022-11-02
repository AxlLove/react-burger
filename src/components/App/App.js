import React from 'react';
import styles from './App.module.css';
import MainPage from "../../pages/MainPage/MainPage";
import {Switch, Route} from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LognPage";
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
function App() {

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