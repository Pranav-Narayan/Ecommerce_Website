// store in Redux-toolkit

import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'

export const store = configureStore({
    reducer: {
        showForm: authReducer,
    }
});