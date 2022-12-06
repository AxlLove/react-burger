import React, {FC, useRef, useState} from 'react';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {emailRegExp, emailRegExpPattern} from "../../utils/regExp";


interface IEmailAuthInputProps extends Pick<React.HTMLProps<HTMLInputElement>, 'pattern' | 'name'> {
    value: string;

    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const EmailAuthInput: FC<IEmailAuthInputProps> = ({
                                                             value,
                                                             onChange,
                                                             ...rest
                                                         }) => {

    const validateEmail = (email: string) => {
        return emailRegExp.test(email);
    };

    const [error, setError] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const validateField = (value: string) => {
        setError(!validateEmail(value));
    };

    const onFocus = () => {
        setError(false);
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value) {
            validateField(e.target.value);
        } else {
            setError(false);
        }
    };


    return (
        <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={onChange}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            error={error}
            errorText={'Некоректный E-mail'}
            pattern={emailRegExpPattern}
            required={true}
            {...rest}
        />
    );
};
