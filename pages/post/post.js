// （es5 接收）访问data/data.js文件里的数据  路径必须是相对路径
// var dataLists = require('../../data/posts-data.js')

// （es6 接收）访问data/data.js文件里的数据
import dataLists from '../../data/posts-data.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    condation: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	// options 是页面初始化跳转所带来的参数
    // 获取本地数据库中的数据，存放在data数据中
    this.setData({
      // es5的写法
      // contentLists: dataLists.postList

      // es6的写法
      contentLists: dataLists
    })
  },

  // 跳转文章详情页
  goDetail: function(e) {
    var pageId = e.currentTarget.dataset.pageid;
    // 跳转到某个页面,并将相对应的id传到详情页
    wx.navigateTo({
      url: "post-detail/postDetail?id=" + pageId
    })
  },

  // 点击swipe跳转对应的页面
  /* 
      事件：catch事件阻止冒泡；bind事件不会阻止冒泡；
      currentTarget: 指向时间捕获的对象； 在这里currentTarget代表swipe；
      target：指向点击的对象； 在这里target指向点击的img；
    */
  goSwipeDeatil: function(e) {
    var pageId = e.target.dataset.pageid;
    wx.navigateTo({
      url: "post-detail/postDetail?id=" + pageId
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  	// to do 怎么获取传来的路径
    // console.log(document.URL)
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