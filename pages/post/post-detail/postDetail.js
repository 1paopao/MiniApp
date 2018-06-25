/*
    bug1: 进入详情页，除了第一个，音乐不能播放；
*/

// 引入本地的数据库
import dataLists from '../../../data/posts-data.js'

// 获取应用程序APP.js里面的数据
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataCont: [],
    // 音乐播放状态
    isPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 1.先获取数据 */

    // 获取列表页传来的id 
    var pageId = options.id;
    // 将全局需要的值，存放在data里面; pageId为本文章列表的id
    this.data.pageId = options.id
    // 遍历数组
    dataLists.forEach((obj, index) => {
      // console.log(pageid.indexOf(obj.postId) !== '-1')
      if (obj.postId == pageId) {
        // 将数据存储在data的变量里
        this.setData({
          dataCont: obj
        })
      } 
    })

    /* 2.页面加载之后，先获取文章列表的收藏情况
        1）在这里使用缓存代表后台数据；
        2）格式为  var collectcache = {
                        "文章id"： “true” or “false”
                  }
     */
     var collectCache =  wx.getStorageSync('collectCache')   //获取所有列表缓存数据
     if (collectCache) {  // 先判断是否有缓存，
      var collect = collectCache[pageId]  // 在获取本文章是否收藏
      if (collect) {                      //如果为true
        this.setData({                      // 将获取的收藏的值，存放在collection中，前台通过该数据进行显示或隐藏图片
          collection: collect
        })
      }
     } 
     else {   //如果木有缓存数据
      var collectCache = {}  //设置一个空对象
      collectCache[pageId] = false  //空对象里所有的值设为false
      wx.setStorageSync('collectCache', collectCache)  // 将空对象写入缓存数据对象
     }

     this.seeMusicisPlay()
  },

  /*
    收藏功能
  */
  collect: function (e) {
    /* // 最初的方法
      
    // 获取本地的缓存对象
    var collectCache = wx.getStorageSync('collectCache')
    // 获取该文章是否收藏，pageId怎么传过来
    var collect = collectCache[this.data.pageId]
    // 取反，收藏   <==>   不收藏
    collect = !collect
    // 修改缓存中对应的收藏
    collectCache[this.data.pageId] = collect
    // 更新整个缓存文件
    wx.setStorageSync('collectCache', collectCache)
    // 更新数据绑定
    this.setData({
      collection: collect
    })
    // 用户提示
    wx.showToast({
      title: collect ? '收藏成功' : '取消收藏',
      icon: 'success',
      // image: '../../../images/music/music-stop.png',
      duration: 1000
    })*/

    // this.getcollectCacheSync()
    // this.showModal(collectCache, collect)

    // 调用showToast
    // this.showToast(collectCache, collect)

    this.getcollectCacheSync()
  },

  /*
    通过同步缓存获取数据
  */
  getcollectCacheSync: function(e) {
    // 获取本地的缓存对象
    var collectCache = wx.getStorageSync('collectCache')
    // 获取该文章是否收藏，pageId怎么传过来
    var collect = collectCache[this.data.pageId]
    // 取反，收藏   <==>   不收藏
    collect = !collect
    // 修改缓存中对应的收藏
    collectCache[this.data.pageId] = collect
    // 调用showToast
    this.showToast(collectCache, collect)
  },


  /*
    收藏成功显示弹框;
    需要传入两个参数，否则无法访问到collect里的数据
  */
  showToast: function(collectCache, collect) {
    // showToast： 先执行逻辑，在出弹窗
    // 更新整个缓存文件
    wx.setStorageSync('collectCache', collectCache)
    // 更新数据绑定
    this.setData({
      collection: collect
    })
    // 用户提示
    wx.showToast({
      title: collect ? '收藏成功' : '取消收藏',
      icon: 'success',
      // image: '../../../images/music/music-stop.png',
      duration: 1000
    })
  },

  /*
    通过异步缓存获取数据；一般不推荐使用异步，需要结合业务逻辑
  */
  /*getcollectCacheAsy: function(e) {
    // 修改success里面的this的指向
    var _this = this
    wx.getStorage({
      key: 'collectCache',
      success: function(res) {
        console.log(res.data)
        // 返回的值对应key的value值
        var collectCache = res.data
        if (res.data) {
          // 获取该文章是否收藏，pageId怎么传过来
          var collect = collectCache[_this.data.pageId]
          // 取反，收藏   <==>   不收藏
          collect = !collect
          // 修改缓存中对应的收藏
          collectCache[_this.data.pageId] = collect
          // 调用showToast
          _this.showToast(collectCache, collect)
        }
      }
    })
  },*/

  /*
    showModal: 模态弹窗，需要手动关闭；
  */
  /*showModal: function(collectCache, collect) {
    // showModal: 先出弹框做选择之后，在执行逻辑

    var _this = this

    wx.showModal({
      title: '收藏',
      content: collect ? '是否确认收藏？' : '是否取消收藏',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#450f80',
      success: function(res) {
        // 如果点击了确认按钮
        if(res.confirm) {
          console.log(this)
          // 更新整个缓存文件
          wx.setStorageSync('collectCache', collectCache)
          // 更新数据绑定;  setData必须是指向page的，所以需要转this的指向
          _this.setData({
            collection: collect
          })
        }
      }
    })
  },*/

  /*
    分享功能
  */
  share: function(e) {
    console.log('share')
    var itemList = [
        '分享QQ',
        '分享到微信',
        '分享到微博',
        '分享到邮箱'
        ]

    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#450f80',
      success: function(res) {
        console.log(res.tapIndex)
        // 调用showModal
        wx.showModal({
          title: itemList[res.tapIndex],
          content: '这是我们最美好的时刻~~希望得到你的祝福',
          success: function(res) {
            if(res.confirm) {
              wx.showToast({
                title: '分享成功~',
                icon: 'none'
              })
            }
          }
        })
      }
    })
  },


  /*
    监听页面中音乐播放的状态
  */
  seeMusicisPlay: function(e) {
    var _this = this
    // 页面一加载，就监听主音乐是否播放
    wx.onBackgroundAudioPlay(function() {
     // 如果播放，设置isPlay为true
     _this.setData({
       isPlay: true
     })
     // 设置全局变量播放为true
     app.globalData.g_isPlay = true
     console.log(_this)
     app.globalData.g_pageId = _this.data.pageId
    })

    //监听音乐暂停
    wx.onBackgroundAudioPause(function() {
     _this.setData({
       isPlay: false
     })
      app.globalData.g_isPlay = false
      app.globalData.g_pageId = null
    })

    // 监听音乐停止
    wx.onBackgroundAudioStop(function() {
     _this.setData({
       isPlay: false
     })
      app.globalData.g_isPlay = false
      app.globalData.g_pageId = null
    })

    // 如果全局变量为true，重新设置单个页面变量
    if(app.globalData.g_isPlay && app.globalData.g_pageId == this.data.pageId) {
      this.setData({
        isPlay: true
      })
    }
  },

  /*
    播放音乐
  */
  palyMusic: function(e) {
    console.log('play')
    // 获取播放状态
    var isPlay = this.data.isPlay

    if (isPlay) {
      // 关闭音乐
      wx.pauseBackgroundAudio()
      // 设置data中isPlay的状态
      this.setData({
        isPlay: false
      })
    } 
    else {
      // 音乐播放； 注意：dataUrl、coverImgUrl不能使用本地的图片，因为体积过大；尽量使用网络地址
      wx.playBackgroundAudio({
          dataUrl: dataLists[this.data.pageId].music.url,
          title: dataLists[this.data.pageId].music.title,
          coverImgUrl: dataLists[this.data.pageId].music.coverImg
      })
      // 同时设置data中isPlay的状态
      this.setData({
        isPlay: true
      })
    }
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