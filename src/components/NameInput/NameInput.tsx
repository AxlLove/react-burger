import React, {FC, useRef, useState} from 'react';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";


interface INameInput {
    value: string;
    placeholder?: string | 'E-mail';
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    size: 'small' | 'default';
    icon: 'HideIcon' | 'ShowIcon' | 'EditIcon';
    extraClass: string;
}


export const NameInput: FC<INameInput> = ({
                              value,
                              placeholder = 'Имя',
                              onChange,
                              size,
                              icon,
                              extraClass = '',
                              ...rest
                          }) => {

    const [currentIcon, setCurrentIcon] = useState(icon);
    const [fieldDisabled, setDisabled] = useState(icon === 'EditIcon');
    const [error, setError] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const onIconClick = () => {
        if (currentIcon === 'ShowIcon') {
            setCurrentIcon('HideIcon');
        } else {
            setDisabled(false);
        }
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const validateField = (value: string) => {
        setError(value.length < 2);
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

        if (currentIcon === 'EditIcon') {
            setDisabled(true);
        } else {
            setCurrentIcon('ShowIcon');
        }
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
