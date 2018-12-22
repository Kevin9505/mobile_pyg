# mobile_pyg
#### 扩展zepto 为  $ 对象增加自定义方法 如 可以这样使用 $.show();
```js
$.extend($, {
  show: function () {
    $("body").addClass("waitting");
  }
});
```
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
#### 跳转到另一个网页
+ 使用href来跳转
  - window.location.href='路径';
#### 获取url上的键值对
```js
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
// 获取http://baidu.com/id=1 p的值  ---->  getQueryString(p)  输出1
```
#### 验证邮箱
```js
function checkEmail(myemail) {
    // 规则
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    // 判断值是否符合规则
    if (myReg.test(myemail)) {　　　　
        return true;　　
    } else {　　　　
        return false;
    }
}
```
#### 验证手机号码
```js
function checkPhone(phone) {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
        return false;
    } else {
        return true;
    }
}
```
#### 正在等待效果
  + 基于font-awesome的正在等待效果
```html
.loadding {
  &::before {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: .5;
    content: "";
    z-index: 100;
  }
  &::after {
    font: normal normal normal 14px/1 FontAwesome;
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -50px;
    font-size: 100px;
    color: #0094ff;
    content: "\f013";
    z-index: 101;
    animation: fa-spin 1s infinite linear;
  }
}
```
#### mui插件使用经验
```html
+ mui上拉刷新下拉加载
  - HTML
  //  lt_view 为下拉-上拉的容器  里面必须加一层嵌套 div   
  <div class="lt_view">
    //2 div 为额外添加的嵌套
    <div>
      //3 .lt_content 为存放数据的容器
        <ul class="lt_content">
        数据
        </ul>
    </div>
  </div>
  - css
  /* 给最外层容器加上 相对定位 */
  .lt_view{
    position: relative;
  - 初始化javascript
  // 初始化  
  mui.init({
    pullRefresh: {
      container: ".lt_view",
      down: {
        style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
        height:'50px',//可选,默认50px.下拉刷新控件的高度,
        range:'100px', //可选 默认100px,控件可下拉拖拽的范围
        offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        //  触发下拉刷新时自动触发
        callback: function () {
          //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
      },
      up:{
        height:50,//可选.默认50.触发上拉加载拖动距离
        auto:true,//可选,默认false.自动上拉加载一次
        contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        //  触发上拉刷新时自动触发
        callback:function () {
          //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
      }
    }
  });
  - api
  // 结束下拉刷新
  mui('.lt_view').pullRefresh().endPulldownToRefresh();

  // 结束上拉加载更多 如果没有数据 传入 true 否则 传入 false
  mui('.lt_view').pullRefresh().endPullupToRefresh();

  // 重置 组件
  mui('.lt_view').pullRefresh().refresh(true);
```


