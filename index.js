import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

import UserRoute from "./routes/user.routes.js"
import PostRoute from "./routes/post.routes.js"
import { findUserDB, createUserDB } from "./models/user.model.js"
import { saveSession } from "./models/session.models.js"
import authMiddleware from "./middlewares/auth.middlewares.js"

await mongoose.connect(process.env.MONGO_URL)
console.log('connected!')

const app = express()
app.use(express.json())

const SALT_ROUNDS = 10
app.post('/api/v1/register', async(req, res) => {
    const {userName, email, password} = req.body
    try {
        if(!userName | !email | !password) throw new Error('enter your info')
        const checkUser = await findUserDB({email})
        if(checkUser) throw new Error("account is existed")
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const hash = bcrypt.hashSync(password, salt);   
        const newUser = await createUserDB({
            userName,
            email,
            password: hash
        })
        res.status(201).send({
            message: "Created success",
            newUser
        })
    } catch (error) {
        res.status(403).send({
            message: error.message
        })
    }
})

app.post('/api/v1/login', async(req, res) => {
    const {email, password} = req.body
    try {
        if(!email || !password) throw new Error('enter your info')
        const findUser = await findUserDB({email})
        if(!findUser) throw new Error("account not exist")
        const checkPassword = bcrypt.compareSync(password, findUser.password)
        const apiKey = `mern-${findUser._id}-${findUser.email}-${uuidv4()}`
        if(checkPassword){
            await saveSession({apiKey})
            res.status(201).send({
                message: "Login success",
                apiKey
            })
        }
    } catch (error) {
        res.status(403).send({
            message: error.message
        })
    }
})

const port = process.env.PORT || 8080
app.use(authMiddleware.authentication)

app.use('/api/v1/users', UserRoute)
app.use('/api/v1/posts', PostRoute)

app.listen(port, (err) => {
    if(err) throw new Error(err)
    console.log(`Server is running! ${port}`)
})