import { configureStore } from "@reduxjs/toolkit";

import userReducer from '../loginFeatures/userSlice';
export default configureStore({
    reducer:{
        user:userReducer,
    }
})
