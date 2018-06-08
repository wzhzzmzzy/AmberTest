const router = require('koa-router')({
    prefix: '/weapp'
})
const mine = require('./mine')
const controllers = require('../controllers')

const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

router.get('/login', authorizationMiddleware, controllers.login)

router.get('/user', validationMiddleware, controllers.user)

router.post('/publish', validationMiddleware, controllers.publish)

router.get('/catagory/:name', controllers.timeline.catagory)

router.get('/detail/:id', controllers.detail)

router.get('/comment/:id', controllers.comment.get)

router.post('/comment', validationMiddleware, controllers.comment.post)

router.get('/message', validationMiddleware, controllers.comment.msg)

router.get('/timeline', controllers.timeline.home)

router.get('/location', validationMiddleware, controllers.location.get)

router.post('/location', validationMiddleware, controllers.location.edit)

router.use(mine.routes())

module.exports = router
