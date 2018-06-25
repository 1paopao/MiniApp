/*const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
*/

// 星星组件
// 逻辑：返回的接口中评分为两位数，3.7，4.7等，将第一个数字作为有几个完整的星星，第二个数字作为紧挨的星星所占的百分比；
// 所以，可以将获取的积分看成一个含有五个数值的数组；eg:4分：[1, 1, 1, 1, 0]

/* 自己编写的方法

function arrayCoveryStar(star) {
  // 获取的积分
  console.log(star)
  // 截取积分的第一个字符
  var firstNum = parseInt(star)
  // 定义一个空数组,存放评分
  var newArr = [0, 0, 0, 0, 0]
  // 如果firstNum不为0
  if (firstNum) {
    for (var i = 0, i < firstNum, i++) {
      newArr[i] = 1
    }
  }
}*/

function arrayCoveryStar(star) {
  // 截取积分的第一个字符
  var firstNum = star.toString().substring(0,1)
  // 定义一个长度为5的空数组
  var newArr = []
  // 判断第一个字符与5的大小
  for (var i = 0; i < 5; i++) {
    if (i < firstNum) {
      newArr.push(1)
    } else {
      newArr.push(0)
    }
  }
  return newArr;
}

// 获取电影信息
function http(url, callBack) {
  // 获取正在热映，即将上映，top250的数据；
  var _this = this;
  wx.request({
    url: url, //豆瓣访问的api
    method: "GET",
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      // console.log(res.data)
      // callBack(res.data.subjects)
      callBack(res.data)
    }
  })
}

// converToCastString
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

//convertToCastInfos
function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  // formatTime: formatTime,
  arrayCoveryStar: arrayCoveryStar,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfo: convertToCastInfos
}
