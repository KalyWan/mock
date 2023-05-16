const Router = require('express')
const router = new Router()
const datasetController = require('../controllers/datasetController')
const { authJwt } = require('../middleware')

router.get(
    '/',
    datasetController.getAll
)
router.get(
    '/:guid',
    datasetController.getById
)
router.post('/', datasetController.createDataset)
router.delete('/:guid', datasetController.deleteDataset)
router.patch('/:guid/name', datasetController.changeDataset)

module.exports = router
