require('dotenv').config()
const express = require('express')
const sequelize = require('./database')
const cors = require('cors')
const router = require('./routes/index')
const { errorHandler } = require('./middleware')

// Порт сервера
const PORT = process.env.PORT || 5000

// Настройка фреймворка ExpressJS
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Активация middleware Cors
app.use(cors())

// Роутер Api запросов к контроллерам
app.use('/formula-engine/api/v1', router)

//Доступ к статичной папке
app.use('//assets/images', express.static('./assets/images'))

// Обработка ошибок, последний Middleware
app.use(errorHandler)

// Функция запуска сервера и подключение к базе данных
const start = async () => {
    try {
        await sequelize.sync().then(() => {
            console.log('db is ready')
        })
        app.listen(PORT, () => console.log(`app is running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
