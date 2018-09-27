// pages/login/login.js
let app = getApp()
const config = app.globalData.urlConfig
const fetch = require('../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '092501',
    password: 'qq123456'
  },

  login (username, password) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = config.loginUrl
    fetch({
      url,
      method: 'POST',
      data: {
        username,
        password
      }
    })
    .then((data) => {
      wx.hideLoading()
      if (data.code === 200) {
        let tenantInfo = {
          token: data.token,
          tenantId: data.tenantId,
          tenantName: data.tenantName,
          username: data.username,
        }
        wx.setStorage({
          key: 'tenantInfo',
          data: tenantInfo
        })
        wx.switchTab({
          url: '/pages/me/me',
        })
      } else {
        wx.showToast({
          title: data.status,
          icon: 'none',
        })
      }
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