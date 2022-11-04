import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import {Link} from "react-router-dom";
import styles from './ResetPasswordPage.module.css'
import {useState} from "react";
import {resetPassword} from "../../utils/Api";

const ResetPasswordPage = () => {
    const [state, setState] = useState({
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
        setState({
            ...state,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        console.log(" ятут")
        e.preventDefault()
        setButtonDisabled(true)
        resetPassword(state.password, state.token).then(res=> {
            //TODO переадресация или ответ об успехае?
            console.log(res)
        })
            .catch(res=> {
                setSubmitErr(true)
                console.log(res)
            })
            .finally(()=>{
                setButtonDisabled(false)
            })
    }

    return (
        <>
            <AppHeader/>
            <div className={`${styles.resetPasswordPage}`}>
                <Form header={'Восстановление пароля'}
                      buttonName={'Сохранить'}
                      disabled={buttonDisabled}
                      error={submitErr}
                      onSubmit={handleSubmit}>
                    <Input name={'password'}
                           value={state.password}
                           onChange={handleInputChange}
                           placeholder="Введите новый пароль"
                           icon="ShowIcon"
                           type={'password'}/>
                    <Input name={'token'}
                           value={state.token}
                           onChange={handleInputChange}
                           placeholder="Введите код из письма"
                           type={"text"}/>
                </Form>
                <div className={styles.linkContainer}>
                    <p className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link
                        className={`text text_type_main-small ${styles.link}`}>Войти</Link></p>
                </div>
            </div>
        </>


    )
}
export default ResetPasswordPage;