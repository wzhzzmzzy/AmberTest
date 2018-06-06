const mine = require('koa-router')({
    prefix: '/mine'
})
const controllers = require('../controllers')
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// 获取用户发布的商品
mine.get('/published', validationMiddleware, controllers.mine.published)
// 获取用户买到的商品
mine.get('/bought', validationMiddleware, controllers.mine.bought)
mine.get('/sold', validationMiddleware, controllers.mine.sold)
mine.get('/ontrans', validationMiddleware, controllers.mine.ontrans)

module.exports = mine