// 测试地址
// var testUrl='http://ajax.frontend.itheima.net'

// 封装一个函数代表地址
$.ajaxPrefilter(function(res){
    res.url='http://ajax.frontend.itheima.net' + res.url
    // 在封装一个不需要headers类名的函数
    // 因为所有的headers必须要有  /my /只要找到这个就可以天极爱token 
    if(res.url.indexOf('/my/') !==-1){
        res.headers={
            Authorization:localStorage.getItem('token'),
        }
    }
})