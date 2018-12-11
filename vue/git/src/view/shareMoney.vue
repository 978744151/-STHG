<template>
   <div class="shareMoney">
       <div class="head">
       		<div class="logo"></div>
       		<p class="share1">分享得现金奖励</p>
       		<p class="share2">分享专属链接给好友，TA注册成为会员下单后就可获得<br>对应等级的现金奖励。邀请越多可获得的现金越多。</p>
       		<div class="logo1"></div>
       		<p class="share3">
       			<span>分享专属链接给好友</span>
       			<span>好友注册会员并下单</span>
       			<span>好友下单成功您得奖金</span>
       		</p>
       		<div class="btn" @click="showshare()">发送我的专属邀请链接</div>
       </div>
       <div class="content">
       		<div class="mine">
       			<p>我的现金奖励</p>
       		</div>
       		<div class="tx">
       			<p>可提现(元)<span>{{money.ok_price}}</span></p>
       			<p>累积(元)<span>{{money.allprice}}</span></p>
       			<div class="line"></div>
       		</div>
       		<div class="gotoBtn" @click="goto()">去提现</div>
       </div>
       	<div class="share-mask" v-if="showShare" @click="showshare()"></div>
        <div class="share-logo" v-if="showShare" @click="showshare()"></div>
   </div>
</template>

<script>
    import api from '../network/request'
    import wxapi from '../common/wxapi.js'
    export default {
        name: "shareMoney",
        components: {
        },

        data() {
            return {
                money:'',
                showShare:false,
                url:''
            }
        },
        methods: {
        	goto:function(){
        		this.$router.push({name: 'bonus', params: {}})
        	},
        	code:function(){
        		var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('commission/get_invite_code',params,res=>{
                console.log(res);
                    if(res.status==0){
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                    if(res.status!=0){
                    	Toast.fail(res.msg)
                    }
                }) 
        	},
        	info:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('commission/get_award_price',params,res=>{
                  if(res.status==0){
                     _this.money=res.data;
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
            },
            showshare:function(){
                this.showShare=!this.showShare;
            },
            shareUrl:function(){
            	   var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('user/share_url',params,res=>{
                  if(res.status==0){
                  	_this.url=res.data.share_url;
                    _this.$shareUrl.shareUrl("shareFriends");
                     // _this.money=res.data;
                     // wxapi.wxRegister(_this.wxRegCallback)
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 

            },
            wxRegCallback () {
                //分享给朋友
                this.onMenuShareAppMessage();
                //分发到朋友圈
                this.ShareTimeline();
            },
            // //获取分享url
            // getUrl:function(cb){

            // },
            onMenuShareAppMessage () {
                // console.log(this.shareImg,"11111111")
                let opstion = {
                    title: '你的好友推荐了手提火锅', // 分享标题
                    desc:'',
                    link: this.url,
                    imgUrl: 'https://pic.repaiapp.com/static/png/20180417/16/1523952477820325556.png',// 分享图标
                    success: function () {
                        // Toast.('分享成功')
                    },
                    error: function () {
                        // Toast.('分享失败')
                    }
                }
                // 将配置注入通用方法
                wxapi.onMenuShareAppMessage(opstion)
            },
            ShareTimeline:function(){
                let opstion = {
                    title: '你的好友推荐了手提火锅', // 分享标题
                    link: this.url,
                    imgUrl: 'https://pic.repaiapp.com/static/png/20180417/16/1523952477820325556.png',// 分享图标
                    success: function () {
                        // Toast.('分享成功')
                    },
                    error: function () {
                        // Toast.('分享失败')
                    }
                }
                // 将配置注入通用方法
                wxapi.ShareTimeline(opstion)
            }
           
        },
        created() {
        	this.info();
        	this.shareUrl();
        }
    }
</script>

<style scoped>
	.share-logo{
        position: fixed;
        width: 240px;
        height: 221.5px;
        background-image: url('https://pic.repaiapp.com/static/png/20180515/10/1526352996486285299.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        z-index: 1005;
        top: -38px;
        right: -15px;
    }
    .share-mask{
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.8);
        top: 0;
        left: 0;
        z-index: 1005;
    }
	.head{
		position: relative;
		background-color: #fff;
		padding-top: 30px;
		display: flex;
		flex-flow: column;
		align-items: center;
	}
	.logo{
		position: relative;
		width: 150px;
		height: 102px;
		background-image: url('https://pic.repaiapp.com/static/png/20180417/16/1523952477820325556.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.share1{
		position: relative;
		color: #404040;
		font-size: 18px;
		margin-top: 15px;
	}
	.share2{
		position: relative;
		font-size: 13px;
		color: #6a6a6a;
		text-align: center;
		margin: 18px 0px;
	}
	.logo1{
		position: relative;
		width: 272.5px;
		height: 46px;
		background-image: url('https://pic.repaiapp.com/static/png/20180417/16/1523952741158210251.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin-bottom: 15px;
	}
	.share3{
		position: relative;
		width: 100%;
		padding:0 23px;
		font-size: 11px;
		color: #6a6a6a;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}
	.btn{
		position: relative;
		width: 345px;
		height: 44px;
		background-color: #d9372d;
		font-size: 15px;
		display: flex;
		align-items:center;
		justify-content: center;
		color: #fff;
		border-radius: 2.5px;
		margin-bottom: 25px;
	}
	.content{
		position: relative;
		width: 345px;
		height: 180px;
		background-color: #ffffff;
		box-shadow: 0px 0px 20px 0px #ece7e7;
		margin: 0 auto;
		margin-top: 15px;
		display: flex;
		flex-flow: column;
		align-items: center;
		padding-top: 28px;
	}
	.mine{
		position: relative;
		width:134px;
		height: 1px;
		background-color: #cbcbcb;
		text-align: center;
		font-size: 13px;
		color: #6a6a6a;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mine p{
		width: 70%;
		background-color: #fff;
	}
	.tx{
		position: relative;
		padding:0 30px;
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		color: #6a6a6a;
		margin-top: 40px;
		margin-bottom: 33px;
		width: 100%;
	}
	.tx span{
		font-size: 20px;
		color: #d9372d
	}
	.line{
		position: absolute;
		width: 1px;
		height: 17px;
		background-color: #cbcbcb;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.gotoBtn{
		position: relative;
		width: 75px;
		height: 30px;
		border-radius: 25px;
		border: 1px #bbbbbb solid;
		font-size: 14px;
		color: #6a6a6a;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
