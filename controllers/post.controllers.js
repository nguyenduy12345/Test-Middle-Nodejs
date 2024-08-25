import { createPostDB, updatePostDB} from "../models/post.model.js";
import { findUserDB } from "../models/user.model.js";

export const createPost = async(req, res) => {
    const { userId } = req.data
    const { content } = req.body
    try {
        const checkUser = await findUserDB({_id: userId})
        if(!checkUser) throw new Error('User not exist')
        if(!content) throw new Error('content is required')
        const newPost = await createPostDB({
            userId,
            content
        })
        res.status(201).send({
            message: "Create Post success",
            newPost
        })
    } catch (error) {
        res.status(403).send({
            message: error.message
        })
    }
}

export const editPost = async (req, res) => {
    const { userId } = req.data
    const { postId } = req.params
    const { content } = req.body
    try {
        const post = await updatePostDB(
            {
                _id: postId,
                userId
            },
            {
                content,
                updatedAt: Date.now()
            }
        )
        if(!post) throw new Error('User not exist')
        if(!content) throw new Error('content is required')
        res.status(201).send({
            message: "Create Post success",
            post
        })
    } catch (error) {
        res.status(403).send({
            message: error.message
        })
    }
}
