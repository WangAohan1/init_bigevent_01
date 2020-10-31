$(function () {
    var layer = layui.layer
    var form = layui.form
    initCate()
    initEditor()

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取失败")
                };
                layer.msg('获取成功')
                var htmlStr = template('tmp-sel', res)
                $('[name=cate_id]').html(htmlStr)
                // 在调用layer的函数进行渲染
                form.render()
            }
        })
    }


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 点击按钮跳转到上传文件按钮
    $('#chooseImg').on('click', function () {
        $('#coverFile').trigger('click')
    })

    $('#coverFile').on('change', function (e) {
        // 获取到文件的列表数组
        var files = e.target.files[0]
        // 判断用户是否选择了文件
        if (files == undefinde) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files)
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 设置状态
    var state = "已发布" //这个与下面一个代码一样

    // $('btnSave1').on('click',function(){
    //     var state="已发布"
    // })

    $('#btnSave2').on('click', function () {
        state = "草稿"
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        // 获取表单数据
        var fd = new FormData(this)
        // 在想fd里面追加state的属性与值
        fd.append('state', state)

        // 图片处理
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                //   然后发起ajax请求  记得在函数里面

                publish(fd)

            })

    })

    function publish(fd) {
        console.log(fd);
        $.ajax({
            url: "/my/article/add",
            method: 'POST',
            data: fd,
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("您获取失败")
                }

                layer.msg('您获取成功')
                // 并且跳转到list页面
                location.href = '/atacilre/art_list.html'
            }
        })
    }
})