<template>
    <div class="mine">
    	<!-- head -->
    	<div class="head">
    		<div class="Icon">
    			<div class="set" @click="set(status.avatar,status.nickname,status.id)"></div>
    			<div class="IconRight">
    				<div class="msg" @click="msg()"></div>
    				<div class="scode" @click="share(status.avatar,status.nickname)"></div>
    			</div>
    		</div>
    		<!-- userInfo -->
    		<div class="userInfo">
    			<div class="userInfoTop">
    				<div class="Topleft">
    					<img :src="status.avatar" @click="memberCenter(status.avatar,status.nickname,status.id)">
    					<div>
    						<p style="display: flex;align-items: center;">{{status.nickname}}
    							<img :src="status.level_img" style="width: 50px;height: 16px;border-radius: 0;box-shadow: none;margin-left: 5px;">
    						</p>

    						<span>ID:{{status.id}}</span>
    					</div>
    				</div>
    				<div :class="!status.sign_in?'sign sign1':'sign sign2'">
    					<p>
    						<span v-if="!status.sign_in" @click="signs()">每日签到</span>
    						<span v-if="status.sign_in" @click="hassigns()">今日已签</span>
    						<span>积分:{{status.integral}}</span>
    					</p>
    					<img src="https://pic.repaiapp.com/static/png/20180411/10/1523415069260110148.png" @click="integral()" v-if="!status.sign_in">
    					<img src="https://pic.repaiapp.com/static/png/20180411/11/1523415980579810150.png" @click="integral()" v-if="status.sign_in">
    				</div>
    			</div>
    			<div class="userInfoBottom">
    				<div @click="favorite()">
    					<p>{{status.favorite}}</p>
    					<span>商品收藏</span>
    				</div>
    				<div @click="coupon()">
    					<p>{{status.coupon}}</p>
    					<span>卡券包</span>
    				</div>
    				<div>
    					<p>{{status.recharge}}</p>
    					<span>余额</span>
    				</div>
    				<div @click="footmark()">
    					<p>{{status.history}}</p>
    					<span>足迹</span>
    				</div>
    			</div>
    		</div>
    	</div>
    	<!-- order -->
    	<div class="myorder">
    		<div class="myorderTitle">
    			我的订单
    			<p @click="myorder(0)">查看更多订单
    				<img src="https://pic.repaiapp.com/static/png/20180411/11/1523415980579810150.png">
    			</p>
    		</div>
    		<div class="orderStatus">
    			<div @click="myorder(1)">
    				<img src="https://pic.repaiapp.com/static/png/20180411/11/1523416529448975348.png" class="img1">
    				<p>待付款</p>
    				<p class="nums" v-if="status.noPayment!=0">{{status.noPayment}}</p>
    			</div>
    			<div @click="myorder(2)">
    				<img src="https://pic.repaiapp.com/static/png/20180411/11/1523416612312150100.png" class="img2">
    				<p>待发货</p>
    				<p class="nums" v-if="status.noDeliver!=0">{{status.noDeliver}}</p>
    			</div>
    			<div @click="myorder(3)">
    				<img src="https://pic.repaiapp.com/static/png/20180411/11/1523416649824810048.png" class="img3">
    				<p>待收货</p>
    				<p class="nums" v-if="status.noReceipt!=0">{{status.noReceipt}}</p>
    			</div>
    			<div @click="myorder(4)">
    				<img src="https://pic.repaiapp.com/static/png/20180411/11/1523416696529625752.png" class="img4">
    				<p>待评价</p>
    				<p class="nums" v-if="status.noComment!=0">{{status.noComment}}</p>
    			</div>
    			<div @click="refund()">
    				<img src="https://pic.repaiapp.com/static/png/20180411/11/1523416732537810049.png" class="img5">
    				<p>退换货</p>
    				<p class="nums" v-if="status.refund!=0">{{status.refund}}</p>
    			</div>
    		</div>
    	</div>
    	<!-- 余额 -->
    	<div class="myorderTitle top">我的余额</div>
    	<div class="yue">
    		<div class="yueLeft">
    			<img src="https://pic.repaiapp.com/static/png/20180411/11/1523417142967825348.png" class="yueImg">
    			<div class="yueInfo">
    				<p>余额: <span class="price">￥{{status.recharge}}</span></p>
    				<span class="another" v-if="status.province_agent">您已是省级代理 </span>
    				<span class="another" v-if="status.city_agent">您已是市级代理 </span>
    				<span class="another" v-if="!status.province_agent&&!status.city_agent&&status.franchiser">您已是加盟商</span>
    				<span class="another" v-if="!status.province_agent&&!status.city_agent&&!status.franchiser">{{status.level_title}}</span>
    				<!-- <span class="another">{{status.franchiser?'您已是加盟商':status.level_title}}</span> -->
    				<!-- <span class="another" v-if="status.franchiser"></span>
    				<span class="another" v-if="!status.franchiser">{{}}</span> -->
    			</div>
    		</div>
    		<div class="yueRight" @click="recharge()">
    			<span>去充值</span>
    			<img src="https://pic.repaiapp.com/static/png/20180411/11/1523417749928789852.png">
    		</div>
    	</div>
    	<!-- 我的服务 -->
    	<div class="myorderTitle top">我的服务</div>
    	<div class="myServer">
    		<div @click="myTeam()">
    			<img src="https://pic.repaiapp.com/static/png/20180411/11/1523418348454525299.png" class="s1">
    			<p>我的团队</p>
    		</div>
    		<div @click="applyF(status.tel)">
    			<img src="https://pic.repaiapp.com/static/png/20180411/11/1523418407317669850.png" class="s2">
    			<p>加盟商申请</p>
    		</div>
    		<div @click="equity()">
    			<img src="https://pic.repaiapp.com/static/png/20180411/11/1523418430182155548.png" class="s3">
    			<p>会员中心</p>
    		</div>
    		<div @click="shareMoney()">
    			<img src="https://pic.repaiapp.com/static/png/20180411/11/1523418460436465651.png" class="s4">
    			<p>分享赚钱</p>
    		</div>
    		<div @click="bonus()">
    			<img src="https://pic.repaiapp.com/static/png/20180411/11/1523418484826495057.png" class="s5">
    			<p>我的奖金</p>
    		</div>
    		<div @click="aboutUss()">
    			<img src="https://pic.repaiapp.com/static/png/20180411/11/1523418519615835649.png" class="s6">
    			<p>关于我们</p>
    		</div>
    		<div @click="contact()">
    			<!-- <a href="tel:133333333"> -->
	    			<img src="https://pic.repaiapp.com/static/png/20180411/11/1523418551112765255.png" class="s7">
	    			<p>联系客服</p>
    			<!-- </a> -->
    		</div>
    	</div>
    	<!-- 技术支持 -->
    	<div class="support">
    		<span>版权技术支持</span>
    		<img src="https://pic.repaiapp.com/static/png/20180411/11/1523418804351605357.png">
    		<span>香天下</span>
    	</div>
    	<navBar :nav=4></navBar>
    	<div class="height50"></div>
    </div>
