<template>
   <div class="orderDetail">
   		<!-- 待付款 -->
       <div class="head" v-if="details.status==0">
       		<div class="left">
       			<p>{{details.status_name}}</p>
       			<span>{{minutes}}分钟后订单自动关闭</span>
       		</div>
       		<div class="right"></div>
       </div>
       <!-- 待发货 -->
       <div class="head" v-if="details.status==1">
       		<div class="left">
       			<p>{{details.status_name}}</p>
       			<span>提醒商家发货</span>
       		</div>
       		<div class="right icon1"></div>
       </div>
       <!-- 待收货 -->
       <div class="head" v-if="details.status==2">
       		<div class="left">
       			<p>{{details.status_name}}</p>
       			<span>{{final_receipt}}自动确认收货</span>
       		</div>
       		<div class="right icon2"></div>
       </div>
       <!-- 交易成功 -->
       <div class="head" v-if="details.status==3">
       		<div class="left">
       			<p>交易成功</p>
       		</div>
       		<div class="right icon3"></div>
       </div>

       <!-- 交易失败 -->
       <div class="head" v-if="details.status==-1">
       		<div class="left">
       			<p>交易失败</p>
       		</div>
       		<div class="right icon4"></div>
       </div>
       <div class="head" v-if="details.status==4||details.status==5">
          <div class="left">
            <p>{{details.status_name}}</p>
          </div>
          <div class="right icon4"></div>
       </div>



       <div class="address">
       		<p class="name">{{details.realname}} <span>{{details.mobile}}</span></p>
       		<div class="add">
       			<p class="addIcon"></p>
       			<span>{{details.province}}{{details.city}}{{details.area}}{{details.address}}</span>
       		</div>
       </div>

       <!-- content -->
       <div class="content" v-for="item in details.goods">
       		<div class="item">
       			<div class="itemHead border_b">{{item.name}}</div>
            <!-- :style="details.status==1||details.status==2?'border-bottom:0':''" -->
       			<div class="itemList border_b" v-for="j in item.lists" >
       				<div style="display: flex;width: 100%">
	       				<div class="listLeft">
	       					<img :src="j.thumb">
	       				</div>
	       				<div class="listRight">
	       					<p class="title">{{j.title}}</p>
	       					<p class="option">{{j.go_title}}</p>
	       					<div class="price">
	       						<p>￥{{j.price}}<span>￥{{j.oldprice}}</span></p>
	       						<div>x{{j.total}}</div>
	       					</div>
	       				</div>
       				</div>
       				<div class="fh" style="border-top: 0;height: auto;padding: 0;padding-top: 15px" v-if="details.status==1||details.status==2||details.status==3">
       					<p class="gray" @click="refund(details.orderid,j.goodsid)" :data-orderid="details.orderid" :data-goodsid="j.goodsid">申请退款</p>
       				</div>
       			</div>

       			<!-- <div class="fh" v-if="details.status==1||details.status==2" style="border-bottom: 1px #dddddd solid;border-top: 0;">
       				<p class="gray" @click="refund(details.orderid)" :data-orderid="details.orderid" :data-goodsid="j.goodsid">申请退款</p>
       			</div> -->
       			<div class="total border_b">
       				<p>商品金额</p>
       				<p>￥{{item.goods_price}}</p>
       			</div>
       			<div class="total border_b">
       				<p>运费</p>
       				<p>￥{{item.express_price}}</p>
       			</div>
            <div class="total border_b">
              <p>优惠券</p>
              <p>-￥{{item.goods_couponprice}}</p>
            </div>
       			<div class="bottom">
       				<!-- <p>共{{item.total}}件商品，实付<span>¥{{details.price}}</span></p> -->
              <!-- <p>共{{item.total}}件商品，实付<span>¥{{item.goods_price-item.goods_couponprice+item.express_price}}</span></p> -->
              <p>共{{item.total}}件商品，实付<span>¥{{item.totalPrice}}</span></p>

              
       			</div>
       			<!-- 待发货 -->
       			<div class="fh" v-if="details.status==0">
       				<p class="gray" @click="channel(details.orderid)">取消订单</p>
       				<p class="red" @click="gotopay(details.ordersn,details.price)">付款</p>
       			</div>

       			<div class="fh" v-if="details.status==1">
       				<p class="gray" @click="remind(details.orderid)">提醒发货</p>
       			</div>

       			<div class="fh" v-if="details.status==2">
       				<p class="gray" @click="Logistics(details.orderid)">查看物流</p>
       			</div>

       			<div class="fh" v-if="details.status==3">
       				<p class="gray" @click="Logistics(details.orderid)">查看物流</p>
       				<p class="gray" style="margin-left: 10px;" @click="bugAgain(details.orderid)">再次购买</p>
       			</div>

       			<div class="fh" v-if="details.status==-1">
       				<p class="gray" @click="bugAgain(details.orderid)">再次购买</p>
       			</div>
       		</div>
       </div>

       <!-- 服务时间 -->
       <div class="serverTime">
       		<p class="time">服务时间：<span>{{details.business_hours}}</span></p>
       		<div class="serverItem">
       			<div @click="sever()">
       				<img src="https://pic.repaiapp.com/static/png/20180426/10/1524711465038855101.png">
       				<p>在线客服</p>
       			</div>
       			<div>

              <a :href="'tel:'+details.tel" style="display: flex;align-items: center;color: #333;">
                <img src="https://pic.repaiapp.com/static/png/20180426/10/1524711489374135050.png">
                <p>电话客服</p>
              </a>
       				
       			</div>
       		</div>
       </div>

       <div class="orderD">
       		<p>订单编号：{{details.ordersn}}</p>
       		<p>创建时间：{{createtime}}</p>
       		<p v-if="details.status==1||details.status==2||details.status==3">付款时间：{{paytime}}</p>
       		<p v-if="details.status==2||details.status==3">发货时间：{{sendtime}}</p>
          <p v-if="details.status==3">成交时间：{{finishtime}}</p>
       </div>
       <div class="height50" v-if="details.status!=4&&details.status!=5"></div>
       <div class="footer" v-if="details.status!=4&&details.status!=5">

         
	       <div class="status" v-if="details.status==0">
	          <p class="gray" @click="channel(details.orderid)">取消订单</p>
	          <p class="red" @click="gotopay(details.ordersn,details.price)">去付款</p>
	       </div>
	       <div class="status" v-if="details.status==1">
	          <p class="gray" @click="remind(details.orderid)">提醒发货</p>
	       </div>

	       <div class="status" v-if="details.status==2">
	          <p class="red" @click="confim(details.orderid)">确认收货</p>
	       </div>

	       <div class="status" v-if="details.status==3">
	          <p class="red" @click="review(details.orderid)" v-if="details.iscomment==0">去评价</p>
            <p class="red" @click="review(details.orderid)" v-if="details.iscomment==1">查看评价</p>
	       </div>

	       <div class="status" v-if="details.status==-1">
	          <p class="gray" @click="bugAgain(details.orderid)">再次购买</p>
	       </div>
       </div>
	   <div class="sj-hint"></div>    
   </div>
