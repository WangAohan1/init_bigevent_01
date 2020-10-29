$(function(){
    // 测试地址
// var testUrl='http://ajax.frontend.itheima.net'

// 封装一个函数代表地址
$.ajaxPrefilter(function(options){
    options.url='http://ajax.frontend.itheima.net' + options.url
    // 在封装一个不需要headers类名的函数
    // 因为所有的headers必须要有  /my /只要找到这个就可以天极爱token 
    if(options.url.indexOf('/my/') !==-1){
        options.headers={
            Authorization:localStorage.getItem('token'),
        }
    }
    options.complete=function(res){
        var obj =res.responseJSON;
        if(obj.status == 1 && obj.message =="身份认证失败！"){
            localStorage.removeItem("token");
            location.href="/login.html"
        }
    }
})

// 拦截相应判断身份信息

})