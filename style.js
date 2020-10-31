$(function(){
           //鼠标点击特效
        //页面加载事件
        jQuery(function () {
 
            //声明变量
            var 点击数 = 0;
 
            //给页面创建点击事件
            $("html").click(function (e) {
 
                //创建颜色库
                //随机颜色
                //创建颜色码
                const 前颜色码库 = new Array('00', '11', '22', '33', '44', '55', '66', '77', '88', '99',
                    'aa', 'bb', 'cc', 'dd', 'ee', 'ff');
                const 中颜色码库 = new Array('00', '11', '22', '33', '44', '55', '66', '77', '88', '99',
                    'aa', 'bb', 'cc', 'dd', 'ee', 'ff');
                const 后颜色码库 = new Array('00', '11', '22', '33', '44', '55', '66', '77', '88', '99',
                    'aa', 'bb', 'cc', 'dd', 'ee', 'ff');
 
                //从颜色库选取一种颜色;当然这是数组的方式;随机性
                var 前颜色码 = Math.floor(Math.random() * 前颜色码库.length);
                var 中颜色码 = Math.floor(Math.random() * 中颜色码库.length);
                var 后颜色码 = Math.floor(Math.random() * 后颜色码库.length);
 
                // console.log("前颜色码 = " + 前颜色码 + "; 中颜色码 = " + 中颜色码 + "; 后颜色码 = " + 后颜色码 + ";")
                // console.log("#" + 前颜色码库[前颜色码] + 中颜色码库[中颜色码] + 后颜色码库[后颜色码]);
 
                //每当鼠标点击页面增加点击数
                点击数++;
 
                //创建元素; 创建的元素是span元素,这个元素的内容是"鼠标点击了第" + 点击数(这个是一个变量) + "次"
                var 创建元素 = $("<span>").text("鸟随鸾凤飞腾远,人伴忠良品自高");
 
                //在页面上添加span元素
                jQuery("html").append(创建元素);
 
                //获取鼠标点击坐标
                var 横坐标 = e.pageX;
                var 纵坐标 = e.pageY;
 
                //给span元素添加css样式
                创建元素.css({
                    "z-index": 999, //设置或获取定位对象的堆叠次序(z-index):999
                    "top": 纵坐标 - 20, //上(top):y-20
                    "left": 横坐标, //左:x
                    "position": "absolute", //定位:绝对定位
                    "font-weight": "bold", //字体粗细:粗体
                    "color": "#" + 前颜色码库[前颜色码] + 中颜色码库[中颜色码] + 后颜色码库[后颜色码], //颜色:绿色
                    "user-select": "none", //使文字不被选中
                });
 
                //
                创建元素.animate({
                        "top": 纵坐标 - 180, //上:y-180 
                        "opacity": 0 //透明度(opacity):0 
                    }, 2000, //1500,调节动画速度 
                    function () { //功能函数 
                        创建元素.remove(); //$i的删除
                    }
                );
 
            })
        })
})