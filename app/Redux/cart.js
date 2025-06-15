import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartList: [],
    cartCount: 0
}

const cartSession = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartCount += 1
            state.cartList.push({ ...action.payload, count: 1 });
        },
        updateCartCount: (state, action) => {
            state.cartCount = action.payload
        },

    }
})


export const { addToCart, updateCartCount } = cartSession.actions;
export default cartSession.reducer;