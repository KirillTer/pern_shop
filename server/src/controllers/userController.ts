import ApiError from '../error/ApiError'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User, Basket} from '../models/models'

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

const UserController = {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('User already exist'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const { dataValues }  = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: dataValues.id})
        const token = generateJwt(dataValues.id, dataValues.email, dataValues.role)
        return res.json({token})
    },

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.forbidden('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.dataValues.password)
        if (!comparePassword) {
            return next(ApiError.forbidden('Incorrect password'))
        }
        const token = generateJwt(user.dataValues.id, user.dataValues.email, user.dataValues.role)
        return res.json({token})
    },

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

export default UserController