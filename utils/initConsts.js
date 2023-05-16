const { Dataset } = require('../models/models')



const addDataset = async () => {
    const order = await Dataset.bulkCreate([{
        guid: '5E3650BE-8079-4810-975A-0349167D9EBF',
        name: 'Dataset1',
        lastEditorName: '',
    }])
}

module.exports = {
    addDataset,
}
