<template>
   <div class="myOrder">
      <div class="height40"></div>
       <!--  content-->
       <van-list v-model="loading" :finished="finished" @load="onLoad" >
         <div class="content" v-if="orderlits.length!=0">
              <!-- 待付款 -->
              <div class="item" v-for="item in orderlits">
                <div class="itemTitle">订单编号  {{item.ordersn}}</div>  
                <div>
                  <div class="itemCon" @click="orderDetail(item.id)" v-for="j,index in item.goods"  :style="(item.status==2||item.status==3)&&(item.goods.length==1||index==item.goods.length-1)?'border:0':''" :data-index="item.goods.length-1" :data-index1="index">
                      <div style="display: flex;align-items: center;justify-content: space-between;" >
                        
                        <div class="shopImg" v-for="i in j.lists" v-if="j.lists.length==1">
                            <img :src="i.thumb">
                            <div :data-length="j.lists.length" >
                              <p>{{i.title}}</p>
                              <span>×{{i.total}}</span>
                            </div>
                        </div>
                        <div class="shopImg" v-if="j.lists.length!=1">
                            <img :src="j.thumb" v-for="(j,index) in item.goods[0].lists" v-if="index<3">
                            <div v-if="item.total==1">
                                <p>{{item.goods[0].lists[0].title}}</p>
                                <span>×{{item.goods[0].lists[0].total}}</span>
                            </div>
                        </div>
                        <div class="shopInfo">
                            <p>{{j.name}}</p>
                            <span class="hasfh" v-if="item.status==2">已发货</span>
                            <span v-if="item.status==3" style="color: #5eb054">交易成功</span>
                            <span v-if="item.status==-1">已关闭</span>
                            <span v-if="item.status==0">待付款</span>
                        </div>
                      </div>
                      <!-- bottom -->
                      <div class="itemStatus" style="padding: 0;height:auto;margin-top: 10px;border-top: 1px #ddd solid; padding-top: 10px;" v-if="item.status!=0&&item.status!=-1&&item.status!=1">
                        <div class="price" style="opacity: 0">应付：￥180.00</div>
                        <div class="status ">
                            <p class="gray" @click.stop="Logistics(item.id,item.is_self)" v-if="item.status==2">查看物流</p>
                            <p class="gray" @click.stop="Logistics(item.id,item.is_self)" v-if="item.status==3" style="margin-right: 10px;">查看物流</p>
                            <!-- <p class="gray" @click.stop="del(item.id)" style="margin-right: 10px;" v-if="item.status==3">查看物流</p> -->
                            <p class="gray" @click.stop="bugAgain(item.id)" v-if="item.status==3">再次购买</p>
                            <!-- <p class="red" @click="confim(item.id)">确认收货</p> -->
                        </div>
                      </div>
                  </div>
                </div>
                <!-- <div class="itemCon" @click="orderDetail(item.id)">
                    <div class="shopImg">
                        <img :src="j.thumb" v-for="(j,index) in item.goods[0].lists" v-if="index<3">
                        <div v-if="item.total==1">
                          <p>{{item.goods[0].lists[0].title}}</p>
                          <span>×{{item.goods[0].lists[0].total}}</span>
                        </div>
                    </div>
                    <div class="shopInfo">
                        <p>{{item.goods[0].name}}</p>
                        <span v-if="item.status==0">待付款</span>
                        <span v-if="item.status==-1">交易关闭</span>
                        <span class="hasfh" v-if="item.status==1">待发货</span>
                        <span class="hasfh" v-if="item.status==2">已发货</span>
                        <span class="success" v-if="item.status==3">交易成功</span>
                    </div>
                </div> -->
                <!-- style="background-color: #fff9f9" -->
                <div class="itemStatus" :style="item.status==2||item.status==3?'background-color: #fff9f9':''">
                    <div class="price" style="opacity: 0">应付：￥{{item.price}}</div>


                    <div class="status" v-if="item.status==0">
                        <p class="gray" @click="channel(item.id)">取消订单</p>
                        <p class="red" @click="gotopay(item.ordersn,item.price)">去付款</p>
                    </div>


                    <div class="status" v-if="item.status==1">
                        <p class="gray" @click="remind(item.id)">提醒发货</p>
                    </div>

                    <div class="status" v-if="item.status==2">
                        <!-- <p class="gray">查看物流</p> -->
                        <p class="red" @click="confim(item.id)">确认收货</p>
                    </div>
                    <div class="status" v-if="item.status==3">
                        <p class="red" @click="review(item.id)" v-if="item.iscomment==0">去评价</p>
                        <p class="red" @click="review(item.id)" v-if="item.iscomment==1">查看评价</p>
                    </div>


                   <!--  <div class="status">
                        <p class="gray">查看物流</p>
                    </div> -->

                    <!-- item.status==3|| -->
                    <div class="status" v-if="item.status==-1">
                        <p class="gray" @click="del(item.id)" style="margin-right: 10px;">删除订单</p>
                        <p class="gray" @click="bugAgain(item.id)">再次购买</p>
                    </div>

                </div>
              </div> 
         </div>
       </van-list>
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
        name: "myOrder0",
        components: {
          // data:''
           
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
        //   查看物流
           Logistics:function(id,is_self){
            localStorage.setItem('myorderid',id);
            this.$router.push({name: 'Logistics', params:{id:id}})

            // if(!is_self){
            //   this.$router.push({name: 'Logistics', params:{id:id}})
            // }else{
            //   // alert("自提")
            // }
            

          },
          review:function(id){
              localStorage.setItem('myorderid',id);
              this.$router.push({name: 'reviewList', params:{id:id}})
          },
          list:function(){
                console.log(this.page)
                var _this=this;
                const params={access_token:localStorage.getItem('access_token'),page:_this.page,type:''};
                api.post('order/lists',params,res=>{
                console.log(res);
                    if(res.status==0){
                      Toast.clear();
                      _this.emptyStatus=true;
                      if(res.data.lists.length==0){
                        _this.sw=true;
                      }else{
                        _this.orderlits=_this.orderlits.concat(res.data.lists);
                      }
                      // console.log(_this.orderlits,111111111)
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
            //取消订单
            channel:function(id){
              var _this=this;
              const params={access_token:localStorage.getItem('access_token'),orderid:id};
              api.post('order/cancel',params,res=>{
              console.log(res);
                  if(res.status==0){
                    Toast.success('取消成功');
                    _this.refush();

                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              }) 
            },
            //删除订单
            del:function(id){
              var _this=this;
              const params={access_token:localStorage.getItem('access_token'),orderid:id};
              api.post('order/delete',params,res=>{
              console.log(res);
                  if(res.status==0){
                    Toast.success('删除成功');
                    _this.refush();             
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              })
            },
            //确认收货
            confim:function(id){
              var _this=this;
              const params={access_token:localStorage.getItem('access_token'),orderid:id};
              api.post('order/finish',params,res=>{
              console.log(res);
                  if(res.status==0){
                    Toast.success('确认成功')
                    _this.refush;
                    // $(".sj-hint").html("确认成功").fadeIn().delay(1500).fadeOut();
                     // _this.list();               
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              })

            },
            //提醒发货
            remind:function(id){
              var _this=this;
              const params={access_token:localStorage.getItem('access_token'),orderid:id};
              api.post('order/reminder',params,res=>{
              console.log(res);
                  if(res.status==0){
                    Toast('提醒成功')
                    // $(".sj-hint").html("提醒成功").fadeIn().delay(1500).fadeOut();
                     // _this.refush();               
                  }else{
                     Toast(res.msg)
                    // $(".sj-hint").html(res.msg).fadeIn().delay(1500).fadeOut();
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              })
            },
            //再次购买
            bugAgain:function(id){
              var _this=this;
              const params={access_token:localStorage.getItem('access_token'),orderid:id};
              api.post('order/again',params,res=>{
              console.log(res);
                  if(res.status==0){
                      _this.$router.push({name: 'shopingCart', params:{shopcartStatus:1}})
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              })
            },
            //订单详情
            orderDetail:function(id){
              localStorage.setItem('myorderid',id);
              this.$router.push({name: 'orderDetail', params:{id:id}})
            }
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
          //         // console.log("到底了")
          //         if(_this.sw==true){
          //             _this.page=_this.page+1;
          //             _this.list()
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
        margin-top: 6px;
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
       /* display: flex;
        align-items: center;
        justify-content: space-between;*/
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
        /*border-radius: 5px;*/
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
