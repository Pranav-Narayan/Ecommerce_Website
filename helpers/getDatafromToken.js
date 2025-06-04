import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function getDatafromToken(request) {
    try {
        // encoded token
        const token = request.cookies.set('Token')?.value || ""
        // decoded token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;

    } catch (error) {
        return NextResponse.json(
            { error: error.message }
        )
    }
}