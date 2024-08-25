import { checkSession } from "../models/session.models.js";

const authMiddleware = {
    authentication: async (req, res, next) => {
      const { apiKey } = req.query
      try {
        if(!apiKey) throw new Error("who are you?")
        const checkApiKey = await checkSession({apiKey})
        if(checkApiKey){
          const verifyApiKey = checkApiKey.apiKey.split('-')
          const data = {
          userId: verifyApiKey[1],
          email: verifyApiKey[2]
        }
        req.data = data
        next()
        return;
        }else{
          throw new Error("who are you?")
        }
      } catch (error) {
        res.status(403).send({
            message: error.message
        })
      }
    }
};
export default authMiddleware;