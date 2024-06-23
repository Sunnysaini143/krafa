import { createSlice } from "@reduxjs/toolkit";
 
export const authenticateSlice=createSlice({
    initialState:false,
    name:"authentication",
    reducers:{
        yesauthenticated:(state)=>true,
        notauthenticated:(state)=>false,
        setauthentication:(state, action)=>action.payload
    }
});
export const {yesauthenticated, notauthenticated,setauthentication} = authenticateSlice.actions;
export default authenticateSlice.reducer;