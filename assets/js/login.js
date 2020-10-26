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

      // 注册账号事件 用ajax
      $('#form_reg').on('submit',function(e) {
            e.preventDefault()
            // console.log(123);
            var data=$(this).serialize()
            console.log(data);
            $.ajax({
                  method:'POST',
                  url:'http://ajax.frontend.itheima.net/api/reguser',
                  data:data,
                  succsee:function(res){
                  if(res.status !== 0){
                        // return console.log(res.message);
                        console.log(123);
                  }else{
                        console.log(注册成功);
                  }
                  }
            })
      })
})