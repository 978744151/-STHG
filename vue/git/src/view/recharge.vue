<template>
   <div class="recharge">
       <div class="head">
       		<div class="headInfo">
       			<span>{{info.total}}</span>
       			<div>
       				<p>累计充值<span>{{info.count}}</span>笔</p>
       				<p>实付<span>{{info.money}}</span>元</p>
       				<p>到账<span>{{info.realmoney}}</span>元</p>
       			</div>
       			<p class="btn" @click="pay()">充值</p>
       		</div>
       </div>
       <div class="content">
       		<div class="item" @click="rechargeBill()">
       			<div class="left">
       				<img src="https://pic.repaiapp.com/static/png/20180413/11/1523590146683825252.png" class="img1">
       				<span>余额记录</span>
       			</div>
       			<div class="right"></div>
       		</div>
       		<div class="item" @click="rechargeRecord()">
       			<div class="left">
       				<img src="https://pic.repaiapp.com/static/png/20180413/11/1523590182595959997.png" class="img1">
       				<span>充值规则</span>
       			</div>
       			<div class="right"></div>
       		</div>
       		<!-- <div class="item">
       			<div class="left">
       				<img src="https://pic.repaiapp.com/static/png/20180413/11/1523590204459409757.png" class="img1">
       				<span>邀请好友赚现金</span>
       			</div>
       			<div class="right"></div>
       		</div> -->
       </div>

       <!-- 充值弹框 -->
       <div class="mask" v-if="show||is_comfirm||is_success" :style="is_comfirm?'z-index:4':''"></div>
       <div v-if="show">
	       <div class="popout" >
	       	<!-- v-bind:class="{ 'active': index==0||index==3, 'active1':index==2 }" -->
	       		<div v-for="(item,index) in amount" :style="index<4?'margin-bottom:25px':''" :data-index="index"  :class="sel==index?'active active1':'active'" @click="choose(index,item.id,item.display)" >
	       			<p><span class="price">{{item.display}}</span>元</p>
	       			<p>实付款：{{item.payment}}</p>
	       			<img src="https://pic.repaiapp.com/static/png/20180413/12/1523592234438384848.png" v-if="item.preferential==1">
	       		</div>
	       </div>
	       <!-- <div class="payway">111</div> -->
	        <div class="close" v-if="show" @click="pay()"></div>
       </div>
      
       <!-- 特权弹框 -->
       <div class="privilege" v-if="false">
       		<div class="privilegeTop">
       			<p>银粉会员特权</p>
       			<span>(1) 直推会员消费奖励12%</span>
       			<span>(2) 间推会员消费奖励6%</span>
       			<span>(3) 火锅直营店消费9折优惠</span>
       		</div>
       		<div class="aprivilegeBottom">知道了</div>
       </div>
       <!-- 充值成功 -->
       <div class="success" v-if="is_success">
       		<div class="successTop">
       			<div>充值成功</div>
       			<p>恭喜您成功充值<span>{{money}}元</span></p>
       			<p>最新余额为<span>{{info.total}}元</span></p>
       		</div>
       		<div class="successBottom" @click="know">知道了</div>
       </div>
       <!-- <div class="mask"></div> -->
       <div class="success1" v-if='is_comfirm'>
       		<p>确定为账户充值 <span>{{money}}元</span> ？</p>
       		<div class="success1-btn">
       			<div @click="cancel()">取消</div>
       			<div @click="comfirm()">确定</div>
       		</div>
       </div>
       <!-- 设置密码 -->
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
		    <div class="psdbtn" @click="psdComfirm()">确定</div>
       </div>
   </div>

</template>

