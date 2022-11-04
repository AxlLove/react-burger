import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Form.module.css'
const Form = ({header, buttonName, children, error, onSubmit, disabled}) => {

    return (
        <>
            <form className={styles.form}>
                <h2 className="text text_type_main-medium">{header}</h2>
                {children}
                <div className={styles.button}>
                    <Button disabled={disabled} onClick={onSubmit} htmlType={"submit"}>{buttonName}</Button>
                </div>
                {error && <span
                    className={`${styles.submitError} text text_type_main-small`}>При отправке формы произошла ошибка, попробуйте еще раз!</span>}
            </form>
        </>

    )
}

export default Form;