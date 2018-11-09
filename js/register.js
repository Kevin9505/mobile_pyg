$(function () {
  // 定义全局变量
  // var dataCode;
  // var telphone;
  // // 判断手机号码是否正确,获取验证码
  // $('#verification').on('tap', function () {
  //   // 获取手机文本框的值
  //   telphone = $('#account').val();
  //   // console.log(telphone);
  //   // 判断是否为空
  //   if (telphone == '' && telphone.trim() == '') {
  //     // console.log(11);
  //     mui.toast('手机号码不能为空', {
  //       duration: 'long',
  //       type: 'div'
  //     })
  //     return;
  //     // 判断是否符合规则
  //   } else if (!(/^1[34578]\d{9}$/.test(telphone))) {
  //     mui.toast('手机号码格式不正确', {
  //       duration: 'long',
  //       type: 'div'
  //     })
  //     return;
  //   } else {
  //     // 当手机号码正确后发送请求获取验证码
  //     $.post('users/get_reg_code', {
  //       mobile: telphone
  //     }, function (res) {
  //       // 判断数据是否回来
  //       if (res.meta.status == 200) {
  //         dataCode = res.data;
  //         mui.toast('验证码为: ' + res.data, {
  //           duration: 'long',
  //           type: 'div'
  //         })
  //         // 当数据回来后,需要隔时间段后才可以再次获取
  //         var num = 10;
  //         var timerId = setInterval(function () {
  //           num--;
  //           // 禁用按钮的点击
  //           $('#verification').attr('disabled', true).html(num + '秒后重新获取');
  //           if (num == 0) {
  //             clearInterval(timerId);
  //             $('#verification').removeAttr("disabled").html('重新获取验证码');
  //           }
  //         }, 500);
  //       }
  //     })
  //   }
  // })

  // // 点击注册按钮
  // $('#reg').on('tap', function () {
  //   // 判断验证码是否输入且正确
  //   var code = $('#code').val();
  //   if (code == '' && code.trim() == '') {
  //     mui.toast('验证码不能为空', {
  //       duration: 'long',
  //       type: 'div'
  //     })
  //     return;
  //   } else if (code != dataCode) {
  //     mui.toast('验证码不正确', {
  //       duration: 'long',
  //       type: 'div'
  //     })
  //     return;
  //   }
  //   // 判断邮箱是否正确
  //   var userEmail = $('#email').val();
  //   if (userEmail == '' && userEmail.trim() == '') {
  //     mui.toast('邮箱不能为空', {
  //       duration: 'long',
  //       type: 'div'
  //     })
  //     return;
  //   } else if (!$.checkEmail(userEmail)) {
  //     mui.toast('邮箱格式不正确', {
  //       duration: 'long',
  //       type: 'div'
  //     })
  //     return;
  //   }
  //   // 判断密码是否输入
  //   var userPwd = $('#password').val();
  //   if (userPwd == '' && userPwd.trim() == '') {
  //     mui.toast('密码不能为空', {
  //       duration: 'long',
  //       type: 'div'
  //     })
  //     return;
  //   }
  //   // 判断确认密码是否和密码一致
  //   var passwordConfirm = $('#password_confirm').val();
  //   if (passwordConfirm == '' && passwordConfirm.trim() == '') {
  //     mui.toast('密码不能为空', {
  //       duration: 'long',
  //       type: 'div'
  //     })
  //     return;
  //   } else if (userPwd != passwordConfirm) {
  //     mui.toast('两次密码不一致', {
  //       duration: 'long',
  //       type: 'div'
  //     })
  //     return;
  //   }
  //   // 获取单选框的值
  //   var userSex = $("[name=sex]:checked").val();
  //   register(telphone, code, userEmail, userPwd, userSex)
  // })

  // // 注册函数
  // function register(mobile, code, email, pwd, gender) {
  //   $.post('users/reg', {
  //     mobile: mobile,
  //     code: code,
  //     email: email,
  //     pwd: pwd,
  //     gender: gender
  //   }, function (res) {
  //     console.log(res);
  //     if (res.meta.status == 200) {
  //       mui.toast('注册成功', {
  //         duration: 'long',
  //         type: 'div'
  //       });
  //       window.location.href = "./login.html";
  //     } else if (res.meta.status == 400) {
  //       mui.toast('注册失败,请重新注册', {
  //         duration: 'long',
  //         type: 'div'
  //       });
  //     }
  //   })
  // }

})