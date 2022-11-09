import {ingredientInfoSlice} from "../../services/slices/ingredientInfoSlice";
import {useHistory, useLocation, Switch, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import styles from "../App/App.module.css";
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

const ModalSwitch = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();
    let background = location.state && location.state.background;

    const handleModalClose = () => {
        dispatch(
            ingredientInfoSlice.actions.deleteIngredientInfo()
        );
        history.goBack();
    };

    return (
        <div className={styles.App}>
            <Switch location={background || location}>
                <Route exact={true} path={'/'}>
                    <MainPage/>
                </Route>
                <Route path={'/login'}>
                    <LoginPage/>
                </Route>
                <Route path={'/register'}>
                    <RegisterPage/>
                </Route>
                <Route path={'/forgot-password'}>
                    <ForgotPasswordPage/>
                </Route>
                <Route path={'/reset-password'}>
                    <ResetPasswordPage/>
                </Route>
                <ProtectedRoute path={'/profile'} exact>
                    <ProfilePage/>
                </ProtectedRoute>
                <ProtectedRoute path={'/feed'}>
                    <AppHeader/>
                </ProtectedRoute>
                <ProtectedRoute path={'/profile/orders'} exact={true}>
                    <AppHeader/>
                </ProtectedRoute>
                <Route
                    path='/ingredients/:ingredientId' exact={true}
                    children={
                        <>
                            <AppHeader/>
                            <div style={{marginTop: '100px', display: 'flex', justifyContent: "center"}}>
                                <IngredientDetails><h2 className={'text text_type_main-large'}
                                                       style={{alignSelf: 'center'}}>Детали инредиента</h2>
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
                        <IngredientDetails><h2 className={'text text_type_main-large pl-10 pt-15'}
                                               style={{alignSelf: 'start'}}>Детали инредиента</h2>
                        </IngredientDetails>
                    </Modal>
                }
            />)}

        </div>
    );
};

export default ModalSwitch;