import React from 'react';
import {useState, useEffect, useReducer} from "react";
import {getIngredients} from "../../utils/Api";
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import {IngredientContext} from "../../contexts/ingredientContext";


function App() {
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        getIngredients().then(res => {
            setIngredients(res.data)
        })
            .catch(console.log)
    }, [])


    const reducer = (state, action) => {
        //console.log(action)
        switch (action.type) {
            case 'bun':
                let bun = state.cards.findIndex(item=> item.type === 'bun')
                console.log(bun)
                if (bun !== -1) {
                    console.log('я тут')
                    state.cards.splice(bun, 1, action.card)
                    return {cards: state.cards}
                }
                return {cards : [...state.cards, action.card]}
            case 'sauce':
                return  {cards: [...state.cards, action.card]}
            case 'main':
                return  {cards: [...state.cards, action.card]}
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }

    const [state, dispatch] = useReducer(reducer, {cards: []}, undefined)

    return (
        <IngredientContext.Provider value={{state, dispatch}}>
            <div className={styles.App}>
                <AppHeader/>
                <main className={styles.main}>
                    <BurgerIngredients data={ingredients}/>
                    <BurgerConstructor data={ingredients}/>
                </main>
            </div>
        </IngredientContext.Provider>

    );
}

export default App;

