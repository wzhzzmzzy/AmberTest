// pages/mine/items/index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    items: [],
    noItem: null
  },

  url: {
    'bought': config.service.myBought,
    'sold': config.service.mySold,
    'ontrans': config.service.myOnTrans,
    'published': config.service.myPublished
  },

  title: {
    'bought': "我买到的",
    'sold': "我卖出的",
    'published': "我发布的"
  },

  toItem: function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../../detail/detail?id='+this.data.items[index]['Id'],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showBusy('正在载入商品')
    this.setData({
      title: this.title[options.title]
    })
    qcloud.request({
      url: this.url[options.title],
      login: true,
      success: res => {
        console.log(res)
        util.showSuccess('载入成功')
        if (res.data.code === 1) {
          this.setData({
            items: res.data.data,
            noItem: true
          })
        } else {
          this.setData({
            items: res.data.data,
            noItem: false
          })
        }
      },
      fail: error => {
        util.showModel('载入失败', error)
        console.log("获取失败", error)
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