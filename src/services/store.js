import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ingredientReducer from "./slices/IngerdientSlice";
import burgerConstructorReducer from './slices/burgerConstructorSlice'
import orderReducer from'./slices/orderSlice'
import IngredientInfoReducer from'./slices/ingredientInfoSlice'
import registerUserReducer from './slices/registerUserSlice'
import userReducer from './slices/userSlice'
import loginReducer from './slices/loginUserSlice'
import updateUserReducer from './slices/updateUserSlice'
const store = configureStore({
    reducer: {
        ingredients: ingredientReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        info: IngredientInfoReducer,
        userRegister: registerUserReducer,
        user: userReducer,
        userLogin: loginReducer,
        updateUser: updateUserReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true,
})

export default store;

//TODO возмоно стоит вынести экшены из слайсов