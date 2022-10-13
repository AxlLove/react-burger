import React from 'react';
import {useState, useEffect, useReducer} from "react";
import {getIngredients} from "../../utils/Api";
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import {IngredientContext} from "../../contexts/ingredientContext";


function App() {
    const [selectedBun, setSelectedBun] = useState({})
    const [otherIngredients, setOtherIngredients] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [constructorData, setConstructorData] = useState([])
    const [price, setPrice] = useState(0)

    useEffect(() => {
        getIngredients().then(res => {
            setIngredients(res.data)
            const bun = res.data.find(item=> item.type === 'bun')
            setSelectedBun(bun)
            setConstructorData([bun, bun])
            setPrice(bun.price + bun.price)
        })
            .catch(console.log)
    }, [])

    useEffect(()=>{
        setConstructorData([selectedBun, ...otherIngredients, selectedBun])
        console.log(constructorData)
        console.log(price)
    }, [otherIngredients, selectedBun])

    useEffect(()=> {
       const totalPrice = constructorData.reduce((acc, item) => acc + item.price,0)
        setPrice(totalPrice)
    }, [constructorData])

    const addIngredientToCart = (ingredient) => {
        if (ingredient.type === 'bun') {
            setSelectedBun(ingredient)
            return
        }
        setOtherIngredients([...otherIngredients, ingredient])
    }



    return (
        <IngredientContext.Provider value={{constructorData, setConstructorData, price}}>
            <div className={styles.App}>
                <AppHeader/>
                <main className={styles.main}>
                    <BurgerIngredients data={ingredients} addIngredientToCart={addIngredientToCart}/>
                    <BurgerConstructor data={ingredients}/>
                </main>
            </div>
        </IngredientContext.Provider>

    );
}

export default App;

//TODO подчистить тест код