// pages/login/login.js
let app = getApp()
const config = app.globalData.urlConfig
const fetch = require('../../utils/fetch.js')
var util = require('../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },

  login (number, password) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = config.loginUrl
    password = util.hexMD5(password)
    fetch({
      url,
      method: 'POST',
      data: {
        number,
        password
      }
    })
    .then((data) => {
      wx.hideLoading()
      if (data.message.code === 200) {
        wx.setStorage({
          key: 'token',
          data: data.payload.user.accessToken
        })
        wx.switchTab({
          url: '/pages/me/me',
        })
      } else if (data.message.code === 401) {
        wx.showToast({
          title: "账号密码错误",
          icon: 'none',
        })
      } else if (data.message.code === 4) {
        wx.showToast({
          title: "用户不存在",
          icon: 'none',
        })
      } else {
        wx.showToast({
          title: "系统异常,请稍后再试!",
          icon: 'none',
        })
      }
    }, () => {
      wx.hideLoading()
      wx.showToast({
        title: "系统异常,请稍后再试!",
        icon: 'none',
      })
    })
  },

  submit(e) {
    let values = e.detail.value
    let username = values.username || ''
    let password = values.password || ''
    if (!username.replace(/\s+/g, '')) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
      })
      return
    }
    if (!password.replace(/\s+/g, '')) {
      wx.showToast({
        title: '请输入登录密码',
        icon: 'none',
      })
      return
    }
    this.login(username, password)
  },

  /**
   * 跳转到注册页面
   */
  turnToRegisterPage () {
    wx.navigateTo({
      url: '/pages/register/register'
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