$(function () {
  init();

  function init() {
    setFontSize();
    ajaxSet()
  }
  // 封装动态设置页面字体大小的函数
  function setFontSize() {
    // 设计稿的宽度 / 基础值 = 要适配的屏幕的宽度 / 字体 
    // 字体大小=基础值 * 要设配的屏幕的宽度 / 设计稿的宽度
    var baseSize = 100; // 基础值
    var pageWidth = 375; // 设计稿大小
    var screenWidth = document.querySelector('html').offsetWidth; // 获取当前屏幕的大小
    fs = baseSize * screenWidth / pageWidth + 'px';
    $('html').css('font-size', fs); //根据获取到的数据,动态设置字体大小
  }
  // 屏幕动态改变时触发
  window.onresize = function () {
    setFontSize();
  }

  // zepto 拦截器
  function ajaxSet() {
    // 定义公共路径
    var BaseUrl = 'http://api.pyg.ak48.xyz/api/public/v1/';
    // zepto 拦截器 在发送请求前被调用
    $.ajaxSettings.beforeSend = function (xhr, obj) {
      // console.log(obj.url);
      $('body').addClass('looding');
      // 根据获取到的数据,拼接接口路径
      obj.url = BaseUrl + obj.url;
    }
    // zepto 拦截器 在发送请求结束后被调用
    $.ajaxSettings.complete = function () {
      $('body').removeClass('looding');
    }
  }


  // 为$对象增加自定义方法
  $.extend($, {
    //截取字符串中文传参
    getUrlVal: function (key) {
      // 获取参数 
      var url = window.location.search;
      // 正则筛选地址栏 
      var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
      // 匹配目标参数 
      var result = url.substr(1).match(reg);
      //返回参数值 
      return result ? decodeURIComponent(result[2]) : null;
    },
    // 验证邮箱的函数
    checkEmail: function (myemail) {
      // 规则
      var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      // 判断值是否符合规则
      if (myReg.test(myemail)) {
        return true;
      } else {
        return false;
      }
    },
    // 验证手机号码
    checkPhone: function (phone) {
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        return false;
      } else {
        return true;
      }
    }
  })



})