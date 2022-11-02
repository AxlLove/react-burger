import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import {Link} from "react-router-dom";
import styles from './ForgotPasswordPage.module.css'

const ForgotPasswordPage = () => {
    return (
    <>
                <AppHeader/>
                <div className={`${styles.forgotPasswordPage}`}>
            <Form header={'Восстановление пароля'} buttonName={'Восстановить'}>
                <Input placeholder="E-mail" type={"Укажите e-mail"}/>
            </Form>
            <div className={styles.linkContainer}>
                <p className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link className={`text text_type_main-small ${styles.link}`}>Войти</Link></p>
            </div>
        </div>
    </>


    )
}
export default ForgotPasswordPage;