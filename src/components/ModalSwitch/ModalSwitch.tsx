import {ingredientInfoSlice} from "../../services/slices/ingredientInfoSlice";
import {useHistory, useLocation, Switch, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import MainPage from "../../pages/MainPage/MainPage";
import LoginPage from "../../pages/LoginPage/LognPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import Modal from "../Modal/Modal";
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import AppHeader from "../AppHeader/AppHeader";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import styles from './ModalSwitch.module.css'
import ProfileOrdersPage from "../../pages/ProfileOrdersPage/ProfileOrdersPage";
import OnlyUnAuthRoute from "../OnlyUnAuthRoute/OnlyUnAuthRoute";
import {FC} from "react";
import {Location} from "history"

interface ILocationState {
    background?: Location;
}

const ModalSwitch: FC = () => {
    const dispatch = useDispatch()
    const location = useLocation<ILocationState>();
    const history = useHistory();
    const background = location?.state && location?.state?.background;

    const handleModalClose = () => {
        // @ts-ignore
        dispatch(ingredientInfoSlice.actions.deleteIngredientInfo());
        history.goBack();
    };

    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                <Switch location={background || location}>
                    <Route exact={true} path={'/'}>
                        <MainPage/>
                    </Route>
                    <OnlyUnAuthRoute path={'/login'} exact={true}>
                        <LoginPage/>
                    </OnlyUnAuthRoute>
                    <OnlyUnAuthRoute path={'/register'} exact={true}>
                        <RegisterPage/>
                    </OnlyUnAuthRoute>
                    <OnlyUnAuthRoute path={'/forgot-password'} exact={true}>
                        <ForgotPasswordPage/>
                    </OnlyUnAuthRoute>
                    <OnlyUnAuthRoute path={'/reset-password'} exact={true}>
                        <ResetPasswordPage/>
                    </OnlyUnAuthRoute>
                    <ProtectedRoute path={'/profile'} exact={true}>
                        <ProfilePage/>
                    </ProtectedRoute>
                    <Route path={'/feed'} exact={true}>
                        <div/>
                    </Route>
                    <ProtectedRoute path={'/profile/orders'} exact={true}>
                        <ProfileOrdersPage/>
                    </ProtectedRoute>
                    <Route
                        path='/ingredients/:ingredientId' exact={true}
                        children={
                        //TODO можно добавить прелоадер
                            <>
                                <div className={styles.ingredientPageContainer}>
                                    <IngredientDetails><h2
                                        className={`text text_type_main-large ${styles.ingredientPageHeader}`}>Детали
                                        ингредиента</h2>
                                    </IngredientDetails></div>
                            </>
                        }
                    />
                    <Route path={'*'}>
                        <NotFoundPage/>
                    </Route>

                </Switch>
                {background && (<Route
                    path='/ingredients/:ingredientId' exact={true}
                    children={
                        <Modal onClose={handleModalClose}>
                            <IngredientDetails><h2
                                className={`text text_type_main-large pl-10 pt-15 ${styles.ingredientModalHeader}`}>Детали
                                ингредиента</h2>
                            </IngredientDetails>
                        </Modal>
                    }
                />)}
            </main>
        </>
    );
};

export default ModalSwitch;