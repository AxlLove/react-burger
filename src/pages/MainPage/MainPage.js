import AppHeader from "../../components/AppHeader/AppHeader";
import Preloader from "../../components/Preloader/Preloader";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import React from "react"
import {useSelector} from "react-redux";
import {ingredientDataLoadSelector} from "../../services/selectors/ingrediensSelectors";
import styles from './MainPage.module.css';


const MainPage = () => {
    const onLoad = useSelector(ingredientDataLoadSelector)

    return (
            <div className={styles.main}>
                {
                    onLoad ? <Preloader style={{marginTop: '300px'}}/> :
                        <>
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients/>
                                <BurgerConstructor/>
                            </DndProvider>
                        </>
                }
            </div>
    )
}

export default MainPage;