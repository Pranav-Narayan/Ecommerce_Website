import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: [true, "Please Provide a USERNAME"],
        unique: false,
    },
    Password: {
        type: String,
        required: [true, "Please Provide a PASSWORD"],
    },
    Email: {
        type: String,
        required: [true, "Please Provide a EMAIL"],
        unique: true,
    }
})


const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;