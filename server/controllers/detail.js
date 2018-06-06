const config = require('../config')
const tk = require('../tools/toolkit')
const beego = require('../tools/beego')

module.exports = async (ctx, next) => {
    let item = null
    tk.log(ctx.params)
    await beego.getSthById('Item', ctx.params.id).then(async rep => {
        item = rep
        return await beego.getSthById('Wechat_user', item.PublisherId['Id'])
    }).then(rep => {
        item.Publisher = rep
        ctx.state.data = item
    })
}