import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getDatafromToken() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('Token')?.value;

        if (!token) throw new Error("No token found");

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message);
    }
}
