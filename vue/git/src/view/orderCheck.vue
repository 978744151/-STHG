<template>
    <div class="order">
        <!-- <div class="head">
            <div class="backBtn"></div>
            <div class="title">确认订单</div>
            <div class="status"></div>
        </div> -->
        <div class="content">
            <div class="tips" v-if="showTips">提示：确认订单后请尽快付款，过时订单将自动取消<span class="btnDel" @click='closeTips()'></span></div>
            <div v-if='showAddress'>
                <div class="addressAdd" v-if="address==''" @click="gotoAdd(0)">
                    <span class="iconAdd"></span>
                    <span>新增地址</span>
                    <span class="iconRight"></span>
                </div>
            </div>
             <!-- keep-alive -->
            <div v-if='showAddress'>
                <div class="hasAdd" v-if="address!=''" @click="gotoAdd(1)">
                    <p class="addIcon"></p>
                    <div class="addInfo">
                        <p>{{address.realname}} {{address.mobile}}</p>
                        <span>{{address.province}}{{address.city}}{{address.area}}{{address.address}}</span>
                    </div>
                    <p class="addRight"></p>
                    <div class="addLine"></div>
                </div>
            </div>
            <div class="infoContent">
                <div class="infoShop">
                    {{shop_name}}
                </div>
                <div class="infoGoods" v-for="item in dest">
                    <div class="goods" v-for="j in item.data">
                        <img :src="j.thumb">
                        <div class="desc">
                            <p class="name">{{j.title}}</p>
                            <p class="shopTips">{{j.optiontitle}}</p>
                            <p><span class="price">¥{{j.marketprice}}</span><span class="oldPrice">¥{{j.productprice}}</span><span class="num">×{{j.total}}</span></p>
                        </div>
                    </div>
                    <div class="delivery">
                        <div class="infoDelivery">
                            <span class="">配送方式</span>
                            <!-- v-if='item.express!=null' -->
                            <!-- <span class="mode" >{{item.express}}</span> -->
                            <p class="mode" @click="chooseExpress">
                                {{expressName}} ¥{{expressPrice}}
                                <img src="https://pic.repaiapp.com/static/png/20180606/15/1528269684528751101.png">
                            </p>
                            <!-- <span class="mode" v-if='item.express==null'>默认快递</span> -->

                        </div>
                        <div class="sum">共{{item.data.length}}件商品，合计<span>¥{{item.totalPrice}}</span></div>
                    </div>
                </div>
                <div class="inputItem message">
                    <span>选填:</span>
                    <textarea  rows="5" placeholder="留言最多40个字哦～（选填）" ref="input1"></textarea>
                </div>
                <div class="inputItem coupons" @click="coupon">
                    <span>优惠券</span>
                    <span class="couponState" v-if="is_coupon!=0&&couponId==''">不使用</span>
                    <span v-if="is_coupon!=0&&couponId!=''" style="color: #d53030">-{{couponMoney}}</span>
                    <span v-if="is_coupon==0" style="font-size: 12px;color: #999">暂无可用优惠券</span>
                </div>
                <div class="inputItem money">
                    <div>
                        <p>商品金额</p>
                        <p>¥{{Allprice}}</p>
                    </div>
                    <div>
                        <p>运费</p>
                        <p>¥{{expressPrice}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="sumPay">
                <!-- 实付金额：<span>¥{{Allprice+express-couponMoney}}</span> -->
                实付金额：<span>¥{{payMoney}}</span>

            </div>
            <div class="btnCheck" @click="confirm()">确认订单</div>
        </div>
        <div class="sj-hint">加入成功</div>
        <!-- 选择快递 -->
        <div class="mask" v-if="expressStatus" @click="chooseExpress"></div>
        <div :class="expressStatus?'choose_express bottom':'choose_express '">
            <div class="express_title">配送方式</div>
            <div class="express_item" v-for="(item,index) in dispatch">
                <div @click="change_express(index,item.name,item.price,item.id)">
                    <p style="flex:1;margin-right: 10px">{{item.name}} ￥{{item.price}}</p>
                    <p :class="sel==index?'express_empty express_active':'express_empty'"></p>
                </div>    
            </div>
            <!-- <div class="express_item">
                <div @click="change_express(1)">自提 ￥0.00
                    <p :class="sel==1?'express_empty express_active':'express_empty'"></p>
                </div> 
            </div> -->
        </div>
    </div>
</template>
<!-- type="text/ecmascript-6" -->
<script >
    import loading from '../components/loading'
    import api from '../network/request'
    import qs from 'qs'
    import wx from 'weixin-js-sdk'
    import { Toast } from 'vant'

    export default {
        name: "orderCheck",
        data(){
            return {
                is_coupon:'',
                showTips:true,
                data:'',
                shoplists:'',
                Allprice:0,
                express:'',
                address:"",
                dest:'',
                address_id:'',
                payJosn:'',
                couponId:'',
                couponMoney:0,
                payMoney:'',
                sel:0,
                expressStatus:false,
                shop_name:'',
                dispatch:'',
                expressName:'',
                expressPrice:'',
                dispatch_id:'',
                showAddress:true
            }
        },
        methods: {
            //选择快递
            chooseExpress(){
                this.expressStatus=!this.expressStatus;
            },
            change_express(status,name,price,id){
                this.sel=status;
                var _this=this;
                this.expressName=name;
                this.expressPrice=price;
                this.dispatch_id=id;
                setTimeout(function(){
                    _this.chooseExpress();
                },200)
                if(id==4444){
                    this.showAddress=false
                }else{
                    this.showAddress=true
                }

                 _this.payMoney=(_this.Allprice+Number(_this.expressPrice)-_this.couponMoney).toFixed(2)

            },
            //订单显示
            orderDetail:function(){
                var _this=this;
                // console.log(localStorage.getItem('goods_id'));
                var address_id=localStorage.getItem('chooseAddId')||'';
                const params={goods_id:localStorage.getItem('goods_id'),access_token:localStorage.getItem('access_token'),total:localStorage.getItem('total'),optionid:localStorage.getItem('optionid'),address_id:address_id};
                api.post('order/confirm',params,res=>{
                    console.log(res);
                    if(res.status==600){
                        // this.$router.push({name: 'login', params: {}})
                    }
                    if(res.status==0){
                        _this.data=res.data;
                        _this.dispatch=res.data.dispatch;
                        if(res.data.dispatch!=''){
                            _this.expressName=res.data.dispatch[0].name;
                            _this.expressPrice=res.data.dispatch[0].price;
                            _this.dispatch_id = res.data.dispatch[0].id;
                        }
                        _this.shop_name=res.data.shop_name||'';
                        Toast.clear();
                        //判断当前是否含有可用优惠券
                        // if(res.data.coupon.coupon==''){
                        //     _this.is_coupon=true;
                        // }else{
                        //     _this.is_coupon=false;
                        // }
                        //判断对象还是数组 单个商品是对象 多个商品是数组
                        if(res.data.lists instanceof Array==false){
                            var arr = []
                            arr.push(res.data.lists)
                            _this.shoplists=arr;
                        }else{
                            _this.shoplists=res.data.lists;
                        }
                        _this.express=res.data.express;
                        if(res.data.address.hasOwnProperty('id')){
                            _this.address=res.data.address
                            _this.address_id=res.data.address.id 
                        }
                        //根据不同的快递进行分组
                        var map = {};
                        var dest = []; 
                        console.log(_this.shoplists) 
                        for(var i in _this.shoplists){
                        var ai = _this.shoplists[i];  
                        console.log(ai)
                        if(!map[ai.express.type]){  
                            dest.push({ 
                                totalPrice:0, 
                                express:ai.express.type, 
                                data: [ai]  
                            });  
                            map[ai.express.type] = ai;  
                        }else{  
                            for(var j = 0; j < dest.length; j++){  
                                    var dj = dest[j];  
                                    if(dj.express == ai.express.type){  
                                        dj.data.push(ai);  
                                        break;  
                                    }  
                                }  
                            }  
                        } 
                        //计算根据不同快递分类之后的商品总价格  
                        for(var z in dest){
                            for(var x in dest[z].data){
                                 dest[z].totalPrice=parseFloat((dest[z].totalPrice+=(dest[z].data[x].marketprice*dest[z].data[x].total)).toFixed(2));
                            }
                        }
                        //计算整个订单的总价格
                        for(var i in dest){
                            _this.Allprice+=dest[i].totalPrice
                        }
                        _this.payMoney=(_this.Allprice+Number(_this.expressPrice)-_this.couponMoney).toFixed(2)
                        // _this.exAllprice=_this.Allprice+res.data.express;
                        // _this.Allprice=_this.Allprice+res.data.express
                        _this.dest=dest;
                         //判断优惠券
                        this.hascoupon();
                        console.log(dest)
                    }
                })       
            },
            //选择地址
            gotoAdd:function(id){
                if(id==0){
                    this.$router.push({name: 'addAddress', params: {addInfo:''}})
                }else{
                    this.$router.push({name: 'address', params: {type:1}})
                }
            },
            //提交订单
            confirm:function(){
                var _this=this;
                //判断是多个商品还是单个商品 ==0单个商品 ==1多个商品
                if(localStorage.getItem('type')==0){
                    
                    var access_token = localStorage.getItem("access_token");
                    var goods_id = localStorage.getItem("goods_id");
                    var optionid = localStorage.getItem("optionid");
                    var total = localStorage.getItem("total");
                    var coupon_id=this.couponId;
                    var dispatch_id=this.dispatch_id;
                    var params={access_token:access_token,is_cart:0,money:(_this.Allprice+Number(_this.expressPrice)-_this.couponMoney).toFixed(2),address_id:_this.address_id,goods_id:goods_id,optionid:optionid,total:total,coupon_id:coupon_id,order_recharge:'H5',dispatch_id:dispatch_id,remark:this.$refs.input1.value};
                }else{
                    var access_token = localStorage.getItem("access_token");
                    var goods_id = localStorage.getItem("goods_id");
                    var optionid = localStorage.getItem("optionid");
                    var total = localStorage.getItem("total");
                    var coupon_id=this.couponId;
                    var dispatch_id=this.dispatch_id;
                    var params={access_token:access_token,is_cart:1,address_id:_this.address_id,coupon_id:coupon_id,order_recharge:'H5',dispatch_id:dispatch_id,remark:this.$refs.input1.value};     
                }
                // console.log(params);
                // return;
                api.post('order/submit',params,res=>{
                    if(res.status==10008){
                        Toast("请选择地址")
                        // $(".sj-hint").html("请选择地址").fadeIn().delay(1500).fadeOut();
                        return;
                    }
                    if(res.status!=0){
                        Toast.fail(res.msg)
                    }
                    if(res.status==0){
                        console.log(res);
                        localStorage.setItem('ordersn',res.data.ordersn);
                        localStorage.setItem('price',res.data.price);

                        // window.location.href = "/orderPay"
                       _this.$router.replace({name: 'orderPay', params: {}})
                        // _this.$router.push({name: 'orderPay', params: {}})
                        // return;
                        
                        // var params={ordersn:res.data.ordersn,access_token:access_token}
                        // api.post('pay/wx_unifiedorder',params , res =>{
                            
                        //     if(res.status==0){
                        //         console.log(res)
                        //         // var that=this;
                        //         _this.payJosn=res.data;
                        //         if (typeof WeixinJSBridge == "undefined"){
                        //             if( document.addEventListener ){
                        //                 document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                        //             }else if (document.attachEvent){
                        //                 document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                        //                 document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                        //             }
                        //         }else{
                        //             _this.jsApiCall();
                        //         }
                        //     }
                        // })
                    }
                })
            },
            //微信支付
            jsApiCall:function(){
                var that=this;
                // that.json=JSON.stringify(that.json)
                // console.log(that.json)
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',{
                        "appId":that.payJosn.appid,     //公众号名称，由商户传入     
                        "timeStamp":that.payJosn.timestamp,         //时间戳，自1970年以来的秒数     
                        "nonceStr":that.payJosn.noncestr, //随机串     
                        "package":that.payJosn.package,     
                        "signType":"MD5",         //微信签名方式：     
                        "paySign":that.payJosn.sign //微信签名 
                    },
                    function(res){
                        console.log(res);
                        // that.success=false;
                        WeixinJSBridge.log(res.err_msg);
                        if(res.err_msg == "get_brand_wcpay_request:ok"){
                            localStorage.setItem('changeid',0)
                            that.$router.push({name: 'myOrder', params: { 'id':0}})
                        }else{
                            
                        }
                    }
                )

            },
            //关闭tips
            closeTips:function(){
                this.showTips=false;
            },
            //优惠券
            coupon:function(){
                if(this.is_coupon!=0){
                    this.$router.push({name: 'ordercoupon', params: {Allprice:this.Allprice,express:this.express,ids:this.ids}})
                }
            },
            // 优惠券列表
            hascoupon:function(){
                var _this=this;
                var ids=[];
                console.log(this.dest);
                for(var i in this.dest){
                    for(var j in this.dest[i].data){
                        ids.push(this.dest[i].data[j].goodsid)
                    }
                }
                
                ids=ids.join(',');
                this.ids=ids;
                const params={access_token:localStorage.getItem('access_token'),money:this.Allprice+this.express,goods_ids:ids};
                api.post('order/used_coupon_count',params,res=>{
                  if(res.status==0){
                     console.log(res);
                     _this.is_coupon=res.data

                     // _this.couponArr=res.data
                  }
                  if(res.status==600){
                    //   this.$router.push({name: 'login', params: {}})
                  }
                })
            }
        },
        created() {
            //获取订单详情
            this.orderDetail();
            for(var i=0;i<localStorage.length;i++){
                if(localStorage.key(i)=="couponId"){
                    this.couponId=localStorage.getItem("couponId");
                    this.couponMoney=localStorage.getItem("couponMoney");
                    break;
                }else{
                    this.couponId="";
                    this.couponMone=0;

                }
            }

            Toast.loading({
              duration: 0,       // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              message: '订单创建中...'
            });
            

        },
        components:{

        }
    }
