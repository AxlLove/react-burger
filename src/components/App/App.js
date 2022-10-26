import React from 'react';
import {useState, useEffect} from "react";
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Preloader from "../Preloader/Preloader";
import {fetchIngredients} from "../../services/slices/IngerdientSlice";
import {Provider, useDispatch, useSelector} from "react-redux";
import {ingredientDataLoadSelector} from "../../services/selectors/ingrediensSelectors";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend';


function App() {
    const onLoad = useSelector(ingredientDataLoadSelector)
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
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients/>
                                <BurgerConstructor/>
                            </DndProvider>
                        </>
                }
            </main>

        </div>


    );
}

export default App;
