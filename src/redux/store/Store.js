import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slices/auth";
import { postSlice } from "../slices/post";

const rootreducer=combineReducers({
    auth:authSlice.reducer,
    post:postSlice.reducer,
})

export default rootreducer