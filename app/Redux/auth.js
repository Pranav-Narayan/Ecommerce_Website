// reducer in Redux-toolkit

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showLogin: false,
    showSignup: false,
    isAuthenticated: false,
    user: null,
    token: null,
}

const authForm = createSlice({
    name: "AuthenticalFormShow",
    initialState,
    reducers: {
        openLogin: (state, action) => {
            state.showLogin = true;
            state.showSignup = false;
        },
        closeLogin: (state, action) => {
            state.showLogin = false;
            state.showSignup = false;
        },
        openSignup: (state, action) => {
            state.showSignup = true;
            state.showLogin = false;
        },
        closeSignup: (state, action) => {
            state.showSignup = false;
            state.showLogin = false;
        },
        loginSucess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})

export const { openLogin, closeLogin, openSignup, closeSignup, loginSucess, logout } = authForm.actions;
export default authForm.reducer;
