import {BASE_URL} from "./constants";
import { getCookie } from "./coockie";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const request = (url, options) => {
    return fetch(url, options).then(checkResponse)
}

export const getIngredients = () => {
    return  request(`${BASE_URL}/ingredients`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
}

export const makeAnOrder = (ingredients) => {    
    return request(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(ingredients)
    })
}

export const resetPasswordEmailSent = (email) => {
    return request(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: email
        })
    })
}
export const resetPassword = (password, token) => {
    return request(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            password: password,
            token: token
        })
    })
}


// auth
export const register = (email, password, name) => {
    return request(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        })
    })
}

export const login = (email, password) => {
    return request(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
}

export const userRequest = () => {
    return request(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            authorization: `Bearer ${getCookie('token')}`
        }
    })
}
export const updateUser = (name, email, password) => {
    return request(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            authorization: `Bearer ${getCookie('token')}`
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        })
    })
}

export const logout = () => {
    return request(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
}

export const refreshToken = () => {
    return request(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
}

