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
          $('.mui-btn').attr('disabled', true)
          $('.mui-numbox-input').attr('disabled', true)
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
      // 在每个li中获取每个数字输入框的值
      var unitPreice = $(li).find('.mui-numbox-input').val();
      // 求出总价格
      totalPrice += goodPrice * unitPreice;
    }
    // console.log(totalPrice);
    $('.price_wrap').text(totalPrice);
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
        $('.mui-btn').removeAttr('disabled')
        $('.mui-numbox-input').removeAttr('disabled')
      } else {
        $('#pyg_edit').text('编辑')

        var $unactiveLis = $('.checkBtn').not(':checked').parents('li');
        syncCart($unactiveLis)
      }
    })

    // 点击删除
    $('#pyg_delete').on('tap', function () {
      // 获取选中的li  $ 只是标明了是不是jq元素
      var $activeLis = $('.checkBtn:checked').parents('li');
      var $unactiveLis = $('.checkBtn').not(':checked').parents('li');
      // console.log($unactiveLis);
      // 判断是否选择了要编辑的商品
      if ($activeLis.length == 0) {
        mui.toast('您还没选择商品哦', {
          duration: 'long',
          type: 'div'
        });
        return;
      }
      // console.log($activeLis);
      // 调用同步数据库函数
      syncCart($activeLis)
    })

    // 点击生成订单
    $('.makeOrder').on('tap', function () {
      // console.log(2);
      var $orderLis = $('.pyg_order_wrap li')
      if ($orderLis.length == 0) {
        mui.toast('您还没购买商品哦', {
          duration: 'long',
          type: 'div'
        });
        return;
      }
      // 构造数据
      var orderData = {
        order_price: $('.price_wrap').text(),
        consignee_addr: $('.mui-ellipsis').text(),
        goods: []
      }


      for (var i = 0; i < $orderLis.length; i++) {
        var temObj = {}
        var li = $orderLis[i];
        // 获取每个li上的数据
        var obj = $(li).data('goods');
        // console.log(obj);
        var temObj = {
          goods_id: obj.goods_id,
          goods_number: $(li).find('.mui-numbox-input').val(),
          goods_price: obj.goods_price
        }
        // temObj.goods_id = obj.goods_id;
        // temObj.goods_number = $(li).find('.mui-numbox-input').val();
        // console.log($(li).find('.mui-numbox-input').val());
        // temObj.goods_price = obj.goods_price;
        orderData.goods.push(temObj);
        // console.log(orderData);
      }
      // console.log(orderData);
      $.post('my/orders/create', orderData, function (res) {
        // console.log(res);
        if (res.meta.status == 200) {
          mui.toast(res.meta.msg, {
            duration: 'long',
            type: 'div'
          });
          $.setPageUrl();
          setTimeout(function () {
            location.href = './order.html'
          }, 1000)
        } else {
          mui.toast(res.meta.msg, {
            duration: 'long',
            type: 'div'
          });
        }
      })
    })

  }

  // 同步购物车数据
  function syncCart(lis) {
    var totalPrice = 0;
    var newData = {}
    // 循环遍历数组
    for (var i = 0; i < lis.length; i++) {
      var li = lis[i]
      // 获取每个li对应的数据
      var obj = $(li).data('goods');
      // console.log(obj);
      // 获取商品数量
      var goodsNum = $(li).find('.mui-numbox-input').val();
      // console.log(goodsNum);
      var goodPrice = obj.goods_price;
      totalPrice += goodsNum * goodPrice;
      // 构造传输的数据
      newData[obj.goods_id] = obj;
      newData[obj.goods_id].amount = goodsNum;
      // console.log(newData);
    }
    // console.log(totalPrice);
    // 发送请求
    $.post('my/cart/sync', {
      infos: JSON.stringify(newData)
    }, function (res) {
      // console.log(res);
      if (res.meta.status == 200) {

        mui.toast(res.meta.msg, {
          duration: 'long',
          type: 'div'
        });
        getCartData()
        $('.price_wrap').text('￥' + totalPrice);
      }
    })
  }


})