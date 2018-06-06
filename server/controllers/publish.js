const config = require('../config')
const tk = require('../tools/toolkit')
const beego = require('../tools/beego')

module.exports = async (ctx, next) => {
    let item = ctx.request.body
    let userInfo = ctx.state.$wxInfo.userinfo
    let categoryQuery = {
      'query': 'Name:'+item.catagory,
      'fields': 'Id'
    }
    let Ids = await Promise.all([
      beego.getUserByOid(userInfo['openId']),
      beego.select('Category', categoryQuery)
    ])
    item = {
      Price: parseInt(item.price),
      Detail: item.detail,
      Image: JSON.stringify(item.imageUrl),
      Title: item.name,
      RefreshTime: tk.wttn(),
      CategoryId: {
        Id: Ids[1][0]['Id']
      },
      PublisherId: {
        Id: Ids[0][0]['Id']
      },
      LocationId: {
        Id: 0
      }
    }
    await beego.insert('Item', item).then(res => {
        ctx.state.data = "Publish Success"
        tk.log(res)
    })
}