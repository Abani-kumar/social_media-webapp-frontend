import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    like:false,
};

export const postSlice=createSlice({
    name:"post",
    initialState:initialState,
    reducers:{
        setLoading:(state, action)=>{
            state.loading=action.payload
        },
        setLike:(state,action)=>{
            state.like=action.payload
        }
    }
})

export const { setLoading,setLike}=postSlice.actions;
export default postSlice.reducer;