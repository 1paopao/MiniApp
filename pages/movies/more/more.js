// pages/movies/more/more.js


/*   bug1:  当大于数据的个数的时候，任然在记载；  思路：采用vue加载思路 
     bug2： 即将上映的电影未能正常显示图片，报404错误；  思路：使用wx:if
*/
var util = require('../../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    title: '',
    dataUrl: '',
    // 获取的数据的长度
    allCount: 0,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面加载之后，获取链接传来的title
    this.title  = options.title
    var dataUrl = ""
    switch(this.title) {
     case '正在热映':
       dataUrl = app.globalData.g_doubanIp + "/v2/movie/in_theaters"
       break;
     case '即将上映':
       dataUrl = app.globalData.g_doubanIp + "/v2/movie/coming_soon"
       break;
     case 'Top250':
       dataUrl = app.globalData.g_doubanIp + "/v2/movie/top250"
       break;
    }
    this.data.dataUrl = dataUrl
    // 获取数据
    util.http(dataUrl, this.toDealMoviesDatas)
  },

  // 实现“上滑加载”
  // scrolltolower: function() {
  //   console.log('下拉加载')
  //   // ???奇怪   
  //   // console.log(this.data.allCount + '------' + this.allCount)
  //   // 加载数据，只不过每次加载的数据编号发生了变化
  //   var nextUrl = this.data.dataUrl + '?start=' + this.data.allCount + '&count=20'
  //   console.log(nextUrl)
  //   // 加载数据
  //   util.http(nextUrl, this.toDealMoviesDatas)
  //   // 显示导航栏加载按钮
  //   wx.showNavigationBarLoading()
  // },


  // 点击“更多”获取数据
  toDealMoviesDatas: function(moviesData) {
    console.log(moviesData)
    // 新定义一个数组,新加载的数据
    var movies = []
    // 循环传入的参数 == 获取的数据
    for (var index in moviesData.subjects) {
      var object = moviesData.subjects[index]
      // 对标题进行处理
      var title = object.title
      if (title.length >= 6) {
        title = title.substring(0,6) + '...'
      }
      // 对评分进行处理
      var average = object.rating.average.toFixed(1)
      // 定义一个对象，
      var temp = {
        stars: util.arrayCoveryStar(object.rating.stars),
        movieId: object.id,
        title: title,
        coverImg: object.images.large,
        average: average
      }
      // 将对象存放到数组
      movies.push(temp)
    }


    // 利用数据绑定，实现下拉加载新加载的数据；定义一个合并之后的数组
    var moviesDatas = {}
    // 如果不为空，将不是第一次加载，原来的movies里面是有数据的
    if (!this.data.isEmpty) {
      moviesDatas = this.data.movies.concat(movies)
    } else {
      // 如果为空，则代表是第一次加载
      moviesDatas = movies
      // 第一次加载之后，就不为空了
      this.data.isEmpty = false
    }
    this.setData({
      movies: moviesDatas
    })
    // 隐藏导航栏加载数据
    wx.hideNavigationBarLoading()
    this.data.allCount += 20
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 一般要等页面加载完之后，进行dom的操作
    wx.setNavigationBarTitle({
      title: this.title
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 下拉加载是更新所显示的20条数据
   */
  onPullDownRefresh: function (e) {
    console.log('下拉加载')
    var nextUrl = this.data.dataUrl + '?start=0&count=20'
    // 清空movies, 然后isEmpty为空
    this.data.movies = {}
    this.data.isEmpty = true
    this.data.allCount = 0
    util.http(nextUrl, this.toDealMoviesDatas)
  },

  /**
   * scroll-view组件中，不支持下拉刷新和上滑加载同时操作，所以需要将scroll-view组件改为view组件，将绑定的下拉加载函数，放在onReachBottom
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 加载数据，只不过每次加载的数据编号发生了变化
    var nextUrl = this.data.dataUrl + '?start=' + this.data.allCount + '&count=20'
    console.log(nextUrl)
    // 加载数据
    util.http(nextUrl, this.toDealMoviesDatas)
    // 显示导航栏加载按钮
    wx.showNavigationBarLoading()
  },

  // 跳入电影详情页
  toMoviesDetail: function(e) {
    console.log(e)
    // data-movieId 转为 movieid
    var movieId = e.currentTarget.dataset.movieid
    // 跳转对应的页面; 注意路径的编写
    wx.navigateTo({
      url: '../movies-detail/movies-detail?movieId=' + movieId
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})