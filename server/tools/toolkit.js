// 方便复用的小函数集合，包含 Request，均为无副作用的纯函数（除了 log）
const crypto = require('crypto')

var md5Hash = s => {
    let hash = crypto.createHash('md5')
    hash.update(s)
    return hash.digest('hex')
}

var wttn = () => {
    // What's the time now?
    date = new Date().toLocaleString().split(" ")
    if (parseInt(date[0].split("-")[1]) < 10) {
        date[0] = date[0].slice(0, 5) + '0' + date[0].slice(5)
    }
    if (parseInt(date[0].split("-")[2]) < 10) {
        date[0] = date[0].slice(0, 8) + '0' + date[0].slice(8)
    }
    ret = date[0] + 'T' + date[1] + '+08:00'
    return ret
}

var log = function () {
    // console.log with time
    msg = []
    for (let i in arguments) {
        msg.push(arguments[i])
    }
    console.log('[--', wttn(), '--]  ', ...msg)
}

var lessDetail = detail => {
    if (detail.length > 20) {
        return detail.slice(0, 20) + '...'
    } else {
        return detail
    }
}

module.exports = {
    log,
    md5Hash,
    wttn,
    lessDetail
}
