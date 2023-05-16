require('dotenv').config()
const sequelize = require('./database')
const {
    addDataset,
} = require('./utils/initConsts')

const initial = async () => {
    await addDataset()
}
const start = async () => {
    try {
        await sequelize.sync({ force: true }).then(() => {
            initial()
            console.log('Drop and re-sync db.')
        })
    } catch (e) {
        console.log(e)
    }
}

start()
