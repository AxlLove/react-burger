import {combineReducers, configureStore} from "@reduxjs/toolkit";
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
import feedReducer from "./slices/feedSlice";
import {createSockedMiddleware} from "./middleware/sockedMiddleware";
import {
    wsConnecting as feedWsConnecting,
    connect as feedConnect,
    disconnect as feedDisconnect,
    wsOpen as feedWsOpen,
    wsClose as feedWsClose,
    wsError as feedWsError,
    wsMessage as feedWsMessage
} from './slices/feedSlice'
import {Middleware} from "redux";

const wsActions = {
    wsConnecting: feedWsConnecting,
    connect: feedConnect,
    disconnect: feedDisconnect,
    wsOpen: feedWsOpen,
    wsClose: feedWsClose,
    wsError: feedWsError,
    wsMessage: feedWsMessage,
}
const sockedMiddleware = createSockedMiddleware(wsActions)

const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    info: IngredientInfoReducer,
    user: userReducer,
    userRegister: registerUserReducer,
    userLogin: loginReducer,
    updateUser: updateUserReducer,
    getUser: getUserReducer,
    logoutUser: logoutUserSlice,
    feed: feedReducer,
})
//TODO вынести в отдельный файл
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(sockedMiddleware).concat(thunk),
    devTools: true,
})


export default store;

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;
//TODO возмоно стоит вынести экшены из слайсов