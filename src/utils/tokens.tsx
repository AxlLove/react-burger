import { TOKEN_LIFETIME } from "./constants";
import { setCookie } from "./coockie"

export const saveTokens = (response) => {
    let authToken = ''
    if(response['accessToken']) {
        authToken = response['accessToken'].split('Bearer ')[1];
    }
    if(authToken) {
        setCookie('token', authToken, {expires: TOKEN_LIFETIME});
    }
    if(response['refreshToken']) {
        localStorage.setItem('refreshToken', response['refreshToken']);
    }
}

//TODO вернуться после API