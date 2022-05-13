import Joi from 'joi'

const registerSchema = Joi.object({
    staff_name: Joi.string().min(3).max(30).alphanum().required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/),
    confirm_pass: Joi.string().required().valid(Joi.ref('password')),
    birth_date: Joi.date(),
    gender: Joi.string().valid('male').valid('femal').valid('Male').valid('Femal')
})



process.JOI = {
    registerSchema
}