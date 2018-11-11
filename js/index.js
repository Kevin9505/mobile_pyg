$(function () {
  init()
  // 首页数据初始化
  function init() {
    getSwiperdata();
    getCatitems();
    getGoodslist();

  }

  // 获取轮播图数据
  function getSwiperdata() {
    // 发送请求
    $.get('home/swiperdata', function (res) {
      // 判断是否拿到数据
      if (res.meta.status == 200) {
        var html = template('sliderTpl', {
          data: res.data
        });
        $('.pyg_silder').html(html);
      } else {
        console.log('数据请求失败');
      }

      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
    })
  }
  // 导航数据
  function getCatitems() {
    // 发送请求
    $.get('home/catitems', function (res) {
      // console.log(res);
      // 渲染数据
      if (res.meta.status == 200) {
        var html = template('navTpl', {
          data: res.data
        });
        $('.pyg_nav').html(html);
      }
    })
  }

  // 商品列表数据
  function getGoodslist() {
    // 发送请求获取数据
    $.get('home/goodslist', function (res) {
      // 判断是否是否成功返回
      if (res.meta.status == 200) {
        console.log(res.data)
        // 渲染商品列表数据
        var html = template('goodslistTpl', {
          data: res.data
        });
        $('.pyg_goodslist').html(html);
        // 设置返回首页的路径
        $('.gobackIndex').on('tap', function () {
          $.setPageUrl();
        })
      } else {
        console.log('数据请求失败');
      }
    })
  }

})