var app = getApp()
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.movieId
    // 获取电影的详情信息
    var detailUrl = app.globalData.g_doubanIp + '/v2/movie/subject/' + movieId
    // 获取数据
    util.http(detailUrl, this.detailData)
  },

  detailData: function(data) {
    console.log(data)
    // 对详情信息的一些为空的字段进行处理，需要注意的是2级属性需要判断是否为空；
    if (!data) return;
    var directors = {
      avatars: "",
      name: "",
      id: ""
    }
    // 如果第一个元素不为空；如果是二级属性（更多属性）最好做判断；
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        directors.avatars = data.directors[0].avatars.large
      }
      directors.name = data.directors[0].name
      directors.id = data.directors[0].id
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      original_title: data.original_title,
      wish_count: data.wish_count,
      comments_count: data.comments_count,
      year: data.year,
      genres: data.genres.join('、'),
      stars: util.arrayCoveryStar(data.rating.stars),
      score: data.rating.average,
      directors: directors,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfo(data.casts),
      summary: data.summary
    }

    this.setData({
      movie: movie
    })
  },

  // 查看图片
  previwImage: function (e) {
    // 预览图片
    var url = e.currentTarget.dataset.src
    console.log(url)
    wx.previewImage({
      current: '',
      urls: [url]
    })
  }
})