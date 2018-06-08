// pages/login/login.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo:false,
    userInfo: null,
    logged: false,
    city: null,
    province: null,
    campus: null
  },


  onGetUserInfo: function (e) {
    // 修改全局变量
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      logged: true
    })
    var that = this
    // 向后端确认登录
    qcloud.login({
      success(result) {
        if (!result) {
          qcloud.request({
            url: config.service.requestUrl,
            login: true
          })
        }
        that.onLoad({})
        wx.getSetting({
          success: function (res) {
            getApp().globalData.auth = res.authSetting;
            console.error("App authsetting:", res);
            console.error("App auth: ", getApp().globalData['auth'])

            // 如果已经授权，就加载用户信息
            if (getApp().globalData['auth']['scope.userInfo']) {
              console.log("正在加载用户信息...")
              qcloud.login({
                success: function (res) {
                  if (res) {
                    that.globalData.userInfo = res
                  } else {
                    qcloud.request({
                      url: config.service.requestUrl,
                      login: true,
                      success: function (result) {
                        that.globalData.userInfo = result.data.data
                        console.log("App.js: ", result)
                      }
                    })
                  }
                  wx.switchTab({
                    url: '/pages/home/home',
                    success: function (res) {
                      util.showSuccess("登录成功")
                    }
                  })
                },
                fail: err => {
                  console.log('Get User Failed', err)
                }
              })
            }
            else {
              //util.showModel("haha","你tm没登录")
              wx.authorize({
                scope: '',
              })
              wx.navigateTo({
                url: '../login/login'
              })
            }
          }
        })
        //that.onLoad({})
      },
      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    console.error(app.globalData.city)
    console.error(app.globalData.campus)
    console.error(app.globalData.province)
    
    if (app.globalData['auth']['scope.userInfo']){
      console.log("你已经登录了")
      that.setData({
        hasUserInfo:true,
        userInfo: app.globalData.userInfo,
        logged:true
      })
    }

    let temp_city = app.globalData.city
    let temp_province = app.globalData.province
    let temp_campus = app.globalData.campus
    that.setData({
      city: temp_city,
      province:temp_province,
      campus: temp_campus
    })

    if (!that.data.city){
      that.setData({
        city: "当前未指定"
      })
    }
    if (!that.data.province) {
      that.setData({
        province: "当前未指定"
      })
    }
    if (!that.data.campus) {
      that.setData({
        campus: "当前未指定"
      })
    }

    console.error(this.data.hasUserInfo)
    console.error(this.data.userInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})