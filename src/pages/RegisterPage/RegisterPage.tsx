import Form from "../../components/Form/Form";
import {Link} from "react-router-dom";
import styles from './RegisterPage.module.css'
import React, {useRef, useState} from "react";
import {registerUser} from "../../services/slices/registerUserSlice";
import {useDispatch, useSelector} from "react-redux";
import {PasswordAuthInput} from '../../components/PasswordAuthInput/PasswordAuthInput'
import {EmailAuthInput} from "../../components/EmailAuthInput/EmailAuthInput";
import {UserNameAuthInput} from "../../components/UserNameAuthInput/UserNameAuthInput";
import {registerRequestSelector} from '../../services/selectors/registerUserSelectors';


const RegisterPage = () => {
    const ref = useRef<HTMLFormElement>(null)
    const dispatch = useDispatch()
    const {onLoad, onError, errorMessage} = useSelector(registerRequestSelector)
    const [form, setForm] = useState({
        name: "",
        email: '',
        password: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setForm({
            ...form,
            [name]: value,
        });
    };
    const handleSubmit = () => {
        if (ref.current && !ref.current.checkValidity()) {
            return
        }
        // @ts-ignore
        dispatch(registerUser(form))
    }

    return (
            <div className={`${styles.registerPage}`}>
                <Form formref={ref} header={'Регистрация'}
                      buttonName={'Зарегистрироваться'}
                      disabled={onLoad}
                      onSubmit={handleSubmit}
                      error={onError}
                      errorMessage={errorMessage}>
                    <UserNameAuthInput name={'name'} value={form.name} onChange={handleInputChange}/>
                    <EmailAuthInput name={'email'} value={form.email} onChange={handleInputChange}/>
                    <PasswordAuthInput name={'password'} value={form.password} onChange={handleInputChange}/>
                </Form>
                <div className={styles.linkContainer}>
                    <p className="text text_type_main-small text_color_inactive">Уже зарегистрированы? <Link
                        className={`text text_type_main-small ${styles.link}`} to={'/login'}>Войти</Link></p>
                </div>
            </div>
    )
}
export default RegisterPage;