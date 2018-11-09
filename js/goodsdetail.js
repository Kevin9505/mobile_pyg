$(function () {
  init()

  function init() {
    var goods_id = getUrlVal('goods_id');
    var Cid = getUrlVal('cid');
    $('.goback')[0].href = './goodslist.html?cid=' + Cid;
    getGoodsDetail(goods_id)
  }

  // 获取商品的数据
  function getGoodsDetail(goods_id) {
    $.get('goods/detail', {
      goods_id: goods_id
    }, function (res) {
      if (res.meta.status == 200) {
        console.log(res);
        var html = template('goodsDetailTpl', {
          data: res.data
        });
        $('.pyg_view').html(html)
        setSlider();

      }
    })
  }
  // 轮播图的初始化
  function setSlider() {
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
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

  // 返回商品列表页
  $('.goback').on('tap', function () {
    console.log(this);
  })

})