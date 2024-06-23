import { createSlice } from "@reduxjs/toolkit";
export const signedinSlice=createSlice({
    initialState:false,
    name:"signedin",
    reducers:{
        yessignedin:(state)=>true,
        notsignedin:(state)=>false
    }
})
export const {yessignedin, notsignedin}=signedinSlice.actions;
export default signedinSlice.reducer;