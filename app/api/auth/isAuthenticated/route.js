import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
    try {
        const token = request.cookies.get("Token")?.value || "";
        if (!token) {
            return NextResponse.json({ isAuthenticated: false }, { status: 200 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return NextResponse.json({
            isAuthenticated: true,
            user: {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email
            }
        });
    } catch (error) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
}
