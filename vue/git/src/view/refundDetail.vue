<template>
   <div class="refundRetail">
       <!-- <div style="height: 40px;"></div> -->
       <!--  content-->
        <van-list v-model="loading" :finished="finished" @load="onLoad" >
        <div class="content" v-if="orderlits.length!=0">
            <!--  -->
            <div class="item"  v-for="item in orderlits">
              <div class="itemTitle">订单编号  {{item.ordersn}}</div>  
              <div class="itemCon" @click="orderDetail(item.id)"  v-for="j,index in item.goods" v-if="item.goods.length==1">
                    <div class="shopImg" v-if="item.goods.length==1">
                        <img :src="j.thumb">
                        <div>
                          <p>{{j.title}}</p>
                          <span>×{{j.total}}</span>
                        </div>
                    </div>
                    <!-- v-if="j.goods.length==1" -->
                    <div class="shopImg" v-if="item.goods.length!=1">
                        <img :src="j.thumb" v-for="(j,index) in item.goods[0].goods" v-if="index<3">
                        <div v-if="item.total==1">
                            <p>{{item.goods[0].lists[0].title}}</p>
                            <span>×{{item.goods[0].lists[0].total}}</span>
                        </div>
                    </div>
                  <div class="shopInfo">
                      <!-- <p>{{j.name}}</p> -->
                      <span v-if="item.is_refund">退款完成</span>
                      <span v-if="!item.is_refund">维权中</span>
                  </div>
              </div>
              <div class="itemCon" @click="orderDetail(item.id)" v-if="item.goods.length!=1">
                    <div class="shopImg">
                        <img :src="j.thumb" v-for="j,index in item.goods" v-if="index<3">
                        <!-- <div>
                          <p>{{j.title}}</p>
                          <span>×{{j.total}}</span>
                        </div> -->
                    </div>
                    <!-- v-if="j.goods.length==1" -->
                    <!-- <div class="shopImg" v-if="item.goods.length!=1">
                        <img :src="j.thumb" v-for="(j,index) in item.goods[0].goods" v-if="index<3">
                        <div v-if="item.total==1">
                            <p>{{item.goods[0].lists[0].title}}</p>
                            <span>×{{item.goods[0].lists[0].total}}</span>
                        </div>
                    </div> -->
                  <div class="shopInfo">
                      <!-- <p>{{j.name}}</p> -->
                      <span v-if="item.is_refund">退款完成</span>
                      <span v-if="!item.is_refund">维权中</span>
                  </div>
              </div>

              <div class="itemStatus">
                  <div class="price" style="opacity: 0;"></div>
                  <div class="status">
                      <p class="gray" @click="bugAgain(item.id)">再次购买</p>
                      <!-- <p class="red">去付款</p> -->
                  </div>
              </div>
            </div> 
       </div>
       </van-list>

       <!-- nocontent -->
       <div class="empty" v-if="orderlits.length==0">
           <img src="https://pic.repaiapp.com/static/png/20180424/18/1524565867889389753.png">
            <p>暂无订单</p>
       </div>
      <div class="sj-hint"></div>    
   </div>
</template>

<script>
    import api from '../network/request'
    import { List } from 'vant';
    export default {
        name: "refundRetail",
        components: {
        },

        data() {
            return {
                orderlits:[],
                sw:false,
                page:0,
                loading: false,
                finished: false
            }
        },
        methods: {
            orderDetail:function(id){
                // console.log("2222")
                localStorage.setItem('myorderid',id);
                this.$router.push({name: 'orderDetail', params:{id:id}})
            },
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
                const params={access_token:localStorage.getItem('access_token'),page:_this.page};
                api.post('order/refund_list',params,res=>{
                console.log(res);
                    if(res.status==0){
                      if(res.data.length==0){
                        _this.sw=true;
                      }else{
                        _this.orderlits=_this.orderlits.concat(res.data);
                      }
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
                      _this.$router.push({name: 'shopingCart', params:{}})
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              })
            },
           
        },
        created() {
        	// this.list();
         //    var _this=this;
         //    $(window).scroll(function (){    
         //        let scrollTop = $(this).scrollTop()
         //        let scrollHeight = $(document).height()
         //        let windowHeight = $(this).height()
         //        if (scrollTop + windowHeight === scrollHeight)  {
         //        // console.log("到底了")
         //        if(_this.sw==true){
         //            _this.page=_this.page+1;
         //            _this.list()
         //            } 
         //        }  
         //    });
        }
    }
</script>

<style scoped>
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
