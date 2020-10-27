$(function () {

      $('#link_log').on('click', function () {
            $('.log_box').show()
            $('.reg_box').hide()
      })
      $('#link_reg').on('click', function () {
            $('.reg_box').show()
            $('.log_box').hide()
      })

      /* 自己定义密码规则 */
      var form = layui.form
      form.verify({
            // 规定密码数字类型
            pass: [
                  /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function (value) {
                  //    获取注册密码第一次的值判断是否相等
                  // 获取的是密码框的值
                  var pwd = $('.reg_box [name=password]').val();
                  if (value !== pwd) {
                        return "两次密码不一致"
                  }
            }
      })
var layer =layui.layer
      // 注册账号事件 用ajax
      $('#form_reg').on('submit',function(e) {
            e.preventDefault()
            console.log(123);
            var data=$(this).serialize()
            console.log(data);
            $.ajax({
                  method:'POST',
                  url:'/api/reguser',
                  data:data,
                  success:function(res){
                  if(res.status !== 0){
                        // return console.log(res.message);
                  //   return    console.log(123);
                  return layer.msg(res.message, {icon: 6}); 
                  };
                  // alert(res.message)
                 layer.msg(res.message)
                  // 成功的时候设置自动点击事件跳转到登录页面 并且清空输入框
                  $('#link_log').trigger('click')
                  $('#form_reg')[0].reset()
                  }
            })
      })


      // 登录事件
      $('#form_login').on('submit',function(e){
            e.preventDefault()
            // 获取表单信息
            let data=$(this).serialize()
            // 进行数据提交
            $.ajax({
                  url:'/api/login',
                  method:"POST",
                  data:data,
                  success:function(res){
                        // console.log(res);
                        if(res.status !==0){
                              return layer.msg(res.message,{icon: 5})
                        };
                        layer.msg(res.message,{icon: 6})
                        // 然后把数据存在localStrage里面
                        localStorage.setItem('token',res.token)
                        // 跳转到首页
                        location.href='/index.html'
                  }
            })
      })

})