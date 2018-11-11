# mobile_pyg
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
#### h5自定义属性
以 data- 开头的自定义属性  可以通过jq的$('标签').data(); 获取自定义属性的值
##### 例子： <div class="price" data-obj=""></div>  $('.price').data('obj') 
#### 对象赋值
