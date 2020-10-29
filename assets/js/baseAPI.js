$(function () {
    // 测试地址
    // var testUrl='http://ajax.frontend.itheima.net'

    // 封装一个函数代表地址
    $.ajaxPrefilter(function (options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        // 在封装一个不需要headers类名的函数
        // 因为所有的headers必须要有  /my /只要找到这个就可以添加token 
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = { //将tokrn存储到本地
                Authorization: localStorage.getItem('token'),
            }
        }
        // // 拦截相应判断身份信息
        // options.complete = function (res) {
        //     // console.log(12313213132);
        //     console.log(res.responseJSON);
        //     var obj = res.responseJSON;
        //     // 验证失败的时候 去除本地存储的token 并且不跳转到index 页面
        //     if (obj.status === 1 && obj.message == "身份认证失败！") {
        //         localStorage.removeItem("token");
        //         location.href = "/login.html"
        //     }
        // }
          // 全局统一挂载 complete 回调函数
  options.complete = function(res) {
    // console.log('执行了 complete 回调：')
    // console.log(res)
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1. 强制清空 token
      localStorage.removeItem('token')
      // 2. 强制跳转到登录页面
      location.href = '/login.html'
    }
  }
    })


})