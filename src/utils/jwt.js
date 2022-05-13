import JWT from 'jsonwebtoken'


export default {
    sign: payload => JWT.sign(payload, process.env.PG_JWT_SECRET, { expiresIn: '5h' }),
    verify: token => JWT.verify(token, process.env.PG_JWT_SECRET)
}
