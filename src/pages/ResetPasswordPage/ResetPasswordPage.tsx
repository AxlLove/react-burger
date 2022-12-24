import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from './ResetPasswordPage.module.css'
import React, {useState, useRef, SyntheticEvent} from "react";
import {resetPassword} from "../../utils/Api";
import {useHistory} from "react-router-dom";
import {PasswordAuthInput} from "../../components/PasswordAuthInput/PasswordAuthInput";
import {Redirect} from "react-router-dom";
import {useForm} from "../../hooks/useForm";

type TResetPasswordForm = {password: string; token: string}
const ResetPasswordPage = () => {
    const ref = useRef<HTMLFormElement>(null)
    const history = useHistory()
    const {formValues, handleChange} = useForm<TResetPasswordForm>({
        password: "",
        token: '',
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [submitErr, setSubmitErr] = useState(false)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubmitErr(false)
        handleChange(event)
    };
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        if (ref.current && !ref.current.checkValidity()) {
            return
        }
        setButtonDisabled(true)
        resetPassword(formValues.password, formValues.token).then(res => {
            history.push('/login')
        })
            .catch(res => {
                setSubmitErr(true)
            })
            .finally(() => {
                setButtonDisabled(false)
            })
    }

    if (history.location.state !== '/forgot-password') {
        return (
            <Redirect
                to={'/'}
            />
        );
    }
    return (
        <div className={`${styles.resetPasswordPage}`}>
            <Form formref={ref} header={'Восстановление пароля'}
                  buttonName={'Сохранить'}
                  disabled={buttonDisabled}
                  error={submitErr}
                  onSubmit={handleSubmit}>
                <PasswordAuthInput
                    name={'password'}
                    value={formValues.password}
                    onChange={handleInputChange}/>
                <Input name={'token'}
                       value={formValues.token}
                       onChange={handleInputChange}
                       placeholder="Введите код из письма"
                       type={"text"} required/>
            </Form>
            <div className={styles.linkContainer}>
                <p className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link
                    className={`text text_type_main-small ${styles.link}`} to='/login'>Войти</Link></p>
            </div>
        </div>
    )
}
export default ResetPasswordPage;