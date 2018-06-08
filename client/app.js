//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('utils/util.js')

//app.js
App({
  globalData: {
    userInfo: null,
    auth: {
      'scope.userInfo':false
    },
    city:null,
    province:null,
    campus:null
  },
  onLaunch: function () {
    var that = this
    qcloud.setLoginUrl(config.service.loginUrl)
    // 将用户授权信息加载到 globalData['auth']
    wx.getSetting({
      success: function(res){
        getApp().globalData.auth = res.authSetting;
        console.error("App authsetting:", res);
        console.error("App auth: ",getApp().globalData['auth'])
        
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
                    console.log("App.js: ",result)
                  }
                })
              }
            },
            fail: err => {
              console.log('Get User Failed', err)
            }
          })
        }
        else{
          //util.showModel("haha","你tm没登录")
          console.log("Redirecting to login")
          wx.navigateTo({
            url: '../login/login',
          })
          console.log("should be redirected")
        }
      }
    })
  }
})