const config = require('../config')
const tk = require('../tools/toolkit')
const beego = require('../tools/beego')

var getComment = async (ctx, next) => {
    // /weapp/comment/:id
    let itemId = ctx.params.id
    let query = {
        'query': 'ItemId:'+itemId,
        'fields': 'Context,PublishTime,CommenterId,Receiver'
    }
    let rep = {}
    await beego.select('Comment', query).then(async res => {
        if (res === null) {
            return
        }
        let commenter_id_set = res.map(item => item['CommenterId']['Id'])
        let receiver_id_set = res.map(item => item['Receiver']['Id'])
        rep = res
        return {
            commenter: await Promise.all(commenter_id_set.map(id => beego.getSthById("Wechat_user", id))),
            receiver: await Promise.all(receiver_id_set.map(id => beego.getSthById("Wechat_user", id)))
        }
    }).then(res => {
        if (!res) {
            ctx.state.code = 1
            return
        }
        for (let i in rep) for (let j in res['commenter']) {
            if (rep[i]['CommenterId']['Id'] === res['commenter'][j]['Id']) {
                rep[i]['CommenterId'] = res['commenter'][j]
            }
        }
        for (let i in rep) for (let j in res['receiver']) {
            if (rep[i]['Receiver']['Id'] === res['receiver'][j]['Id']) {
                rep[i]['Receiver'] = res['receiver'][j]
            }
        }
        ctx.state.data = rep
    })
}

var addComment = async (ctx, next) => {
    /**
     * body = {
     *  item: id
     *  text: "String",
     *  to: id
     * }
     */
    let body = ctx.request.body
    let userInfo = ctx.state.$wxInfo.userinfo
    userInfo = await beego.getUserByOid(userInfo['openId'])
    let query = {
        "CommenterId": {
            "Id": userInfo[0]['Id']
        },
        "PublishTime": tk.wttn(),
        "Receiver":  {
            "Id": parseInt(body['to'])
        },
        "Context": body['text'],
        "ItemId": {
            "Id": parseInt(body['item'])
        }
    }
    await beego.insert("Comment", query).then(rep => {
        ctx.state.data = rep
    })
}

var messages = async (ctx, next) => {
    // TODO: 根据用户信息获取其所有会话，并返回每条会话的最新消息
    let user = ctx.state.$wxInfo.userinfo
    user = await beego.getUserByOid(user['openId'])
    let query = {
        'query': "CommentId:"+user['Id'],
        'fields': "ItemId",
        'sortby': "PublishTime",
        'order': "desc"
    }
    await beego.select("Comment", query).then(rep => {
        ctx.state.data = rep
    })
}

module.exports = {
    get: getComment,
    post: addComment,
    msg: messages
}