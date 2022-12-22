import {OrderResponseStatus} from "../utils/constants";

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
export type TOrderResponseStatus = 'done' | 'pending' | 'created' | string | undefined
export interface IOrder {
    status: TOrderResponseStatus;
    ingredients: Array<IIngredient>
    name: string;
    number: number;
    owner?: {
        createdAt: string;
        name: string;
        email: string;
        updatedAt: string;
    }
    price: number;
    createdAt: string;
    updatedAt: string;
    _id: string;
}

export interface IFeedOrder extends Omit<IOrder, "ingredients" | 'price'> {
    ingredients: Array<string>;
}

export interface IOrderDetail {
    success: boolean;
    orders: Array<IFeedOrder>;
}

export interface IWsFeedOrders {
    success: boolean;
    orders: Array<IFeedOrder>
    total: number;
    totalToday: number;
}

export type TIngredientType = 'bun' | 'sauce' | 'main';
export type TIngredientName = 'Булки' | 'Соусы' | 'Начинки';

export enum WebSocketStatus {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    CONNECTING = 'CONNECTING',
}