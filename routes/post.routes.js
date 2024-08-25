import { Router } from "express"
import { createPost, editPost } from "../controllers/post.controllers.js"
const PostRoute = Router()

PostRoute.post('', createPost)
PostRoute.patch('/:postId', editPost)

export default PostRoute