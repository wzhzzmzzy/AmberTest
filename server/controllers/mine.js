const tk = require('../tools/toolkit')
const beego = require('../tools/beego')

async function published(ctx, next) {
    if (ctx.state.$wxInfo.loginState !== 1) {
        ctx.state.code = -1
        return
    }
    await beego.getUserByOid(ctx.state.$wxInfo.userinfo.openId).then(async rep => {
        query = {
            'query': "PublisherId:"+rep[0]['Id']+",State:false"
        }
        return await beego.getItem(query)
    }).then(rep => {
        if (rep === null) {
            ctx.state.code = 1
            return
        }
        ctx.state.data = rep
    })
}

async function sold(ctx, next) {
    if (ctx.state.$wxInfo.loginState !== 1) {
        ctx.state.code = -1
        return
    }
    await beego.getUserByOid(ctx.state.$wxInfo.userinfo.openId).then(async rep => {
        let query = {
            'query': 'SellerId:'+rep[0]['Id']+",StateId:2",
            'fields': 'ItemId'
        }
        return await beego.select('Transaction', query)
    }).then(async rep=> {
        if (rep === null || !rep.length) {
            ctx.state.code = 1
            return
        }
        let id_set = rep.map(trans => trans['ItemId']['Id'])
        return await Promise.all(
            id_set.map(id => beego.getItem({'query': 'Id:'+id}))
        )
    }).then(rep => {
        if (!rep) return
        ctx.state.data = rep.map(item => item[0])
    })
}

async function bought(ctx, next) {
    if (ctx.state.$wxInfo.loginState !== 1) {
        ctx.state.code = -1
        return
    }
    await beego.getUserByOid(ctx.state.$wxInfo.userinfo.openId).then(async rep => {
        let query = {
            'query': 'BuyerId:'+rep[0]['Id']+",StateId:2",
            'fields': 'ItemId'
        }
        return await beego.select('Transaction', query)
    }).then(async rep=> {
        if (rep === null || !rep.length) {
            ctx.state.code = 1
            return
        }
        let id_set = rep.map(trans => trans['ItemId']['Id'])
        return await Promise.all(
            id_set.map(id => beego.getItem({'query': 'Id:'+id}))
        )
    }).then(rep => {
        if (!rep) return
        ctx.state.data = rep.map(item => item[0])
    })
}

async function ontrans(ctx, next) {
    await beego.getUserByOid(ctx.state.$wxInfo.userinfo.openId).then(async rep => {
        let buy_query = {
            'query': 'BuyerId:'+rep[0]['Id']+',StateId:1',
            'fields': 'ItemId,SellerId,StartTime'
        }
        let sell_query = {
            'query': 'SellerId:'+rep[0]['Id']+',StateId:1',
            'fields': 'ItemId,BuyerId,StartTime'
        }
        return await Promise.all([
            beego.select('Transaction', buy_query),
            beego.select('Transaction', sell_query)
        ])
    }).then(async rep => {
        tk.log(rep)
        if (!rep[0] && !rep[1])  {
            ctx.state.code = 1
            return
        }
        // rep: [[{ItemId, SellerId, StartTime}...], [{ItemId, BuyerId, StartTime}...]]
        let ret = {
            'sell': rep[0],
            'buy': rep[1]
        }
        tk.log(ret)
        if (ret['sell'] !== null && ret['sell'].length) {
            await Promise.all(ret['sell'].map(async trans => {
                let rep = await Promise.all([
                    beego.getSthById('Item', trans['ItemId']['Id']), 
                    beego.getSthById('Wechat_user', trans['SellerId']['Id'])
                ])
                return {
                    Item: rep[0], User: rep[1], StartTime:trans['StartTime'] 
                }
            })).then(rep => {
                ret['sell'] = rep
            })
        }
        if (ret['buy'] !== null && ret['buy'].length) {
            await Promise.all(ret['buy'].map(async trans => 
                await beego.getSthById('Item', trans['ItemId']['Id'])
            )).then(rep => {
                ret['buy'] = rep
            })
        }
        ctx.state.data = ret
    })
}

module.exports = {
    published,
    sold,
    bought,
    ontrans
}