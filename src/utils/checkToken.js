import JWT from "./jwt.js"
import pkg from 'apollo-server-express'
const { AuthenticationError } = pkg;


export default (token, agent) => {
        if (!token) {
            throw new AuthenticationError("Token is required!")
        }

        const {staff_id, devise } = JWT.verify(token)

        if (devise !== agent) {
            throw new AuthenticationError("Token is sent from wrong device!!")
        }

        return {
            staff_id
        }
}