<template>
    <div>
        <!-- <div class="head">
            <div class="backBtn"></div>
            <div class="title">支付订单</div>
            <div class="status"></div>
        </div> -->
        <div class="content">
            <div class="order">
                <div class="orderItem">
                    <span>订单编号</span>
                    <span>{{ordersn}}</span>
                </div>
                <div class="orderItem">
                    <span>支付金额</span>
                    <span class="redFont">¥ {{price}}</span>
                </div>
            </div>
            <div class="payType">
                <p>请选择支付的方式</p>
                <div class="payContent">
                    <div class="payItem" @click="change(1)">
                        <div class="icon balance"></div>
                        <div class="text">
                            <div class="title" style="display: flex;">余额支付<div v-if="isyue">(余额不足，<span style="color: #3099f1" @click.stop="gotopay()">去充值</span>)</div></div>
                            <div class="subTitle">可用余额{{yue}}元</div>
                        </div>
                        <div :class="sel==1&&!isyue?'choose active':'choose'" v-if="!isyue"></div>
                        <div class="choose noactive" v-if="isyue"></div>
                    </div>
                    <div class="payItem" @click="change(2)">
                        <div class="icon weixin"></div>
                        <div class="text">
                            <div class="title">微信支付</div>
                            <div class="subTitle">推荐已在微信中绑定银行卡的用户使用</div>
                        </div>
                        <div :class="sel==2?'choose active':'choose'" @click="change(2)"></div>
                    </div>

                    <!-- <div class="payItem" @click="change(3)">
                        <div class="icon zhifubao"></div>
                        <div class="text">
                            <div class="title">支付宝支付</div>
                            <div class="subTitle">安全快捷，支持银行卡支付</div>
                        </div>
                        <div :class="sel==3?'choose active':'choose'" @click="change(3)"></div>
                    </div> -->

                </div>
            </div>
        </div>
        <div class="addBtn" @click='pay()'>确认支付</div>
        <div class="psdmask" v-if="ispsd"></div>
        <div class="psdTips" v-if="ispsd">
            <div class="close1" @click="closepsd()"></div>
            <p>支付密码</p>
            <p class="tips">为了保障您的账户安全，请在充值前<br/>设置支付密码。</p>
            <input ref="pwd" type="password" maxlength="6" v-model="msg"  style="position: absolute;z-index: -1;left:-100%;opacity: 0"/>
            <ul class="pwd-wrap" @click="focus">
              <li><i v-if="msgLength > 0"></i></li>
              <li><i v-if="msgLength > 1"></i></li>
              <li><i v-if="msgLength > 2"></i></li>
              <li><i v-if="msgLength > 3"></i></li>
              <li><i v-if="msgLength > 4"></i></li>
              <li><i v-if="msgLength > 5"></i></li>
            </ul>
            <div style="font-size: 14px;color:#DD3232;width: 100%;text-align: right;padding-top: 10px;" @click="forget(tel)">忘记密码？</div>
            <!-- <div class="psdbtn" @click="psdComfirm()">确定</div> -->
        </div>
    </div>
</template>

