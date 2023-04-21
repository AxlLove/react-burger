import {createSlice} from "@reduxjs/toolkit";
import {constructorSlice} from "./burgerConstructorSlice";

interface IWidth {
    width: number | string
}
const sliceName = 'width'

const initialState: IWidth = {
    width: window.innerWidth,
};


export const widthSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        getWidths: (state, action) => {
            state.width = action.payload
        },
    },
})

export const {getWidths} = widthSlice.actions;
const {reducer} = widthSlice;

export default reducer
