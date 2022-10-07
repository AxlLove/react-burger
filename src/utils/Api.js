import {BASE_URL} from "./constants";

const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`)
}

export const getIngredients = (token) => {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(checkResponse)
}