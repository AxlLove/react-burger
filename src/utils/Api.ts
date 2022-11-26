import {ACCESS_TOKEN_NAME, BASE_URL, REFRESH_TOKEN_NAME} from "./constants";
import { getCookie } from "./coockie";
import {IIngredient, IIngredientWithUniqueId} from "../types/types";

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

type TReqMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';

interface IHeaders {
    [key: string]: string;
}
interface IOptions {
    method: TReqMethod;
    headers: IHeaders
    body?: string;
}

interface ISuccessfullRequest {
    success: boolean;
    message: string;
}
interface IUser {
    email: string;
    name: string;
}
interface ISuccessfullUserRequest {
        success: boolean;
        user: IUser;
        accessToken: string;
        refreshToken: string;
}
export interface ISuccesfullTokenRefresh {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}
interface ISuccessfullGetUserRequest  {
    success: boolean;
    user: IUser;
}
interface IOrder {
    createdAt: string;
    ingredients: Array<IIngredient>
    name: string;
    number: number;
    owner: {
        createdAt: string;
        name: string;
        email: string;
        updatedAt: string;
    }
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
}

interface ISuccessOrderRequest {
    name: string;
    order: IOrder;
    success: boolean;
}


const request = <T> (url: string, options: IOptions): Promise<T> => {
    return fetch(url, options).then(checkResponse)
}


export const getIngredients = () => {
    return  request<Array<IIngredient>>(`${BASE_URL}/ingredients`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
}

export const makeAnOrder = (ingredients: Array<string>) => {
    return request<ISuccessOrderRequest>(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            authorization: `Bearer ${getCookie(ACCESS_TOKEN_NAME)}`
        },
        body: JSON.stringify(ingredients)
    })
}

export const resetPasswordEmailSent = (email: string) => {
    return request<ISuccessfullRequest>(`${BASE_URL}/password-reset`, {
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
    return request<ISuccessfullRequest>(`${BASE_URL}/password-reset/reset`, {
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
    return request<ISuccessfullUserRequest>(`${BASE_URL}/auth/register`, {
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
    return request<ISuccessfullUserRequest>(`${BASE_URL}/auth/login`, {
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
    return request<ISuccessfullGetUserRequest>(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            authorization: `Bearer ${getCookie(ACCESS_TOKEN_NAME)}`
        }
    })
}
export const updateUser = (name: string, email: string, password: string) => {
    return request<ISuccessfullGetUserRequest>(`${BASE_URL}/auth/user`, {
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
    return request<ISuccessfullRequest>(`${BASE_URL}/auth/logout`, {
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
    return request<ISuccesfullTokenRefresh>(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem(REFRESH_TOKEN_NAME)
        })
    })
}


//TODO файл разрастается , можно переписать на классы и затипипизировать все в классах
//TODO !!
