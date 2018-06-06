const config = require('../config')
const tk = require('../tools/toolkit')
const beego = require('../tools/beego')

const getCampus = async (ctx, next) => {
    let userInfo = ctx.state.$wxInfo.userinfo
    let param = ctx.query
    let query = {
        'query': 'City:'+param['city'],
        'fields': 'Id,Name'
    }
    await beego.select("Location", query).then(rep => {
        ctx.state.data = rep
    })
}

const editCampus = async (ctx, next) => {
    let userInfo = ctx.state.$wxInfo.userinfo
    let param = ctx.request.body
    await beego.getUserByOid(userInfo['openId']).then(async rep => {
        rep[0]['CampusId'] = {
            "Id": parseInt(param['id'])
        }
        return await beego.update('Wechat_user', rep[0])
    }).then(rep => {
        ctx.state.data = rep['Nickname'] === userInfo['nickname'] ? 
            "Update Campus Success" : "Update Campus Failed"
    })
}

module.exports = {
    get: getCampus,
    edit: editCampus
}