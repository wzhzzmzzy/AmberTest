// pages/detail/detail.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({
  data: {
    receiver: null,
    itemID: null,
    imgUrls: [],
    existedComment: [],
    price: '100',
    title: '商品名称',
    discription: '商品信息',
    collectcomment: null,
    isReply: false,
    inputFocus:false,
    receiver:"15"
  },

  /**
   * 输入监视函数
   */
  //start pushComment
  collectComment: function (e) {
    this.setData({
      pushcomment: e.detail.value
    })
  },
  //complete pushComment

  /**
   * 发送回复的跳转函数
   */
  sendReply:function(event){
    var that=this;
    that.setData({
      receiver:event.target.dataset.id,
      isReply:true,
      inputFocus:true
    })
    console.log("即将回复给： "+that.data.receiver)
  },


  /**
   * 发送绑定函数
   */
  //start sendComment
  sendComment: function (event) {
    var that = this;
    console.log(event)
    let to_id = event.target.dataset.id
    let commentBody = {
      "item": that.data.itemID,
      "text": that.data.pushcomment,
      "to": to_id
    }
    console.log(commentBody)
    //TODO:POST the body
    qcloud.request({
      url: config.service.addComment,
      method: "POST",
      login: true,
      data: commentBody,
      success:function(res){
        if(res.statusCode==200){
          util.showSuccess("评论成功")
          console.log("好像成功了", res.statusCode, res.header, res.data)
          that.onPullDownRefresh()
        }else{
          console.warn("评论返回值不正确", res.data)
        }
      },
      fail:function(err){
        util.showModel("失败！")
        console.error("评论失败"+err)
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showBusy('正在载入商品')
    var that = this
    that.setData({
      itemID: options.id
    })
    qcloud.request({
      url: config.service.detailUrl + '/' + options.id,
      success: function (res) {
        util.showSuccess('载入成功')
        let image = JSON.parse(res.data.data.Image)
        console.log(image, typeof(image))
        for (let i = 0; i < image.length; ++i) {
          image[i] = config.service.imageUrl + image[i]
        }
        that.setData({
          itemID: options.id,
          imgUrls: image,
          price: res.data.data.Price,
          title: res.data.data.Title,
          discription: res.data.data.Detail
        })

      },
      fail: function (err) {
        util.showModel("载入失败", err)
        console.log("获取失败", err)
      }
    })

    //request for existedComment
    qcloud.request({
      url: config.service.allComment + '/' + options.id,
      success: function (res) {
        //console.log("Comment got")

        let temp = []
        let comments = res.data.data
        //console.log(comments)
        for (let i in comments) {
          console.log(comments[i])
          temp.push(comments[i])
        }
        that.setData({
          existedComment: temp
        })

      },
      fail: function (err) {
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
    util.showBusy("正在刷新")
    let options={
      id:this.data.itemID
    }
    this.onLoad(options)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /**
     * TODO:下拉继续加载评论
     */
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})