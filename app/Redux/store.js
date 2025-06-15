// store in Redux-toolkit

import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import cartReducer from './cart'

export const store = configureStore({
    reducer: {
        showForm: authReducer,
        cart: cartReducer
    }
});