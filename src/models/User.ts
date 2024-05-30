import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const User = mongoose.models.users   || mongoose.model('users', postSchema)

export default User