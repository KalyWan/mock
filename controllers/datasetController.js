const ApiError = require('../error/ApiError')
const { Dataset } = require('../models/models')

class DatasetController {
    async getAll(req, res, next) {
        try {
            const types = await Dataset.findAll()
            res.json(types)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async createDataset(req, res, next) {
        try {
            const [dataset, created] = await Dataset.findOrCreate({
                where: {
                    name: req.body.name,
                },
            })
            if (created) {
                res.send({
                    message: 'Датасет успешно создан!',
                })
            } else {
                return next(
                    ApiError.badRequest('Такой датасет уже существует!')
                )
            }
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message))
        }
    }

    //Функция удаления заказа (Принимает id Order)
    async deleteDataset(req, res, next) {
        try {
            const { guid } = req.params
            if (!guid) {
                return next(ApiError.badRequest('Не задан guid'))
            }
            const result = await Dataset.destroy({
                where: { guid },
            })
            if (result) {
                res.send({
                    message: 'Датасет успешно удален!',
                })
            } else {
                return next(ApiError.badRequest('Этот датасет уже удален!'))
            }
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message))
        }
    }

    async changeDataset(req, res, next) {
        try {
            const { guid } = req.params
            const { name } = req.body
            if (!guid) {
                return next(ApiError.badRequest('Не задан guid'))
            }
            if (!name) {
                return next(ApiError.badRequest('Не задано имя'))
            }

            if( await Dataset.findOne({
                where: { name },
            }) !== null){

                return next(ApiError.badRequest('Имя датасета занято'))
            }
            const result = await Dataset.update(
                {
                    name: name,
                },
                {
                    where: { guid },
                }
            )
            if (result && result[0] !== 0) {
                console.log(result)
                res.send({
                    message: 'Датасет успешно изменён!',
                })
            } else {
                return next(ApiError.badRequest('Ошибка изменения датасета!'))
            }
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message))
        }
    }

    async getById(req, res, next) {
        try {
            const { guid } = req.params
            if (!guid) {
                return next(ApiError.badRequest('Не задан guid'))
            }
            const type = await Dataset.findOne({
                where: { guid },
            })
            res.json(type)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new DatasetController()
