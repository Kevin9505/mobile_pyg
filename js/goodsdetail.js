$(function () {
  // 定义全局变量 全局变量首字母大写
  var GoodsInfo;
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
        GoodsInfo = res.data;
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
      var userInfoStr = localStorage.getItem('userInfo');
      // console.log(userInfo);
      if (!userInfoStr) {
        mui.toast('请先登录', {
          duration: 'long',
          type: 'div'
        })
        setTimeout(function () {
          location.href = './login.html';
        }, 1000)
        return;
      } else {
        // 登录了,获取当前商品的信息
        var info = {
          cat_id: GoodsInfo.cat_id,
          goods_id: GoodsInfo.goods_id,
          goods_name: GoodsInfo.goods_name,
          goods_number: GoodsInfo.goods_number,
          goods_price: GoodsInfo.goods_price,
          goods_small_logo: GoodsInfo.goods_small_logo,
          goods_weight: GoodsInfo.goods_weight
        }
        // console.log(info);
        // 发送请求
        var infoStr = JSON.stringify(info);
        var userToken = JSON.parse(userInfoStr).token;
        // console.log(userToken);
        /**因为当前的接口必须在请求头里,添加token,$.post()没有办法添加;data:只是放正常的业务流程的参数  headers: 一般是存放 登录 凭证相关 */
        $.ajax({
          type: 'post',
          url: 'my/cart/add',
          data: {
            info: infoStr
          },
          Authorization: userToken,
          success: function (res) {
            console.log(res);
            if (res.meta.status == 200) {
              mui.confirm('添加成功，跳转到购物车页面?', '温馨提示', ['跳转', '取消'], function (type) {
                if (type.index == 0) {
                  location.href = './shoppingCart.html'
                } else {
                  console.log('取消');
                }
              })
            } else {
              mui.toast(res.meta.status, {
                duration: 'long',
                type: 'div'
              })
            }
          }
        })
      }
    })
  }


})