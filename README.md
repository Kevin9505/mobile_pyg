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
变量赋值有两种
var obj={};
+ obj[key]=value;
  - 方括号的方式 key是可以动态改变的,可以给对象动态赋值
+ obj.age=23;
  - 点的方式  是指定key的内容,多用于定向赋值
#### json字符串和json对象的转换
+ json字符串转为 json对象
  - JSON.parse(json字符串);
+ json对象转为json字符串
  - JSON.stringify(json对象);
#### 浏览器本地缓存
+ localStorage() 本地永久缓存  除非手动清除,不然不会被清
+ sessionStorage() 会话缓存  关闭浏览器或标签即清除
+ 共同点 
  - API 
    - 添加 setItem(key,value);
    - 获取 getItem(key);
    - 删除一个 removeItem(key);
    - 清空所有 clear();
  - 本地缓存的时候,都必须转为字符串
    - JSON.stringify(obj);
  - 获取时,将字符串解析为对象
    - JSON.parse(jsonObj);
  -在同源网站中,不同的页面中数据共享
+ 相同点
  - 本地缓存容量 5M或者20M 具体看浏览器
  - 本地存储的安全性
    - 本地缓存的安全性比cookie好
        - 本地缓存 相当于在房间里(谷歌浏览器)裸奔
        - cookie 相当于在大街上裸奔
+ 例子
  - 设置本地缓存  localStorage.setItem(key,val);
  - 获取本地缓存  var localStorage=localStorage(key);
  

