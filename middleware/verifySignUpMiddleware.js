const { User, Role, ROLES } = require('../models/models')
checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Username
        let user = await User.findOne({
            where: {
                username: req.body.username,
            },
        })

        if (user) {
            return res.status(400).send({
                message: 'Ошибка! Такой логин уже зарегистрован!',
            })
        }

        // Email
        user = await User.findOne({
            where: {
                email: req.body.email,
            },
        })

        if (user) {
            return res.status(400).send({
                message: 'Ошибка! Такой Email уже зарегистрован!',
            })
        }

        next()
    } catch (error) {
        return res.status(500).send({
            message: 'Не удается подтвердить имя пользователя!',
        })
    }
}

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message:
                        'Ошибка! Такой роли не существует = ' +
                        req.body.roles[i],
                })
                return
            }
        }
    }

    next()
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
}

module.exports = verifySignUp
