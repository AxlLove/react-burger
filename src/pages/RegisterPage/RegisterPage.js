import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import {Link} from "react-router-dom";
import styles from './RegisterPage.module.css'

const RegisterPage = () => {
    return (
    <>
                <AppHeader/>
                <div className={`${styles.registerPage}`}>
            <Form header={'Регистрация'} buttonName={'Зарегистрироваться'}>
                <Input placeholder="Имя" type={"text"}/>
                <Input placeholder="E-mail" type={"email"}/>
                <Input placeholder="Пароль" icon="ShowIcon" type={'password'}/>
            </Form>
            <div className={styles.linkContainer}>
                <p className="text text_type_main-small text_color_inactive">Уже зарегистрированы? <Link className={`text text_type_main-small ${styles.link}`} to={'/login'}>Войти</Link></p>
            </div>
        </div>
    </>


    )
}
export default RegisterPage;