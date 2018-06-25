// pages/map/map.js

/*
  问题1： map上的小气泡文字在真机上不显示 Done
  问题2： circles真机和模拟器都不显示
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/images/icon/star.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      title: '我在这里哦~',
      callout: {
        content: '我是小气泡~',
        color: "#a5a5e4",
        fontSize: 18,
        borderRadius: 8,
        padding: 10,
        bgColor: "#fff",
        display: "ALWAYS",
        textAlign: "left"
      },
      label: {
        content: "我是小气泡~111",
        color: "#e5e5e4",
        fontSize: 12,
        anchorX: 22.099994,
        anchorY: 112.324520,
        borderRadius: 6,
        padding: 8,
        bgColor: "#fff"
      },
      width: 30,
      height: 30
    }],
    polyline: [{
     points: [{
       longitude: 113.3245211,
       latitude: 23.10229
     }, {
       longitude: 113.324520,
       latitude: 23.21229
     }, {
       longitude: 113.324522,
       latitude: 23.31229
     }],
     color:"#FF0000DD",
     width: 2,
     dottedLine: true,
     arrowLine: true
   }],
    controls: [{
      id: 1,
      iconPath: '/images/icon/star.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 30,
        height: 30
      },
      clickable: true
    }],
    circles: [{
      longitude: 113.324520,
      latitude: 23.099994,
      color: "#FF0000DD",
      fillColor: "#7cb5ec88",
      radius: 2000,
      strokeWidth: 2
    }]
  },

  regionchange(e) {
    console.log(e.type)
  },

  markertap(e) {
    console.log(e.markerId)
  },

  controltap(e) {
    console.log(e.controlId)
    wx.openLocation({
      latitude: 23.099994,
      longitude: 113.324520,
      scale: 14,
      name: '北京'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取信息
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude + '....' + longitude)
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