import { createSlice } from "@reduxjs/toolkit";
const data={}
    // name:"",
    // email:"",
    // phoneNo:"",
    // address:"",
    // imageurl:""
// }
export const credentialSlice=createSlice({
    initialState:data,
    name:"credential",
    reducers:{
        addcredential:(state,action)=>{
            state.data=action.payload;
        }
    }

})
export const {addcredential}=credentialSlice.actions;
export default credentialSlice.reducer;