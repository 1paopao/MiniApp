// 引入util.js
var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    theaters: {},
    coming: {},
    top250: {},
    searchList: {},
    // movies页面是否显示
    moviesPanel: true, 
    // gride列表是否显示
    gridePanel: false,
    text: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 正在热映的url、即将上映的url、top250的url
    var theatersurl = app.globalData.g_doubanIp + "/v2/movie/in_theaters?start=0&count=3"
    var comingurl = app.globalData.g_doubanIp + "/v2/movie/coming_soon?start=0&count=3"
    var top250url = app.globalData.g_doubanIp + "/v2/movie/top250?start=0&count=3"

    // 调用获取数据列表的方法；由于访问的是异步的，所以出现的顺序不太一样
    this.getdataList(theatersurl, "theaters", "正在热映")
    this.getdataList(comingurl, "coming", "即将上映")
    this.getdataList(top250url, "top250", "Top250")
  },

  // 获取正在热映，即将上映，top250的数据；
  getdataList: function(url, moviesType, moviesTitle) {
    var _this = this;
    wx.request({
      url: url, //豆瓣访问的api
      method: "GET",
      // data: {    //只截取前三条数据
      //   start: 0,
      //   count: 3 //var top250url = app.globalData.g_doubanIp + "/v2/movie/top250" + "?start=0&count=3"
      // },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        _this.toDealMoviesData(res.data.subjects, moviesType, moviesTitle)
      }
    })
  },

  // 获取数据之后，对数据进行处理  [moviesData: 获取的数据； moviesType：正在热映，上映，top250]
  toDealMoviesData: function(moviesData, moviesType, moviesTitle) {
    // console.log(moviesData)
    // 新定义一个数组
    var moviesDataArr = []
    // 循环传入的参数 == 获取的数据
    for (var index in moviesData) {
      var object = moviesData[index]
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
      moviesDataArr.push(temp)
    }
    // 不区分哪个列表，（存放在一个变量里，供模板使用）
    // this.setData({
    //   movies: moviesDataArr
    // })
    var readyData = {}
    readyData[moviesType] = {
      moviesTitle: moviesTitle,
      // moviesDataArr: moviesDataArr
      movies: moviesDataArr
    }
    this.setData(readyData)
  },

  // 点击“更多”跳转
  showmore: function (e) {
    var title = e.currentTarget.dataset.title
    // 跳转对应的页面
    wx.navigateTo({
      url: 'more/more?title=' + title
    })
  },

  // 输入框获取焦点
  onBindFocus: function(e) {
    this.data.text = ''
    this.setData({
      moviesPanel: false,
      gridePanel: true
    })
  },

  // 输入框失去焦点
  onBindFirm: function(e) {
    // 获取输入框终中的值
    var text = e.detail.value
    this.setData({
      text: e.detail.value
    })
    var searchUrl = app.globalData.g_doubanIp + "/v2/movie/search?q=" + text;
    this.getdataList(searchUrl, "searchList", "")
  },

  // 清空搜索框内容
  clear: function(e) {
    // 清空输入框的文字
    this.setData({
      moviesPanel: true,
      gridePanel: false,
      text: '',
      searchList: {} //清空搜索的列表
    })
  },

  // 跳入电影详情页
  toMoviesDetail: function(e) {
    console.log(e)
    // data-movieId 转为 movieid
    var movieId = e.currentTarget.dataset.movieid
    // 跳转对应的页面
    wx.navigateTo({
      url: 'movies-detail/movies-detail?movieId=' + movieId
    })
  }
})