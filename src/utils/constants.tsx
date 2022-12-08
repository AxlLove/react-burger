export const BASE_URL = 'https://norma.nomoreparties.space/api'


export const ACCESS_TOKEN_NAME = 'token'
export const REFRESH_TOKEN_NAME = 'refreshToken'

export const TOKEN_LIFETIME = 2400

export enum orderStatus {
    done= 'Выполнен',
    preparing = 'Готовится',
    created = 'Создан'
}
// export const BUN_INGREDIENT_TYPE = 'Булки'
// export const SAUCE_INGREDIENT_TYPE = 'Соусы'
// export const MAIN_INGREDIENT_TYPE = 'Начинки'