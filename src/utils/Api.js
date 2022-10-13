import {BASE_URL} from "./constants";

const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response)
}

const request = (url, options) => {
    return fetch(url, options).then(checkResponse)
}

export const getIngredients = () => {
    return  request(`${BASE_URL}/ingredients`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json: charset=utf-8",
        }
    })
}

export const makeAnOrder = (ingredients) => {    
    return request(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json: charset=utf-8",
        },
        body: JSON.stringify(ingredients)
    })
}