<script>

    import api from '../network/request'
    import $ from 'jquery'
    import { Toast } from 'vant'
    import md5 from '../network/md5.js'
    export default {
        name: "recharge",
        components: {
        },

        data() {
            return {
                show:false,
                is_success:false,
                info:'',
                amount:'',
                sel:-1,
                is_comfirm:false,
                money:'',
                moneyid:'',
                payJosn:'',
                msg:'',
        		msgLength:0,
        		ispsd:false,
        		is_pwd:'',
        		psd:'',
        		status:''
            }
        },
        watch:{
	      msg(curVal){
	      	this.psd=curVal;
	        if(/[^\d]/g.test(curVal)){
	          this.msg = this.msg.replace(/[^\d]/g,'');
	        }else{
	            this.msgLength = curVal.length;
	        }
	        console.log(this.msgLength)
	      },
	    },
        methods: {
        	focus(){
          		this.$refs.pwd.focus();
      		},
      		closepsd:function(){
      			this.ispsd=false;
      		},
        	//点击充值 关闭
        	pay:function(){
        		var _this=this;
        		if(!_this.is_pwd){
        			_this.ispsd=true;
        			return;
        		}
        		_this.show=!_this.show;
        	},
        	//知道了

        	know:function(){
        		this.is_success=!this.is_success;
        		this.$router.go(-1);
        	},
        	psdComfirm:function(){
        		if(this.msgLength==''){
        			Toast.fail("请设置密码");
        			return;
        		}
        		if(this.msgLength!=6){
        			Toast.fail("密码格式不对");
        			return;
        		}
        		var _this=this;
        		var pssd=md5.hexMD5(_this.psd)
	            const params={access_token:localStorage.getItem('access_token'),passwd:pssd};
	            api.post('user/set_pwd',params,res=>{
	                if(res.status==0){
	                	console.log(res);
	                	Toast.success("设置成功");
	                	_this.ispsd=false;
	                	_this.show=!_this.show;
	                }
	              	if(res.status==600){
	                  this.$router.push({name: 'login', params: {}})
	              	}
	            }) 
        	},
        	//余额记录
        	rechargeBill:function(){
        		this.$router.push({name: 'rechargeBill', params: {}})
        	},
        	//充值规则
        	rechargeRecord:function(){
        		this.$router.push({name: 'rechargeRecord', params: {}})
        	},
        	choose:function(index,id,display){
        		this.sel=index;
        		this.is_comfirm=!this.is_comfirm;
        		this.money=display;
        		this.moneyid=id;
        	},
        	cancel:function(){
        		this.is_comfirm=!this.is_comfirm

        	},
        	//账户余额
        	accout:function(){
        		var _this=this;
	            const params={access_token:localStorage.getItem('access_token')};
	            api.post('recharge/balance',params,res=>{
	                if(res.status==0){
	                	console.log(res);
	                	_this.info=res.data;
	                	_this.is_pwd=res.data.is_pwd

	                }
	              	if(res.status==600){
	                  this.$router.push({name: 'login', params: {}})
	              	}
	            }) 
        	},
        	recharge_amount:function(){
        		var _this=this;
	            const params={access_token:localStorage.getItem('access_token')};
	            api.post('recharge/recharge_amount',params,res=>{
	                if(res.status==0){
	                	console.log(res);
	                	_this.amount=res.data;

	                }
	              	if(res.status==600){
	                  this.$router.push({name: 'login', params: {}})
	              	}
	            })
        	},
        	//充值
        	comfirm:function(){
        		var _this=this;
        		_this.is_comfirm=!_this.is_comfirm;
        		_this.show=!_this.show;
	            const params={access_token:localStorage.getItem('access_token'),money_id:this.moneyid,pay_type:'mp'};
	            api.post('recharge/payment',params,res=>{
	                if(res.status==0){
	                	console.log(res);
	                	_this.payJosn=res.data;
	                	
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

	                }
	              	if(res.status==600){
	                  this.$router.push({name: 'login', params: {}})
	              	}
	            })

        	},
        	//微信支付
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
                        	_this.is_comfirm=!_this.is_comfirm;
                        	_this.show=!_this.show;
                            
                            _this.is_success=!_this.is_success;
                            _this.accout();
                        }else{
                            
                        }
                    }
                )

            },           
        },
        created() {
        	this.accout();
        	this.recharge_amount();
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
			this.status=this.$route.params.status
        }
    }
</script>

