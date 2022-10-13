import React, { useLayoutEffect } from 'react';
import {useState, useEffect, useReducer} from "react";
import {getIngredients, makeAnOrder} from "../../utils/Api";
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
    const [orderDetails, setOrderDetails] = useState({})
    const [burgerConstructorModalOpen, setBurgerConstructorModalOpen] = useState(false)

    useEffect(() => {
        getIngredients().then(res => {
            setIngredients(res.data)
            const bun = res.data.find(item=> item.type === 'bun')
            setSelectedBun(bun)
            setConstructorData([bun, bun])
        })
            .catch(console.log)
    }, [])

    useEffect(()=>{
        setConstructorData([selectedBun, ...otherIngredients, selectedBun])
    }, [otherIngredients, selectedBun])

    useEffect(()=> {
       const totalPrice = constructorData.reduce((acc, item) => acc + item.price, 0)
        setPrice(totalPrice)
    }, [constructorData])

    //для теста
    const addIngredientToCart = (ingredient) => {
        if (ingredient.type === 'bun') {
            setSelectedBun(ingredient)
            return
        }
        setOtherIngredients([...otherIngredients, ingredient])
    }

    const handleMakeAnOrder = () => {
        const orderData = { "ingredients": constructorData.map(item =>  item._id) } 
        console.log('=>', orderData)
        makeAnOrder(orderData).then(res=> {
            setOrderDetails(res)
            setBurgerConstructorModalOpen(true)
        } ).catch(console.log)
    }


    return (
        <IngredientContext.Provider value={{constructorData, setConstructorData, price, selectedBun, handleMakeAnOrder, orderDetails, burgerConstructorModalOpen, setBurgerConstructorModalOpen}}>
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