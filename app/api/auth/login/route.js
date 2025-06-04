import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectDb } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';

connectDb()

export async function POST(request) {
    try {

        const reqBody = await request.json();
        const { Email, Password } = reqBody;

        // Email Validation
        const user = await User.findOne({ Email })
        if (!user) {
            console.log("User Not Found")
            return NextResponse.json(
                { error: "User Not Found" }, { status: 404 }
            )
        }
        // Password Validation
        const validPassword = await bcryptjs.compare(Password, user.Password)
        if (!validPassword) {
            console.log('Password Not matching')
            return NextResponse.json(
                { error: "Password Not matching" }, { status: 404 }
            )
        }

        // JWT token generation [Token data, token , token in cookie]
        // Toke data
        const tokenData = {
            id: user._id,
            username: user.Username,
            email: user.Email
        }
        //Token generation
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1h" })

        console.log("Login Completed..!")
        const response = NextResponse.json(
            {
                message: "Login Successfull",
                success: true,
                user: {
                    id: user._id,
                    username: user.Username,
                    email: user.Email
                },
            },
            { status: 200 }
        )

        //Adding token in to cookies
        response.cookies.set("Token", token, { httpOnly: true })
        return response

    } catch (error) {
        console.log("Login Error", error.message)
        return NextResponse.json(
            { error: 'Login Failed..!' },
            { status: 500 }
        )
    }
}