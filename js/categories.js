$(function () {
  init();
  // 定义全局变量
  var categoriesData;
  // 渲染分类页面的数据
  function init() {
    // 调用方法
    getLocalStorage(); //判断是否有本地缓存
    // getcategories(); //获取全部分类数据

  }

  // 获取分类全部数据
  function getcategories() {
    // 发送请求获取数据
    $.get('categories', function (res) {
      // 判断数据是否返回,进行渲染
      if (res.meta.status == 200) {
        // 取出全部的数据
        categoriesData = res.data;
        // 由于数据量过大,为了增强用户的体验,需设置本地缓存,在第一次加载数据后,缓存到本地,再次请求时,先判断是否有本地缓存,如果没有再发送请求,获取数据
        // 数据一回来就设置本地缓存
        /* localStorage.setItem('cateData', JSON.stringify({
          data: categoriesData,
          time: Date.now()
        })); */
        $.setLocalStorage(categoriesData);
        // 渲染数据
        console.log('发送请求');
        getLeftCate();
        getRightGood(0);
      } else {
        console.log('获取数据失败');
        mui.toast(res.meta.msg, {
          duration: 'long',
          type: 'div'
        });
        return;
      }
    })
  }

  // 获取左侧分类数据
  function getLeftCate() {
    // 调用模板渲染数据
    var htmlLeft = template('LeftCateTpl', {
      data: categoriesData
    });
    $('.cate_menu').html(htmlLeft).hide().fadeIn(600);
    // 待元素生成后,添加滚动事件
    myScrollLeft();
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
      // 点击左侧标签渲染右侧对应的数据
      getRightGood(cateIindex)
    })
  }

  // 封装渲染右侧商品数据的函数
  function getRightGood(index) {
    // 获取右侧商品的数据
    var rightGoodData = categoriesData[index].children;
    // console.log(rightGoodData);
    // 渲染右侧商品数据
    var htmlRight = template('RightGoodTpl', {
      data: rightGoodData
    });
    $('.cate_group_wrap').html(htmlRight).hide().fadeIn(600);

    // 注意点: 由于图片大数据比较大,标签有了,不一定会有高度,所以得等全部图片渲染完成后再调用滚动事件
    var num = $('.pyg_categories_right img').length;
    $('.pyg_categories_right img').on('load', function () {
      num--;
      // 当右侧的图片全部加在完后再做事件绑定
      if (num == 0) {
        myScrollRight()
      }
    })

  }

  // 右侧的滑动效果
  function myScrollRight() {
    // 初始化滚动事件
    var myScroll = new IScroll('.pyg_categories_right');
    // console.log(1);
  }

  // 二次渲染数据,先判断本地缓存中是否存在,如果不存在,在发送请求获取
  function getLocalStorage() {
    // var localStorageDataStr = localStorage.getItem('cateData')
    var localStorageDataStr = $.getLocalStorage('cateData')
    // console.log(localStorageData);
    // 如果没有本地缓存,则发送请求获取数据
    if (!localStorageDataStr) {
      getcategories();
    } else {
      var localStorageData = JSON.parse(localStorageDataStr);
      // console.log(localStorageData);
      // 判断本地缓存是否过期,如果过期了就重新发请求获取数据
      if (Date.now() - localStorageData.time > 10000) {
        getcategories();
      } else {
        categoriesData = localStorageData.data;
        console.log('本地缓存');
        getLeftCate();
        getRightGood(0);
      }
    }
  }
})