import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem('user'));

export const userSlice=createSlice({
    // The initial state of the slice is set to the value stored in the browser's local storage 
    // If no value exists in local storage, the user is set to null.
    name:"user",
    initialState:{
        user: storedUser ? storedUser : null
    },
    reducers:{
        login:(state,action)=>{
            state.user=action.payload; //update state with payload and saves in local storage
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout:(state)=>{
            state.user=null;
            localStorage.removeItem('user');
        }
    }
});

export const {login,logout}=userSlice.actions;

export const selectUser=(state)=> state.user.user; //The "selectUser" function is a selector that takes the
                                                   //   entire state object as an argument and returns the user property of the userSlice state.
export default userSlice.reducer;
