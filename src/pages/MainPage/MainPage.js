import AppHeader from "../../components/AppHeader/AppHeader";
import Preloader from "../../components/Preloader/Preloader";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {ingredientDataLoadSelector} from "../../services/selectors/ingrediensSelectors";
import {fetchIngredients} from "../../services/slices/IngerdientSlice";
import styles from './MainPage.module.css';


const MainPage = () => {
    const onLoad = useSelector(ingredientDataLoadSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    return (
        <>
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
        </>
    )
}

export default MainPage;