import React, { useRef, useState } from 'react';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";




export const UserNameAuthInput = ({
    value,
    placeholder = 'Имя',
    onChange,
    ...rest
}) => {
    const [error, setError] = useState(false);

    const inputRef = useRef(null);


    const validateField = (value) => {
        setError(value.length <= 2 || value.length >= 32);
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
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            error={error}
            errorText={'Некоректное имя пользователя'}
            maxLength={32}
            minLength={3}
            {...rest}
        />
    );
};

UserNameAuthInput.propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};