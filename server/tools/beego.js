// BeeGo RESTful API
const request = require('request-promise')
const tk = require('./toolkit')
const beegoUrl = 'https://api.barbiel.xyz/v1/'

var requestBeego = async function(reqOpt) {
    tk.log('Start', reqOpt.method, reqOpt.uri)
    let resolve = rep => {
        tk.log('End', reqOpt.method, reqOpt.uri)
        return rep
    }
    return request(reqOpt).then(resolve)
}

var selectBeego = async function(tableName, queryData=null) {
    // Select from REST API
    getOpt = {
        uri: beegoUrl + tableName,
        method: 'GET',
        qs: queryData,
        json: true
    }
    return requestBeego(getOpt)
}

var insertBeego = async function(tableName, queryData=null) {
    // Insert into REST API
    postOpt = {
        uri: beegoUrl + tableName,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json"
        },
        body: queryData
    }
    return requestBeego(postOpt)
}

var updateBeego = async function(tableName, queryData=null) {
    // Update REST API
    putOpt = {
        uri: beegoUrl + tableName + '/' + queryData['Id'],
        method: 'PUT',
        json: true,
        header: {
            "content-type": "application/json"
        },
        body: queryData
    }
    return request(putOpt)
}

var getUserByOid = async function (oid) {
    user = {
        'query': 'OpenId:'+tk.md5Hash(oid)
    }
    return selectBeego('Wechat_user', user)
}

var getSthById = async function (sth, id) {
    let opt = {
        'uri': beegoUrl + sth + '/' + id,
        'method': 'GET',
        'json': true
    }
    return requestBeego(opt)
}

var getItem = async function (query) {
    query['fields'] = query['fields'] || "Id,Detail,Title,RefreshTime,Image,Price"
    query['sortby'] = query['sortby'] || "RefreshTime"
    query['order'] = query['order'] || 'desc'
    return selectBeego('Item', query).then(rep => {
        if (rep === null || !rep.length) {
            return null
        }
        return rep
    })
}

module.exports = {
    request: requestBeego,
    select: selectBeego,
    insert: insertBeego,
    update: updateBeego,
    getUserByOid,
    getItem,
    getSthById
}