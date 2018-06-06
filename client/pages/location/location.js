// pages/location/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentProvince: null,
    currentCity: null,
    university: ["南京大学", "苏州大学"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //pages.data内部不能使用函数，所以要在此处赋值
    this.setData({
      currentCity:getApp().globalData.city,
      currentProvince:getApp().globalData.province,
    })
    //TODO:向qcloud请求当前地区的学校
    // qcloud.request({

    // })
  },
  back: function(){
    wx.navigateBack();
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