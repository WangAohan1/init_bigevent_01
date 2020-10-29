$(function () {
    // 获取验证规则不能超过6位
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "亲输入的密码请在1 ~ 6 之间"
            }
        }
    })
    initUserinfo()
    // 封装一个函数进行获取用户信息
    function initUserinfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('您获取信息失败!')
                } else {
                    // 将用户信息渲染到页面上     js方法
                    //     var data=res.data
                    //   $('.layui-form [name=username]').val(data.username)
                    //   $('.layui-form [name=nickname]').val(data.nickname)
                    //   $('.layui-form [name=email]').val(data.email)

                    // layui里面提供的方法
                    form.val('formUserInfo', res.data)
                }
            }
        })
    }


    //重置输入框的事情
    $('#btnReset').on('click', function (e) {
        // type类型为reset所以要组织默认行为
        e.preventDefault()
        // 再次调用并且重新渲染
        initUserinfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        var fd = $(this).serialize()
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: fd,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('亲 获取信息失败!')
                } else {
                    // 如果成功吧图像旁边的username 进行改变
                    layer.msg('亲 获取信息成功!')

                    // 非常重要的一部调用父元素外面的函数 
                    // 因为这个uesr页面在ifarme里面 所以点parent进行调用
                    window.parent.getUserinfo()
                }
            }
        })
    })


})