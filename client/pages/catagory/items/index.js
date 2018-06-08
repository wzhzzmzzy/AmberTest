var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInput: null,
    items: [],
    noItem: null,
    catagory: '',
  },

  catagory: {
    'book': "闲置书籍",
    'clothes': "衣帽鞋服",
    'grocery': "日用杂货",
    'electronic': "数码产品",
    'vchicle': "代步工具",
    'snack': "休闲零食",
    'stationary': '文体用品',
    'other': "其他"
  },

  getInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  search: function () {
    qcloud.request({
      url: config.service.searchUrl,
      success: function(res) {
        console.log(res);
      },
      fail: function(err) {
        console.log(err);
      }
    });
  },

  toItem: function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../../detail/detail?id='+this.data.items[index]['Id'],
    })
  },

  onLoad: function (options) {
    util.showBusy('正在载入商品')
    this.setData({
      catagory: this.catagory[options.catagory]
    })
    var that = this
    qcloud.request({
      url: config.service.catagoryUrl+'/'+this.data.catagory,
      success: function(res) {
        util.showSuccess('载入成功')
        if (res.data.code === 1) {
          that.setData({
            noItem: true
          })
        } else {
          that.setData({
            items: res.data.data,
            noItem: false
          })
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