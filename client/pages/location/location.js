// pages/location/location.js
import { request } from "../../vendor/wafer2-client-sdk/index";
import { service } from "../../config";
import util from "../../utils/util.js";
var qcloud = require('../../vendor/wafer2-client-sdk/index')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    authInfo: app.globalData['auth']['scope.userinfo'] || false,
    currentProvince: null,
    currentCity: null,
    university: []
  },

  /**
   * Campus更新函数
   */
  updateLocation:function(event){
    console.error("GET CAMPUS: ", event.target.dataset.campus)
    getApp().globalData.campus=event.target.dataset.campus
    console.error("APP CAMPUS: ", getApp().globalData.campus)
    let campusid=event.target.dataset.id
    request({
      url:service.myLocation,
      method:"POST",
      data:{
        id:campusid
      },
      success: function(res) {
        util.showSuccess("更新成功")
        wx.switchTab({
          url: '/pages/home/home',
        })
        console.log("更新成功：",res)
      },
      fail: function(err) {
        console.error("更新失败",err)
        util.showModel("T_T更新失败了")
      }
    })
  },

  onGetUserInfo: function (e) {
    var that=this
    // 修改全局变量
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      logged: true
    })
    // 向后端确认登录
    qcloud.login({
      success(result) {
        if (!result) {
          qcloud.request({
            url: service.requestUrl,
            login: true
          })
        }
        that.onLoad({})
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
    let that=this;
    let islogined=false
    if (getApp().globalData.userInfo!=null){
      islogined=true
    }
    that.setData({
      userInfo: getApp().globalData.userInfo,
      logged:islogined
    })
    //pages.Data内部不能使用函数，所以要在此处赋值
    this.setData({
      currentCity: getApp().globalData.city,
      currentProvince: getApp().globalData.province,
    })
    //console.warn("URL:",service.myLocation+'?city='+that.data.currentCity)
    util.showBusy("正在获取")
    request({
      url: service.myLocation + '?city=' + that.data.currentCity,
      method: "GET",
      success: function (res) {
        util.showSuccess("拿到啦！")
        console.log("Colleges:", res)
        //TODO:Parse res
        let temp = []
        let dataset = res.data.data
        for (let i in dataset) {
          temp.push(dataset[i])
        }
        that.setData({
          university: temp
        })
      },
      fail: function (err) {
        util.showModel("您还未登录","请点击上方登录按钮")
        console.error("请求学校失败：", err)
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
    this.onLoad({});
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