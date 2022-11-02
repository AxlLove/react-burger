import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Form.module.css'
import AppHeader from "../AppHeader/AppHeader";
const Form = ({header, buttonName, children}) => {

    return (
        <>
            <form className={styles.form}>
                <h2 className="text text_type_main-medium">{header}</h2>
                {children}
                <div className={styles.button}>
                    <Button htmlType={"submit"}>{buttonName}</Button>
                </div>
            </form>
        </>

    )
}

export default Form;