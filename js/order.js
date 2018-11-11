$(function () {
  init();

  function init() {
    // eventList()
    getOrder($.getUrlVal('type'));
    // console.log($.getUrlVal('type'));
  }
  // 获取订单数据
  function getOrder(type) {
    $.get('my/orders/all', {
      type: type
    }, function (res) {
      console.log(res);
      if (res.meta.status == 200) {
        var html = template('orderId', {
          data: res.data
        });
        $('.order_content').html(html)
      }
    })
  }

  // 判断是哪个页面
  function eventList() {
    if ($.getUrlVal('type') == '1') {
      $('#allOrder').addClass('mui-active').siblings().removeClass('mui-active');
      getOrder($.getUrlVal('type'));

    } else if ($.getUrlVal('type') == '2') {
      $('#payment').addClass('mui-active').siblings().removeClass('mui-active');
      getOrder($.getUrlVal('type'));

    } else if ($.getUrlVal('type') == '3') {
      $('#collect').addClass('mui-active').siblings().removeClass('mui-active');
      getOrder($.getUrlVal('type'));

    }
  }


})