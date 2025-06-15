import { NextResponse } from "next/server";
import { connectDb } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

connectDb()

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { userId, cartItems, cartCount } = reqBody;
        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        const updatedCart = [...user.cartList, ...cartItems]
        const updateCount = user.cartCount + cartCount
        user.cartList = updatedCart;
        user.cartCount = updateCount;
        await user.save();

        console.log("Cart updated", user)
        return NextResponse.json({ message: "Cart updated successfully", user });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }
}