</template>

<script>
    import api from '../network/request'
    import { Toast } from 'vant'
    export default {
        name: "orderDetail",
        components: {
        },

        data() {
            return {
                details:'',
                minutes:'',
                createtime:'',
                paytime:'',
                final_receipt:'',
                sendtime:'',
                finishtime:'',
                ordersn:''
            }
        },
        methods: {
          //联系客服
          sever:function(){
            var data={
                "comment":this.ordersn
            }
             var usrcode = 'XTX'+localStorage.getItem('apply_phone')||'';
                window.location.href="https://static.meiqia.com/dist/standalone.html?_=t&eid=105365&clientid="+usrcode+"&metadata="+data
             // window.location.href="https://static.meiqia.com/dist/standalone.html?_=t&eid=105365&metadata="+data
          },
        	detail:function(){
        	   var _this=this;
               const params={access_token:localStorage.getItem('access_token'),id:_this.id};
               api.post('order/info',params,res=>{
               console.log(res);
                  if(res.status==0){
                    for(var i in res.data.goods){
                      res.data.goods[i].totalPrice=Number(Number(res.data.goods[i].goods_price)-Number(res.data.goods[i].goods_couponprice)+Number(res.data.goods[i].express_price)).toFixed(2);
                    }
                    _this.details=res.data;
                    _this.ordersn=res.data.ordersn
                  	_this.createtime=_this.timestampToTime(res.data.createtime);
                  	if(res.data.status==0){
                  		var date = new Date(res.data.final_cancel * 1000);
                  		_this.minutes=date.getMinutes()
                  	}
                  	if(res.data.status==1){
                  		_this.paytime=_this.timestampToTime(res.data.paytime)
                  	}
                  	if(res.data.status==2){
                  		_this.final_receipt=_this.formatDuring(res.data.final_receipt);
                  		_this.paytime=_this.timestampToTime(res.data.paytime)
                  		_this.sendtime=_this.timestampToTime(res.data.sendtime)
                  	}
                    if(res.data.status==3){
                      _this.paytime=_this.timestampToTime(res.data.paytime)
                      _this.sendtime=_this.timestampToTime(res.data.sendtime)
                      _this.finishtime=_this.timestampToTime(res.data.finishtime)

                    }
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              })
        	},
            // 查看物流
          Logistics:function(id){
            localStorage.setItem('myorderid',id);
            this.$router.push({name: 'Logistics', params:{id:id}})
          },
          //去支付
            gotopay:function(ordersn,price){
              localStorage.setItem('ordersn',ordersn);
              localStorage.setItem('price',price);          
              this.$router.push({name: 'orderPay', params: {}})

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
            //提醒发货
            remind:function(id){
              var _this=this;
              const params={access_token:localStorage.getItem('access_token'),orderid:id};
              api.post('order/reminder',params,res=>{
              console.log(res);
                  if(res.status==0){
                    Toast("提醒成功")
                    // $(".sj-hint").html("提醒成功").fadeIn().delay(1500).fadeOut();
                     _this.detail();               
                  }else{
                    Toast(res.msg)
                    // $(".sj-hint").html(res.msg).fadeIn().delay(1500).fadeOut();
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              })
            },
            confim:function(id){
              var _this=this;
              const params={access_token:localStorage.getItem('access_token'),orderid:id};
              api.post('order/finish',params,res=>{
              console.log(res);
                  if(res.status==0){
                    Toast.success("确认成功")
                    // $(".sj-hint").html("确认成功").fadeIn().delay(1500).fadeOut();
                     _this.detail();               
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              })

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
                     _this.detail();               
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              }) 
            },
            //申请退款
            refund:function(orderid,goodsid){
              window.location.href="https://static.meiqia.com/dist/standalone.html?_=t&eid=16965"
            	// this.$router.push({name: 'refund', params: {orderid:orderid,goodsid:goodsid}})
            },
            //去评价
            review:function(id){
              localStorage.setItem('myorderid',id);
              this.$router.push({name: 'reviewList', params:{id:id}})
            },
        	//转为时间
        	timestampToTime:function(timestamp){
        		var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		        var Y = date.getFullYear() + '-';
		        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        var D = date.getDate() + ' ';
		        var h = date.getHours() + ':';
		        var m = date.getMinutes() + ':';
		        var s = date.getSeconds();
		        return Y+M+D+h+m+s;
        	},
        	//转为天 小时 分钟
        	formatDuring:function(mss){
			     var days = parseInt(mss / (1000 * 60 * 60 * 24));
			     var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			     var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
			     var seconds = (mss % (1000 * 60)) / 1000;
			     return days + " 天 " + hours + " 小时 " + minutes + " 分钟 ";
			   }
           
        },
        created() {
        	// var id=this.$route.params.id;
          var id=localStorage.getItem('myorderid')
        	this.id=id;
        	this.detail();
        }
    }
</script>

<style scoped>
  .height50{
    height: 50px
  }
	.head{
		position: relative;
		height: 75px;
		background-color: #ef4242;
		display: flex;
		align-items: center;
		padding-left: 15px;
		box-sizing: border-box;
		font-size: 18px;
		color: #fff;
		padding-right: 25px;
		justify-content: space-between;
	}
	.left{
		position: relative;
		display: flex;
		flex-flow: column;
	}
	.left span{
		font-size: 12px;
	}
	.right{
		position: relative;
		width: 122px;
		height: 60.5px;
		background-image: url('https://pic.repaiapp.com/static/png/20180426/10/1524708495652909848.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.address{
		position: relative;
		background-color: #fff;
		padding:15px;
		/*display: flex;*/
		/*align-items: center;*/
	}
	.name{
		font-size: 15px;
		color: #333333;
		padding-left: 25px;
	}
	.add{
		position: relative;
		display: flex;
		margin-top: 3px;
	}
	.addIcon{
		position: relative;
		width: 13px;
		height: 17px;
		background-image: url('https://pic.repaiapp.com/static/png/20180426/10/1524709728690775056.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-right: 12px;
	}
	.add span{
		font-size: 12px;
		color: #666666;
		flex:1;
	}
	.content{
		position: relative;
		margin-top: 10px;
	}
	.item{
		position: relative;
		background-color: #fff;
	}
	.itemHead{
		position: relative;
		height: 43px;
		display: flex;
		align-items: center;
		padding-left: 15px;
		font-size: 14px;
		color: #000000;
	}
	.border_b{
		border-bottom: 1px #dddddd solid;
	}
	.itemList{
		position: relative;
		/*height: 100px;*/
		padding:15px 12.5px;
		display: flex;
		/*align-items: center;*/
		flex-flow: column;
	}
	.listLeft{
		position: relative;
		width: 67px;
		height: 67px;
		margin-right: 15px;
	}
	.listLeft img{
		width: 100%;
		height: 100%;
		border-radius: 2.5px;
	}
	.listRight{
		position: relative;
		flex:1;
		display: flex;
		/*align-items: center;*/
		flex-flow: column;
	}
	.price{
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.title{
		font-size: 14px;
		color: #343032;
	}
	.option{
		font-size: 12px;
		color: #fcb039;
		margin:3px 0;
	}
	.price p{
		font-size: 15px;
		color: #ec1a1d;
	}
	.price p span{
		font-size: 12px;
		color: #999999;
		text-decoration: line-through;
	}
	.price div{
		font-size: 15px;
		color: #333333;
	}
	.total{
		position: relative;
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 15px;
		color: #333333;
		padding: 0 12.5px;
	}
	.bottom{
		position: relative;
		height: 53.5px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 15px;
		color: #333333;
		padding: 0 12.5px;
	}
	.bottom span{
		color: #ec1a1d;
	}
	.serverTime{
		position: relative;
		background-color: #fff;
		margin: 10px 0;
		padding: 15px 12.5px;
	}
	.time{
		position: relative;
		font-size: 12px;
		color: #999999;
	}
	.time span{
		color: #333333;
	}
	.serverItem{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10px;
	}
	.serverItem div img{
		width: 14.5px;
		height: 14.5px;
		margin-right: 9px;
	}
	.serverItem div{
		width: 166.5px;
		height: 30px;
		border: 1px solid #dddddd;
		font-size: 14px;
		color: #dddddd;
		border-radius: 2.5px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #333;
	}
	.orderD{
		position: relative;
		margin-bottom: 10px;
		background-color: #fff;
		/*height: 60px;*/
		padding:15px;
		display: flex;
		justify-content: center;
		/*align-items: center;*/
		flex-flow: column;
		font-size: 14px;
		color: #666666;
	}
	.footer{
		position: fixed;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		padding: 0 15px;
		box-sizing: border-box;
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
    .fh{
    	position: relative;
    	background-color: #fff;
    	height: 50px;
    	display: flex;
    	align-items: center;
    	justify-content: flex-end;
    	font-size: 14px;
    	border-top: 1px #dddddd solid;
    	padding:0 15px;
    	box-sizing: border-box;
    }
    .icon1{
    	background-image: url('https://pic.repaiapp.com/static/png/20180426/11/1524712894471429798.png');
    }
    .icon2{
    	background-image: url('https://pic.repaiapp.com/static/png/20180426/11/1524713411570215451.png');
    }
    .icon3{
    	background-image: url('https://pic.repaiapp.com/static/png/20180426/11/1524713532711710198.png');
    }
    .icon4{
    	background-image: url('https://pic.repaiapp.com/static/png/20180426/11/1524713624252375651.png');
    }
</style>

