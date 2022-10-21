import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ingredientReducer from "./slices/IngerdientSlice";


const store = configureStore({
    reducer: {
        ingredients: ingredientReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true,
})

export default store;