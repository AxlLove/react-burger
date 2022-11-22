import Form from "../../components/Form/Form";
import {Link} from "react-router-dom";
import styles from './ForgotPasswordPage.module.css'
import {useState, useRef} from "react";
import {resetPasswordEmailSent} from "../../utils/Api";
import {useHistory} from "react-router-dom";
import {EmailAuthInput} from "../../components/EmailAuthInput/EmailAuthInput";
import {emailRegExp} from "../../utils/regExp";

const ForgotPasswordPage = () => {
    const ref = useRef()
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [submitErr, setSubmitErr] = useState(false)

    const onChange = (e) => {
        setSubmitErr(false)
        setEmail(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (!ref.current.checkValidity()) {
            return
        }
        setButtonDisabled(true)
        resetPasswordEmailSent(email)
            .then(res => {
                history.push('/reset-password', history.location.pathname)
            })
            .catch(res => {
                setSubmitErr(true)
            })
            .finally(() => {
                setButtonDisabled(false)
            })
    }

    return (
            <div className={`${styles.forgotPasswordPage}`}>
                <Form formref={ref} header={'Восстановление пароля'}
                      buttonName={'Восстановить'}
                      error={submitErr}
                      onSubmit={onSubmit}
                      disabled={buttonDisabled}>
                    <EmailAuthInput pattern={emailRegExp} value={email} onChange={onChange}/>
                </Form>
                <div className={styles.linkContainer}>
                    <p className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link
                        className={`text text_type_main-small ${styles.link}`} to={'/login'}>Войти</Link></p>
                </div>
            </div>

    )
}
export default ForgotPasswordPage;