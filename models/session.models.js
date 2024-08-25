import mongoose from "mongoose";

import Collections from "../utils/collections.js";
const sessionSchema = new mongoose.Schema({
    apiKey: {
        type: String,
        required: true
    }
})

const SessionModal = mongoose.model(Collections.SESSION, sessionSchema)

export const saveSession = (apiKey) => SessionModal.create(apiKey)
export const checkSession = (apiKey) =>  SessionModal.findOne(apiKey)

export default SessionModal