import { setCookie } from "./coockie"

export const saveTokens = (response) => {
    let authToken = ''
    if(response['accessToken']) {
        authToken = response['accessToken'].split('Bearer ')[1];
    }
    if(authToken) {
        setCookie('token', authToken, {expires: 1200});
    }
    if(response['refreshToken']) {
        localStorage.setItem('refreshToken', response['refreshToken']);
    }
}