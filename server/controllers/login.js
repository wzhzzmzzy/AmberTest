// 登录授权接口
const config = require('../config')
const tk = require('../tools/toolkit')
const beego = require('../tools/beego')

module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    if (ctx.state.$wxInfo.loginState) {
      ctx.state.data = ctx.state.$wxInfo.userinfo
      ctx.state.data['time'] = Math.floor(Date.now() / 1000)
    }
    await beego.getUserByOid(ctx.state.data.userinfo.openId).then(async rep => {
      if (rep !== null && rep.length) {
        rep[0]['LastLoginTime'] = tk.wttn()
        await beego.update('Wechat_user', rep[0])
      } else {
        user = {
          "Avatar": ctx.state.data.userinfo['avatarUrl'],
          "Nickname": ctx.state.data.userinfo['nickName'],
          "LastLoginTime": tk.wttn(),
          "OpenId": tk.md5Hash(ctx.state.data.userinfo['openId']),
          "CampusId": { "Id": 0 }
        }
        await beego.insert('Wechat_user', user).then(res => {
          tk.log('login:',res)
        })
      }
    })
}