<script>
    import api from '../network/request'
    import qs from 'qs'
    import wx from 'weixin-js-sdk'
    import { Toast } from 'vant'
    import md5 from '../network/md5.js'

    export default {
        name: "orderPay",
        components: {

        },
        data(){
            return {
                ordersn:'',
                price:'',
                sel:1,
                payJosn:'',
                msg:'',
                msgLength:0,
                ispsd:false,
                is_pwd:'',
                psd:'',
                yue:'',
                isyue:false,
                tel:''
            }
        },
        watch:{
          msg(curVal){
            var _this=this;
            this.psd=curVal;
            if(/[^\d]/g.test(curVal)){
              this.msg = this.msg.replace(/[^\d]/g,'');
            }else{
                this.msgLength = curVal.length;
            }
            console.log(this.msgLength);
            if(this.msgLength==6){
                _this.psdComfirm();
            }
          },
        },
        methods: {
            forget:function(tel){
                this.$router.push({name: 'changePsd', params: {id:tel}})
            },
            psdComfirm:function(){

                if(this.msgLength==''){
                    Toast.fail("请输入密码");
                    return;
                }
                if(this.msgLength!=6){
                    Toast.fail("密码格式不对");
                    return;
                }
                var _this=this;
                var pssd=md5.hexMD5(_this.psd)
                const params={access_token:localStorage.getItem('access_token'),passwd:pssd,ordersn:localStorage.getItem("ordersn")};
                api.post('pay/balance',params,res=>{
                    if(res.status==0){
                        console.log(res);
                        Toast.success("支付成功");
                        this.ispsd=false;
                        this.gotoorder();
                        // _this.ispsd=false;
                        // _this.show=!_this.show;
                    }
                    if(res.status!=600&&res.status>0){
                        Toast.fail(res.msg)
                    }
                    if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                    }
                }) 
            },
            gotoorder:function(){
                var _this=this;
                setTimeout(function(){
                    localStorage.setItem('changeid',0)
                    _this.$router.replace({name: 'myOrder', params: { 'id':0}})
                },800)
                
            },
            focus(){
                this.$refs.pwd.focus();
            },
            closepsd:function(){
                this.ispsd=false;
            },
            change:function(index){
                if(this.isyue){
                    Toast("余额不足，请充值");
                }else{
                    this.sel=index;
                }
                
            },
            gotopay:function(){
                this.$router.push({name: 'recharge', params: {status:1}})
                
            },
            pay:function(){
                var _this=this;
                // this.test_code();
                // return;
                //余额支付
                if(this.sel==1){
                    if(this.isyue){
                        Toast("余额不足，请充值");
                        return;
                        // alert("111");
                        // return;
                    }
                    this.ispsd=true;
                }
                //微信支付
                if(this.sel==2){
                    var params={ordersn:localStorage.getItem("ordersn"),access_token:localStorage.getItem("access_token")}
                    api.post('pay/mp_wx_unifiedorder',params , res =>{
                        if(res.status==0){
                            console.log(res);
                            // var that=this;
                            // _this.test_code();
                            _this.payJosn=res.data;
                            // alert(_this.payJosn.appid)
                            // alert(_this.payJosn.timestamp)
                            // alert(_this.payJosn.noncestr)
                            // alert(_this.payJosn.package)
                            // alert(_this.payJosn.sign);
                            _this.jsApiCall();
                            console.log(_this.payJosn)
                            if (typeof WeixinJSBridge == "undefined"){
                                if( document.addEventListener ){
                                    document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                                }else if (document.attachEvent){
                                    document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                                    document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                                }
                            }else{
                                _this.jsApiCall();
                            }
                        }else{
                        }
                    })  
                }
                  
            },
            test_code:function(){
                var params={access_token:localStorage.getItem("access_token")}
                api.post('pay/test_code',params , res =>{
                    console.log(res)
                        if(res.status==0){
                            
                        }
                    }) 
            },
            jsApiCall:function(){
                var _this=this;
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',{
                        "appId":_this.payJosn.appid,     //公众号名称，由商户传入     
                        "timeStamp":_this.payJosn.timestamp,         //时间戳，自1970年以来的秒数     
                        "nonceStr":_this.payJosn.noncestr, //随机串     
                        "package":_this.payJosn.package,     
                        "signType":"MD5",         //微信签名方式：     
                        "paySign":_this.payJosn.sign //微信签名 
                    },
                    function(res){
                        console.log(res);
                        WeixinJSBridge.log(res.err_msg);
                        if(res.err_msg == "get_brand_wcpay_request:ok"){
                            localStorage.setItem('changeid',0)
                            _this.$router.push({name: 'myOrder', params: { 'id':0}})
                        }else{
                            
                        }
                    }
                )

            },
            money:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('user/info',params,res=>{
                console.log(res);
                    if(res.status==0){
                        _this.yue=res.data.recharge;
                        _this.tel=res.data.tel;
                        if(Number(res.data.recharge)<localStorage.getItem("price")){
                            _this.isyue=true;
                            _this.sel=2;
                        }else{
                             _this.isyue=false
                        }
                        // _this.status=res.data;
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                })
            }

        },
        created() {
            this.ordersn=localStorage.getItem("ordersn");
            this.price=localStorage.getItem("price");
            this.money();
            let paths = window.location.href.split('#');
              paths[1] = paths[1] || '/'
              if (paths[0].charAt(paths[0].length - 1) !== '?') {
                paths[0] = `${paths[0]}?`
              }
              if (paths[1].charAt(0) === '!') {
                 paths[1] = paths[1].substr(1)
              }
              let url = `${paths[0]}#${paths[1]}`
              if (window.location.href !== url) {
                window.location.href = url
              }
        }
    }
