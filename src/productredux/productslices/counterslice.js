import { createSlice } from "@reduxjs/toolkit";
export const counterSlice=createSlice(
    {
        initialState:0,
        name:"counter",
        reducers:{
            open:(state)=>true,
            close:(state)=>false
        }
    }
);
export const {open}=counterSlice.actions;
export const {close}=counterSlice.actions;

export default counterSlice.reducer;
