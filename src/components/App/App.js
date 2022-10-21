import React, {useLayoutEffect} from 'react';
import {useState, useEffect, useReducer} from "react";
import {getIngredients, makeAnOrder} from "../../utils/Api";
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import {IngredientContext} from "../../contexts/ingredientContext";
import Preloader from "../Preloader/Preloader";
import {fetchIngredients} from "../../services/slices/IngerdientSlice";
import {useDispatch} from "react-redux";

function App() {
    const [selectedBun, setSelectedBun] = useState(null)
    const [otherIngredients, setOtherIngredients] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [onLoad, setOnLoad] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        // setOnLoad(true)
        // getIngredients().then(res => {
        //     setIngredients(res.data)
        //     const bun = res.data.find(item => item.type === 'bun')
        //     setSelectedBun(bun)
        // })
        //     .catch((res) => {
        //         console.log(res)
        //     })
        //     .finally(()=>{
        //         setOnLoad(false)
        //     })
        dispatch(fetchIngredients())
    }, [dispatch])

    //для теста
    // const addIngredientToCart = (ingredient) => {
    //     if (ingredient.type === 'bun') {
    //         setSelectedBun(ingredient)
    //         return
    //     }
    //     setOtherIngredients([...otherIngredients, ingredient])
    // }

    return (

        <div className={styles.App}>
            <AppHeader/>
            <main className={styles.main}>
                {
                    onLoad ? <Preloader/> :
                        <>
                            <BurgerIngredients data={ingredients} /*addIngredientToCart={addIngredientToCart}*//>
                            <IngredientContext.Provider value={{
                                otherIngredients,
                                selectedBun,
                            }}>
                                <BurgerConstructor/>
                            </IngredientContext.Provider>
                        </>
                }
            </main>

        </div>


    );
}

export default App;

//TODO подчистить тест код