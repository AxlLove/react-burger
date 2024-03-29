import React, {FC, useRef, useState} from 'react';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";


interface PasswordAuthInputProps extends Pick<React.HTMLProps<HTMLInputElement>, 'name'> {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type icon = 'HideIcon' | 'ShowIcon' | 'EditIcon';

export const PasswordAuthInput: FC<PasswordAuthInputProps> = ({
                                                                  value,
                                                                  onChange,
                                                                  ...rest
                                                              }) => {
    const [visible, setVisible] = useState(false);
    const [currentIcon, setCurrentIcon] = useState<icon>('ShowIcon');
    const [error, setError] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

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

    const validateField = (value: string) => {
        setError(value.length <= 4);
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
