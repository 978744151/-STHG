<template>
    <div class="index">
        <!--loading -->
        <loading v-if="showloading"></loading>
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
            <div v-if="!showloading">
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <!-- head -->
                    <div class="head">
                        <div class="scan" @click="scan()">
                            <img src="https://pic.repaiapp.com/static/png/20180410/11/1523329363808855249.png">
                            <p>扫一扫</p>
                        </div>
                        <div class="input" @click="search">
                            <img src="https://pic.repaiapp.com/static/png/20180410/11/1523329977382645757.png"> 
                            <div>搜索商品，共{{total}}件好物</div>
                            <!-- <input type="" name="" placeholder="搜索商品，共3件好物" disabled="disabled"> -->
                        </div>
                        <div class="msg" @click="msg">
                            <div class="tips" v-if="msgcount!=0"></div>
                            <img src="https://pic.repaiapp.com/static/png/20180410/11/1523330518649159753.png" >
                            <p>消息</p>
                        </div>
                    </div>
                    <div class="headHeight"></div>
                    <!-- banner -->
                    <swiper :options="swiperOption" id="swiper1">
                        <swiper-slide v-for="item,index in thumbs" :key="index" >
                            <img :src="item.thumb" @click="clickBanner(item.type,item.link)">
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                    <!-- ad -->
                    <div class="ad" v-if="shops.notice!=''">
                        <p>香天下</p>
                        <img src="https://pic.repaiapp.com/static/png/20180410/11/1523331757649710054.png">
                        <swiper :options="swiperOption3" id="swiper3">
                            <swiper-slide v-for="(item,index) in shops.notice" :key="index" @click="noticeDetail(item.id)">
                                <p class="adCon"  @click="noticeDetail(item.id)">{{item.title}}</p>
                            </swiper-slide>
                        </swiper>
                        
                        <p class="more" @click="more">更多</p>
                    </div>
                    <!-- TODAY’S  DISCOUNT -->
                    <div class="today"  v-if="shops.bargain!=''">
                        <div class="todayTitle"></div>
                        <swiper class="todayConAll" :options="swiperOption1">
                            <swiper-slide v-for="item,index in shops.bargain" :key="index">
                                <!-- <img src="https://pic.repaiapp.com/static/png/20180410/11/1523330875815255101.png"> -->
                                <!-- :style="background-image:item.header_img" -->
                                <div class="todayCon">
                                    <div class="conHead" :style="{backgroundImage: 'url(' +item.header_img+ ')'}"><p>今日限量{{item.count}}{{item.unit}}</p></div>
                                    <div class="conItro" :style="{backgroundImage: 'url(' +item.background+ ')'}">
                                        <img :src="item.thumbs" class="IntroLeft">
                                        <div class="IntroRight">
                                            <p>{{item.goodsname}}</p>
                                            <div class="price">¥{{item.marketprice}}/<span>{{item.unit}}</span>
                                                <p>
                                                    <img src="https://pic.repaiapp.com/static/png/20180410/14/1523342283189939950.png">
                                                    降价{{item.cut_price}}
                                                </p>
                                            </div>
                                            <p class="btn" @click="particulars(item.goodsid)">立即抢购
                                                <img src="https://pic.repaiapp.com/static/png/20180410/14/1523342736664415099.png">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>  
                    </div>
                    <!-- POPUlAR  GOODS -->
                    <div class="popular">
                        <div class="popularTitle"><img src="https://pic.repaiapp.com/static/png/20180410/14/1523342981672305253.png"></div>
                        <div class="popularCon">
                            <div class="list" v-for="(item,index) in shops.hot" @click="particulars(item.id)" :key="index" :data-id="item.id">
                                <img :src="item.thumb">
                                <div style="padding: 0 5px">
                                    <p class="listTitle">{{item.title}}</p>
                                    <p class="nums">{{item.sales}}人已购买</p>
                                    <p class="price1">￥{{item.marketprice}}</p>
                                    <div class="shopCart"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                </van-pull-refresh> 
                 <!-- tips -->
                <div class="footer-tips" v-if="showTips" @click="tips()">
                    <img src="https://pic.repaiapp.com/static/png/20180614/18/1528972017879899753.png" class="laba">
                    <p>关注「手提火锅」公众号，更多新品优惠抢先购 >></p>
                    <img src="https://pic.repaiapp.com/static/png/20180614/18/1528972053649975697.png" class="close" @click.stop="closeTips()">
                </div>
                <div class="height35" v-if="showTips"></div>
                <!-- 点击关注的二维码 -->
                <div class="mask" v-if='focus'></div>
                <div class="poput" v-if='focus'>
                    <div class="poput-close" @click="tips()"></div>
                    <p class="poput-header">关注手提火锅公众号,更多新品<br/>优惠抢先购</p>
                    <img :src="focusImg">
                    <span>长按识别二维码</span>
                </div>
                <navBar :nav=0></navBar>
                <div class="navHeight"></div>
            </div>
        <!-- </van-pull-refresh> -->
    </div>
