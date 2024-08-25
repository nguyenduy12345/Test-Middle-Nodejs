import { checkSession } from "../models/session.models.js";
import { findUserDB } from "../models/user.model.js";
const authMiddleware = {
    authentication: async (req, res, next) => {
      const { apiKey } = req.query
      try {
        if(!apiKey) throw new Error("Please login again")
        const checkApiKey = await checkSession({apiKey})
        if(!checkApiKey) throw new Error("Please login again")
        const checkApiVerify = apiKey.split('-')[3] === checkApiKey.apiKey.split('-')[3]
        if(!checkApiVerify) throw new Error("Please login again")
        const verifyApiKey = apiKey.split('-')
        const checkUser = await findUserDB({_id: verifyApiKey[1]})
        if(!checkUser) throw new Error('User not exist')
        const data = {
          userId: verifyApiKey[1],
          email: verifyApiKey[2]
        }
        req.data = data
        next()
      } catch (error) {
        res.status(401).send({
            message: error.message 
        })
      }
    }
};
export default authMiddleware;