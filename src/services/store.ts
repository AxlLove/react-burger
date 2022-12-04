import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ingredientReducer from "./slices/IngerdientSlice";
import burgerConstructorReducer from './slices/burgerConstructorSlice'
import orderReducer from './slices/orderSlice'
import IngredientInfoReducer from './slices/ingredientInfoSlice'
import registerUserReducer from './slices/registerUserSlice'
import userReducer from './slices/userSlice'
import loginReducer from './slices/loginUserSlice'
import updateUserReducer from './slices/updateUserSlice'
import getUserReducer from './slices/getUserSlice'
import logoutUserSlice from "./slices/logoutUserSlice";

const store = configureStore({
    reducer: {
        ingredients: ingredientReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        info: IngredientInfoReducer,
        user: userReducer,
        userRegister: registerUserReducer,
        userLogin: loginReducer,
        updateUser: updateUserReducer,
        getUser: getUserReducer,
        logoutUser: logoutUserSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true,
})



export default store;


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
//TODO возмоно стоит вынести экшены из слайсов