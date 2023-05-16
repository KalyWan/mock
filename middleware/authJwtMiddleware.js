//Middleware to add to any routes to only allow authenticated users to access them

const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

//Валидация jwt токена пользователя
const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send({
            message: 'Необходима авторизация!',
        })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Ошибка токена!',
            })
        }
        req.userId = decoded.id
        next()
    })
}
// Валидация роли администратора у пользователя
const isAdmin = async (req, res, next) => {
    try {
        User.findByPk(req.userId).then((user) => {
            user.getRoles().then((roles) => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'admin') {
                        next()
                        return
                    }
                }

                res.status(403).send({
                    message: 'Требуется роль администратора!',
                })
                return
            })
        })
    } catch (error) {
        return res.status(500).send({
            message: `Не удалось подтвердить роль администратора! ${error}`,
        })
    }
}
// Валидация роли модератора у пользователя
const isModerator = async (req, res, next) => {
    try {
        User.findByPk(req.userId).then((user) => {
            user.getRoles().then((roles) => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'moderator') {
                        next()
                        return
                    }
                }

                res.status(403).send({
                    message: 'Требуется роль модератора!',
                })
            })
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Не удалось подтвердить роль модератора!',
        })
    }
}
// Валидация роли администратора или модератора у пользователя
const isModeratorOrAdmin = async (req, res, next) => {
    try {
        User.findByPk(req.userId).then((user) => {
            user.getRoles().then((roles) => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'moderator') {
                        next()
                        return
                    }

                    if (roles[i].name === 'admin') {
                        next()
                        return
                    }
                }

                res.status(403).send({
                    message: 'Требуется роль модератора или администратора!',
                })
            })
        })
    } catch (error) {
        return res.status(500).send({
            message:
                'Не удалось подтвердить роль модератора или администратора!',
        })
    }
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin,
}

module.exports = authJwt
