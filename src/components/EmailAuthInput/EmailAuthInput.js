import React, { useRef, useState } from 'react';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {emailRegExp, emailRegExpPattern} from "../../utils/regExp";
import PropTypes, {string} from "prop-types";



export const EmailAuthInput = ({
    value,
    placeholder = 'E-mail',
    onChange,
    ...rest
}) => {

    const validateEmail = (email) => {;
        return emailRegExp.test(email);
    };
    const [error, setError] = useState(false);

    const inputRef = useRef(null);


    const validateField = (value) => {
        setError(!validateEmail(value));
    };

    const onFocus = () => {
        setError(false);
    };

    const onBlur = (e) => {
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

EmailAuthInput.propTypes = {
    value: string.isRequired,
    placeholder: string,
    onChange: PropTypes.func.isRequired,
};