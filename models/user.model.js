import mongoose from "mongoose";
import Collections from "../utils/collections.js";

const usersSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: [true, "username is required"]
    },
    email: {
        type: String, 
        unique: true,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: true
    },
    age: Number || String,
    avatar: String || Boolean,
    role: {
        type: String,
        default: 'member',
        required: true
    }
});

const UsersModel = mongoose.model(Collections.USERS, usersSchema)

export const createUserDB = (data) => UsersModel.create(data)
export const findUserDB = (data) => UsersModel.findOne(data)
export const getUserDB = () => UsersModel.find()
export default UsersModel