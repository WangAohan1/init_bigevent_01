$(function () {
    var form = layui.form
    var layer = layui.layer
    // 定义一个时间过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义一个p
    var q = {
        pagenum: 1, //	页码值
        pagesize: 2, //   每页显示多少条数据
        cate_id: '', //	文章分类的 Id
        state: '', //	文章的状态，可选值有：已发布、草稿
    }



    inittable()
    initCate()




    // 将表格模板引擎渲染
    function inittable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res);
                // 成功的话调用tmp函数
                var htmlStr = template('tmp-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    // 获取ajax的文章分类
    function initCate() {
        $.ajax({
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return "您获取用户信息失败"
                }
                // 如果成功就渲染模板引擎
                var htmlStr = template('tmp-cate', res)
                $('[name=cate_id]').html(htmlStr)
                //  在调用layui自封的渲染函数
                form.render()
            }
        })
    }

    // 筛选系列操作
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 更改q的属性值 
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        // 重新赋值后再渲染一遍
        inittable()
    })

    // 分页
    var laypage = layui.laypage;

    function renderPage(total) {
        // console.log(total);  //一共有多少个数
        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 6, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    // 因为页面已加载的时候就调用所以不能让他一开始就加载
                    // 显示要做的事情重新渲染页面
                    inittable()

                }
            }
        })
    }


    // 删除事件
    $('tbody').on('click', '.btn-delete', function () {
        // 获取自定义属性的Id值
        // 这个必须放在这里 因为this指向
        var id = $(this).data('id')

        // 当前页面的按钮个数
        var btlength = $('.btn-delete').length

        layer.confirm('is not?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('您删除失败')
                    };
                    layer.msg('恭喜您删除成功')

                    // 进行判断总按钮的个数如果按钮小于1就进行跳转
                    if (btlength === 1 && q.pagenum > 1) {
                        q.pagenum -- 
                    }
                    // 然后重新渲染
                    inittable()

                }
            })
            9
        })

    })
})