</template>
<script src="http://libs.cdnjs.net/vue-resource/1.3.4/vue-resource.min.js"></script>
<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import navBar from '../components/navigation-bar'
    import loading from '../components/loading'
    import api from '../network/request'
    import { PullRefresh } from 'vant'
    import wxapi from '../common/wxapi.js'
    import { Toast } from 'vant'
    import wx from 'weixin-js-sdk'
    export default {
        name: "index",
        components: {
            swiper,
            swiperSlide,
            navBar,
            loading
        },

        data() {
            /*
            * param {obj} swiperOption Swiper轮播图组件参数
            * param {str} login 用户登录状态 1、未登录；2、未绑定；3、已登录
            * param {obj} loginOption 登录注册组件
            * param {obj} toastOption 消息提示组件
            * */
            return {
                swiperOption: {
                    autoplay: true,//可选选项，自动滑动
                    speed: 500,
                    delay: 5000,
                    loop: true,
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                    }
                },
                swiperOption1: {
                    // autoplay: true,//可选选项，自动滑动
                    speed: 500,
                    delay: 5000,
                    loop: true,

                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                    }
                },
                swiperOption3:{
                    autoplay: true,//可选选项，自动滑动
                    speed: 500,
                    delay: 5000,
                    loop: true,
                    direction:'vertical'
                },
                thumbs:[],
                shops:[],
                showloading:true,
                total:"",
                isLoading: false,
                msgcount:'',
                showTips:'',
                focus:false,
                focusImg:''

            }
        },
        methods: {
            //点击底部显示二维码
            tips:function(){
                this.focus=!this.focus;
            },
            //关闭底部的提示
            closeTips:function(){
                this.showTips=!this.showTips
            },
            //扫一扫
            scan:function(){
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        // alert("扫描结果："+result);
                        // window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
                    }
                })
                // var _this=this;
                // _this.$shareUrl.shareUrl('','');
                // wxapi.wxRegister(_this.wxRegCallback)
            },
            wxRegCallback () {
                wxapi.scan();
            },
            onRefresh() {
              setTimeout(() => {
                this.thumb();
                this.shop();
                this.isLoading = false;
              }, 500);
            },
            //点击notice
            noticeDetail:function(id){
                this.$router.push({name: 'noticeDetail', query: {id:id}})
            },
            //点击banner
            clickBanner:function(type,link){
                if(type=="link"){
                    window.location.href=link;
                }else{
                    var id=link.slice(1);
                    localStorage.setItem('indexShopid',id);
                    this.$router.push({name: 'particulars', query: {"id":id}})
                }

            },
            //跳转商品详情页
            particulars:function(id){
                localStorage.setItem('indexShopid',id);
                this.$router.push({name: 'particulars', query: {"id":id}})
                // if(localStorage.getItem('access_token')==''){
                //     this.$router.push({name: 'login', params: {}})
                // }else{
                //     console.log(id)
                //     localStorage.setItem('indexShopid',id);
                //     this.$router.push({name: 'particulars', params: {"id":id}})
                // }
                
            },
            //是否有新消息
            newmessage:function(){
                const params={access_token:localStorage.getItem('access_token')};
                api.post('message/count',params,res=>{
                console.log(res);
                    if(res.status==0){
                        this.msgcount=res.data
                    }   
                })
            },  
            //banner
            thumb:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')||''};
                api.post('shop/thumbs',params,res=>{
                console.log("banner=>",res);
                    if(res.status==0){
                        _this.newmessage();
                        _this.showloading=false;
                        _this.thumbs=res.data;
                    }else{
                        Toast(res.msg)
                    }  
                })
            },
            //shop
            shop:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')||''};
                api.post('shop/goods',params,res=>{
                console.log("shop=>",res);
                    if(res.status==0){
                       _this.shops=res.data;
                       _this.total=res.data.total
                    }else{
                        Toast(res.msg)
                    }  
                })
            },
            //获取是否已经关注公众号
            isfocus:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')||''};
                api.post('user/isSubscribe',params,res=>{
                console.log(res);
                     // _this.showTips=true
                    if(res.status==0){
                       if(!res.data.subscribe){
                            // 没有关注
                            _this.showTips=true;
                            _this.focusImg=res.data.img;
                       }else{
                            _this.showTips=false
                       }
                    }else{
                            Toast(res.msg)
                    }
                })
            },
            //搜索
            search:function(){
                this.$router.push({name: 'search', params: {}})
            },
            //消息中心
            msg:function(){
                this.$router.push({name: 'msg', params: {}})
            },
            //快报更多
            more:function(){
                 this.$router.push({name: 'moreNotice', params: {}})
            },
            //授权
            token:function(cb){
                var _this=this;
                var params={access_token:localStorage.getItem('access_token')||''};
                api.post('open/mpLogin',params,res=>{
                    console.log(res);
                    // localStorage.setItem('access_token','');
                    // cb && cb();
                    if(res.status==0){
                        if(res.data.is_reg){
                            localStorage.setItem('access_token',res.data.access_token);
                        }else{
                            localStorage.setItem('access_token','');
                        }
                        cb && cb();
                    }else{
                        // localStorage.setItem('access_token','');
                        cb && cb();
                    }
                    if(res.status==10001){
                        api.post('open/againLogin','',res=>{
                            if(res.status==0){
                                location.reload();
                                // _this.created();
                            }
                        })
                    }
                })
            }
            
            
        },
        created() {
            // this.thumb();
            // this.shop();
            Toast.clear();
            var _this=this;
            var access_token=localStorage.getItem('access_token')||'';
            var sharecode=api.getQueryString("code")||'';
            if(sharecode!=''){
                sessionStorage.setItem('code', api.getQueryString("code"));
            }
            if(access_token==''){
                this.token(function(){
                    _this.thumb();
                    _this.shop();
                    _this.$shareUrl.shareUrl('','','首页','https://pic.repaiapp.com/static/png/20180417/16/1523952477820325556.png');
                    if(localStorage.getItem('access_token')!=''){
                        _this.isfocus();
                    }

                });
            }else{
                _this.thumb();
                _this.shop();
                _this.$shareUrl.shareUrl('','','首页','https://pic.repaiapp.com/static/png/20180417/16/1523952477820325556.png');
                _this.isfocus();
            }
            
            
            //判断是否已经登陆 第一次进入程序
            // var flag=0;
            // for(var i=0;i<localStorage.length;i++){
            //     if(localStorage.key(i)=="access_token"){
            //         flag=1;
            //     }
            // }
            // if(flag==0){
            //     localStorage.setItem('access_token','');
            // }
        }
    }
