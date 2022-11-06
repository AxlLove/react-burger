import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import {Link} from "react-router-dom";
import styles from './LoginPage.module.css'
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {EmailAuthInput} from "../../components/EmailAuthInput/EmailAuthInput";
import {PasswordAuthInput} from "../../components/PasswordAuthInput/PasswordAuthInput";
import {loginRequestSelector} from "../../services/selectors/loginUserSelector";
import {loginUser} from "../../services/slices/loginUserSlice";

const LoginPage = () => {
    const ref = useRef()
    const dispatch = useDispatch()
    const {onLoad, onError, errorMessage} = useSelector(loginRequestSelector)
    const [state, setState] = useState({
        email: '',
        password: '',
    });


    const handleInputChange = (event) => {
        console.log(ref.current.checkValidity())
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({
            ...state,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!ref.current.checkValidity()){
            return
        }
       dispatch(loginUser(state))
    }
    return (
        <>
            <AppHeader/>
            <div className={`${styles.loginPage}`}>
                <Form formref={ref}
                      header={'Вход'}
                      buttonName={'Войти'}
                      disabled={onLoad}
                      onSubmit={handleSubmit}
                      error={onError}
                      errorMessage={errorMessage}>
                    <EmailAuthInput name={'email'} value={state.email} onChange={handleInputChange}/>
                    <PasswordAuthInput name={'password'} value={state.password} onChange={handleInputChange}/>
                </Form>
                <div className={styles.linkContainer}>
                    <p className="text text_type_main-small text_color_inactive">Вы — новый пользователь? <Link
                        className={`text text_type_main-small ${styles.link}`}
                        to={'/register'}>Зарегестрироваться</Link></p>
                    <p className="text text_type_main-small text_color_inactive">Забыли пароль? <Link
                        className={`text text_type_main-small ${styles.link}`} to={'/forgot-password'}>Восстановить
                        пароль</Link></p>
                </div>
            </div>
        </>


    )
}
export default LoginPage;