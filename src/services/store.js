import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ingredientReducer from "./slices/IngerdientSlice";
import burgerConstructorReducer from './slices/burgerConstructorSlice'
import orderReducer from'./slices/orderSlice'
import IngredientInfoReducer from'./slices/ingredientInfoSlice'
import userReducer from './slices/userSlice'
const store = configureStore({
    reducer: {
        ingredients: ingredientReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        info: IngredientInfoReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true,
})

export default store;

//TODO возмоно стоит вынести экшены из слайсов