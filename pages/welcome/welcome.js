Page({
	// 进入首页
	enterMain: function(e) {
		// 跳转方式一：平行页面跳转（不带返回按钮，页面关闭执行onUnload事件）
		// wx.redirectTo({
		// 	url: "../post/post"
		// })

		// 跳转方式二：嵌套页面跳转（带有返回按钮，页面隐藏执行onHide事件）
		// wx.navigateTo({
		// 	url: "../post/post"
		// })

		// 跳转方式三：跳转到带有tabbar的页面；url可以是绝对路径，也可以是相对路径
		wx.reLaunch({
			url: "../post/post"
		})
	},

	showtItle: function(e) {
		console.log('bind前缀的事件名不阻止冒泡')
	},
	
	// 监听页面卸载
	onUnload: function() {
		console.log('onUnload  ing')
	},

	// 监听页面隐藏
	onHide: function() {
		console.log('onHide  ing')
	}
})