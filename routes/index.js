const Router = require('express')
const router = new Router()

const datasetRouter = require('./datasetRouter')

router.use(function (req, res, next) {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})
router.use('/workspaces/:workspaceId/dataset', datasetRouter)

module.exports = router
