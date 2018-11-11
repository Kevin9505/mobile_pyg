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
  }


})