</script>

<style scoped lang="scss">
    .express_item{
        position: relative;
        /*padding: 15p x*/
        height: 55px;
        padding-left: 15px;
        box-sizing: border-box;

    }
    .express_item div{
        border-bottom: 1px solid #DADADA;
        padding-right: 15px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        color: #5C5C5C;
        height: 100%;
    }
    .express_title{
        position: relative;
        padding: 24px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #1D1D1D;
    }
    .choose_express{
        position: fixed;
        width: 100%;
        height: 310px;
        background-color: #fff;
        left: 0;
        bottom: -100%;
        transition: all 0.5s ease;
    }
    .bottom{
        bottom: 50px;
    }
    .express_empty{
        position: relative;
        width: 20px;
        height: 20px;
        background-image: url('https://pic.repaiapp.com/static/png/20180606/15/1528270646372525053.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .express_active{
        background-image: url('https://pic.repaiapp.com/static/png/20180606/15/1528270809577115251.png');
    }
    .mask{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color:rgba(0,0,0,0.5);
        top: 0;
        left: 0;
    }
    .hasAdd{
        position: relative;
        width: 100%;
        display: flex;
        background-color: #fdf5f5;
        align-items: center;
        padding: 12px;
       
    }
    .addInfo{
        flex: 1;
        display: flex;
        flex-flow: column;
        font-size: 15px;
        color: #333333;
    }
    .addInfo span{
        font-size: 12px;
        color: #666666;
        margin-top: 5px;
    }
    .addIcon{
        position: relative;
        width: 13px;
        height: 17px;
        background-image: url('https://pic.repaiapp.com/static/png/20180423/15/1524469680360400101.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-right: 10px;
    }
    .addRight{
        position: relative;
        width: 7px;
        height: 11px;
        background-image: url('https://pic.repaiapp.com/static/png/20180423/15/1524470044988857102.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-left: 5px;
    }
    .addLine{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        background-image: url('https://pic.repaiapp.com/pic/ca/fd/67/cafd670906fa50970c9a8791367d183fbc12cbe6.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .order{
        .head{
            height: 45px;
            line-height: 45px;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #000000;
            border-bottom: 1px #dadada solid;
            .backBtn{
                flex-basis: 45px;
                box-sizing: border-box;
                width: 10px;
                height: 16px;
            }
            .title{
                flex: 1;
                text-align: center;
            }
            .status{
                flex-basis: 45px;
                color: #dd3232;
                font-size: 15px;
            }
        }
        .content {
            &:after{
                content: "";
                display: block;
                height: 50px;
             }
            .tips{
                position: relative;
                padding: 10px;
                font-size: 12px;
                color:#fff;
                background: #f79191;
                .btnDel{
                    position: absolute;
                    top:50%;
                    right: 10px;
                    width: 10px;
                    height: 10px;
                    margin-top: -5px;
                    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMyMzAyN0I5NDQ0NDExRTg5NDY4REE0OUJFMzUzRUVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMyMzAyN0JBNDQ0NDExRTg5NDY4REE0OUJFMzUzRUVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzIzMDI3Qjc0NDQ0MTFFODk0NjhEQTQ5QkUzNTNFRUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzIzMDI3Qjg0NDQ0MTFFODk0NjhEQTQ5QkUzNTNFRUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4yUcAiAAAA3klEQVR42qzSPwrCMBTH8fhncBDBObcQvIley9kLiOjq6gEc7Cy6Ck4KtbjHX7TBEJP30qeB75C0/UDSKGOMQhO0QJ16LkmjHRrZyQBdzXushLAFj7WxdYtjVAphHyzQ0H8ogb9Aux6+1ASOgjE0hNcJ2IKnGJhCOZgEKTQFsyCHhvDGA/cpMAd1cGU+o6BAW1vx44JKb35GFflFxj10Wz6gO3Mr2O3ryBnmXDfVBEzdim4OqjP+MglLQBaWgiT8C5iE3YO5EIzBS7fYQzMh6MM3NG29zuB/o48eTwEGAFmIEaGctdhQAAAAAElFTkSuQmCC") no-repeat;
                    background-size: contain;
                }
            }
            .addressAdd{
                position: relative;
                box-sizing: content-box;
                font-size: 15px;
                color: #333;
                height:50px ;
                display: flex;
                align-items: center;
                /*line-height: 50px;*/
                padding: 0 12px 4px;
                /*margin-bottom: 30px;*/
                background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAICAIAAAD7kg/uAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzM0NEQkMwNDQ0NTExRThBMDUxQTg4RUMxNTAzM0JBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzM0NEQkMxNDQ0NTExRThBMDUxQTg4RUMxNTAzM0JBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjMzQ0RCQkU0NDQ1MTFFOEEwNTFBODhFQzE1MDMzQkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjMzQ0RCQkY0NDQ1MTFFOEEwNTFBODhFQzE1MDMzQkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4twNduAAABZElEQVR42mL88/svMwsTAxL49vP/wgPf3335x0BH4GHIbqzEiib45NJDsfOHmRj+080Z35jY/7u6M6GFyM/f/1ce+0HnEHHUYcMMkRe3notcOErPEPnJyPrbwYVfgh8lRP7+Y1hz/Mezd3/pGSLmqqxW6mxogm8fv+M9cZDlP/1c8oeR+YuFg7CsEJCNCJT//xnWnfzx4DVdQ0RXjsVFjx1N8OOLj2wH9rD//003Z/xlYHpjYC2uJgHhIgJl27mft579oWeIqEmy+JpwoAl+fvf17569nP9+0tMlL7XMZfTk4VxooOy/8uvCg9/0dIe8KHOAOQcjI4rgj68/f+zYy/f3Kz1d8kTJSM5UBVkEFCjHbv4CInq6Q5yfKdSSg5UZRfD3zz8fNu0R/P2Rni55LKmlYKuNJsgETCDAZEJPdwjyMEXZcrKzoiSSv3/+vdy0X+TXO7qmEWFlRTdjNMFXH/8BBBgA18qFuVgPhtUAAAAASUVORK5CYII=");
                background-repeat: repeat-x;
                background-size: 45px 4px;
                background-position: 0 100%;
                background-color: #fff;
                span{
                    display: inline-block;
                    vertical-align: middle;
                }
                .iconAdd{
                    width: 22px;
                    height: 22px;
                    margin-right: 10px;
                    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAwRDJDRUQ0NDQ0NzExRThBOUUxQ0VDNUUxN0M1NkVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAwRDJDRUQ1NDQ0NzExRThBOUUxQ0VDNUUxN0M1NkVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDBEMkNFRDI0NDQ3MTFFOEE5RTFDRUM1RTE3QzU2RUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDBEMkNFRDM0NDQ3MTFFOEE5RTFDRUM1RTE3QzU2RUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7EhL8dAAAEPElEQVR42tSZWWxMURzGj2vs1YRUiuqLUtJo+1ASoam9xIO01ggPQjS1lYYIEmpJLCF2YiRE0qikFPFgD1LECwktUlUSaqkQEmqP1Pc339HTibm9M51pry/5Zc7cufecb8496/+08nq9qgnqBNJBBhgA+oLuvC76DN6ASnAfXCefQy3QE8IzrcBYMAtMAB1s7m0LuoD+vFf0FZwBR8AFUBdJw9mgAKT6Xf8J7oEqUM0aFCNRIB704TNt+AenEXlmHTgVbsNS4D6QaVz7AEpAMbgJvjSSR0cwFGSB6ax5+RMnwWUwj3/YVpYDszPBXcPsa5DPmpsLLjkwq3iP3LuAzy5hXqLRLGNmUw3L6ypkJ/oFtoN+YGdTOg6f3QUSmecvllHIMkMyvBusYfoVGAGWgk8qfKplnmOM2pYy9wRreCNYxHQFGMLhKFK6CgaDh/y+EGxyalg6xErDrIyxz1Tk9RwMBw/4fQW92BpOAAeMziWv6m2QBceAKSQmyGelrHFsgopeEuwM7wfR7ATSY1+EUFP9OdQVMx2spMwZ9BBNT/80nGUMXdKDr6iW0zV6UPQ00d+wTLdrjaawTrW8CoymUUCPfw1nGtPtFvDRBYZr6UWUot++NpxjTLeHlHt0GLw3PVpcoIznxRL+M7dIvJxgWjxGWVyQtOfF48p90p7EY7rFiUH0A9xwoeGb9CbKsNigFXcEX1xo+CvXzaJki2td0SPlXlXqdbks4GONGSaQunPP5kTmfQON/tGY5A3XBPjtJT9jPX4bxkAaCY6GUDM7grhXpuMim9FC6VHiv5KHNdvWqOl/6QpXbk6bhK7ZfL5qp03CLpzwp6Y9jBvIhrCXzQM1Nu3LX9+M9O0wDZXa2xvL2KkmurglaG9VYrhcj3HcirtNHYy5olwMlxpRmnQXGpalQzumSy22Md3uJrnQ8BR+fhevFse4s7w4mas3t6gTPYnOiVc9Dh/kZ1cwx0WGZ9OTyGsu4C8aC4zloLMLzEZxqy8qU75I51/DdcaerqeRbkmtphfRenpssGs+zZoWLWZQo6U0TPlCWPrtlwSKS8znBrQ1FyK9QihMokVTSUWIs1oRPXykp4CBlCcgl+kebDfdgizwHbc1x5kORt04YummkEtPAQ2Ljqn6QFwSgxrxzdAM4llWMr9vphfVmGHRKlUf8hTTt5QvghkpDWcZSfy+V9UHJB0ZFuWxd4riOIVvC/PEInltVb4jgzhe28CyVbCGdYhohtERl3J/ldfI+tnJDLaIeS0zOpiUtUbZnCw52XFIj01jLejOKIG6as4+o5X90Ze56hrF1y2x4N3MSzHvNJstUoMdhxNVcceRzUklhYv+HPKDM+VjbmZrjVcuw5QcOKZyRWiqjPmF/dhL6xQnGP+DRTEyiDiJMzTbwaKexs8T8+hWXmlv5Yu667XIJ47FT8EdFYaj298CDAB3Jeux0cyKWwAAAABJRU5ErkJggg==") no-repeat;
                    background-size: contain;
                }
                .iconRight{
                    position: absolute;
                    top:50%;
                    right: 10px;
                    margin-top: -6px;
                    width: 7px;
                    height: 12px;
                    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA1NzQ1QUU0NDQ0NzExRThCMUVGQ0RDRDQyRDNEMDlCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA1NzQ1QUU1NDQ0NzExRThCMUVGQ0RDRDQyRDNEMDlCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDU3NDVBRTI0NDQ3MTFFOEIxRUZDRENENDJEM0QwOUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDU3NDVBRTM0NDQ3MTFFOEIxRUZDRENENDJEM0QwOUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7nIFTZAAAA1UlEQVR42pzUOw4CIRAGYJwYtfBglpp4CTsPoAs+ejvvYKV0Pi5kZ2yMWjmTDAkhzDJI8mcDybcDC0vHew/GmCnmgbkZZSM0wxwwV8yiBg6j/gaz1MId5hKNrTWY4BczrsXAz7eAmxKM8TkaW0kYkj7hiQZD5mUqDMISJGxLUFqz45huYbs+jE+YEY/ZUkWj2Uep9ZNqYa0O/kFta8whx1Cc6qCEchUJHRNk+dyKH0eNYliFwlR7GdTwbdC6j/NaFCq+oj799VvNySG4x9wxz5rr8SfAAJbfOIZGlg1tAAAAAElFTkSuQmCC") no-repeat;
                    background-size: contain;
                }
            }
            .infoContent{
                .infoShop{
                    position: relative;
                    height: 45px;
                    padding-left: 10px;
                    display: flex;
                    align-items: center;
                    /*line-height: 45px;*/
                    font-size: 14px;
                    color: #000;
                    &:before{
                        position: relative;
                        /*top:2px;*/
                        content: '';
                        /*display: inline-block;*/
                        width: 15px;
                        height: 15px;
                        margin-right: 5px;
                        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAdCAYAAABSZrcyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhCMUIyNjAwNDQ0QjExRTg5QzE2RTJDOTYwRTAxN0Q4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhCMUIyNjAxNDQ0QjExRTg5QzE2RTJDOTYwRTAxN0Q4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEIxQjI1RkU0NDRCMTFFODlDMTZFMkM5NjBFMDE3RDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEIxQjI1RkY0NDRCMTFFODlDMTZFMkM5NjBFMDE3RDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4gVxseAAACCUlEQVR42syXuUsDQRjFN4lHEANqYQQFCZ6IIipWWliITSB/QDo7UTCFhaUggng0NrFIF9BSNKWFhY0SULzwLBQRPBFEvPCIb+AtDOMkQrIb8sGP7H7v23nZ2Z1jHcbfaAeroAh8G5mHC7yCPrAtC3ma4g9wCRwk00iQDyOXQr2zMjAPetkrPxZ4OMEXH+UQeExmvg+awTn4tLDb84EPHIAWXZGfhbM29fIs2/frxHWKJTaZl7D9dVXwUNiy+R3boo9HTg4wGbTZPEifATl5yqTbZnM3fU7NhI+JWJaGd4x+wteY4ElPlsx76Cd8jRPwluXJTfgdmwe3WTYXfi/iYEOahXTRkaKRdLQC+m2KkwBPljSFI9QiGm2a2rRGi1Ab0WjL1AJmYpGJIxAC/WBNWg4TnJeHwSCIK1qc+WHWydoa2wvx/RK5BfUfTSoXCaKgHkxptDC1sEabohbVaJPJVrVi0AhKwRm4kLRy0MprDsGVpFWBJja+C+4kTYznOi6lolfejVwMMefegFqL2y0E12BO3WXIIRZ6L6i0YU6vYPcnNX/mr9XPxdyOPaUyd0lbHysjkWxzpyt6sWEuN9QlWzU3h1aDxeY+/j6kKvLy7u9Bm0XG1WCH7Xam2rebWx1z+rvip44jzecs3qEano+Dsf/MRXSBUdDNMZrOx4OT33p7YAasqAW/AgwA0seTwhRQ5PUAAAAASUVORK5CYII=") no-repeat;
                        background-size: contain;
                     }
                }
                .infoGoods{
                    border-top:1px solid #ddd;
                    background:#fff;
                    margin-bottom: 10px;
                    .goods{
                        display: flex;
                        align-items: center;
                        padding:15px;
                        img{
                            flex-basis: 77px;
                            width: 77px;
                            height: 77px;
                            border-radius: 3px;
                        }
                        .desc{
                            flex: 1;
                            padding-left:15px;
                            .name{
                                margin-bottom: 5px;
                                font-size: 14px;
                                color:#333;
                            }
                            .shopTips{
                                font-size:12px;
                                color:#fcb039;
                            }
                            p{
                                height: 20px;
                                line-height: 20px;
                                overflow:hidden;
                                .price{
                                    float: left;
                                    font-size: 15px;
                                    color:#ec1a1d;
                                }
                                .oldPrice{
                                    float: left;
                                    text-decoration: line-through;
                                    margin-left: 7px;
                                    font-size:12px;
                                    color:#999;
                                }
                                .num{
                                    float: right;
                                    font-size: 15px;
                                    color:#333;
                                }
                            }
                        }
                    }
                    .delivery{
                        margin-left: 15px;
                        padding: 15px;
                        padding-left: 0px;
                        padding-right: 0;
                        border-top: 1px solid #ddd;
                        .infoDelivery{
                            overflow: hidden;
                            padding-bottom:15px;
                            padding-right: 15px;
                            border-bottom: 1px solid #ddd;
                            span{
                                float: left;
                                font-size: 15px;
                                color:#333
                            }
                            .mode{
                                float: right;
                                color:#555555;
                                font-size: 14px;
                                display: flex;
                                align-items: center;
                            }
                        }
                        .sum{
                            text-align: right;
                            font-size: 15px;
                            color:#555555;
                            padding-right: 15px;
                            padding-top: 15px;
                            span{
                               color:#ec1a1d;

                            }
                        }
                    }
                }
                .inputItem{
                    padding:15px;
                    margin:10px 0;
                    margin-top: 0;
                    font-size: 15px;
                    color:#333;
                    background: #fff;
                    &.message{
                         display: flex;
                         align-items: flex-start;
                        span{
                            flex-basis: 40px;

                        }
                        textarea{
                            flex: 1;
                            resize: none;
                            outline:none;
                            border:0;
                            /*padding: 4px;*/
                        }
                    }
                    &.coupons{
                        display: flex;
                        justify-content: space-between;
                        .couponState{
                            &:after{
                                content: '';
                                display: inline-block;
                                width: 7px;
                                height: 12px;
                                margin-left: 5px;
                                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA1NzQ1QUU0NDQ0NzExRThCMUVGQ0RDRDQyRDNEMDlCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA1NzQ1QUU1NDQ0NzExRThCMUVGQ0RDRDQyRDNEMDlCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDU3NDVBRTI0NDQ3MTFFOEIxRUZDRENENDJEM0QwOUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDU3NDVBRTM0NDQ3MTFFOEIxRUZDRENENDJEM0QwOUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7nIFTZAAAA1UlEQVR42pzUOw4CIRAGYJwYtfBglpp4CTsPoAs+ejvvYKV0Pi5kZ2yMWjmTDAkhzDJI8mcDybcDC0vHew/GmCnmgbkZZSM0wxwwV8yiBg6j/gaz1MId5hKNrTWY4BczrsXAz7eAmxKM8TkaW0kYkj7hiQZD5mUqDMISJGxLUFqz45huYbs+jE+YEY/ZUkWj2Uep9ZNqYa0O/kFta8whx1Cc6qCEchUJHRNk+dyKH0eNYliFwlR7GdTwbdC6j/NaFCq+oj799VvNySG4x9wxz5rr8SfAAJbfOIZGlg1tAAAAAElFTkSuQmCC") no-repeat;
                                background-size: contain;
                             }
                        }
                    }
                    &.money{
                        padding:0;
                        padding-left:15px;
                        div{
                            display: flex;
                            justify-content: space-between;
                            line-height:40px;
                            padding-right:15px;
                            &:first-child{
                                border-bottom:1px solid #ddd;
                            }

                        }
                    }
                }
            }
        }
        .footer{
            position: fixed;
            bottom:0;
            display: flex;
            width: 100%;
            height: 50px;
            line-height: 50px;
            background:#fff;
            z-index: 2;
            .sumPay{
                flex: 1;
                text-align: right;
                padding-right: 10px;
                font-size:15px;
                color:#333;
                span{
                    color:#d53030;
                }
            }
            .btnCheck{
                padding:0 20px;
                font-size: 16px;
                color: #fff;
                background: #b5261a;
            }
        }
    }
    .mode img{
        position: relative;
        width: 7.5px;
        height: 13.5px;
        margin-left: 10px;
    }
</style>
