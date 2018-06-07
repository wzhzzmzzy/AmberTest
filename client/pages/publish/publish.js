var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var home = require('../home/home.js')

Page({
  data: {
    catagoryList: ['闲置书籍', '衣帽鞋服', '日用杂货', '数码产品', '代步工具', '休闲零食', '文体用品', '其它'],
    catagory: 0,
    images: [],
    upload: 0,
    item: {
      name: null,
      detail: null,
      price: null
    }
  },
  editItem: function(attr, v) {
    let item = this.data.item
    item[attr] = v
    this.setData({
      item: item
    })
  },
  addImageUrl: function(url) {
    let item = this.data.item
    item.imageUrl.push(url)
    this.setData({
      item: item
    })
  },
  catagoryPicker: function (e) {
    this.setData({
      catagory: e.detail.value
    })
  },
  getName: function(e) {
    this.editItem("name", e.detail.value)
  },
  getDetail: function(e) {
    this.editItem("detail", e.detail.value)
  },
  getPrice: function(e) {
    this.editItem("price", e.detail.value)
  },
  chooseImg: function() {
    var that = this
    let cnt = 5 - this.data.images.length
    if (cnt <= 0) {
      util.showModel("图片已满", "最多只能添加 5 张图片哦~")
      return
    }
    wx.chooseImage({
      count: cnt,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let paths = that.data.images
        paths = paths.concat(res.tempFilePaths)
        that.setData({
          images: paths
        })
        console.log(that.data.images)
        console.log(res)
      },
      fail: function (err) {
        console.error(err)
      }
    })
  },
  doPublish: function() {
    if (this.data.item.name === null) {
      util.showModel("发布错误", "请填写商品名称。")
      return
    } else if (this.data.item.detail === null) {
      util.showModel("发布错误", "请填写商品详情。")
      return
    } else if (this.data.item.price === null || this.data.item.price <= 0) {
      util.showModel("发布错误", "请填写正确的商品价格")
      return
    }
    util.showBusy("正在发布商品")
    var that = this
    let item = this.data.item
    item.imageUrl = []
    item.catagory = this.data.catagoryList[this.data.catagory]
    for (let i in this.data.images) {
      let file = this.data.images[i]
      let tmp = this.data.images[i].split('tmp/')[1]
      item.imageUrl.push(tmp)
      wx.uploadFile({
        url: config.service.uploadUrl,
        filePath: file,
        name: "uploadfile",
        success: function(res) {
          console.log(res)
        },
        fail: function(err) {
          console.log("有图片上传失败")
        },
        complete: function() {
          let upload = that.data.upload + 1
          that.setData({
            upload: upload
          })
        }
      })
    }
    qcloud.request({
      url: config.service.publishUrl,
      method: 'POST',
      data: item,
      login: true,
      header: {
        'content-type':  'application/json'
      },
      success: function(res) {
        util.showSuccess("上传成功！")
        console.log(res)
        wx.switchTab({
          url: '/pages/home/home',
        })
      },
      fail: function(err) {
        util.showModel("上传失败", err)
        console.log(err)
      },
    })
  }
})