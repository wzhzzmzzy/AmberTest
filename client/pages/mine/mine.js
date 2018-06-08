// pages/mine/mine.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    userInfo: {},
    logged: false,
    authInfo: app.globalData['auth']['scope.userinfo'] || false
  },
  toLogin:function(){
    wx.navigateTo({
      url: '../login/login',
    })
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
      },
      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        logged: true
      })
    }
  },
  information: () => {
    wx.navigateTo({
      url: '../mine/info/info',
    })
  },
  setup: () => {
    wx.navigateTo({
      url: 'setup/setup'
    })
  },
  sold: () => {
    wx.navigateTo({
      url: 'items/index?title=sold'
    })
  },
  bought: () => {
    wx.navigateTo({
      url: 'items/index?title=bought',
    })
  },
  published: () => {
    wx.navigateTo({
      url: 'items/index?title=published',
    })
  },
  ontrans: () => {
    wx.navigateTo({
      url: 'ontrans/index',
    })
  },
  aboutus: () => {
    wx.navigateTo({
      url: '../mine/aboutus/aboutus',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: () => {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: () => {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: () => {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: () => {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: () => {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: () => {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: () => {}
})