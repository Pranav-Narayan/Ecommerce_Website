import { NextResponse } from "next/server";

export async function GET(request) {
    try {

        const response = NextResponse.json({
            message: "Logout Successfull...",
            success: true
        });
        response.cookies.set("Token", "", { httpOnly: true, expires: new Date(0) });
        return response

    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 400 })
    }
}