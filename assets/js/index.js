$(function(){
    getUserinfo()
})

// 获取用户的信息
function getUserinfo(){
$.ajax({
    method:'GET',
    url:"/my/userinfo",
    // 必填项是headers
    // headers:{
    //     Authorization:localStorage.getItem('token'),
    // },
    success:function(res){
        console.log(res);
    
        // 进行判断是否获取成功
        if(res.status !==0){
            return layui.layer.msg(res.message)
            
        }else{
            
         // 成功后将渲染页面头像
        renderAvatar(res.data)
        }
    
    }
})
}


// 进行渲染头像
function renderAvatar(user){
    console.log(123);
    // 有管理员名称就渲染管理员没有就渲染自己的名字
    var name =user.nickname || user.username
    console.log(name);
    $('.welcome').html("欢迎&nbsp;" + name)
    // 进行判断是否有头像
    // 进行图片渲染 如果有user_pic就先渲染这个
    if(user.user_pic !==  null){
        $('.user-avatar').hide()
        $('.layui-nav-img').show().attr('src',user.user_pic)
    }else{
        var text=name[0].toUpperCase()
        $('.user-avatar').show().html(text)
        $('.layui-nav-img').hide()
    }
}

