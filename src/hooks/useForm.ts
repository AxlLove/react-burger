import React, {useState} from "react";
interface IFormValues {
    [value: string]: string ;
}

export function useForm(inputValues: IFormValues) {
    const [formValues, setFormValues] = useState(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setFormValues({...formValues, [name]: value});
    };
    return {formValues, handleChange, setFormValues};
}