import React, { useRef, useState } from 'react';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";




export const NameInput = ({
    value,
    placeholder = 'Имя',
    onChange,
    size,
    icon,
    extraClass = '',
    ...rest
}) => {
    const [visible, setVisible] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(icon);
    const [fieldDisabled, setDisabled] = useState(icon === 'EditIcon');
    const [error, setError] = useState(false);

    const inputRef = useRef(null);

    const onIconClick = () => {
        if (currentIcon === 'ShowIcon') {
            setVisible(true);
            setCurrentIcon('HideIcon');
        } else {
            setDisabled(false);
            setVisible(true);
        }
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const validateField = (value) => {
        setError(value.length < 2 );
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

        if (currentIcon === 'EditIcon') {
            setDisabled(true);
        } else {
            setCurrentIcon('ShowIcon');
        }
        setVisible(false);
    };

    return (
        <Input
            type={'text'}
            placeholder={placeholder}
            onChange={onChange}
            icon={currentIcon}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            error={error}
            onIconClick={onIconClick}
            errorText={'Некоректное имя'}
            size={size === 'small' ? 'small' : 'default'}
            disabled={fieldDisabled}
            extraClass={extraClass}
            {...rest}
        />
    );
};