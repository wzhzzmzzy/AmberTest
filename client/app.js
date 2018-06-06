//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('utils/util.js')

//app.js
App({
  globalData: {
    userInfo: null,
    auth: {}
  },
  onLaunch: function () {
    var that = this
    qcloud.setLoginUrl(config.service.loginUrl)
    // 将用户授权信息加载到 globalData['auth']
    wx.getSetting({
      success: function(res){
        that.globalData.auth = res.authSetting;
        console.log(that.globalData['auth'])
        // 如果已经授权，就加载用户信息
        if (that.globalData['auth']['scope.userInfo']) {
          console.log("正在加载用户信息...")
          qcloud.login({
            success: function (res){
              if (res) {
                that.globalData.userInfo = res
              } else {
                qcloud.request({
                  url: config.service.requestUrl,
                  login: true,
                  success: function(result) {
                    that.globalData.userInfo = result.data.data
                  }
                })
              }
            },
            fail: err => {
              console.log('Get User Failed', err)
            }
          })
        }
      }
    })
  }
})