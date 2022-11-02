import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import {Link} from "react-router-dom";
import styles from './ResetPasswordPage.module.css'

const ResetPasswordPage = () => {
    return (
    <>
                <AppHeader/>
                <div className={`${styles.resetPasswordPage}`}>
            <Form header={'Восстановление пароля'} buttonName={'Сохранить'}>
                <Input placeholder="Введите новый пароль" icon="ShowIcon" type={'password'}/>
                <Input placeholder="Введите код из письма" type={"text"}/>
            </Form>
            <div className={styles.linkContainer}>
                <p className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link className={`text text_type_main-small ${styles.link}`}>Войти</Link></p>
            </div>
        </div>
    </>


    )
}
export default ResetPasswordPage;