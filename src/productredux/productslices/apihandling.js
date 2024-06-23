import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState={
    data:[],
    status:"idle"
}
const apihandling=createSlice({
    name:"productes",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder 
        .addCase(getProducts.pending,(state, action)=>{
            state.status="Loading"
        })
        .addCase(getProducts.fulfilled,(state, action)=>{
            state.status = "sucess"
            state.data=action.payload;
        })
        .addCase(getProducts.rejected,(state, action)=>{
            state.status="rejected"
        })
    }
});

export const getProducts=createAsyncThunk('products,get', async()=>{
    const data=await fetch("https://fakestoreapi.com/products")
    const result= await data.json();
    return result;
})
export default apihandling.reducer;