<style scoped>
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
		margin-top: 20px;
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
		height: 254px;
		background-color: #FFFFFF;
		border-radius: 8px;
		top: 50%;
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
	/*.psdTips input{
		width: 265px;
		height: 44px;
		border: 1px #CCCCCC solid;
		outline: none;
		position: absolute;
		top: 133px;
		opacity: 0;
		border: 0;
	}*/
	
	.success1{
		position: fixed;
		width: 275px;
		height: 150px;
		background-color: #fff;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border-radius: 4px;
		display: flex;
		font-size: 14px;
		color: #000000;
		z-index: 5;
		justify-content: center;
		flex-flow: column;
	}
	.success1 p span{
		color: #DD3232
	}
	.success1 p{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.success1-btn{
		position: relative;
		height: 50px;
		display: flex;
		border-top: 1px #E1E1E1  solid;
	}
	.success1-btn div{
		width: 49%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #000000
	}
	.success1-btn div:nth-of-type(2){
		color: #DD3232;
		border-left: 1px #E1E1E1  solid
	}
	.recharge{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #ffffff
	}
	.head{
		position: relative;
		padding: 20px;
	}
	.headInfo{
		width: 100%;
		height: 170px;
		background-color: #fff;
		box-shadow: 0px 0px 2px 2px #f4f4f4;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}
	.headInfo span{
		color: #000;
		font-size: 36px;
	}
	.headInfo div{
		display: flex;
		font-size: 14px;
		color: #4f4f4f;
	}
	.headInfo div span{
		color: #dd3232;
		font-size: 14px;
	}
	.headInfo div p:nth-of-type(2){
		border-left: 1px #4f4f4f solid;
		border-right: 1px #4f4f4f solid;
		padding: 0 5px;
		margin:0 5px;
	}
	.btn{
		position: relative;
		width: 95%;
		height: 45px;
		background-color: #dd3232;
		border-radius: 2.5px;
		text-align: center;
		line-height: 45px;
		color: #fff;
		font-size: 15px;
		margin-top: 20px;
	}
	.content{
		position: relative;
		padding: 0 20px;
	}
	.item{
		border-bottom: 1px #d7d7d7 solid;
		width:100%;
		box-sizing: border-box;
		height: 65px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.left{
		display: flex;
		align-items: center;
		font-size: 15px;
		color: #000000;
	}
	.left span{
		margin-left: 10px;
	}
	.img1{
		position: relative;
		width: 17px;
		height: 17px;
	}
	.img2{
		position: relative;
		width: 17px;
		height: 17px;
	}
	.img3{
		position: relative;
		width: 16px;
		height: 16px;
	}
	.right{
		position: relative;
		width: 6px;
		height: 9.5px;
		background-image: url('https://pic.repaiapp.com/static/png/20180413/11/1523590374444345148.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.mask{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.4);
		top: 0;
		left: 0;
		z-index: 1;
	}
	.psdmask{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.4);
		top: 0;
		left: 0;
		z-index: 1;
	}
	.popout{
		padding: 45px 22.5px;
		background-color: #fff;
		border-radius: 5px;
		display: flex;
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 2;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 290px;
		box-sizing: border-box;
	}
	.popout div{
		width: 108px;
		height: 53px;
		border-radius: 5px;
		border: 1px #000000 solid;
		font-size:12px;
		color: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
		position: relative;
	}
	.popout div.active{
		border: 1px #dd3232 solid;
	}
	.popout div.active1{
		border: 1px #dd3232 solid;
		background-color: #fbdcdd;
		color: #dd3232;
	}
	.popout div.active1 .price{
		color: #dd3232;
	}
	.popout div img{
		width: 25px;
		height: 25px;
		position:absolute;
		top: 0;
		left: 0;
	}
	.price{
		font-size: 17px;
		color: #000000;
	}
	.close{
		position: fixed;
		width: 28px;
		height: 28px;
		background-image: url('https://pic.repaiapp.com/static/png/20180413/13/1523597981346879957.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		left: 50%;
		transform: translateX(-50%);
		top: 450px;
		z-index: 2;
	}
	.privilege{
		position: fixed;
		width:290px;
		height: 212.5px;
		background-image: url('https://pic.repaiapp.com/static/png/20180413/13/1523598542739110256.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		left: 50%;
		transform: translateX(-50%);
		top: 70px;
		z-index: 2;
		display: flex;
		flex-flow: column;
		overflow-y:hidden;
	}
	.privilegeTop{
		position: relative;
		height: 142.5px;
		display: flex;
		width: 100%;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #000000;
		flex-flow: column;
		top: 20px;
	}
	.privilegeTop p{
		margin-bottom: 15px;
	}
	.privilegeTop span{
		font-size: 14px;
		color: #6a6a6a
	}
	.aprivilegeBottom{
		flex:1;
		display: flex;
		/*align-items: center;*/
		justify-content: center;
		/*background-color: red;*/
		width: 100%;
		box-sizing: border-box;
		position: relative;
		top: 20px;
		border-top: 1px #e1e1e1 solid;
		font-size: 15px;
		color: #dd3232;
		padding-top: 15px;
	}
	.success{
		position: fixed;
		width: 264px;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		border-radius: 10px;
		/*height: 100px;*/
		background-color: #fff;
		z-index: 2;
		display: flex;
		flex-flow: column;
	}
	.successTop{
		position: relative;
		width: 100%;
		box-sizing: border-box;
		padding-top: 20px;
		padding-bottom: 30px;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #000000
	}
	.successTop div{
		margin-bottom: 15px;
	}
	.successTop p{
		font-size: 14px;
	}
	.successTop p:nth-of-type(1){
		margin-bottom: 10px;
	}
	.successTop span{
		font-size: 14px;
		color: #dd3232; 
	}
	.successBottom{
		position: relative;
		width: 100%;
		height: 44px;
		border-top: 1px #e1e1e1 solid;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #dd3232;
	}
</style>
