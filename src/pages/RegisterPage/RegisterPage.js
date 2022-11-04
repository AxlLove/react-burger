import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import {Link} from "react-router-dom";
import styles from './RegisterPage.module.css'
import {useState} from "react";
import {register, resetPassword} from "../../utils/Api";
import {registerUser} from "../../services/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {registerError, registerLoad} from "../../services/selectors/userSelector";

const RegisterPage = () => {
    const dispatch = useDispatch()
    const load = useSelector(registerLoad)
    const error = useSelector(registerError)
    const [state, setState] = useState({
        name: "",
        email: '',
        password: '',
    });


    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({
            ...state,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        console.log(" ятут")
        e.preventDefault()
        dispatch(registerUser(state))
    }

    return (
        <>
            <AppHeader/>
            <div className={`${styles.registerPage}`}>
                <Form header={'Регистрация'} buttonName={'Зарегистрироваться'} disabled={load} onSubmit={handleSubmit} error={error}>
                    <Input name={'name'} value={state.name} onChange={handleInputChange} placeholder="Имя" type={"text"}/>
                    <Input name={'email'} value={state.email} onChange={handleInputChange} placeholder="E-mail" type={"email"}/>
                    <Input name={'password'} value={state.password} onChange={handleInputChange} placeholder="Пароль" icon="ShowIcon" type={'password'}/>
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