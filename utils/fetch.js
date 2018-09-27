let app = getApp()
function fetch ({url, method, data, header}) {
  data = data || {}
  header = header || {}
  // let token = app.globalData.tenantInfo.token
  let tenantInfo = wx.getStorageSync('tenantInfo')
  if (tenantInfo) {
    header['x-auth-token'] = tenantInfo.token
  }
  wx.showNavigationBarLoading()
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url,
      header,
      data,
      method,
      success: function (res) {
        if (res.data.code === 200) {
          resolve(res.data)
        } else {
          resolve(res.data)
        }
      },
      fail: function (res) {
        reject(res)
      },
      complete: function () {
        wx.hideNavigationBarLoading()
      }
    })
  })
  return promise;
}
module.exports = fetch