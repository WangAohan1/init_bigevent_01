$(function () {
      // 1.1 获取裁剪区域的 DOM 元素
      var $image = $('#image')
      // 1.2 配置选项
      const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
      }

      // 1.3 创建裁剪区域
      $image.cropper(options)

      // 点击按钮跳转到file上传框里
      $('#btnchooseimg').on('click', function () {
        $('#file').trigger('click')
      })

      // 图片改变事件
      $('#file').on('change', function (e) {
        // 拿到用户上传的文件
        var files = this.files[0]
        // console.log(e.target +" +++" +this+ "+++" +$(this));
        // 进行判断
        if (files === undefined) {
          return "请选择图片"
        } else {
          // 2. 将文件，转化为路径
          var imgURL = URL.createObjectURL(files)
          // 3. 重新初始化裁剪区域
          $('#image')
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
        }

      })

      
      // 上传图片
      $('#btUpload').on('click',function(){
        // 获取图片的64位字符串
        // 内带的方法cropper
        var dataURL = $image
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })
        .toDataURL('image/png')
        // 进行ajax提交
        $.ajax({
          url:'/my/update/avatar',
          type:'POST',
          data:{
            avatar:dataURL
          },
          success:function(res){
            if(res.status !==0){
              return "更改用户头像失败"
            }else{
          layui.layer.msg('"恭喜您更改头像成功"')
            // 如果成功了在进行调用index里面的熏染页面
            window.parent.getUserinfo()
            }
          }
        })
      })
    })
