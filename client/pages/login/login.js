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
    logged: false
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
        wx.switchTab({
          url: '/pages/home/home',
          success: function(res){
            util.showSuccess("登录成功")
          }
        })
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
    console.error(this.data.hasUserInfo)
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