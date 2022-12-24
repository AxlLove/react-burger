export const BASE_URL = 'https://norma.nomoreparties.space/api'
export const WS_URL_ALL_ORDERS = 'wss://norma.nomoreparties.space/orders/all'
export const WS_USER_URL = 'wss://norma.nomoreparties.space/orders'

export const ACCESS_TOKEN_NAME = 'token'
export const REFRESH_TOKEN_NAME = 'refreshToken'

export const TOKEN_LIFETIME = 4800

export enum OrderStatus {
    DONE = 'Выполнен',
    PENDING = 'Готовится',
    CREATED = 'Создан'
}

export enum OrderResponseStatus {
    DONE = 'done',
    PENDING = 'pending',
    CREATED = 'created'
}

export enum IngredientTypeRU {
    BUN_INGREDIENT_TYPE_RU = 'Булки',
    SAUCE_INGREDIENT_TYPE_RU = 'Соусы',
    MAIN_INGREDIENT_TYPE_RU = 'Начинки'
}

export enum IngredientTypeEng {
    BUN_INGREDIENT_TYPE_ENG = 'bun',
    SAUCE_INGREDIENT_TYPE_ENG = 'sauce',
    MAIN_INGREDIENT_TYPE_ENG = 'main'
}

export enum WebSocketStatus {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    CONNECTING = 'CONNECTING',
}