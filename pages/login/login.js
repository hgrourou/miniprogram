// pages/login/login.js
const config = getApp().globalData.urlConfig
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: 'zhiniu_test',
    password: 'aaa'
  },

  login (username, password) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = config.loginUrl
    wx.request({
      url,method: 'POST',
      data: {
        username,
        password
      },
      success: function (res) {
        console.log(res)
      },
      fail: function () {
        wx.showToast({
          title: '网路开小差，请稍后再试',
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
    console.log(username)
    console.log(password)
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