</script>

<style scoped lang="scss">
    .psdmask{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
        top: 0;
        left: 0;
        z-index: 1;
    }
    .close1{
        position: absolute;
        width: 10px;
        height: 10px;
        background-image: url('https://pic.repaiapp.com/static/png/20180507/18/1525688586126653101.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        right: 17px;
        top: 17px;
    }
    .psdbtn{
        position: relative;
        width: 265px;
        height: 44px;
        display:flex;
        align-items: center;
        justify-content: center;
        background-color: #DD3232;
        font-size: 16px;
        color: #fff;
        margin-top: 10px;
    }
    .pwd-wrap{
        width: 90%;
        height: 44px;
        padding-bottom: 1px;
        margin: 0 auto;
        background: #fff;
        border:1px solid #ddd;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        cursor: pointer;
    }
    .pwd-wrap li{
        list-style-type:none;
        text-align: center;
        line-height: 44px;
        -webkit-box-flex: 1;
        flex: 1;
        -webkit-flex: 1;
        border-right:1px solid #ddd ;
    }
    .pwd-wrap li:last-child{
        border-right: 0;
    }
    .pwd-wrap li i{
        height: 10px;
        width: 10px;
        border-radius:50% ;
        background: #000;
        display: inline-block;
    }
    .psdTips{
        position: fixed;
        width: 298px;
        height: 274px;
        background-color: #FFFFFF;
        border-radius: 8px;
        top: 30%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 5;
        display: flex;
        align-items: center;
        flex-flow: column;
        font-size: 17px;
        color: #000;
        padding: 22px 0;
        box-sizing: border-box;
    }
    .tips{
        font-size: 15px;
        margin-top: 15px;
        text-align: center;
        margin-bottom: 15px;
    }
    .choose{
        position: absolute;
        width: 18px;
        height: 18px;
        background-image: url('https://pic.repaiapp.com/static/png/20180428/17/1524907695631505799.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        right: 20px;
    }
    .active{
        background-image: url('https://pic.repaiapp.com/static/png/20180502/09/1525226016545719798.png');
    }
    .noactive{
        background-image: url('https://pic.repaiapp.com/static/png/20180518/00/1526573318268810154.png');

    }
    .head {
        height: 45px;
        line-height: 45px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #000000;
        border-bottom: 1px #dadada solid;
        .backBtn {
            flex-basis: 45px;
            box-sizing: border-box;
            width: 10px;
            height: 16px;
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAfCAYAAADnTu3OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVEMTMzQjIxM0VDMjExRThBMTlCQUFGOTgzNkIzRDk4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVEMTMzQjIyM0VDMjExRThBMTlCQUFGOTgzNkIzRDk4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUQxMzNCMUYzRUMyMTFFOEExOUJBQUY5ODM2QjNEOTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUQxMzNCMjAzRUMyMTFFOEExOUJBQUY5ODM2QjNEOTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz591WfFAAABz0lEQVR42qSWSyjEURTG7xiJPGqGjUfSmAVFNsoGi5EyybAxWSplwV6WLCh2QsnCQkrNQh4xkpQlSUmyIathpeSRUh7f0Xfr+mfG/3999VucO/XNueeec2Z8oVBI/VNZ4JN8B/9RNlgG88CnD2yVCxKgyzgbtjUsBOsgYpzJlX02Vw6CfYfZpGQHPrxmWAr2QJ2R1SiYNovqVlXMrJrxOxgCi85XcqNampUxfgP9YPW3Z/9LjSAJShi/gl6wna6PMqkVbIEixo8gBg4zdXk6dYJdw+wetGUyy2TYB9ZAHuNb0AJO3MyhU4NgBeQwvgbN4NLtYJsaAQvAz/iCmd142RRaE2BKDzl0zEe587otxGCOTap1AHrAk80uExU4zpM2ZiJ/IBBQ7LUGUMPzdtbtzDZDmcs4r6pYhiXQbWuo51MMjnT2XKARW0PRMyfknLH04gZosjXUIxYFV8aDySKotzUUpWiaYlwMdkDY1lAxwygzFlWwncptDRVrKTV9YRymadDWUPHVY+wCxVrK9fNtDfUoxtmviq++aWwkz4aK7TOg/3KwPxPGZvoxem4lo/gAOhjLqFbyyzxnqDUDxo3f5VObn1GnxkCArTVrfvAlwACTDlZXtH61qQAAAABJRU5ErkJggg==") no-repeat;
            background-size: contain;
            background-position: 10px;
        }
        .title {
            flex: 1;
            text-align: center;
        }
        .status {
            flex-basis: 45px;
            color: #dd3232;
            font-size: 15px;
        }
    }
    .content {
        .order{
            background: #fff;
            .orderItem{
                margin-left:12px;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #dadada;
                font-size: 15px;
                color:#999;
                span:first-child{
                    display: inline-block;
                    width: 80px;
                    color: #383838;
                }
                span:last-child{
                    display: inline-block;
                }
                .redFont{
                    color:#e92e2e;
                }
            }
            .orderItem:last-child{
                border-bottom: 0;
            }
        }
        .payType{
            p{
                height:25px;
                line-height: 25px;
                margin-top: 5px;
                margin-left: 12px;
                font-size: 12px;
                color:#999;
            }
            .payContent{
                background: #fff;
                .payItem{
                    display: flex;
                    position: relative;
                    height: 50px;
                    align-items: center;
                    margin-left:12px;
                    border-bottom: 1px solid #dadada;
                    .icon{
                        flex-basis: 22px;
                        width: 22px;
                        height: 22px;
                        margin-right: 15px;
                    }
                    .balance{
                        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAoCAYAAAB0HkOaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQyQUZCRjczM0VGRjExRTg5NjhBQjI5OTU3RTFCMkQ0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQyQUZCRjc0M0VGRjExRTg5NjhBQjI5OTU3RTFCMkQ0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDJBRkJGNzEzRUZGMTFFODk2OEFCMjk5NTdFMUIyRDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDJBRkJGNzIzRUZGMTFFODk2OEFCMjk5NTdFMUIyRDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Yttt+AAADQUlEQVR42syYb2hNYRzHz707ysZYLrX8XbLtpsyfyL/8eSFEE0syXhAx8zeZRUrxAssLMk0pIilF2ou9YkxSktD8G8Xm4oVCYxZXdzXfn75Ht+Pcc57nnHu53/rU7bnnPM/3PM/z+53fc0LRhm+GgsJgPhgPxoLRYBgoAAPBDyAdfQRvwEvwFNwCMUNRpuJ1VaDB5f9+pBCMA+VsF4NDQbfqE6tInvCnoa/3IK56saqZNrBT08h3sBL0pNuM6BS4pHH9dvBYx72p+bQbQRSM8rjuKjiju6a6ZmRDTjQypLCRRdKdmTFgM8PXS0+YDl6l28xgcASs0bhnHtgGzoO9TIiBl2kpeAHW+5hJk/e1sZ9AZvYzMiIBt0OE/RwCIV0z0l4PDrjdrKkQl+ssyNExcxJszVDQrOWDKpnZBaozHMXVHMfVzAxQ59HRa3DU48X5DDR69FPH8RzN5IJzqdYzSQdBLaOkN0V+mQmW8Xcq5TDsc53M1IBihSneAfLAReYee8mwCHwFpUySXkm0xm5mENituN6TwAVGxz6askqG5TQkFWBT8lO7qJbj/zEjKT5fYwNWMOxlmdaBm6AS3OP0X1GYFUv9Ob4RQg0shjrASM2IECOrWOOYSUVUvY+08A4UiZGpPoxYSUxqlilJRqp85qcRYJo80UKNm+5zcyZrE9v7cGPvsf1fzujy0gKTM6Oi22COy/8JcMyhvYV7yUu/ZyaqaEbOS4vBB1t7N89Jw8Fqh6WsUOy/1GStolrTNDm03wGzZAM65B0dDQnz8JUNyjNZZOcrhnKjQ8VmlZVSgK1wePdJ+C9RKfbFTJeimWaP9f8ELju0x3TMtPMQ7yWJug3gi4OJFmZcp1fKXMVlahczD7kBvTQAnHbZwIU85PnVA1nTG1mygZvFzDVO9f+UjH89zIrteICOivjBaHKAPk6IjxC/XPUFjzSysV09Ps5UliR7T5DvOFY9E2fYdv6jY7KlTo4bt5edcuqbrfMNLqBiHO95qtOBfBQs44E9kSETCfZfxvFcz02SkbeAEnCYVWA61MH+Sth/11/VmuKnV6n0p/NpilkZRlhMFbBU6GV2lsL8M3jL91YruMuN6qpfAgwA5nenAQ9KrzAAAAAASUVORK5CYII=") no-repeat;
                        background-size: contain;
                    }
                    .weixin{
                        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAkCAYAAADy19hsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI5RDhGODg1M0YwMjExRTg5NzFGQkZGRTM3RDY3NEE3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI5RDhGODg2M0YwMjExRTg5NzFGQkZGRTM3RDY3NEE3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjlEOEY4ODMzRjAyMTFFODk3MUZCRkZFMzdENjc0QTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjlEOEY4ODQzRjAyMTFFODk3MUZCRkZFMzdENjc0QTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6JbOyZAAADoklEQVR42ryYe2iNYRzHzzm2mf2hXDaX47JchlAmQ3NNRDYTojUl/5CIXEqx+GNKQkoT5jKtyRJSRmERNhTmzoYS5sxlMWJbcxnfX75vHW/v8573vJfzq0+9nfM7z/m+7/s839/vefzZ5yb6LEQCkMQpIAP0A11BR9AMPoGX4AG4CirAN58HERfh+yBYAxaDLoqcJNIbTAKrQAs4DXaBajcFBxSfJ4IC8AKsMxGrig4gD9wGJaCHl4IHgJtgE//YSfjBIlAL5nshOB1cByNcnnoy14+DDW4K7g8ugBSfNyFPeyvXhGPB8aAMJCvyXoNyELIw5nNwBjQovt9Bt3EkeAXtyiiOcF7ngMFciKoQVxgCZjO33iCnHTjIhW1LsCysfJOcveAXr7+DSya5+0Abrz+DKkWe+PhSu4JzWARUMUs3D9NNcqeGXcdHWLzL7RaOWRFyxN6GgbusdmNMcgvBBFADpoM0g5wmVscUTp+aaAWPsrC65xIr4+XpPqunpVWEVT2poJ05HYNcoD+sCg56ZGNv+HZOgpksIMWgu0FuK6uiuEspeG82hxM9EHsYDOUTFFc5AXIVYiXag/FgO2+0SGWxIrjRRaF/wFqwmc3PftAzyjHi6SCPQJaR4FoXBeezwNzROYad6MaxVusF33BJ7FlwFFx2sTvzsxgtCxd8zIWBW+irpeyL3e5BxC7HaoIfcnU6CSm149jAq7w8gd781eD7d2A4re6Qws2k4vq1XmI9rcVuFHOx+RSWJV3aT3BR8XCk8XpMA1B1c1Jhp2mCn4GVNsWG+EcZJpalFZM0xWLMpo0F9ItMF7lxuteaCjZGKVhK9ugIOTK3t3ExGu1y5EZecS2YbccyAwa2lE8/tRpvQS8LeUGTPaS2mY20d+xjNIDMtzlsJa1EK3vcWIRfdcfnw/raSCEr+0OMBNepBM/gxlGL3+CjIldaxHsxElypOkjRtuRttJwtdBKZhyPBIF4nsb99wiZnoMeCS+IUNpRFoQW6XiNEyg1+twfs9lCslPxrRlMimVUrL8rGqIhvwYto0rZUAYVNPbUxqLjFwijcJZqWdYn2MAIuD17NPWKzS+O1sVMrMztbcxpX2OSEHI4jb2oBOGB2tuZWVHGnXejgacux2SmzszW344vv31lxKrdMt+jnqpAD8UrdGUeCUZ/pdTTQx4VObBP70j7lBurA/bCdsjjUTjbsk9mSxlRweDTST81CjnszwTwWqP8E/xVgADpBuaKaDbPiAAAAAElFTkSuQmCC") no-repeat;
                        background-size: contain;
                    }
                    .zhifubao{
                        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUzOTcwRjg5M0YwMjExRThCM0ZFOUZBRjg1RUVENzZDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUzOTcwRjhBM0YwMjExRThCM0ZFOUZBRjg1RUVENzZDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTM5NzBGODczRjAyMTFFOEIzRkU5RkFGODVFRUQ3NkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTM5NzBGODgzRjAyMTFFOEIzRkU5RkFGODVFRUQ3NkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bF47wAAADUElEQVR42tSY20sVURTG9zmJZdEFtMh66QYVXSAsrSDrKSqwe2hFj0F/QJJB0EtSYEXQjajAisxAupvSUzeoxKQbGqEVRImZVljaxbRvwTew283MmZkz5rTgp8w+e/b+Zu291l4zsakVT5RmcZAP1oO5YKTqe2sF98E5cB706GIsmwBqQBnI+0fCFOfJ47w11PGHOGm4B7JU/1oWdUy0xMXpzlEqGiY6ykWXCCsAs1W0TPTkp+DPphAGqwWftOtJYFySYxakhOC1ryBHjzLYblCU5LhzZFkzkhyk2xAW2t6Lq+jagCiLUykJfm9kNLvZL5u2Q6DCw/zlDJ5A4mTijwn62O23Lg/3OT2YZ3GTQVOCPp/BCKOtMIRoVf/1nrPsFisHO/vm0D/mMt4KMCUscdVgj4+HriZOttbLIDHUc70e+nU5eMiL7QBHtGvxWEOYy5pG/Jo8eJXRtq6vAqLXZ/874JXRtjGMgGgBx8AN8By0sX0QGAPGs0iVwmE+mGYTBPuM60VMTyqZPbcX7ASdPrw0FqwEq8BCPtBMw9tXWJIHFldIcYrJVbwymieBeO81N3S3y7jp5IXWlsMSPBZ0WW9yKdJYk20BAx2i9zGXXM7Qp8bvbdo2sGw1vRgL6rklnLASLPWxpA087E+x+HSyTLCGQnOlLPIqTrwxHCwDlwLmtHawANR76JvO/Sf7dLFdqtJTiYT8T+6NoHbSozBr6UspLoPeLOVL9l97LpX/3wYUJmlnm9G2n3McAC9d7pWscJHIUs+T81df1h+MziEsk4Z5FNXDtFNspI0iBpVVt11gFqgJckKksur9wG8lXzzcX8+ctssQtlUTpugNObYegNtguZfTyexQzG8X15lAj4I3Rp8OnpfyADPAXSM1HQQlLnNKwFzmg0mqGuwnCT9j9DRrbUMZXd/Be4fyWoSeANk+96qs1HFw2Nzvdq6dDh6BzVoC7uDJ0GwjbBY4DeoCCFOM1O3MFmV6thDPtbq8WLdziR9yeTsZKJn0VK7b21MSJlV3iYir4skQNbsmy3omou83Z+N8sa2NmDDZRhVxJtECRmEUrIV6uq1obWLd9rCfhdUxyBrNVNLEVLABXAXvEn0uCMF66KlKzputF6i/BRgAj/HL26qLUTgAAAAASUVORK5CYII=") no-repeat;
                        background-size: contain;
                    }
                    .text{
                        flex: 1;
                        .title{
                            margin-bottom: 2px;
                            font-size: 15px;
                            color:#333;
                        }
                        .subTitle{
                            font-size: 12px;
                            color:#999;
                        }
                    }
                    .choice{
                        flex-basis: 20px;
                    }
                }
                .payItem:last-child{
                    border:0;
                }
            }
        }
    }
    .addBtn{
        position: fixed;
        bottom:30px;
        left: 50%;
        text-align: center;
        margin-left: -173px;
        width: 346px;
        height:48px;
        border-radius: 3px;
        line-height: 48px;
        font-size: 17px;
        color:#fff;
        background:#d9372d ;
    }

</style>
