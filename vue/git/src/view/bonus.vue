<template>
    <div class="bonus">
        <!-- 可提现 -->
        <div class="withdraw">
            <div class="withdrawHead">
                <p>累计金额(元)</p>
                <span>{{money.allprice}}</span>
            </div>
            <div class="withdrawCon">
                <div class="withdrawConTop">
                    <div>
                        <p>
                            <span>可提现金额（元）</span>
                            <span class="red">{{money.ok_price}}</span>
                        </p>
                        <p>满{{setmoney}}元可提现，预计3个工作日到账，<span class="red" @click="help()">提现帮助</span></p>
                    </div>
                </div>
                <div class="withdrawConBot" @click="withdrawBill(hasembody)">
                    <div style="border-bottom: 1px #e5e5e5 solid;width: 100%;height: 100%;display: flex;justify-content: space-between;align-items: center;">
                        <span>提现记录</span>
                        <img src="https://pic.repaiapp.com/static/png/20180413/16/1523607641919539999.png">
                    </div>
                </div>
                <div class="withdrawConBot" @click="reward()">
                    <span>奖励记录</span>
                    <img src="https://pic.repaiapp.com/static/png/20180413/16/1523607641919539999.png">
                </div>
            </div>
            <!-- 体现手续费 -->
            <div class="service_money" v-if="money.shouxufei!=0||money.shouxufei!=0.00">提现需<span>{{money.shouxufei}}%</span>手续费</div>
            <!-- nowithdraw 不可提现 -->
            <div :class="hasembody?'withdrawBtn':'withdrawBtn nowithdraw'" @click="withdrawWay(hasembody)">提现</div>
            <p class="tips">注册时已阅读并同意<span @click="user">用户协议</span>和<span @click="ys">隐私政策</span></p>
        </div>



        <!-- 体现成功 -->
       <!--  <div v-if="false">
          <div class="head">
              <div>
                    <img src="https://pic.repaiapp.com/static/png/20180413/10/1523587190968245056.png">
                    <p>本次申请提现金额(元)</p>
                    <span>125.5</span>
              </div>
          </div>
          <div class="content">
              <p>明细如下：</p>
              <div>
                  <span>提现支付宝账户</span>
                  <span>¥125.5</span>
              </div>
              <p class="time">（预计3个工作日到账，可在我的奖金-提现记录查看到账情况）</p>
          </div>
          <div class="btn">返回我的奖金</div>
        </div> -->
    </div>
</template>

<script>
    import api from '../network/request'
    import { Toast } from 'vant'

    export default {
        name: "bonus",
        components: {
        },

        data() {
            return {
                money:"",
                hasembody:false,
                setmoney:''
            }
        },
        methods: {
            help:function(){
                window.location.href="https://dc.xiaodian.in/addons/ewei_shopv2/static/html/page1.html"
            },
            user:function(){
                window.location.href="https://dc.xiaodian.in/addons/ewei_shopv2/static/html/page3.html"

            },
            ys:function(){
                window.location.href="https://dc.xiaodian.in/addons/ewei_shopv2/static/html/page2.html"

            },
            //提现记录
            withdrawBill:function(){
                this.$router.push({name: 'withdrawBill', params: {}})
            },
            //提现
            withdrawWay:function(status){
                // console.log(status);
                // return;
                if(status){
                    this.$router.push({name: 'withdrawWay', params: {}})  
                }else{
                    // this.$router.push({name: 'withdrawWay', params: {}})  
                    Toast('满'+this.setmoney+'元方可提现')
                }
            },
            reward:function(){
                this.$router.push({name: 'reward', params: {}})  
            },
            info:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('commission/get_award_price',params,res=>{
                  if(res.status==0){
                     console.log(res);
                     localStorage.setItem('mymoney',res.data.ok_price);
                     localStorage.setItem('shouxufei',res.data.shouxufei);
                     localStorage.setItem('shouxufeiprice',res.data.shouxufeiprice);
                     
                     
                     _this.money=res.data;
                     _this.setmoney=res.data.setmoney
                     if((res.data.ok_price>=res.data.setmoney)){
                        _this.hasembody=true;
                     }
                     // _this.msgInfo=res.data
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
            }
           
        },
        created() {
            this.info();
            // console.log("1111")
        }
    }
</script>

<style scoped>
    .service_money{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: #777777;
        padding-bottom: 10px;
    }
    .service_money span{
        color: #dd3232;
    }
    .bonus{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    .head{
        position: relative;
        height: 230px;
        padding: 0 20px;
    }
    .head div{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-bottom: 1px #ddd dashed;
        display: flex;
        flex-flow: column;
        /*justify-content: center;*/
        align-items: center;
        padding-top: 40px;
        box-sizing: border-box;
    }
    .head div img{
        width: 60px;
        height: 60px;
    }
    .head div p{
        font-size: 14px;
        color: #777777;
        margin-top: 35px;
        margin-bottom: 20px;
    }
    .head div span{
        font-size: 25px;
        color: #dd3232
    }
    .content{
        position: relative;
        padding: 20px;
        font-size: 15px;
        color: #000000;
    }
    .content div{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .time{
        font-size: 12px;
        color: #777777;
    }
    .btn{
        position: relative;
        width: 95%;
        height: 40px;
        background-color: #dd3232;
        border-radius: 2.5px;
        margin: 0 auto;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        /*margin-top: 20px;*/
    }
    .withdraw{
        position: relative;
    }
    .withdrawHead{
        width: 100%;
        height: 205px;
        background-image: url('https://pic.repaiapp.com/static/png/20180413/15/1523606349652219952.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        flex-flow: column;
        font-size: 13px;
    }
    .withdrawHead span{
        font-size: 36px;
        margin-top:10px;
    }
    .withdrawCon{
        position: relative;
        width: 95%;
        margin: 0 auto;
        box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.1);
        height: 180px;
        background-color: #fff;
        border-radius: 10px;
        top: -25px;
        display: flex;
        flex-flow: column;
    }
    .withdrawConTop{
        position: relative;
        width: 100%;
        /*height:75px;*/
        padding: 0 15px;
        padding-top: 25px;
        box-sizing: border-box;
    }
    .withdrawConTop div{
        border-bottom: 1px #e5e5e5 solid;
        display: flex;
        /*align-items: center;*/
        justify-content: center;
        flex-flow: column;
        font-size: 15px;
        color: #000000;
    }
    .withdrawConTop div p:nth-of-type(1){
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .withdrawConTop div p:nth-of-type(2){
        font-size: 12px;
        color: #8c8c8c;
        margin-top: 5px;
        padding-bottom: 4px;
    }
    .red{
        color: #dd3232
    }
    .withdrawConBot{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        color:#000000;
        padding:0 15px;
        /*background-color: red;*/
    }
    .withdrawConBot img{
        width: 6.5px;
        height: 12px;
    }
    .withdrawBtn{
        position: relative;
        width: 95%;
        height: 40px;
        background-color: #dd3232;
        border-radius: 2.5px;
        margin: 0 auto;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
    }
    .active{
        background-color: #dd3232;
    }
    .tips{
        position: relative;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: #aeaeae;
        margin-top: 10px;
    }
    .tips span{
        color: #dd3232;
    }
    .nowithdraw{
        background-color: #dfdfdf;
        color: #fff
    }
</style>
