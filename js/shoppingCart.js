$(function () {
  init();

  function init() {

    /* 在进入购物车页面时,先验证用户是否登录了,没有登录则跳转到登录页面 */
    if (!$.isLogin()) {
      mui.toast('请先登录', {
        duration: 'long',
        type: 'div'
      });
      setTimeout(function () {
        location.href = './login.html'
      }, 1000)
    } else {
      $('body').fadeIn();
      // 获取购物车数据
      getCartData();
      /* 一堆事件 */
      eventList();
    }
  }

  /* 获取购物车数据 */
  function getCartData() {
    $.ajax({
      url: 'my/cart/all',
      type: 'get',
      headers: {
        Authorization: JSON.parse($.getUserInfo('userInfo')).token
      },
      success: function (res) {
        // console.log(res.data.cart_info);
        // 判断数据是否返回
        if (res.meta.status == 200) {
          var cartData = JSON.parse(res.data.cart_info);
          // console.log(cartData);
          var html = template('orderTpl', {
            data: cartData
          });
          $('.pyg_order_wrap').html(html);
          // 求总价
          totalPrice();
          // 初始化number按钮
          mui('.mui-numbox').numbox();
        }
      }

    })
  }

  // 求总价
  function totalPrice() {
    // 获取全部的订单
    var $lis = $('.pyg_order_wrap li');
    // console.log($lis);
    var totalPrice = 0;
    // 判断是否存在订单
    if ($lis.length == 0) {
      return;
    }
    // 循环遍历数组
    for (var i = 0; i < $lis.length; i++) {
      // console.log($lis[i]);
      var li = $lis[i];
      var obj = $(li).data('goods');
      var goodPrice = obj.goods_price;
      var unitPreice = $(li).find('.mui-numbox-input').val();
      // 求出总价格
      totalPrice += goodPrice * unitPreice;
    }
    console.log(totalPrice);
    $('.price_wrap').text('￥' + totalPrice);
  }


  function eventList() {
    // 点击添加按钮或减少按钮,求价格
    $('.pyg_order_wrap').on('tap', '.mui-numbox .mui-btn', function () {
      // console.log(11);
      totalPrice()
    })

    // 单击编辑
    $('#pyg_edit').on('tap', function () {
      $('body').toggleClass('edit');
      if ($('body').hasClass('edit')) {
        // console.log(1);
        $('#pyg_edit').text('完成')
      } else {
        $('#pyg_edit').text('编辑')
      }
    })
  }



})