import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Form.module.css'
import PropTypes from "prop-types";
const Form = ({formref, header, buttonName, children, error, onSubmit, disabled, errorMessage='При отправке формы произошла ошибка, попробуйте еще раз!'}) => {
    return (
        <>
            <form ref={formref}  className={styles.form} noValidate>
                <h2 className="text text_type_main-medium">{header}</h2>
                {children}
                <div className={styles.button}>
                    <Button disabled={disabled} onClick={onSubmit} htmlType={"submit"}>{buttonName}</Button>
                </div>
                {error && <span
                    className={`${styles.submitError} text text_type_main-small`}>{errorMessage}</span>}
            </form>
        </>

    )
}
Form.propTypes = {
    formref: PropTypes.object,
    header: PropTypes.string.isRequired,
    buttonName: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.element),
    error: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
};

export default Form;