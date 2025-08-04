import { createSlice } from "@reduxjs/toolkit";


const formRowDataSlice = createSlice({
    name: 'formRowData',
    initialState: {
        selectedRow: null
    },
    reducers:{
        setRowData(state, action) {
            state.selectedRow = action.payload
        },
        clearRowData(state){
          state.selectedRow = null;
        }
    }
})

export const {setRowData , clearRowData} = formRowDataSlice.actions;
export default formRowDataSlice.reducer