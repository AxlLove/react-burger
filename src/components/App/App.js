import React from 'react';
import {useState, useEffect} from "react";
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Preloader from "../Preloader/Preloader";
import {fetchIngredients} from "../../services/slices/IngerdientSlice";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const onLoad = useSelector(store=> store.ingredients.onLoad)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])


    return (

        <div className={styles.App}>
            <AppHeader/>
            <main className={styles.main}>
                {
                    onLoad ? <Preloader/> :
                        <>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </>
                }
            </main>

        </div>


    );
}

export default App;

//TODO подчистить тест код