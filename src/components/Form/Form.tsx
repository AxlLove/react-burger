import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Form.module.css'
import React, {FC, SyntheticEvent} from "react";

interface IForm extends React.FormHTMLAttributes<HTMLFormElement> {
    formref: React.RefObject<HTMLFormElement>;
    header: string;
    buttonName: string;
    error: boolean;
    onSubmit: (event: SyntheticEvent) => void;
    disabled?: boolean;
    errorMessage?: string;
}

const Form: FC<IForm> = ({
                             formref,
                             header,
                             buttonName,
                             children,
                             error,
                             onSubmit,
                             disabled,
                             errorMessage = 'При отправке формы произошла ошибка, попробуйте еще раз!'
                         }) => {
    return (
            <form ref={formref} className={styles.form} noValidate onSubmit={onSubmit}>
                <h2 className="text text_type_main-medium">{header}</h2>
                {children}
                <div className={styles.button}>
                    <Button disabled={disabled} htmlType={"submit"}>{buttonName}</Button>
                </div>
                {error && <span
                    className={`${styles.submitError} text text_type_main-small`}>{errorMessage}</span>}
            </form>
    )
}


export default Form;