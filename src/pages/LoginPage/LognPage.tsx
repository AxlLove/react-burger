import Form from "../../components/Form/Form";
import {Link} from "react-router-dom";
import styles from './LoginPage.module.css'
import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {EmailAuthInput} from "../../components/EmailAuthInput/EmailAuthInput";
import {PasswordAuthInput} from "../../components/PasswordAuthInput/PasswordAuthInput";
import {loginRequestSelector} from "../../services/selectors/loginUserSelector";
import {loginUser} from "../../services/slices/loginUserSlice";
import {useForm} from "../../hooks/useForm";


const LoginPage = () => {
    const ref = useRef<HTMLFormElement>(null)
    const dispatch = useDispatch()
    const {onLoad, onError, errorMessage} = useSelector(loginRequestSelector)


    const {formValues, handleChange} = useForm({
        email: '',
        password: '',
    })
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        if(ref.current && !ref.current.checkValidity()){
            return
        }
                // @ts-ignore
       dispatch(loginUser(formValues))
    }


    return (
            <div className={`${styles.loginPage}`}>
                <Form formref={ref}
                      header={'Вход'}
                      buttonName={'Войти'}
                      disabled={onLoad}
                      onSubmit={handleSubmit}
                      error={onError}
                      errorMessage={errorMessage}>
                    <EmailAuthInput name={'email'} value={formValues.email} onChange={handleChange}/>
                    <PasswordAuthInput name={'password'} value={formValues.password} onChange={handleChange}/>
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

    )
}
export default LoginPage;