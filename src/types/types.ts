export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
}


export interface IIngredientWithUniqueId extends IIngredient {
    dragId: string;
}

export interface IOrder {
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

export type TIngredientType = 'bun' | 'sauce' | 'main';
export type TIngredientName = 'Булки' | 'Соусы' | 'Начинки';

export enum WebSocketStatus {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    CONNECTING = 'CONNECTING',
}