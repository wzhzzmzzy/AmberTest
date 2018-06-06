// pages/home/home.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      config.service.imageUrl + '1.jpg',
      config.service.imageUrl + '2.jpg',
      config.service.imageUrl + '3.jpg'
    ],
    items: [],
    noItem: null
  },

  toItem: function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../detail/detail?id='+this.data.items[index]['Id'],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    qcloud.request({
      url: config.service.timelineUrl,
      success: function (res) {
        if (res.data.code === 1) {
          that.setData({
            noItem: true
          })
        } else {
          that.setData({
            items: res.data.data,
            noItem: false
          })
          console.log(that.data.items)
        }
      },
      fail: err => {
        util.showModel("载入失败", err)
        console.log("获取失败", err)
      }
    })
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
    this.onLoad({})
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