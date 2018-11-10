# mobile_pyg
移动端品优购项目
#### 扩展zepto 为  $ 对象增加自定义方法 如 可以这样使用 $.show();
$.extend($, {
  show: function () {
    $("body").addClass("waitting");
  }
});
#### 优化分类页面图片路径
利用art-template的模板变量
template.defaults.imports.imgurl=BaseUrl; 
val BaseUrl='http://api.pyg.ak48.xyz/';
调用方法: {{.imgurl}};
