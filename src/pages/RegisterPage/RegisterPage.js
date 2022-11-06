import Form from "../../components/Form/Form";
import AppHeader from "../../components/AppHeader/AppHeader";
import {Link} from "react-router-dom";
import styles from './RegisterPage.module.css'
import {useRef, useState} from "react";
import {registerUser} from "../../services/slices/registerUserSlice";
import {useDispatch, useSelector} from "react-redux";
import {PasswordAuthInput} from '../../components/PasswordAuthInput/PasswordAuthInput'
import { EmailAuthInput } from "../../components/EmailAuthInput/EmailAuthInput";
import { UserNameAuthInput } from "../../components/UserNameAuthInput/UserNameAuthInput";
import {registerRequestSelector} from '../../services/selectors/registerUserSelectors';

const RegisterPage = () => {
    const ref = useRef()
    const dispatch = useDispatch()
    const {onLoad, onError, errorMessage} = useSelector(registerRequestSelector)
    const [state, setState] = useState({
        name: "",
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
        console.log(state)
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!ref.current.checkValidity()){
            return
        }
        dispatch(registerUser(state))
    }

    return (
        <>
            <AppHeader/>
            <div className={`${styles.registerPage}`}>
                <Form formref={ref}  header={'Регистрация'}
                 buttonName={'Зарегистрироваться'}
                  disabled={onLoad}
                   onSubmit={handleSubmit}
                    error={onError}
                     errorMessage={errorMessage}>
                    <UserNameAuthInput name={'name'} value={state.name} onChange={handleInputChange}/>
                    <EmailAuthInput name={'email'} value={state.email} onChange={handleInputChange}/>
                    <PasswordAuthInput name={'password'} value={state.password} onChange={handleInputChange}/>
                </Form>
                <div className={styles.linkContainer}>
                    <p className="text text_type_main-small text_color_inactive">Уже зарегистрированы? <Link
                        className={`text text_type_main-small ${styles.link}`} to={'/login'}>Войти</Link></p>
                </div>
            </div>
        </>


    )
}
export default RegisterPage;