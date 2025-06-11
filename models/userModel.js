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
    },
    Phone: {
        type: String,
        required: false,
        unique: false,
        default: "000-000-00000"
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
})


const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;