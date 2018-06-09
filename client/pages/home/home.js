// pages/home/home.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      config.service.imageUrl + 'icons/1.png',
      config.service.imageUrl + 'icons/2.png',
      config.service.imageUrl + 'icons/3.png'
    ],
    items: [],
    noItem: null,
    userInfo:null
  },

  viewimage:function(e){
    let that=this
    wx.previewImage({
      urls: that.data.imgUrls,
    })
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
    var that=this
    console.error("Home auth: ",app.globalData['auth'])
    if (app.globalData['auth']['scope.userInfo']===true) {
      that.setData({
        userInfo: app.globalData.userInfo,
        logged: true
      })
      if (app.globalData.city === null && app.globalData.province === null) {
        that.getLocation()
      }
    }else{
      console.error("Not Logined")
    }  

    util.showBusy("正在获取")
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
            noItem: false
          })
          let temp = res.data.data
          for(let i in temp){
            if(temp[i].Image.slice(1,-1)==="null"){
              temp[i].Image ="../../images/home/search_1.png"
            }else{
              temp[i].Image = config.service.imageUrl+temp[i].Image.slice(2, -2)
              console.log("DATA", temp[i].Image)
            }
          }
          that.setData({
            items: temp,
            noItem: false
          })
          console.log(that.data.items)
        }
        util.showSuccess("获取成功")
      },
      fail: err => {
        util.showModel("载入失败", err)
        console.log("获取失败", err)
      }
    })
  },

  getLocation: function () {
    var page = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // success    
        var longitude = res.longitude
        var latitude = res.latitude
        page.loadCity(longitude, latitude)
      }
    })
  },
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=na1ROQiIIjxHvXbhNmRoVj4gURSUGlEE&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success 
        // console.log(res);
        var city = res.data.result.addressComponent.city;
        var province = res.data.result.addressComponent.province;
        getApp().globalData.city = city;
        getApp().globalData.province = province;
        // console.log(getApp().globalData.city);
        page.openAlert()
      },
      fail: function () {
        getApp().globalData.city = "location failed";
        getApp().globalData.province = "location failed";
      },

    })
  },
  openAlert: function () {
    wx.showModal({
      content: '请根据您所在的省份，选择一所高校，并在该校范围内进行交易',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '../location/location',
          })
        }
      }
    });
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
    this.onLoad({})
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