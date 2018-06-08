// pages/catagory/catagory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  book: function () {
    wx.navigateTo({
      url: 'items/index?catagory=book',
    })
  },
  cloth: function () {
    wx.navigateTo({
      url: 'items/index?catagory=clothes',
    })
  },
  commodity: function () {
    wx.navigateTo({
      url: 'items/index?catagory=grocery',
    })
  },
  edevice: function () {
    wx.navigateTo({
      url: 'items/index?catagory=electronic',
    })
  },
  vehicle: function () {
    wx.navigateTo({
      url: 'items/index?catagory=vchicle',
    })
  },
  snack: function () {
    wx.navigateTo({
      url: 'items/index?catagory=snack',
    })
  },
  sport: function () {
    wx.navigateTo({
      url: 'items/index?catagory=stationary',
    })
  },
  other: function () {
    wx.navigateTo({
      url: 'items/index?catagory=other',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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