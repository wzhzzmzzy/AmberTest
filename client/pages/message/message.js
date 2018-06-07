// pages/message/message.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mycomments:[],
    hasmessage:1
  },

  toItem: function(e){
    let that=this
    let index = e.currentTarget.dataset.index
    console.log("toitem",that.data.mycomments[index])
    wx.navigateTo({
      url: '../detail/detail?id='+that.data.mycomments[index].ItemId.Id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let comments=[]
    qcloud.request({
      url:config.service.myMessage,
      method:"GET",
      success: function(res) {
        console.log("haha",res)
        that.setData({
          hasmessage:res.data.code
        })
        if(res.data.code===0){
          for (let i in res.data.data){
            comments.push(res.data.data[i])
          }
          that.setData({
            mycomments:comments
          })
        }
        
      },
      fail: function(err) {
        console.error(err)
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