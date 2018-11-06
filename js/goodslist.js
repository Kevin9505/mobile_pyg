$(function () {
  init();
  // 为了方便管理,封装初始化函数
  function init() {
    // refresh()
  }

  // 下拉刷新上拉加载效果的初始化函数
  function refresh() {
    mui.init({
      pullRefresh: {
        container: ".pyg_view",
        down: {
          auto: true,
          //  触发下拉刷新时自动触发
          callback: function () {}
        },
        up: {
          //  触发上拉刷新时自动触发
          callback: function () {}
        }
      }
    });

    // 结束下拉刷新
    mui('.pyg_view').pullRefresh().endPulldownToRefresh();

    // 结束上拉加载更多 如果没有数据 传入 true 否则 传入 false
    mui('.pyg_view').pullRefresh().endPullupToRefresh();

    // 重置 组件
    mui('.pyg_view').pullRefresh().refresh(true);
  }

  //截取字符串中文传参
  function getUrlVal(key) {
    // 获取参数 
    var url = window.location.search;
    // 正则筛选地址栏 
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数 
    var result = url.substr(1).match(reg);
    //返回参数值 
    return result ? decodeURIComponent(result[2]) : null;
  }
  //id与name
  var id = getUrlVal('cid');
  // var name = getUrlVal("name");

  getSearchData(id)
  // 获取传过来id对应的数据
  function getSearchData(id) {
    // console.log(id)
    // 发送请求
    $.get('goods/search', [{
      cid: id
    }], function (res) {
      console.log(res.data.goods)
      if (res.meta.status == 200) {
        var html = template('searchDataTpl', {
          data: res.data.goods
        });
        $('.pyg_goodItems').html(html);
      } else {
        console.log('获取数据失败');
      }
    })
  }
})