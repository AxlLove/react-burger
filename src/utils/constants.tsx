export const BASE_URL = 'https://norma.nomoreparties.space/api'
export const WS_URL_ALL_ORDERS = 'wss://norma.nomoreparties.space/orders/all'

export const ACCESS_TOKEN_NAME = 'token'
export const REFRESH_TOKEN_NAME = 'refreshToken'

export const TOKEN_LIFETIME = 2400

export enum OrderStatus {
    DONE= 'Выполнен',
    PENDING = 'Готовится',
    CREATED = 'Создан'
}

export enum ordersStatuses {
    done = 'done',
    pending = 'pending',
    created = 'created'
}
//TODO переименовать

// export const BUN_INGREDIENT_TYPE = 'Булки'
// export const SAUCE_INGREDIENT_TYPE = 'Соусы'
// export const MAIN_INGREDIENT_TYPE = 'Начинки'    