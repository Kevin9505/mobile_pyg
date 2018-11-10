$(function () {
  init();

  function init() {
    getLogin();
  }

  function getLogin() {
    $('#login').on('tap', function () {
      // 获取用户输入的数据
      var mobile = $('#mobile').val().trim();
      var password = $('#password').val().trim();
      // 验证手机号码
      if (!$.checkPhone(mobile)) {
        mui.toast('手机号码格式不正确', {
          duration: 'long',
          type: 'div'
        });
        return;
      }
      // 验证密码
      if (password.length < 6) {
        mui.toast('密码长度至少6位', {
          duration: 'long',
          type: 'div'
        });
        return;
      }
      // 当验证全部通过后,发送请求,获取用户信息
      $.post('login', {
        username: mobile,
        password: password
      }, function (res) {
        // console.log(res);
        if (res.meta.status == 200) {
          res.data.loginTime = Date.now();
          // console.log(res);
          // 将登录成功后返回的用户数据存储在本地永久缓存中
          /* localStorage.setItem('userInfo', JSON.stringify(res.data)); */
          $.setUserInfo(res.data);
          mui.toast(res.meta.msg, {
            duration: 'long',
            type: 'div'
          });
          // var pageUrl = sessionStorage.getItem('pageUrl');
          // var pageUrl = $.getPageUrl();
          // console.log(pageUrl);
          // 判断是否存在跳转过来页面的路径,如果有,则跳转回去,否则跳转到首页
          if ($.getPageUrl()) {
            location.href = $.getPageUrl();
          } else {
            location.href = '../index.html';
          }
        } else {
          mui.toast(res.meta.msg, {
            duration: 'long',
            type: 'div'
          });
        }
      })
    })
  }
})