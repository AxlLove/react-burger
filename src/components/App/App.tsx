import React from 'react';
import {useState, useEffect} from "react";
import {getIngredients} from "../../utils/Api";
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function App() {
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        getIngredients().then(res => {
            setIngredients(res.data)
        })
            .catch(console.log)
    }, [])


    return (
        <div className={styles.App}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients data={ingredients}/>
                <BurgerConstructor data={ingredients}/>
            </main>
        </div>
    );
}

export default App;

