import { ValidationError } from "apollo-server-express";
import sha256 from 'sha256'
import JWT from '../../utils/jwt.js'
import model from './model.js'


export default {
    Mutation: {
        register: async function (_, args, {headers}){
            let data = process.JOI.registerSchema.validate(args)

            if(data.error) {
                throw new ValidationError(data.error.message)
            }else {
                delete args.confirm_pass
                args.gender.toLowerCase() === 'male' ? args.gender = 1 : args.gender = 2
                args.password = sha256(args.password)

                const staff = await model.registerStaffs(args)
                delete staff.password
                const token = JWT.sign({ staff_id: staff.staff_id,  devise: headers['user-agent']})

                return {
                    status: 200,
                    message: "The user successfully registered!",
                    data: staff,
                    token
                }
            }
        },

        login: async function (_, args, {headers}) {
            args.password = sha256(args.password)
            const staff = await model.loginStaff(args)
            
            if (staff) {
                const token = JWT.sign({ staff_id: staff.staff_id,  devise: headers['user-agent']})
                return {
                    status: 200,
                    message: "The user successfully logged in!",
                    data: staff,
                    token
                } 
            }
            return {
                status: 404,
                message: "Wrong username or password!",
                data: null
            } 
        }
    }
}