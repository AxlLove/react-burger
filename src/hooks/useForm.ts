import React, {useState} from "react";

export function useForm<T>(inputValues: T) {
    const [formValues, setFormValues] = useState(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setFormValues({...formValues, [name]: value});
    };
    return {formValues, handleChange, setFormValues};
}