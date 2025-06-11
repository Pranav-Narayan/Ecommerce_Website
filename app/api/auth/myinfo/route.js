import { NextResponse } from "next/server";
import { getDatafromToken } from "@/helpers/getDatafromToken";
import User from '@/models/userModel';
import { connectDb } from '@/dbConfig/dbConfig';

connectDb();

export async function GET() {
    try {
        const userId = await getDatafromToken();
        const user = await User.findById(userId).select("-password");

        return NextResponse.json(
            { message: "User found", Data: user }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}
