<template>
   <div class="memberCenter">
       <div class="head">
       		<div class="headBg">
       			<div class="info">
       				<div class="infoLeft">
       					<img :src="listArr.data.avatar">
       					<div>
       						<span>{{listArr.data.nickname}}</span>
       						<p><img :src="listArr.data.level_image" style="border-radius: 0;"></p>
       					</div>
       				</div>
       				<div class="infoRight" @click="gotoapplyF" v-if="!listArr.data.isshop">
       					<p >成为加盟商</p>
       					<img src="https://pic.repaiapp.com/static/png/20180416/15/1523865045272775148.png">
       				</div>
       			</div>
       			<!-- 消费金额 -->
       			<div class="money">
       				消费金额<span>{{listArr.data.usemoney}}</span>
       			</div>
       		</div>
       </div>
       <!-- tips -->
       <div class="tips" v-if="listArr.data.nextlevel!=0">
       		还差<span>{{listArr.data.nextlevelmoney}}元</span>消费金额上升到{{listArr.data.nextlevel}}
       		<p @click="showtip()"></p>
       </div>
       <!-- 会员福利 -->
       <div class="fuli">
       		<div class="fuliHead">
       			<p>会员权益</p>
       		</div>
       		<div class="fuliCon" @click='equity'>
       			<div v-for="item in listArr.power.data">
       				<img :src="item.image">
       				<p style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">{{item.memberDiscount}}</p>
       			</div>
       		</div>
       </div>
       <!-- 优惠券 -->
       <div class="coupons" v-if="couponsArr!=''">
       		<div class="couponsHead"><p>专享优惠券</p></div>
       		<div class="couponsCon">
       			<div :class="item.total==0?'item active':'item'" v-for="(item,index) in couponsArr" >
       				<p class="used" v-if="item.is_receive==true"></p>
       				<div class="itemList">
       					<div class="status" :style="item.is_receive?'background-color:#8b8b8b;border-top-left-radius:5px':''">
       						<span v-if="item.coupontype==0">线上</span>
       						<span v-if="item.coupontype==2">线下</span>
       					</div>
       					<div class="listCon ">
       						<!-- usestyle -->
       						<div :class="item.is_receive?'usestyle':''">￥<span >{{item.deduct}}</span></div>
       						<span :class="item.is_receive?'usestyle intro':'intro'">满{{item.enough}}可用</span>
       						<span :class="item.is_receive?'usestyle intro':'intro'">香天下门店可用</span>
       					</div>
       					<p v-if="item.total!=0&&item.is_receive!=true" @click="get(item.id)">立<br>即<br>领<br>取</p>
       					<p v-if="item.total==0&&item.is_receive!=true">已<br>抢<br>光</p>
       					<p v-if="item.is_receive==true" @click="gotouse()">去<br>使<br>用</p>
       				</div>
       			</div>
       		</div>
       </div>
       <div class="buy" v-if="listArr.goodslist!=''">
       		<div class="couponsHead"><p>会员限时购</p></div>
       		<div class="buyItem" v-for="item in listArr.goodslist">
       			<div class="itemLeft"><img :src="item.thumb"></div>
       			<div class="itemRight">
       				<p class="title">{{item.title}}</p>
       				<div class="price">
       					<span>¥</span>{{item.marketprice}}
       					<p>会员专享价</p>
       				</div>
       				<div class="commonPrice">普通用户价：￥{{item.productprice}}</div>
       				<div class="buynow">立即抢购</div>
       				<!-- <div class="finsh">
       					<div style="opacity: 0;">
       						距结束
	       					<p>00</p>:
	       					<p>00</p>:
	       					<p>00</p>
       					</div>
       				</div> -->
       			</div>
       		</div>
       </div>
       <!-- footer -->
       <div style="height: 60px"></div>
       <div class="footer" v-if="!listArr.data.isshop">
       		<div @click="gotoapplyF" :style="listArr.data.nextlevel==0?'width:100%':''">
       			<p class="img1"></p>
       			<span>成为加盟商</span>
       		</div>
       		<div class="footer-line" v-if="listArr.data.nextlevel!=0"></div>
       		<div v-if="listArr.data.nextlevel!=0">
       			<p class="img2"></p>
       			<span>升级更高会员<br>(再消费{{listArr.data.nextlevelmoney}}元升级)</span>
       		</div>
       		<p class="line" v-if="listArr.data.nextlevel!=0"></p>
       </div>
       <div class="footer" v-if="listArr.data.isshop">
       		<div @click="gotoTeam()">
       			<p class="img1"></p>
       			<span>我的团队</span>
       		</div>
       		<div class="footer-line"></div>
       		<div  @click="gotoAward()">
       			<p class="img2"></p>
       			<span>我的奖金</span>
       		</div>
       		<p class="line" v-if="listArr.data.nextlevel!=0"></p>
       </div>
       <!-- tips -->
       <div class="mask" v-if="showtips"></div>
       <div class="click-tips" v-if="showtips">
	       	<p>提示</p>
	       	<span>您还差{{listArr.data.nextlevelmoney}}元消费金额上升到{{listArr.data.nextlevel}}</span>
	       	<p class="know" @click="showtip()">知道了</p>
       </div>
   </div>
