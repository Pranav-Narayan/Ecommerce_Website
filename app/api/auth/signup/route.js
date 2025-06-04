import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectDb } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

connectDb()

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { Username, Email, Password } = reqBody;

        // Check user Already Exist or Not
        const user = await User.findOne({ Email })
        if (user) {
            console.log('User already exists..!')
            return NextResponse.json({ error: "User Already Exists" }, { status: 300 })
        }
        // Password Hashing and new User object
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(Password, salt)
        const newUser = new User({
            Username,
            Email,
            Password: hashPassword,
        })
        // Add user to db
        const savedUSer = await newUser.save()

        console.log('User created Successfully......', savedUSer)
        return NextResponse.json({ message: "User Created Successfully", success: true, savedUSer }, { status: 200 })

    } catch (error) {
        console.error("Sign Api Error:" + error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// export async function POST(request) {
//     try {
//         const reqBody = await request.json();
//         const { Username, Email, Password } = reqBody;
//         console.log(reqBody)

//         // check if User already exit
//         const user = await User.findOne({ Email })
//         if (user) {
//             console.log('User already exists..!')
//             return NextResponse.json({ error: "User Already Exists" }, { status: 400 })
//         }
//         // password hashing
//         const salt = await bcryptjs.genSalt(10)
//         const hashPassword = await bcryptjs.hash(Password, salt)
//         // new userinfo 
//         const newUser = new User({
//             Username,
//             Email,
//             Password: hashPassword,
//         })
//         const savedUSer = await newUser.save()
//         console.log('User created Successfully......', savedUSer)
//         return NextResponse.json({ message: "User Created Successfully", success: true, savedUSer }, { status: 200 })

//     } catch (error) {
//         console.error("Sign Api Error:" + error)
//         return NextResponse.json({ error: error.message }, { status: 500 })
//     }
// }