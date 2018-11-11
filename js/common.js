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
    },
    // 设置分类本地永久缓存
    setLocalStorage: function (storage) {
      localStorage.setItem('cateData', JSON.stringify({
        data: storage,
        time: Date.now()
      }));
    },
    // 获取分类本地永久缓存
    getLocalStorage: function (cateData) {
      return localStorage.getItem(cateData);
    },
    // 设置用户信息本地缓存
    setUserInfo: function (userData) {
      localStorage.setItem('userInfo', JSON.stringify(userData));
    },
    // 获取用户信息本地缓存
    getUserInfo: function () {
      return localStorage.getItem('userInfo');
    },
    // 判断用户是否存在
    isLogin: function () {
      var userInfoStr = $.getLocalStorage('userInfo');
      if (!userInfoStr || Date.now() - JSON.parse(userInfoStr).loginTime > 10000000) {
        return false;
      } else {
        return true;
      }
    },
    // 设置当前页面的路径存放会话缓存
    setPageUrl: function () {
      sessionStorage.setItem('pageUrl', location.href)
    },
    // 获取当前页面的路径
    getPageUrl: function () {
      return sessionStorage.getItem('pageUrl');
    }
  })
  // zepto 拦截器
  function ajaxSet() {
    // 定义公共路径
    // var BaseUrl = 'http://api.pyg.ak48.xyz/api/public/v1/';
    var BaseUrl = 'http://api.pyg.ak48.xyz/';
    // 在template里面导入变量
    // template.defaults.imports.log=console.log;
    if (window.template) { //加上 window可以解决报错，虽然是未定义
      template.defaults.imports.imgurl = BaseUrl;
    }
    // zepto 拦截器 在发送请求前被调用
    $.ajaxSettings.beforeSend = function (xhr, obj) {
      // console.log(xhr);
      // return;
      // 根据获取到的数据,拼接接口路径
      obj.url = BaseUrl + 'api/public/v1/' + obj.url;
      // 设置请求头
      if (obj.url.indexOf('my') != -1) {
        xhr.setRequestHeader('Authorization', JSON.parse($.getUserInfo()).token)
      }
      // 正在等待
      $('body').addClass('looding');
    }
    // zepto 拦截器 在发送请求结束后被调用
    $.ajaxSettings.complete = function () {
      $('body').removeClass('looding');
    }
  }






})