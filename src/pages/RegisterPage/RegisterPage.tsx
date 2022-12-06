import Form from "../../components/Form/Form";
import {Link} from "react-router-dom";
import styles from './RegisterPage.module.css'
import React, {useRef} from "react";
import {registerUser} from "../../services/slices/registerUserSlice";
import {useDispatch, useSelector} from "react-redux";
import {PasswordAuthInput} from '../../components/PasswordAuthInput/PasswordAuthInput'
import {EmailAuthInput} from "../../components/EmailAuthInput/EmailAuthInput";
import {UserNameAuthInput} from "../../components/UserNameAuthInput/UserNameAuthInput";
import {registerRequestSelector} from '../../services/selectors/registerUserSelectors';
import {useForm} from "../../hooks/useForm";


const RegisterPage = () => {
    const ref = useRef<HTMLFormElement>(null)
    const dispatch = useDispatch()
    const {onLoad, onError, errorMessage} = useSelector(registerRequestSelector)
    const {formValues, handleChange} = useForm({
        name: "",
        email: '',
        password: '',
    })
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        if (ref.current && !ref.current.checkValidity()) {
            return
        }
        // @ts-ignore
        dispatch(registerUser(formValues))
    }

    return (
        <div className={`${styles.registerPage}`}>
            <Form formref={ref} header={'Регистрация'}
                  buttonName={'Зарегистрироваться'}
                  disabled={onLoad}
                  onSubmit={handleSubmit}
                  error={onError}
                  errorMessage={errorMessage}>
                <UserNameAuthInput name={'name'} value={formValues.name} onChange={handleChange}/>
                <EmailAuthInput name={'email'} value={formValues.email} onChange={handleChange}/>
                <PasswordAuthInput name={'password'} value={formValues.password} onChange={handleChange}/>
            </Form>
            <div className={styles.linkContainer}>
                <p className="text text_type_main-small text_color_inactive">Уже зарегистрированы? <Link
                    className={`text text_type_main-small ${styles.link}`} to={'/login'}>Войти</Link></p>
            </div>
        </div>
    )
}
export default RegisterPage;