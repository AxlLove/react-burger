import Form from "../../components/Form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <>
            <AppHeader/>
            <Form header={'Вход'} buttonName={'Войти'}>
                <Input type={"email"}/>
                <Input type={'password'}/>
            </Form>
            <div>
                <p>Вы— новый пользователь? <Link>Зарегестрироваться</Link></p>
                <p>Забыли пароль? <Link>Восстановить пароль</Link></p>
            </div>

        </>

    )
}
export default LoginPage;