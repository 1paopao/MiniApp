// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
        {name: 'USA', value: '美国'},
        {name: 'CHN', value: '中国', checked: 'true'},
        {name: 'BRA', value: '巴西'},
        {name: 'JPN', value: '日本'},
        {name: 'ENG', value: '英国'},
        {name: 'TUR', value: '法国'},
        ]
  },

  switch1Change: function(e) {
    console.log(e.detail.value)
  },

  sliderChange: function(e) {
    console.log(e.detail.value)
  },

  sliderChanging: function(e) {
    console.log(e.detail.value)
  },

  bindReplaceInput: function(e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    console.log(value + '----' + pos)
    if(pos != -1){ 
      //光标在中间
      var left = e.detail.value.slice(0,pos)
      //计算光标的位置
      pos = left.replace(/11/g,'2').length
    }
    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g,'2'),
      cursor: pos
    }
  },

  radioChange: function(e) {
    console.log(e.detail.value)
  },

  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  formReset: function() {
    console.log('form发生了reset事件')
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