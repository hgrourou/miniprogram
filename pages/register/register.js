// pages/message/message.js
let app = getApp()
const config = app.globalData.urlConfig
var input = require('../../mixins/input.js')
const fetch = require('../../utils/fetch.js')
var util = require('../../utils/md5.js')
Page(Object.assign({

  /**
   * 页面的初始数据
   */
  data: {
    registerInfo: {
      "number": "",
      "name": "",
      "phone": "",
      "originPassword": "",
      "repeatPassword": "",
      "password": ""
    },
    errorMessage: {
      name: '请输入姓名',
      number: '请输入工号',
      phone: '请输入电话号码',
      password: '请输入密码',
      repeatPassword: '请重复输入密码',
    }
  },

  register () {
    let registerInfo = this.data.registerInfo
    for (let key in registerInfo) {
      if (key == 'password') continue
      if (!registerInfo[key]) {
        wx.showToast({
          title: this.data.errorMessage[key],
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    if (this.data.registerInfo.originPassword !== this.data.registerInfo.repeatPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.data.registerInfo.password = util.hexMD5(this.data.registerInfo.originPassword)
    this.registerRequest(this.data.registerInfo)
  },

  registerRequest (data) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = config.registUrl
    fetch({
      url,
      method: 'POST',
      data: data
    })
    .then((data) => {
      wx.hideLoading()
      if (data.message.code === 200) {
        wx.showToast({
          title: '注册成功!',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function() {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }, 2000) 
      } else if (data.message.description == 'User exist') {
        wx.showToast({
          title: "用户已存在",
          icon: 'none',
        })
      } else {
        wx.showToast({
          title: "系统异常,请稍后重试!",
          icon: 'none',
        })
      }
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
}, input))