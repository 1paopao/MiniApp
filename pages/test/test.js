// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  // 收货地址
  getPosition: function(e) {
    console.log(e)
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },

  // 用户设置界面
  setPage: function(e) {
    console.log('用户设置界面')
  },

  // 检查登录状态
  checkLogin: function(e) {
    console.log('检查是否登录')
    wx.checkSession({
      success: function(){
        //session_key 未过期，并且在本生命周期一直有效
        console.log('login')
      },
      fail: function(){
        // session_key 已经失效，需要重新执行登录流程
        console.log('unlogin')
        // 用户重新登录
        this.getUserInfo()
        // wx.login({
        //   success: function(res) {
        //     if (res.code) {
        //       //发起网络请求
        //       wx.request({
        //         url: 'https://test.com/onLogin',
        //         data: {
        //           code: res.code
        //         }
        //       })
        //     } else {
        //       console.log('登录失败！' + res.errMsg)
        //     }
        //   }
        // })
      }
    })
  },

  // 获取用户信息
  getUserInfo: function(e) {
    console.log('获取用户信息')
    wx.login({
      success: function(res) {
        wx.getUserInfo({
          withCredentials: true,
          success: function(res1) {
            console.log(res1)
          }
        })
      }
    })
  },

  // 设置界面
  getSetting: function(e) {
    console.log(e)
  },

  setDisabled: function(e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },

  setPlain: function(e) {
    this.setData({
      plain: !this.data.plain
    })
  },

  setLoading: function(e) {
    this.setData({
      loading: !this.data.loading
    })
  },

  onGotUserInfo: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
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