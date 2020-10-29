$(function () {
    // 密码规则
    var layer=layui.layer
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        somepwd: function (value) {
            //   进行判断  新旧密码不能一致
            if (value === $('[name=oldPwd]').val()) {
                return "两次密码不可以一致哦"
            }
        },
        // 判断确认密码月设置密码一致
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return "与新密码不一致"
            }
        }

    })

    // 修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        // 获取表单信息
        var fd = $(this).serialize()
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: fd,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    layer.msg("很遗憾更改密码失败!") 
                };
                layer.msg("恭喜你更改密码成功!") 
                // 成功后要把密码给重置
                $('.layui-form')[0].reset()
            }
        })

    })
})