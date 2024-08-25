import mongoose from "mongoose";
import Collections from "../utils/collections.js";

const postsSchema = new mongoose.Schema({
    userId: String,
    content: {
        type: String,
        required: [true, "content is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: '',
    },
    isPublic: Boolean
})

const PostsModel = mongoose.model(Collections.POSTS, postsSchema)

export const createPostDB = (data) => PostsModel.create(data)
export const findPostDB = (info) => PostsModel.findOne(info)
export const updatePostDB = (...args) => PostsModel.findOneAndUpdate(...args)

export default PostsModel