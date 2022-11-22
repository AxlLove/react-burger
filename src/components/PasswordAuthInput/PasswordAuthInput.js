import React, {useRef, useState} from 'react';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";


export const PasswordAuthInput = ({
                                      value,
                                      placeholder = 'Пароль',
                                      onChange,
                                      ...rest
                                  }) => {
    const [visible, setVisible] = useState(false);
    const [currentIcon, setCurrentIcon] = useState('ShowIcon');
    const [error, setError] = useState(false);

    const inputRef = useRef(null);

    const onIconClick = () => {
        if (currentIcon === 'HideIcon') {
            setCurrentIcon('ShowIcon');
        } else {
            setVisible(true);
        }
        if (currentIcon === 'ShowIcon') {
            setCurrentIcon('HideIcon');
        } else {
            setVisible(false);
        }
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const validateField = (value) => {
        setError(value.length <= 4);
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
        setVisible(false);
        setCurrentIcon('ShowIcon')
    };

    return (
        <Input
            type={visible ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={onChange}
            icon={currentIcon}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            error={error}
            onIconClick={onIconClick}
            errorText={'Пароль должен содержать не менее пяти символов'}
            minLength={5}
            required={true}
            {...rest}
        />
    );
};

PasswordAuthInput.propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};