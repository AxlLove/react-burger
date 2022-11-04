import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import {Link} from "react-router-dom";
import styles from './LoginPage.module.css'

const LoginPage = () => {
    return (
    <>
                <AppHeader/>
                <div className={`${styles.loginPage}`}>
            <Form header={'Вход'} buttonName={'Войти'}>
                <Input placeholder="E-mail" type={"email"}/>
                <Input placeholder="Пароль" icon="ShowIcon" type={'password'}/>
            </Form>
            <div className={styles.linkContainer}>
                <p className="text text_type_main-small text_color_inactive">Вы — новый пользователь? <Link className={`text text_type_main-small ${styles.link}`} to={'/register'}>Зарегестрироваться</Link></p>
                <p className="text text_type_main-small text_color_inactive">Забыли пароль? <Link className={`text text_type_main-small ${styles.link}`} to={'/forgot-password'}>Восстановить пароль</Link></p>
            </div>
        </div>
    </>


    )
}
export default LoginPage;