import {ACCESS_TOKEN_NAME, BASE_URL, REFRESH_TOKEN_NAME} from "./constants";
import {getCookie} from "./coockie";
import {IIngredient, IOrder, IOrderDetail} from "../types/types";

type TReqMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';

interface IHeaders {
    [key: string]: string;
}

interface ISuccessfulGetIngredientRequest {
    success: boolean;
    data: Array<IIngredient>
}
interface IOptions {
    method: TReqMethod;
    headers: IHeaders
    body?: string;
}


interface ISuccessfulRequest {
    success: boolean;
    message: string;
}

interface IUser {
    email: string;
    name: string;
}

interface ISuccessfulUserRequest {
    success: boolean;
    user: IUser;
    accessToken: string;
    refreshToken: string;
}

export interface ISuccessfulTokenRefresh {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

interface ISuccessfulGetUserRequest {
    success: boolean;
    user: IUser;
}

export interface ISuccessOrderRequest {
    name: string;
    order: IOrder;
    success: boolean;
}

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const request = <T>(url: string, options: IOptions): Promise<T> => {
    return fetch(url, options).then(checkResponse)
}


export const getIngredients = () => {
    return request<ISuccessfulGetIngredientRequest>(`${BASE_URL}/ingredients`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
}

export const makeAnOrder = (ingredients: {ingredients: Array<string>}) => {
    return request<ISuccessOrderRequest>(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            authorization: `Bearer ${getCookie(ACCESS_TOKEN_NAME)}`
        },
        body: JSON.stringify(ingredients)
    })
}

export const getOrderByNumber = (number: number) => {
    return request<IOrderDetail>(`${BASE_URL}/orders/${number}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
}

export const resetPasswordEmailSent = (email: string) => {
    return request<ISuccessfulRequest>(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: email
        })
    })
}
export const resetPassword = (password: string, token: string) => {
    return request<ISuccessfulRequest>(`${BASE_URL}/password-reset/reset`, {
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
export const register = (email: string, password: string, name: string) => {
    return request<ISuccessfulUserRequest>(`${BASE_URL}/auth/register`, {
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

export const login = (email: string, password: string) => {
    return request<ISuccessfulUserRequest>(`${BASE_URL}/auth/login`, {
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
    return request<ISuccessfulGetUserRequest>(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            authorization: `Bearer ${getCookie(ACCESS_TOKEN_NAME)}`
        }
    })
}
export const updateUser = (name: string, email: string, password: string) => {
    return request<ISuccessfulGetUserRequest>(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            authorization: `Bearer ${getCookie(ACCESS_TOKEN_NAME)}`
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        })
    })
}

export const logout = () => {
    return request<ISuccessfulRequest>(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem(REFRESH_TOKEN_NAME)
        })
    })
}

export const refreshToken = () => {
    return request<ISuccessfulTokenRefresh>(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem(REFRESH_TOKEN_NAME)
        })
    })
}


//TODO файл разрастается , можно раскидать по функционалу
