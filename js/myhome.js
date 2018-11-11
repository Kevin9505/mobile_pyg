$(function () {
  init();

  function init() {
    if (!$.isLogin()) {
      mui.toast('您还没登录呢', {
        duration: 'long',
        type: 'div'
      });
      // getLogin();
      location.href = './login.html'
      return;
    }
    $('body').fadeIn();

    getUserData()
    eventList()
  }

  // 获取用户信息
  function getUserData() {
    $.get('my/users/userinfo', function (res) {
      console.log(res);
      if (res.meta.status == 200) {
        $('.userName').text(res.data.user_tel);
        $('.mui-ellipsis').text(res.data.user_email)
      }
    })
  }


  function eventList() {
    // 退出登录
    $('.logout a').on('tap', function () {
      // console.log(1);
      mui.confirm('您确定要退出登录吗?', '温馨提醒', ['取消', '确认'], function (etype) {
        if (etype.index == 1) {
          localStorage.clear();
          location.href = './login.html'
        }
      });
    })
    // 设置返回路径
    $('.pyg_order_items').on('tap', function () {
      $.setPageUrl();
    })
  }


})