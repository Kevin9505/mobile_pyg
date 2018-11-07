$(function () {
  // init();

  // function init() {}

  // 账号输入框改变时
  $('#account').on('input', function () {
    // 获取手机号码
    var userPhone = $('#account').val();
    if (userPhone != '' && userPhone.trim() != '') {
      $('.userPhone span').removeClass('mui-hidden');
    } else {
      $('.userPhone span').addClass('mui-hidden');
    }

  })

  // 账号文本框失焦时,隐藏一次清除按钮
  $('#account').on('blur', function () {
    // console.log(11);
    $('.userPhone span').addClass('mui-hidden');
  })
  // 当账号文本框再次获焦时,判断是否为空,不为空,叉掉按钮显示
  $('#account').on('focus', function () {
    var userPhone = $('#account').val();
    // console.log(22);
    if (userPhone != '' && userPhone.trim() != '') {
      $('.userPhone span').removeClass('mui-hidden');
    }
  })


  // 一次清除文本框中的值
  $('.mui-icon-clear').on('tap', function () {
    $('#account').val('');
    $(this).addClass('mui-hidden');
  })

  // 点击小眼睛控制密码的显示隐藏
  // $('.mui-icon-eye').on('tap', function () {
  //   $('.userPwd span').addClass('mui-active')
  // })

  // 点击登录
  $('#login').on('tap', function () {
    // 获取手机号码,密码
    var userPhone = $('#account').val();
    var userPwd = $('#password').val();
    // 判断手机号码是否为空
    if (userPhone == '' && userPhone.trim() == '') {
      mui.toast('手机号码格式不正确', {
        duration: 'long',
        type: 'div'
      });
      return;
    }
    // 判断密码是否为空
    if (userPwd == '' && userPwd.trim() == '') {
      mui.toast('密码不能为空', {
        duration: 'long',
        type: 'div'
      });
      return;
    }
    getUserData(userPhone, userPwd)
  })

  // 从数据库中获取数据
  function getUserData(userPhone, userPwd) {
    // console.log(userPhone, userPwd);
    // 发送post请求
    $.post('login', {
      username: userPhone,
      password: userPwd
    }, function (res) {
      // console.log(res)
      // 判断是否有数据返回
      if (res.meta.status == 200) {

      } else {
        mui.toast(res.meta.msg, {
          duration: 'long',
          type: 'div'
        });
        return;
      }
    })
  }

  // 验证手机号码
  function checkPhone(phone) {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      return false;
    } else {
      return true;
    }
  }
})