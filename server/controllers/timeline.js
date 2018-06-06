const tk = require('../tools/toolkit')
const beego = require('../tools/beego')

var catagory = async function (ctx, next) {
    let name = ctx.params.name
    let page = 0
    if (ctx.query['page']) page = parseInt(ctx.query['page']) * 10
    let idQuery = {
        'query': 'Name:'+name[0].toUpperCase()+name.substring(1),
        'fields': 'Id'
    }
    await beego.select('Category', idQuery).then(async rep => {
        tk.log('timeline:', rep)
        itemQuery = {
            'query': 'CategoryId:'+rep[0]['Id'],
            'offset': '' + page,
            'limit': '10'
        }
        await beego.getItem(itemQuery).then(rep => {
            if (rep === null) {
                ctx.state.code = 1
            }
            ctx.state.data = rep
        })
    })
}

var home = async function (ctx, next) {
    let page = 0
    if (ctx.query['page']) page = parseInt(ctx.query['page']) * 10
    let query = {
        'query': 'state:false',
        'offset': '' + page,
        'limit': '10'
    }
    await beego.getItem(query).then(rep => {
        if (rep === null) {
            ctx.state.code = 1
        }
        ctx.state.data = rep
    })
}

module.exports = {
    home,
    catagory
}