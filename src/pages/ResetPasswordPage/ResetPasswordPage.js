import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from './ResetPasswordPage.module.css'
import {useState, useRef} from "react";
import {resetPassword} from "../../utils/Api";
import {useHistory} from "react-router-dom";
import {PasswordAuthInput} from "../../components/PasswordAuthInput/PasswordAuthInput";
import {Redirect} from "react-router-dom";

const ResetPasswordPage = () => {
    const ref = useRef()
    const history = useHistory()
    const [form, setForm] = useState({
        password: "",
        token: '',
    });
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [submitErr, setSubmitErr] = useState(false)

    const handleInputChange = (event) => {
        setSubmitErr(false)
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setForm({
            ...form,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!ref.current.checkValidity()) {
            return
        }
        setButtonDisabled(true)
        resetPassword(form.password, form.token).then(res => {
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
                        value={form.password}
                        onChange={handleInputChange}/>
                    <Input name={'token'}
                           value={form.token}
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