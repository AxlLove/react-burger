import React, {FC, useRef, useState} from 'react';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

interface IUserNameAuthInput {
    value: string;
    placeholder: string;
    onChange: ()=> void;
}

export const UserNameAuthInput: FC<IUserNameAuthInput> = ({
    value,
    placeholder = 'Имя',
    onChange,
    ...rest
}) => {
    const [error, setError] = useState(false);

    const inputRef = useRef(null);


    const validateField = (value: string) => {
        setError(value.length <= 2 || value.length >= 32);
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
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            error={error}
            errorText={'Некоректное имя пользователя, длина должна быть не менее 3х символов и не превышать 32'}
            maxLength={32}
            minLength={3}
            {...rest}
        />
    );
};
