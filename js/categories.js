$(function () {
  init();

  // 渲染分类页面的数据
  function init() {
    // 定义全局变量
    var index = 0;
    // 调用方法
    getLeftCate();
    getRightGood();
  }

  // 获取左侧分类数据
  function getLeftCate() {
    // 发送请求获取数据
    $.get('categories', function (res) {
      // 判断数据是否返回,进行渲染
      if (res.meta.status == 200) {
        // console.log(res);
        // 当读取出右侧数据
        var rightGoodData = res.data[0].children;
        // console.log(rightGoodData);
        // 调用模板渲染数据
        var htmlLeft = template('LeftCateTpl', {
          data: res.data
        });
        $('.cate_menu').html(htmlLeft);
        // 待元素生成后,添加滚动事件
        myScrollLeft();
        getRightGood(rightGoodData)
      } else {
        console.log('获取数据失败');
      }
    })
  }

  // 左侧点击滚到顶部
  function myScrollLeft() {
    // 初始化滚动事件
    var myScroll = new IScroll('.wrapper');
    // 为左边的li注册点击事件
    $('.cate_menu').on('tap', 'li', function (e) {
      // 调用IScroll的方法点击的标签项置顶
      myScroll.scrollToElement($(this)[0]);
      // 当前被点击元素添加类,其兄弟元素移除该类
      $(this).addClass('active').siblings().removeClass('active')
      // 利用zepto的内置方法获取对应的li的索引
      var cateIindex = $(this).index();
    })
  }

  // 获取右侧商品数据
  function getRightGood(rightGoodData) {
    // 渲染右侧商品数据
    var htmlRight = template('RightGoodTpl', {
      data: rightGoodData
    });
    $('.cate_group_wrap').html(htmlRight);
  }

})