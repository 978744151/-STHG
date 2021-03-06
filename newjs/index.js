//页面开始进行的函数
$(function () {
    banner()
    render()
    //首页轮播图
    //商品列表参数
    var pageApp = 1;
    var thisgoods = []
    function banner(){
        $.ajax({
            type:"get",
            url:url+'/api/api-bin/wjcm/entry/datalist/queryBannerPicture.action?shopcode=10000000',
            success: function (data) {
                if(data.success == 1){
                    //console.log(data);
                    var html = template("tpl", data);
                    $('.index_banner').html(html);
                    var gallery = mui('.mui-slider');
                    gallery.slider({
                        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                    });
                }else{
                    mui.toast(data.errmsg)
                }
            }
            //,
            //error: function (){
            //    mui.toast('网络错误，请重新进行操作')
            //}
        })
    }
    function render(pageApp){
        console.log(pageApp)
        $.ajax({
            type:'get',
            url:url+'/api/api-bin/wjcm/entry/datalist/queryAllGoods.action?shopcode=10000000',
            data:{
                pageApp : pageApp
            },
            success:function (data) {
                //console.log(data)
                if(data.success == 1){
                    if(pageApp == 1){
                        thisgoods == data.result.goods
                    }else{
                        thisgoods = thisgoods.concat(data.result.goods)
                    }
                    console.log(thisgoods);
                        var html = "";
                        for(var i = 0;i<thisgoods.length;i++){
                    html+= "<div class='goods-item' data-id='"+thisgoods[i].barcode+"'>"
                    html+= "<div class='goods_item_img'>"
                    html+= "<img src ="+thisgoods[i].commoditypic+" alt=''>"
                    html+= "</div>"
                    html+= "<div class='goods_item_p'>"
                    html+= "<p>"+thisgoods[i].commodityname+"</p>"
                    html+= "</div>"
                    html+= "<div class='goods_item_span'>"
                    html+= "<span>包邮</span>"
                    //html+= "<span>推荐</span>"
                    //html+= "<span>新品</span>"
                    html+= "</div>"
                    html+= "<div class='goods_item_price'>"
                    html+= "<span><span style='color: #4038a9; font-size: 14px;'>￥"+thisgoods[i].buyprice+"</span><span style='font-size: 12px;'><del>原价:"+thisgoods[i].saleprice+"</del></span></span>"
                    html+= "<span style='font-size: 12px;margin-top: 2px;'>"+parseInt(thisgoods[i].totalsale)+"购买</span>"
                    html+= "</div>"
                    html+= "</div>"
                        }
                        $('.goods-list').html(html);
                }else{
                    mui.toast(data.errmsg)
                }
            }
            //,
            //error: function () {
            //    mui.toast('加载失败，稍后进行操作')
            //}
        })
    }
    mui.init({
        swipeBack: false,
        pullRefresh: {
            container: '#pull',
            down: {
                callback: pulldownRefresh
            },
            up: {
                contentrefresh: '正在加载...',
                callback: pullupRefresh
            }
        }
    });
    function pulldownRefresh(){
        setTimeout(function () {
            mui('#pull').pullRefresh().endPulldownToRefresh();
            render(1)
        }, 700)
    }
    function pullupRefresh() {
        setTimeout(function () {
            mui('#pull').pullRefresh().endPullupToRefresh();
            pageApp++
            render(pageApp)
        }, 700)
    }
})

$('body').on('tap','.goods-item', function () {
    var index = $(this).data('id');
    openWindow("../new_html/product.html?key="+index)
})
$('body').on('tap','.in_banner', function () {
    var index = $(this).data('id');
    openWindow("../new_html/product.html?key="+index)
})





