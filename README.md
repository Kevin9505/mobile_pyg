# mobile_pyg
移动端品优购项目
#### 扩展zepto 为  $ 对象增加自定义方法 如 可以这样使用 $.show();
$.extend($, {
  show: function () {
    $("body").addClass("waitting");
  }
});
