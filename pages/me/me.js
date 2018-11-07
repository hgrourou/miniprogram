const app = getApp()
const config = app.globalData.urlConfig
const fetch = require('../../utils/fetch.js')
// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 获取用户相关信息
   */
  getUserInfo () {
    let self = this
    let url = app.globalData.urlConfig.userDetailUrl
  },

  /**
   * 签到
   */
  signin () {
    wx.showLoading({
      title: '加载中...',
    })
    let url = config.signUrl
    fetch({
      url,
      method: 'POST'
    }).then((data) => {
      wx.hideLoading()
      if (data.message.code === 200) {
        wx.showToast({
          title: "签到成功",
          icon: 'success',
          duration: 2000
        })
      } else if (data.message.code === 5) {
        wx.showToast({
          title: "您今天已经签到",
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: "系统异常,请稍后再试",
          icon: 'success',
          duration: 2000
        })
      }
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