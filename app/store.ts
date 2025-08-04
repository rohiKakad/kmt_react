import { configureStore } from "@reduxjs/toolkit";
import formRowDataReducer from "./features/form/createSlice"


export const store = configureStore({
    reducer:{
        formRowData: formRowDataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;