</template>

<script>
    import api from '../network/request'
    import { Toast } from 'vant'
    export default {
        name: "memberCenter",
        components: {
        },

        data() {
            return {
            	couponsArr:'',
            	listArr:'',
            	showtips:false,
            	isshop:''
            }
        },
        methods: {
        	gotoTeam(){
        		this.$router.push({name: 'myTeam', params: {}})
        	},
        	gotoAward(){
        		this.$router.push({name: 'bonus', params: {}})
        	},
        	showtip:function(){
        		this.showtips=!this.showtips
        	},
        	gotoapplyF:function(){
                this.$router.push({name: 'applyF', params: {}})
        		
        	},
        	list:function(){
        		var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('commission/get_power',params,res=>{
                  if(res.status==0){
                  	Toast.clear();
                    console.log(res);
                    _this.listArr=res.data;
                    _this.isshop=res.data.isshop;
                    	
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
        	},
        	coupons:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('user/coupon_list',params,res=>{
                  if(res.status==0){
                  	_this.couponsArr=res.data;
                    console.log(res);
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
            },
            //领取优惠券
            get:function(id){
            	var _this=this;
                const params={access_token:localStorage.getItem('access_token'),coupon_id:id};
                api.post('user/coupon_receive',params,res=>{
                  if(res.status==0){
                  	// _this.couponsArr=res.data;
                  	Toast.success("领取成功");
                  	_this.coupons();
                    console.log(res);
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
            },
            //使用优惠券
            gotouse:function(){
            	this.$router.push({name: 'index', params: {}})
            },
            equity:function(){
        		this.$router.push({name: 'equity', params: {}})
        	},
           
        },
        created() {
        	Toast.loading({ duration: 0,message: '加载中...'})
        	this.list();
        	this.coupons();
        }
    }
</script>

<style scoped>
	.footer-line{
		position: absolute;
		width: 1px !important;
		height: 20px;
		background-color: #333;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.used{
		position: absolute;
		right: 30px;
		top: 5px;
		width: 34px;
		height: 34px;
		background-image: url('https://pic.repaiapp.com/static/png/20180519/20/1526733813290985552.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.mask{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		left: 0;
		z-index: 2;
	}
	.click-tips{
		position: fixed;
		width: 316px;
		height: 166px;
		border-radius: 11px;
		top: 50%;
		left: 50%;
		background-color: #fff;
		z-index: 3;
		transform: translate(-50%,-50%);
		font-size: 14px;
		color: #000000;
		display: flex;
		align-items: center;
		/*justify-content: center;*/
		flex-flow: column;
		padding-top: 23px;
	}
	.click-tips span{
		margin-top: 23px;
	}
	.know{
		position: absolute;
		width: 100%;
		height: 50px;
		bottom: 0;
		left: 0;
		border-top: 1px #D0D0D0 solid;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #E63838
	}
	.head{
		position: relative;
		width: 100%;
		height: 164px;
		background-color: #121212;
		padding-top: 12px;
		overflow: hidden;

	}
	.headBg{
		position: relative;
		height: 152px;
		width: 350px;
		background-image: url('https://pic.repaiapp.com/static/png/20180416/15/1523864309890553102.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin: 0 auto;
		padding-left: 22px;
		box-sizing: border-box;
		padding-top: 20px;
	}
	.info{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.infoLeft{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.infoLeft img{
		position: relative;
		width: 35px;
		height: 35px;
		border-radius: 50%;
	}
	.infoLeft div{
		display: flex;
		flex-flow: column;
		margin-left: 6px;
	}
	.infoLeft div span{
		font-size: 16px;
		color: #fff;
	}
	.infoLeft div p{
		width: 50px;
		height: 16px;
		font-size: 0;
		/*text-align: center;
		line-height: 16px;
		color: #b76b03;
		font-size: 10px;
		border-radius: 15px;
		background: linear-gradient(to right, #fbeaa7, #d39f3b); */
	}
	.infoLeft div p img{
		width: 100%;
		height: 100%;
	}
	.infoRight{
		position: relative;
		width: 87.5px;
		height: 35px;
		color: #ffffff;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top-left-radius:20px;
		border-bottom-left-radius:20px; 
		background-color: #bf0101;
	}
	.infoRight img{
		position: relative;
		width: 5px;
		height: 9px;
		margin-left: 4px;
	}
	.money{
		position: absolute;
		bottom: 13px;
		color: #fff;
		font-size: 14px;
	}
	.money span{
		font-size: 19px;
		margin-left: 8px;
	}
	.tips{
		position: relative;
		width: 100%;
		height: 35px;
		box-sizing: border-box;
		background-color: #f4f4f4;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #000000;	
	}
	.tips span{
		color: #e02424;
	}
	.tips p{
		position: relative;
		width: 13px;
		height: 13px;
		background-image: url('https://pic.repaiapp.com/static/png/20180416/16/1523865915767810198.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-left: 6px;
	}
	.fuli{
		position: relative;
		background-color: #fff;	
	}
	.fuliHead{
		position: relative;
		width: 100%;
		height: 47px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #000000;
	}
	.fuliHead p{
		width: 136.5px;
		height: 3px;
		background-image: url('https://pic.repaiapp.com/static/png/20180416/16/1523866230110802100.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		text-align: center;
		line-height: 3px;
	}
	.fuliCon{
		position: relative;
		overflow-y: scroll;
		font-size: 0;
		white-space: nowrap;
		padding-bottom: 10px;
		/*display: flex;*/
	}
	.element::-webkit-scrollbar {display:none}
	.fuliCon div{
		display: inline-block;
		border-right: 1px #eeecec solid;
		width: 105px;
		height: 120px;
		/*line-height: 120px;*/
		font-size: 13px;
		color: #5a5a5a;
		white-space: normal;
		padding:5px 13px;
		padding-bottom: 0;
		text-align: center;
	}
	.fuliCon div img{
		width: 47px;
		height: 47px;
	}
	.coupons{
		position: relative;
		background-color: #fff;
		margin-top: 10px;
	}
	.couponsHead{
		position: relative;
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.couponsHead p{
		position: relative;
		width:149px ;
		height: 3px;
		text-align: center;
		line-height: 3px;
		background-image: url('https://pic.repaiapp.com/static/png/20180416/16/1523867513086289751.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		font-size: 15px;
		color: #000000 
	}
	.couponsCon{
		position: relative;
		overflow-y: scroll;
		font-size: 0;
		white-space: nowrap;
		padding-bottom: 15px;
		padding-left: 10px;
		overflow-scrolling:touch;
		-webkit-overflow-scrolling:touch;
	}
	.item{
		position: relative;
		display: inline-block;
		width: 143px;
		height: 77px;
		background-image: url('https://pic.repaiapp.com/static/png/20180416/16/1523868051771415699.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-right: 10px;
	}
	.active{
		background-image: url('https://pic.repaiapp.com/static/png/20180416/16/1523868142147853100.png');
	}
	.itemList{
		position: relative;
		display: flex;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		/*align-items: center;*/
		justify-content: space-between;
		padding-top: 15px;
		padding-left: 6px;
	}
	.itemList p{
		width: 28px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 12px;
		position: absolute;
	    right: 0;
	    top: 0;
	}
	.status{
		position: absolute;
		height: 15px;
		width: 38px;
		top:0;
		left: 0;
		font-size: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}
	.listCon{
		position: relative;
		display: flex;
		flex-flow: column;
	}
	.listCon div{
		color: #dd3232;
		font-size: 13px;
		display: flex;
		align-items: flex-start;
	}
	.listCon div span{
		font-size: 20px;
	}	
	.intro{
		font-size: 11px;
		color: #413f3f
	}
	.buy{
		position: relative;
		background-color: #fff;
		margin-top: 10px;
	}
	.buy .couponsHead{
		border-bottom: 1px #ddd solid;
	}
	.buyItem{
		position: relative;
		padding-left: 10px;
		padding-right: 16.5px;
		height: 130px;
		border-bottom: 1px #ddd solid;
		display: flex;
		align-items: center;
		/*justify-content: space-between;*/
	}
	.itemLeft{
		position: relative;
		width: 100px;
		height: 100px;
		margin-right: 10px;
	}
	.itemLeft img{
		position: relative;
		width: 100px;
		height: 100px;
		border: 1px #ddd solid;
	}
	.itemRight{
		font-size: 14px;
		color:#000000;
	}
	.title{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.price{
		color: #ea4c3c;
		font-size: 16px;
		display: flex;
		align-items: center;
		margin-top: 10px;
	}
	.price span{
		font-size: 12px;
	}
	.price p{
		/*width: 45px;*/
		/*height: 13px;*/
		padding: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
		background-color: #eec65a;
		font-size: 8px;
		color:#fff;
		margin-left: 7px;
	}
	.commonPrice{
		font-size: 11px;
		color: #96989a;
		margin-top: 3px;
	}
	.finsh{
		position: relative;
		display: flex;
		align-items: center;
		color: #000000;
		font-size: 12px;
		/*margin-top: 5px;*/
		justify-content: space-between;
	}
	.finsh div:nth-of-type(1){
		display: flex;
		align-items: center;
	}
	.buynow{
		width: 80px;
		height: 27px;
		border:1px solid #e80505;
		color: #e80505;
		font-size: 14px;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 15px;
		bottom: 15px;
	}
	.finsh p{
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 13.5px;
		font-size: 11px;
		background-color: #000000;
		/*margin-right: 3px;*/
	}
	.finsh p:nth-of-type(1){
		margin-left: 7px;
	}
	.footer{
		position: fixed;
		height: 60px;
		background-color: #fff;
		box-shadow: 0 -0.5px 8px rgba(0,0,0,0.1);
		width: 100%;
		box-sizing: border-box;
		bottom: 0;
		left: 0;
		display: flex;
	}
	.footer div{
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		color: #000;
		text-align: center;
	}
	.footer p{
		
	}
	.img1{
		position: relative;
		width: 25px;
		height: 15.5px;
		background-image: url('https://pic.repaiapp.com/static/png/20180416/17/1523871159216715798.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin-right: 10px;
	}
	.img2{
		position: relative;
		width: 21px;
		height: 17.5px;
		background-image: url('https://pic.repaiapp.com/static/png/20180416/17/1523871222104769956.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin-right: 10px;
	}
	.line{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 1px;
		height: 22px;
		background-color: #e5e5e5;
	}
	.usestyle{
		color: #cecece !important;
	}
</style>
