import React, {useLayoutEffect} from 'react';
import {useState, useEffect, useReducer} from "react";
import {getIngredients, makeAnOrder} from "../../utils/Api";
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import {IngredientContext} from "../../contexts/ingredientContext";
import Preloader from "../Preloader/Preloader";


function App() {
    const [selectedBun, setSelectedBun] = useState({})
    const [otherIngredients, setOtherIngredients] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [constructorData, setConstructorData] = useState([])
    const [price, setPrice] = useState(0)
    const [orderDetails, setOrderDetails] = useState({})
    const [burgerConstructorModalOpen, setBurgerConstructorModalOpen] = useState(false)
    const [onLoad, setOnLoad] = useState(false)

    useEffect(() => {
        setOnLoad(true)
        getIngredients().then(res => {
            setIngredients(res.data)
            const bun = res.data.find(item => item.type === 'bun')
            setSelectedBun(bun)
            setConstructorData([bun, bun])
            setPrice(bun.price * 2)
            setOnLoad(false)
        })
            .catch((res) => {
                setOnLoad(false)
                console.log(res)
            })
    }, [])

    useEffect(() => {
        setConstructorData([selectedBun, ...otherIngredients, selectedBun])
    }, [otherIngredients, selectedBun])

    useEffect(() => {
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
        const orderData = {"ingredients": constructorData.map(item => item._id)}
        makeAnOrder(orderData).then(res => {
            setOrderDetails(res)
            setBurgerConstructorModalOpen(true)
        }).catch(console.log)
    }


    return (

        <div className={styles.App}>
            <AppHeader/>
            <main className={styles.main}>
                {
                    onLoad ? <Preloader/> :
                        <>
                            <BurgerIngredients data={ingredients} addIngredientToCart={addIngredientToCart}/>
                            <IngredientContext.Provider value={{
                                constructorData,
                                setConstructorData,
                                price,
                                selectedBun,
                                handleMakeAnOrder,
                                orderDetails,
                                burgerConstructorModalOpen,
                                setBurgerConstructorModalOpen
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