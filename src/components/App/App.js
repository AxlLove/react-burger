import React from 'react';
import styles from './App.module.css';
import MainPage from "../../pages/MainPage/MainPage";
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LognPage";

function App() {

    return (
        <Router>
            <div className={styles.App}>
                <Switch>
                   <Route exact={true} path={'/'}>
                       <MainPage/>
                   </Route>
                    <Route path={'/login'}>
                        <LoginPage/>
                    </Route>
                    <Route path={'/register'}>

                    </Route>
                    <Route></Route>
                    <Route></Route>
                    <Route></Route>
                </Switch>
            </div>
        </Router>

    );
}

export default App;
