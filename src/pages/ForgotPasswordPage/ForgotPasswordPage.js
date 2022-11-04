import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import {Link} from "react-router-dom";
import styles from './ForgotPasswordPage.module.css'
import {useState} from "react";
import {resetPasswordEmailSent} from "../../utils/Api";
import {useHistory} from "react-router-dom";

const ForgotPasswordPage = () => {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [submitErr, setSubmitErr] = useState(false)

    const onChange = (e)=> {
        setSubmitErr(false)
        setEmail(e.target.value)
        console.log(email)
    }
    const onSubmit = (e) => {
        console.log(" ятут")
        e.preventDefault()
        setButtonDisabled(true)
        resetPasswordEmailSent(email).then(res=> {
            console.log(res)
            history.push('/reset-password')
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
                <div className={`${styles.forgotPasswordPage}`}>
            <Form header={'Восстановление пароля'}
                  buttonName={'Восстановить'}
                  error={submitErr}
                  onSubmit={onSubmit}
                  disabled={buttonDisabled}>
                <Input value={email} onChange={onChange} placeholder="E-mail" type={"email"}/>
            </Form>
            <div className={styles.linkContainer}>
                <p className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link className={`text text_type_main-small ${styles.link}`} to={'/login'}>Войти</Link></p>
            </div>
        </div>
    </>


    )
}
export default ForgotPasswordPage;