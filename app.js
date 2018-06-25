App({
  // 定义全局的变量，只有在退出小程序之后，会恢复于初始值
  globalData: {
    // 全局定义音乐播放的属性
    g_isPlay: false,     
    // 全局定义播放的是哪个歌曲
    g_pageId: null,
    // 全局定义豆瓣的api网址
    g_doubanIp: "http://t.yushu.im"
  }
})
