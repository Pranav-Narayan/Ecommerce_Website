import { NextResponse } from "next/server";
import { connectDb } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

connectDb()

export async function POST(request) {
    try {
        const reqbody = await request.json();
        const { userId } = reqbody;

        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json(
                { message: "User not Found" },
                { status: 404 }
            )
        }
        return NextResponse.json(
            {
                cartCount: user.cartCount,
                cartList: user.cartList
            }
        )

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }
}