</script>

<style scoped> 
    .poput-close{
        position: absolute;
        right: 13px;
        top: 13px;
        width: 17px;
        height: 17px;
        background-image: url('https://pic.repaiapp.com/static/png/20180619/10/1529376716326794955.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .poput span{
        color: #888888;
    }
    .poput img{
        position: relative;
        width: 196px;
        height: 196px;
        margin: 15px 0;
    }
    .poput-header{
        text-align: center;
    }
    .poput{
        position: fixed;
        width:316px;
        height:335px;
        background:rgba(255,255,255,1);
        border-radius:11px;
        top: 0;
        left: 0;
        z-index: 10002;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #323232;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .mask{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        top: 0;
        left: 0;
        z-index: 10001;
    }
    .footer-tips{
        position: fixed;
        width: 100%;
        height: 35px;
        background-color: #f79191;
        box-sizing: border-box;
        bottom: 50px;
        left: 0;
        z-index: 3;
        display: flex;
        font-size: 13px;
        color: #fff;
        align-items: center;
        padding: 0 10px;
    }
    .laba{
        width: 13px;
        height: 12px;
        margin-right: 5px;
    }
    .close{
        width: 12px;
        height: 12px;
        margin-left: 5px;
    }
    .height35{
        position: relative;
        height: 35px;
    }
    .swiper-pagination-bullet-active{
        background: #fff !important
    }
    .headHeight{
        height: 45px;
    }
    .navHeight{
        height: 50px;
    }
    .tips{
        position: absolute;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background-color: #fff;
        color: #fff;
        right: -3px;
        top: -2px;
        font-size: 11px;
        text-align: center;
        line-height: 15px;
    }
   .head{
        position: fixed;
        width: 100%;
        height: 45px;
        /*background-color: #ea3d3d;*/
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 0 13px;
        justify-content: space-between;
        z-index: 9999;
        background-image: url('https://pic.repaiapp.com/static/png/20180524/10/1527127815979505055.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
   }
   .scan{
        position: relative;
        font-size: 9px;
        color: #fff;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
   }
   .scan img{
        width:  19px;
        height: 19px;

        /*margin-bottom: 4px;*/
   }
   .input{
        position: relative;
        width: 275px;
        height: 30px;
        background-color: #d02b2b;
        border-radius: 15px;
        display: flex;
        align-items: center;
        padding-left: 9px;
        box-sizing: border-box;
   }
   .input img{
        position: relative;
        width: 15px;
        height: 15px;
        margin-right: 8px;

   }
   .input div{
        flex: 1;
        height: 30px;
        background-color: #cc2b2b;
        outline: none;
        -webkit-appearance: none;
        /*border-radius: 0;*/
        font-size: 14px;
        color: #fbd5d5;
        border:none;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        line-height: 30px;
   }
    .input input::-webkit-input-placeholder{
        color:#fbd5d5;
    }
    .msg{
        position: relative;
        font-size: 9px;
        color: #fff;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .msg img{
        width: 20px;
        height: 19px;
    }
    /*Swiper插件*/
    #swiper1 {
        width: 100%;
        height: 180px;
    }

    #swiper1 img {
        width: 100%;
        height: 100%;
    }

    #swiper1 .swiper-slide {
        background-color: #fff;
    }
    .swiper-pagination-bullet-active{
        background-color: #fff;
    }
    #swiper3{
        width: 190px;
        height: 100%;
        line-height: 38px;
    }
    /*#swiper3*/
    .ad{
        position: relative;
        background-color: #fff;
        border-radius: 20px;
        width: 95%;
        margin: 6.5px auto;
        height: 38px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        font-size: 14px;
        color: #000000;

    }
    .ad img{
        width: 50px;
        height: 19px;
        margin: 0 6.5px;
    }
    .adCon{
        width: 190px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .more{
        position: relative;
        height: 21px;
        border-left: 1px #dedede solid;
        margin-left: 5px;
        padding-left: 5px;

    }
    .today{
        position: relative;
        background-color: #fff;
        padding-top: 19px;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .todayTitle{
        position: relative;
        width: 188px;
        height: 28px;
        background-image: url('https://pic.repaiapp.com/static/png/20180410/11/1523332562027179754.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-bottom: 20px;
    }
    .todayCon{
        position: relative;
        display: flex;
        width: 93%;
        margin: 0 auto;
        border-radius: 10px;
        height: 185px;
        /*background-image: url('https://pic.repaiapp.com/static/png/20180410/12/1523333008026555550.png');*/
        background-size: 100% 100%;
        background-repeat: no-repeat;
        /*margin-bottom: 20px;*/
        box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.2);
        flex-flow: column;
    }
    .todayConAll{
        height: 225px;
        width: 100%;
    }
    .todayConAll .swiper-slide{
        height: 100%;
    }
    .swiper-pagination-bullet-active{
        background-color: red !important
    }
    .conHead{
        position: relative;
        height: 76px;
        /*background-color: red;*/
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .conHead p{
        position: absolute;
        top: 50px;
        left: 16px;
        font-size: 14px;
        color: #916612
    }
    .conItro{
        position: relative;
        height: 110px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 14px;
        box-sizing: border-box;
        font-size: 15px;
        color: #000000;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        /*background-color: red;*/
    }
    .IntroLeft{
        position:relative;
        width:85px;
        height:85px;
        border:1px solid #e5e5e5;
    }
    .IntroRight{
        flex:1;
        padding-left: 12.5px;
    }
    .price{
        font-size: 15px;
        color: #dd3232;
        display: flex;
        margin: 10px 0;
    }
    .price span{
        font-size: 12px;
    }
    .price p{
        padding: 1.5px 4px;
        border:1px #b3d465 solid;
        border-radius: 2.5px;
        font-size: 9px;
        color: #98bd6a;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 6px;
    }
    .price p img{
        width: 7px;
        height: 9px;
    }
    .btn{
        width: 72px;
        height: 22px;
        /*background-color: red;*/
        font-size: 12px;
        color: #ffffff;
        background: linear-gradient(to right, #fa0101, #c50606); 
        border-radius: 2.5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btn img{
        width: 3.5px;
        height: 7px;
        margin-left: 8px;
    }
    .popular{
        position: relative;
        background-color: #fff;
        margin-top: 10px
    }
    .popularTitle{
        position: relative;
        height: 75px;
        display: flex;
        align-items: center;
        justify-content:center;
    }
    .popularTitle img{
        width: 189px;
        height: 29px;
    }
    .popularCon{
        position: relative;
        padding: 0 12.5px;
        justify-content: space-between;
        flex-wrap: wrap;
        display: flex;
    }
    .list{
        position: relative;
        display: flex;
        width: 169px;
        border:1px solid #e5e5e5;
        /*height: 100px;*/
        margin-bottom: 10px;
        flex-flow: column;
    }
    .list img{
        width: 100%;
        height: 170px;
    }
    .listTitle{
        position: relative;
        width: 100%;
        font-size: 14px;
        color: #333333;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-top: 10px;
    }
    .nums{
        position: relative;
        font-size: 11px;
        color: #9a9a9a;
        margin: 5px 0;
        /*margin-top: 5px;*/
        /*margin-bottom: 7px;*/
    }
    .list .price1{
        font-size: 14px;
        color: #e73131;
        margin-bottom: 9px;
    }
    .shopCart{
        position: absolute;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background-image: url('https://pic.repaiapp.com/static/png/20180524/10/1527128129493310052.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        right: 10px;
        bottom: 10px;
    }
</style>