</template>

<script>
	import navBar from '../components/navigation-bar'
    import api from '../network/request'
    import { Toast } from 'vant'

    export default {
        name: "mine",
        components: {
           navBar
        },

        data() {
            return {
                status:"",
                franchiser:''
            }
        },
        methods: {
        	//我的订单
        	myorder:function(id){
                localStorage.setItem('changeid',id)
                this.$router.push({name: 'myOrder', params: { 'id':id}})
        	},
        	//我的团队
        	myTeam:function(){
                this.$router.push({name: 'myTeam', params: {}})

        	},
        	// 加盟商申请
        	applyF:function(tel){
        		if(this.franchiser){
        			Toast("您已是加盟商！");
        			return;
        		}
        		this.$router.push({name: 'applyF', params: {tel:tel}})
        	},
        	// 会员权益
        	equity:function(){
        		 // this.$router.push({name: 'equity', params: {}})
                this.$router.push({name: 'memberCenter', params: {}})
        	},
        	//我的邀请码
        	share:function(avatar,nickname){
        		localStorage.setItem('avatar',avatar);
        		localStorage.setItem('nickname',nickname);

        		this.$router.push({name: 'share', params: {avatar:avatar,nickname:nickname}})
        	},
        	//我的奖金
        	bonus:function(){
        		this.$router.push({name: 'bonus', params: {}})
        	},
        	//关于我们
        	aboutUss:function(){
        		this.$router.push({name: 'aboutUs', params: {}})
        	},
        	//去充值
        	recharge:function(){
        		this.$router.push({name: 'recharge', params: {}})
        	},
        	//memberCenter
        	memberCenter:function(avatar,nickname,id){
        		// this.$router.push({name: 'memberCenter', params: {}})
                localStorage.setItem('avatar',avatar);
                localStorage.setItem('nickname',nickname);
                localStorage.setItem('useId',id);

                this.$router.push({name: 'setting', params: {avatar:avatar,nickname:nickname,id:id}})
        	},
        	//我的收藏
        	favorite:function(){
				this.$router.push({name: 'favorite', params: {}})
        	},
        	//退换货
        	refund:function(){
				this.$router.push({name: 'refundDetail', params: {}})
        	},
        	//我的足迹
        	footmark:function(){
				this.$router.push({name: 'footmark', params: {}})
        	},
        	//我的卡券
        	coupon:function(){
				this.$router.push({name: 'coupon', params: {}})
        	},
        	//设置
        	set:function(avatar,nickname,id){
                localStorage.setItem('avatar',avatar);
                localStorage.setItem('nickname',nickname);
                localStorage.setItem('useId',id);

				this.$router.push({name: 'setting', params: {avatar:avatar,nickname:nickname,id:id}})
        	},
        	//消息中心
        	msg:function(){
				this.$router.push({name: 'msg', params: {}})
        	},
        	//积分明细
        	integral:function(){
				this.$router.push({name: 'integral', params: {}})
        	},
        	//分享赚钱
        	shareMoney:function(){
				this.$router.push({name: 'shareMoney', params: {}})
        	},
        	//联系客服
        	contact:function(){
        		var usrcode = 'XTX'+localStorage.getItem('apply_phone')||'';
                window.location.href="https://static.meiqia.com/dist/standalone.html?_=t&eid=105365&clientid="+usrcode
        		 // window.location.href="https://static.meiqia.com/dist/standalone.html?_=t&eid=105365&metadata="+data
        	},
        	//显示订单数量等
        	index:function(){
        		var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('user/info',params,res=>{
                console.log(res);
                    if(res.status==0){
                    	Toast.clear();
                    	_this.status=res.data;
                    	_this.franchiser=res.data.franchiser
                    	localStorage.setItem('apply_phone',res.data.tel)
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                    if(res.status!=0){
                    	Toast.fail(res.msg)
                    }
                }) 
        	},
        	// 签到
        	signs:function(){
        		var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('user/set_sign',params,res=>{
                console.log(res);
                    if(res.status==0){
                    	Toast.success('签到成功');
                    	setTimeout(function(){
                    		_this.index()
                    	},800)
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                })
        	},
        	hassigns:function(){
        		Toast.fail('今日已签');
        	},
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
        	Toast.loading({ duration: 0,message: '加载中...'})
            var _this=this;
            var access_tokens=localStorage.getItem('access_token')||'';
            if(access_tokens==''){
                this.token(function(){
                    _this.index()
                });
            }else{
                 _this.index();
            }
            
            // this.token({
            //     _this.index();
            // })
        	// this.index();
        	var new_code=api.getQueryString("code")||'';
        	if(new_code!=''){
        		sessionStorage.setItem('code',new_code);
        	}
        	this.$shareUrl.shareUrl("mine");
        	// this.signs();
        }
    }
</script>

<style scoped>
	.height50{
		height: 50px;
	}
	.head{
		position: relative;
		width: 100%;
		height:132px ;
		background-image: url('https://pic.repaiapp.com/static/png/20180411/10/1523412501480210050.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.Icon{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 13px;
		padding-top: 30px;
		margin-bottom: 15px;
	}
	.set{
		position: relative;
		width:19px;
		height:19px;
		background-image: url('https://pic.repaiapp.com/static/png/20180411/10/1523413651091610198.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.IconRight{
		position: relative;
		display: flex;
		align-items: center;
	}
	.msg{
		position: relative;
		width:21px;
		height:21px;
		background-image: url('https://pic.repaiapp.com/static/png/20180411/10/1523413759689751101.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.scode{
		position: relative;
		width:17px;
		height:17px;
		background-image: url('https://pic.repaiapp.com/static/png/20180411/10/1523413777133910153.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin-left: 15px;
	}
	.userInfo{
		position: relative;
		background-color: #fff;
		width: 95%;
		margin: 0 auto;
		/*height: 150px;*/
		box-shadow: 0px 5px 5px 0px #dfd5d5;
	}
	.userInfoTop{
		position: relative;
		padding: 15px;
		padding-right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.Topleft{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.Topleft img{
		width: 64px;
		height: 64px;
		border-radius: 50%;
		box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.1);
		/*f8f8f8*/
	}
	.Topleft p{
		font-size: 15px;
		color: #313131;
	}
	.Topleft span{
		font-size: 15px;
		color: #6c6c6c;
		margin-top: 7px;
	}
	.Topleft div{
		display: flex;
		flex-flow: column;
		margin-left: 8px;
	}
	.sign{
		position: relative;
		width: 100px;
		height: 41px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
		/*background: linear-gradient(to right, #ffdb8e , #f6c262);*/
		/*box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.1);*/
		display: flex;
		align-items: center;
		padding-left: 18px;
		padding-right: 9px;
		justify-content: space-between;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.sign1{
		color: #8d6226;
		background-image: url('https://pic.repaiapp.com/static/png/20180524/16/1527151231893505255.png');
	}
	.sign2{
		color: #999;
		background-image: url('https://pic.repaiapp.com/static/png/20180524/16/1527151251597395051.png');
	}

	.sign p{
		display: flex;
		flex-flow: column;
		font-size: 12px;
		
	}
	.sign img{
		width: 7px;
		height: 12px;
	}
	.userInfoBottom{
		position: relative;
		display: flex;
	}
	.userInfoBottom div{
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}
	.userInfoBottom div p{
		font-size: 16px;
		color: #515151
	}
	.userInfoBottom div span{
		color: #6c6c6c;
		font-size: 13px;
		margin:10px 0; 
	}
	.myorder{
		position: relative;
		margin-top: 105px;
	}
	.myorderTitle{
		position: relative;
		background-color: #fff;
		height: 40px;
		display: flex;
		padding: 0 15px;
		border-bottom: #e2e2e2;
		align-items: center;
		justify-content: space-between;
		font-size: 15px;
		color: #151515;
		border-bottom: 1px #e2e2e2 solid;
	}
	.myorderTitle p{
		font-size: 13px;
		color: #9b9b9b;
		display: flex;
		align-items: center;
	}
	.myorderTitle p img{
		width: 7px;
		height: 12px;
		margin-left: 5px;
	}
	.orderStatus{
		position: relative;
		display: flex;
		background-color: #fff;
		padding: 12px 0;
	}
	.orderStatus div{
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
		font-size: 13px;
		color: #6c6c6c;
		position: relative;
	}
	.img1{
		position: relative;
		width: 21px;
		height: 20px;
	}
	.img2{
		position: relative;
		width: 21px;
		height: 20px;
	}
	.img3{
		position: relative;
		width: 22px;
		height: 20px;
	}
	.img4{
		position: relative;
		width: 20px;
		height: 20px;
	}
	.img5{
		position: relative;
		width: 24px;
		height: 22px;
	}
	.orderStatus p{
		margin-top: 10px;
	}
	.top{
		margin-top: 12px;
	}
	.yue{
		position: relative;
		background-color: #fff;
		padding: 0 15px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.yueImg{
		position: relative;
		width: 25px;
		height: 19px;
	}
	.yueLeft{
		position: relative;
		display: flex;
		align-items: center;
	}
	.yueInfo{
		position: relative;
		display: flex;
		flex-flow: column;
		/*align-items: center;*/
		justify-content: center;
		font-size: 15px;
		color: #000000;
		margin-left: 10px;
	}
	.price{
		color: #c63933;
	}
	.another{
		position: relative;
		font-size: 13px;
		color: #6c6c6c;
		margin-top: 5px;
	}
	.yueRight{
		position: relative;
		width: 78px;
		height: 29px;
		border-radius: 25px;
		border: 1px solid #d6a15c;
		color: #d6a15c;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
	}
	.yueRight img{
		width: 5.5px;
		height: 10px;
		margin-left: 5px;
	}
	.myServer{
		position: relative;
		padding: 20px 0;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 0;
	}
	.myServer div{
		width: 25%;
		display: flex;
		align-items: center;
		flex-flow: column;
		justify-content: center;
		font-size: 13px;
		color: #6c6c6c;
		margin-bottom: 20px;
	}
	.myServer div img{
		position: relative;
		margin-bottom: 10px;
	}
	.s1{
		width: 27px;
		height: 26px;
	}
	.s2{
		width: 27px;
		height: 23px;
	}
	.s3{
		width: 22px;
		height: 24px;
	}
	.s4{
		width: 21px;
		height: 21px;
	}
	.s5{
		width: 27px;
		height: 20px;
	}
	.s6{
		width: 18px;
		height: 20px;
	}
	.s7{
		width: 25px;
		height: 23px;
	}
	.support{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #a9a9a9;
		margin-top: 50px;
	}
	.support img{
		position: relative;
		width: 10px;
		height: 10px;
		margin: 0 5px;
	}
	.orderStatus p.nums{
		position: absolute;
		margin: 0;
		width: 16px;
		height: 16px;
		background-image: url('https://pic.repaiapp.com/static/png/20180425/17/1524648126289279951.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		right:15px;
		top:-6px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		color: #fff;
	}
</style>
