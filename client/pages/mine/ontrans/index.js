// pages/mine/items/index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sellItems: [],
    buyItems: [],
    noSellItem: null,
    noBuyItem: null
  },

  toItem: function(e){
    let index = e.currentTarget.dataset
    let item = null
    console.log(item, index)
    if (index['cata'] === 'buy') {
        item = this.data.buyItems
        index = index['index']
    } else {
        item = this.data.sellItems
        index = index['index']
    }
    wx.navigateTo({
      url: '../../detail/detail?id='+item[index]['Id'],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showBusy('正在载入商品')
    var that = this
    qcloud.request({
      url: config.service.myOnTrans,
      login: true,
      success: res => {
        console.log(res.data.data)
        util.showSuccess('载入成功')
        if (res.data.code === 1) {
          that.setData({
            noBuyItem: true,
            noSellItem: true
          })
        } else {
          that.setData({
            buyItems: res.data.data['buy'],
            noBuyItem: res.data.data['buy'] === null,
            sellItems: res.data.data['sell'],
            noSellItem: res.data.data['sell'] === null
          })
        }
        
        console.log(that.data)
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