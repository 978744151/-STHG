<template>
   <div class="myOrder">
        <div class="height40"></div>
       <!--  content-->
        <van-list v-model="loading" :finished="finished" @load="onLoad" >
           <div class="content" v-if="orderlits.length!=0">
                <!-- 待付款 -->
                <div class="item"  v-for="item in orderlits">
                  <div class="itemTitle">订单编号  {{item.ordersn}}</div>  
                  <div class="itemCon" @click="orderDetail(item.id)">
                        <div class="shopImg">
                            <img :src="j.thumb" v-for="(j,index) in item.goods[0].lists" v-if="index<3">
                            <div v-if="item.total==1">
                                <p>{{item.goods[0].lists[0].title}}</p>
                                <span>×{{item.goods[0].lists[0].total}}</span>
                            </div>
                         </div>
                      <div class="shopInfo">
                          <p>{{item.goods[0].name}}</p>
                          <span >待付款</span>
                      </div>
                  </div>
                  <div class="itemStatus">
                      <div class="price" style="opacity: 0;">应付：￥180.00</div>
                      <div class="status">
                          <p class="gray" @click="channel(item.id)">取消订单</p>
                          <p class="red" @click="gotopay(item.ordersn,item.price)">去付款</p>
                      </div>
                  </div>
                </div> 
           </div>
        </van-list>
       <!-- nocontent -->
       <div class="empty" v-if="orderlits.length==0&&emptyStatus">
           <img src="https://pic.repaiapp.com/static/png/20180424/18/1524565867889389753.png">
            <p>暂无订单</p>
       </div>
      <div class="sj-hint"></div>    
   </div>
</template>

<script>
    import api from '../network/request'
    import { Toast } from 'vant'
    import { List } from 'vant';

    export default {
        name: "myOrder1",
        components: {
           
        },

        data() {
            return {
                orderlits:[],
                sw:false,
                page:0,
                loading: false,
                finished: false,
                emptyStatus:false
            }
        },
        methods: {
            onLoad() {
                 this.list();
                setTimeout(() => {
                   
                    this.loading = false;
                    this.page=this.page+1;
                    if (this.sw) {
                      this.finished = true;
                    }
                  }, 500);
              },
            list:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token'),page:_this.page,type:0};
                api.post('order/lists',params,res=>{
                console.log(res);
                    if(res.status==0){
                        Toast.clear();
                        _this.emptyStatus=true
                      if(res.data.lists.length==0){
                        _this.sw=true;
                      }else{
                        _this.orderlits=_this.orderlits.concat(res.data.lists);
                      }
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                }) 
            },
            refush:function(){
                var _this=this;
                this.page=0;
                setTimeout(function(){
                  Toast.loading({
                  duration: 0,       // 持续展示 toast
                  forbidClick: true, // 禁用背景点击
                  message: '正在加载中...'
                  
                });
                  _this.orderlits=[];
                },300)
                setTimeout(function(){
                  _this.list();
                },500) 
            },
            //去支付
            gotopay:function(ordersn,price){
              localStorage.setItem('ordersn',ordersn);
              localStorage.setItem('price',price);          
              this.$router.push({name: 'orderPay', params: {}})

            },
            //订单详情
            orderDetail:function(id){
                // console.log("2222")
                localStorage.setItem('myorderid',id); 
                this.$router.push({name: 'orderDetail', params:{id:id}})
            },
            //取消订单
            channel:function(id){
              var _this=this;
              const params={access_token:localStorage.getItem('access_token'),orderid:id};
              api.post('order/cancel',params,res=>{
              console.log(res);
                  if(res.status==0){
                        Toast.success("取消成功")
                    // $(".sj-hint").html("取消成功").fadeIn().delay(1500).fadeOut();
                        // _this.orderlits=[];
                        _this.refush();               
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              }) 
            },
           
        },
        created() {
            Toast.loading({
              duration: 0,       // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              message: '正在加载中...'
            });
          this.$shareUrl.shareUrl("myOrder");
            
            // this.list();
            // var _this=this;
            // $(window).scroll(function (){    
            //     let scrollTop = $(this).scrollTop()
            //     let scrollHeight = $(document).height()
            //     let windowHeight = $(this).height()
            //     if (scrollTop + windowHeight === scrollHeight)  {
            //     // console.log("到底了")
            //     if(_this.sw==true){
            //         _this.page=_this.page+1;
            //         _this.list()
            //         } 
            //     }  
            // });
        }
    }
</script>

<style scoped>
    .height40{
      height: 40px;
    }
    .tabs{
        position: relative;
        background-color: #fff;
        height: 40px;
        display: flex;
        font-size: 14px;
        color: #333333;
    }
    .tabs div{
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .tabs div p{
        height: 100%;
        line-height: 40px;
       
    }
    .tabs div p.active{
        color: #ef4242;
        border-bottom: 1px #ef4242 solid;
    }
    .content{
        position: relative;
        margin-top: 5px;
    }
    .item{
        position: relative;
        background-color: #fff;
        margin-bottom: 10px
    }
    .itemTitle{
        position: relative;
        border-bottom: 1px solid #dddddd;
        height: 44px;
        display: flex;
        align-items: center;
        padding-left: 13px;
        box-sizing: border-box;
        font-size: 14px;
        color: #333333;
    }
    .itemCon{
        position: relative;
        padding: 13px;
        border-bottom: 1px solid #dddddd;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .shopImg{
        position: relative;
        display: flex;
        align-items: center;
        /*font-size: 0;*/

    }
    .shopImg p{
        font-size: 14px;
        color: #343032
    }
    .shopImg span{
        color: #999999;
        font-size: 15px;
    }
    .shopImg img{
        width: 68px;
        height: 68px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-right: 5px;
    }
    .shopImg img:nth-of-type(3){
        margin: 0;
    }
    .shopInfo{
        position: relative;
        display: flex;
        flex-flow: column;
        font-size: 14px;
        color: #343032;
    }
    .shopInfo span{
        color: #ef4242;
        font-size: 12px;
        margin-top: 5px;
    }
    .shopInfo span.hasfh{
        color: #999999;
    }
    .shopInfo span.success{
        color: #5eb054
    }
    .itemStatus{
        position: relative;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 13px;
    }
    .price{
        font-size: 14px;
        color: #333333
    }
    .status{
        position: relative;
        display: flex;
        font-size: 14px;
    }
    .gray{
        background-color: #fff;
        border: 1px solid #dddddd;
        color: #333333;
        width: 74px;
        height: 30px;
        border-radius: 2.5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .red{
        background-color: #ef4242;
        border: 1px solid #ef4242;
        color: #fff;
        margin-left: 10px;
        width: 74px;
        height: 30px;
        border-radius: 2.5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .bottom{
        border-bottom: 1px #ddd solid;
    }
    .empty{
        position: relative;
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        padding-top: 50px;
        /*background-color: #fff;*/
    }
    .empty img{
        width: 85px;
        height: 65px;
        margin-bottom: 15px;
    }
</style>
