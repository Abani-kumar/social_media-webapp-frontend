import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  loading: false,
  step: 1,
  signup:null,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")): null,
  user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialstate,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setSignup:(state,action)=>{
      state.signup=action.payload; 
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser:(state,action)=>{
      state.user=action.payload
    },
  },
});

export const { setToken, setLoading, setStep,setSignup,setUser} = authSlice.actions;
export default authSlice.reducer;
