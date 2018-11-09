$(function () {
  // 定义全局变量
  // var id = getUrlVal('cid');
  // console.log(id);
  // var currentPagenum = 1;
  var totalPage;
  // 创建数据对象
  var data = {
    query: '',
    currentPagenum: 1,
    pagesize: 10,
    cid: $.getUrlVal('cid')
  }
  init()



  // 下拉刷新上拉加载效果的初始化函数
  function init() {
    mui.init({
      pullRefresh: {
        container: ".pyg_view", //下拉刷新容器标识
        down: {
          auto: true, //首次加载自动上拉刷新一次
          //  触发下拉刷新时自动触发
          callback: function () {
            // console.log(data);
            // 当页面在下拉刷新到没有数据返回后,需要将页面改为1
            data.currentPagenum = 1;
            // console.log(data);
            getSearchData(function (html) {
              // 数据第一次加载
              $('.pyg_goodItems').html(html);
              // 结束下拉刷新
              mui('.pyg_view').pullRefresh().endPulldownToRefresh();
              // 重置 组件 
              mui('.pyg_view').pullRefresh().refresh(true);
            });
          }
        },
        up: {
          callback: function () {
            if (data.currentPagenum > totalPage) {
              // 结束上拉加载更多 如果没有数据 传入 true 否则 传入 false
              mui('.pyg_view').pullRefresh().endPullupToRefresh(true);
            } else {
              data.currentPagenum++;
              // 下拉加载,获取第二页数据追加
              getSearchData(function (html) {
                $('.pyg_goodItems').append(html);
                // 结束下拉刷新
                mui('.pyg_view').pullRefresh().endPullupToRefresh();
              });
            }
          }
        }
      }
    });
    eventTap();
  }

  // 获取传过来id对应的数据
  function getSearchData(callback) {
    // 发送请求 http://api.pyg.ak48.xyz/api/public/v1/goods/search
    $.get('goods/search', data, function (res) {
      console.log(res)
      // 计算总页数
      totalPage = Math.ceil(res.data.total / data.pagesize);
      // 判断数据是否回来,回来后调用模板
      if (res.meta.status == 200) {
        var html = template('searchDataTpl', {
          data: res.data.goods
        });
        // 当数据回来后调用回调函数
        callback(html);
      } else {
        console.log(res.meta.msg);
      }
    })
  }

  // mui在下拉和上拉组件中,禁止了a标签的点击默认跳转行为
  // 原因: 因为mui后期是可以将代码打包成混合app,h5的默认跳转不好看,在去页面跳转的时候,希望你可以使用app内一些跳转更好看
  // 解决: 1. 修改源码   不靠谱  
  //      2. 把 a标签看作普通div
  // 1 触发tap的点击事件,获取被点击的标签的href
  // 2 通过js的方式跳转  location.href=被点击的a表的href
  function eventTap() {
    $('.pyg_goodItems').on('tap', 'a', function () {
      var href = this.href;
      // console.log(href);
      location.href = href;
    })
  }
})