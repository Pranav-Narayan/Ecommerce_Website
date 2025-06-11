import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectDb } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

connectDb()

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { Username, Email, Password, Phone, isVerified } = reqBody;

        // Check user Already Exist or Not
        const user = await User.findOne({ Email })
        if (user) {
            console.log('User already exists..!')
            return NextResponse.json({ error: "User Already Exists" }, { status: 300 })
        }
        // Password Hashing and new User object
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(Password, salt)

        console.log("Received data:", reqBody);
        const newUser = new User({
            Username,
            Email,
            Password: hashPassword
        })

        // console.log("Saved user==", newUser)

        console.log("Phone:", Phone, "isVerified:", isVerified);
        console.log("Before saving:", newUser);
        // Add user to db
        const savedUSer = await newUser.save()

        // console.log('User created Successfully......', savedUSer)
        return NextResponse.json({ message: "User Created Successfully", success: true, savedUSer }, { status: 200 })

    } catch (error) {
        console.error("Sign Api Error:" + error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}