$(function () {
  init()

  function init() {
    var goods_id = $.getUrlVal('goods_id');
    var Cid = $.getUrlVal('cid');
    $('.goback')[0].href = './goodslist.html?cid=' + Cid;
    // 获取商品信息
    getGoodsDetail(goods_id)
    // 添加到购物车
    addCart();
  }

  // 获取商品的数据
  function getGoodsDetail(goods_id) {
    $.get('goods/detail', {
      goods_id: goods_id
    }, function (res) {
      if (res.meta.status == 200) {
        console.log(res);
        var html = template('goodsDetailTpl', {
          data: res.data
        });
        $('.pyg_view').html(html)
        setSlider();
      }
    })
  }
  // 轮播图的初始化
  function setSlider() {
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
  }

  // 点击加入购物车
  function addCart() {
    $('.pyg_addCart').on('tap', function () {
      // 点击加入购物车后,先判断是否已经登录了,从本地存储中获取信息,从而判断是否登录
      var userInfo = localStorage.getItem('userInfo');
      // console.log(userInfo);
      if (!userInfo) {
        mui.toast('请先登录', {
          duration: 'long',
          type: 'div'
        })
        setTimeout(function () {
          location.href = './login.html';
        }, 1000)
        return;
      }
    })
  }


})