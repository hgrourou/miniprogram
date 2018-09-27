const app = getApp()
const fetch = require('../../utils/fetch.js')
// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tenantName: '',
    email: '',
    loginName: ''
  },

  /**
   * 获取用户相关信息
   */
  getUserInfo () {
    let self = this
    let url = app.globalData.urlConfig.meUrl
    fetch({
      url,
      method: 'GET',
    })
    .then((data) => {
      this.setData({
        tenantName: data.data.name,
        email: data.data.email,
        loginName: data.data.loginName
      })
    })
  },

  /**
   * 提交表单
   */
  submit (e) {
    let values = e.detail.value
    let oldPassword = values.oldPassword || ''
    let password = values.password || ''
    let repeatPassword = values.repeatPassword || ''
    if (!oldPassword.replace(/\s+/g, '')) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
      })
      return
    }
    if (!password.replace(/\s+/g, '')) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none',
      })
      return
    }
    if (!repeatPassword.replace(/\s+/g, '')) {
      wx.showToast({
        title: '请重复输入新密码',
        icon: 'none',
      })
      return
    }
    this.changePass({
      oldPassword,
      newPassword: password
    })
  },

  changePass({oldPassword, newPassword}) {
    let url = app.globalData.urlConfig.changePasswordUrl
    fetch ({
      url,
      method: 'POST',
      data: {
        loginName: this.data.loginName,
        oldPassword,
        newPassword 
      }
    })
    .then((data) => {

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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