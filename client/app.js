//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('utils/util.js')

//app.js
App({
  globalData: {
    firstLogin:false,
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
          console.log("Redirecting to login")
          if (wx.reLaunch) {
            wx.reLaunch({
              url: '/pages/login/login',
            })
          } else {
            // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            wx.showModal({
              title: '提示',
              content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
          }
          
          console.log("should be redirected")
        }
      }
    })
  }
})