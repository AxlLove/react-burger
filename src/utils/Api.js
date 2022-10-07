import {BASE_URL} from "./constants";

const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`)
}

const request = (url, options) => {
    return fetch(url, options).then(checkResponse)
}

export const getIngredients = () => {
    return  request(BASE_URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
}