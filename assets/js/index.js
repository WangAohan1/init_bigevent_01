$(function(){
    getUserinfo()

    // 点击退出
    var layer=layui.layer
    $('#goLogin').on('click',function(){
        layer.confirm('确定退出吗亲?', {icon: 3, title:'提示'}, function(index){
            location.href='/login.html'
            localStorage.removeItem('token')
            layer.close(index);
          });
    })
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

