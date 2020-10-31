$(function () {

    // 获取列表信息
    initBook()

    function initBook() {
        $.ajax({
            url: "/my/article/cates",
            type: 'GET',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return "获取列表失败!"
                };
                var htmlStr = template('tmp-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var indexAdd
    $('#btnAddcate').on('click', function () {
        indexAdd = layer.open({
            // 指定弹出层的样式
            type: 1,
            // 指定弹出层大小
            area: ['500px', '251px'],
            // 标题
            title: '添加文章分类',
            // 内容
            content: $('#dialog-add').html()
        });

    })


    // 添加信息
    $('body').on('submit', '#formadd', function (e) {
        e.preventDefault()
        var fd = $(this).serialize()
        console.log(fd);
        $.ajax({
            url: "/my/article/addcates",
            type: 'POST',
            data: fd,
            success: function (res) {
                if (res.status !== 0) {
                    return '您添加失败'
                } else {

                    '您添加成功'
                    // 调用渲染函数
                    initBook()
                    // 并且关闭弹出层
                    layer.close(indexAdd);
                }
            }
        })
    })

    // 编辑信息
    // 定义一个编辑层的弹出框
    var indexEdit
    $('tbody').on('click', '#btn-edit', function () {
        indexEdit = layer.open({
            // 指定弹出层的样式
            type: 1,
            // 指定弹出层大小
            area: ['500px', '251px'],
            // 标题
            title: '添加文章分类',
            // 内容
            content: $('#dialog-edit').html()
        });

        // 获取在编辑按钮里的自定义属性data-Id的值
        var id = $(this).data('id')
        // alert(id)
        // 发起请求
        $.ajax({
            url: "/my/article/cates/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    return '您获取用户信息失败'
                };
                // 成功就调用layui里面的方法将数据渲染到页面上
                layui.form.val("form-edit", res.data)
            }
        })



        // 然后在发起修改请求
        $('body').on('submit', '#form-edit', function (e) {
            e.preventDefault()
            var fd = $(this).serialize()
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: fd,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return "您获取信息失败"
                    };
                    '恭喜你修改成功'
                    initBook()
                    layer.close(indexEdit);

                }
            })
        })
    })

    // 删除信息
    $('tbody').on('click', '#btn-del', function () {
        var id = $(this).data('id')
        // alert(id)
        layui.layer.confirm('is not?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return "您删除失败"
                    };
                    "恭喜您删除成功"
                    // 获取成功就重新渲染页面
                    initBook()
                    // 关闭餐层
                    layer.close(index);

                }
            })


        });
    })

})