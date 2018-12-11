<template>
   <div class="shareFriends">
       <div class="bg">
       		<div class="headImg">
       			<img :src="avatar">
       			<!-- <img src="https://pic.repaiapp.com/static/png/20180410/14/1523341562262610050.png"> -->
       		</div>
       </div>
       <p class="invited">好友邀请你成为香天下会员</p>
       <div class="content">
       		<p class="title">绑定手机号</p>
       		<div class="item">
       			<input type="" name="" placeholder="请输入您的手机号" maxlength="11" ref="input1" v-on:input="useinput1">
       			<!-- <p>获取验证码</p> -->
       			<p v-if="djs" @click="send()">获取验证码</p>
                <p v-if="!djs">{{wait}}s后重试</p>
       		</div>
       		<p class="title">验证码</p>
       		<div class="item">
       			<input type="" name="" placeholder="请输入验证码" ref="input2">
       			<!-- <p>获取验证码</p> -->
       		</div>
       		<div class="btn" @click="comfirm()">下一步</div>
       </div>
   </div>
</template>

<script>
	import api from '../network/request'
    import { Toast } from 'vant'
    export default {
        name: "shareFriends",
        components: {
        },

        data() {
            return {
                djs:true,
                wait:60,
                phone:'',
                avatar:''
            }
        },
        methods: {
        	//发送验证码
        	send:function(){
        		var _this=this;
	            var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
	            if(this.$refs.input1.value==''){
	              Toast("请输入手机号")
	              // $(".sj-hint").html("请输入手机号").fadeIn().delay(1500).fadeOut();
	              return;
	            }
	            if(this.$refs.input1.value.length!='11'){
	              Toast("手机号格式有误")
	              // $(".sj-hint").html("手机号格式有误").fadeIn().delay(1500).fadeOut();
	              return;
	            }
	            // if(!re.test(this.$refs.input1.value)){
	            //   // $(".sj-hint").html("手机号格式有误").fadeIn().delay(1500).fadeOut();
	            //   Toast("手机号格式有误")
	            //   return;
	            // }
	            const params={phone:_this.$refs.input1.value};
	            _this.phone=this.$refs.input1.value;
	            api.post('open/sendCode',params,res=>{
	              if(res.status==0){
	                _this.djs=false;
	                var time=setInterval(function() {
	                  _this.wait--;
	                  if(_this.wait==0){
	                     clearInterval(time)
	                    _this.djs=true;
	                    _this.wait=60;
	                  }
	                },1000)
	                Toast.success("发送成功")
	                // $(".sj-hint").html("发送成功").fadeIn().delay(1500).fadeOut();
	              }else{
	                Toast.fail(res.msg)
	                // $(".sj-hint").html(发送成功).fadeIn().delay(1500).fadeOut(); 
	              }
	            });
        	},
        	useinput1:function(){
        		this.phone=this.$refs.input1.value
        	},
        	//确认
        	comfirm:function(){
        		var name,value;
	            var str=location.hash;
	            // alert(str);
	            var num=str.indexOf("?")
	            str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
	            var arr=str.split("&"); //各个参数放到数组里
	            var id=[];
	            for(var i=0;i < arr.length;i++){
	                num=arr[i].indexOf("=");
	                if(num>0){
	                    name=arr[i].substring(0,num);
	                    value=arr[i].substr(num+1);
	                    // var goods_id=value;
	                    id[i]=value;
	                 // alert(value);
	                }
	            }
	            var goods_id=id[0];
        		if(this.phone==''){
	              Toast("请输入手机号")
	              // $(".sj-hint").html("请输入手机号").fadeIn().delay(1500).fadeOut();
	              return;
	            }
	            if(this.$refs.input2.value==''){
	              Toast("请输入验证码")
	              // $(".sj-hint").html("请输入验证码").fadeIn().delay(1500).fadeOut();
	              return;
	            }

	            var phone=this.phone;
	            var code=this.$refs.input2.value;
	            // var shareCode=goods_id;
	            var shareCode = api.getQueryString("code")||'';
	            const params={phone:phone,code:code,shareCode:shareCode,mp:"1"};
	            console.log(params);
	            Toast.loading({ duration: 0,forbidClick: true, message: '正在绑定中...'});
	            api.post('open/binding',params,res=>{
	              if(res.status==0){
	                  localStorage.setItem('access_token',res.data.access_token);
	                  Toast.success("绑定成功");
	                  this.$router.replace({name: 'index', params: {}});
	                  // setTimeout(function(){
	                  // 		this.$router.push({name: 'index', params: {}})
	                  // })
	                  
	                  // this.$router.go(-1);
	              } 
	              if(res.status!=0){
	              		this.$router.push({name: 'index', params: {}})
	                // Toast.fail(res.msg)
	              }
	            });
        	}
           
        },
        created() {
        	var access_token=localStorage.getItem('access_token')||'';
        	var new_code=api.getQueryString("code")||'';
        	if(new_code!=''){
        		sessionStorage.setItem('code',new_code);
        	}
        	// alert(api.getQueryString("code"));
        	// return;
        	if(access_token!=''){
        		this.$router.replace({name: 'index', params: {}});
        		return;
        	}
        	var name,value;
            var str=location.hash;
            // alert(str);
            var num=str.indexOf("?")
            str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
            var arr=str.split("&"); //各个参数放到数组里
            var id=[];
            for(var i=0;i < arr.length;i++){
                num=arr[i].indexOf("=");
                if(num>0){
                    name=arr[i].substring(0,num);
                    value=arr[i].substr(num+1);
                    id[i]=value;
                    // var goods_id=value;
                 // alert(value);
                }
            }
            console.log(id);
            console.log(goods_id);
            var goods_id=id[0];
            //获取分享人的头像
	        const params={shareCode:goods_id};
            api.post('open/get_avatar',params,res=>{
	          console.log(res)
	          if(res.status==0){
	          	this.avatar=res.data.avatar

	          } 
	          if(res.status!=0){
	          }
	        });
        }
    }
</script>

<style scoped>
	.shareFriends{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #302d42;
		top:0;
		left: 0;
	}
	.bg{
		position: relative;
		margin: 0 auto;
		width: 193px;
		height: 136px;
		background-image: url('https://pic.repaiapp.com/static/png/20180417/15/1523950504923555352.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-top: 35px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.headImg{
		position: relative;
		width: 45px;
		height: 45px;
		border-radius: 50%;
	}
	.headImg img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.invited{
		text-align: center;
		font-size: 18px;
		color: #fff;
		margin-top: 20px;
	}
	.content{
		position: relative;
		width: 345px;
		height: 340px;
		background-image: url('https://pic.repaiapp.com/static/png/20180417/15/1523950955162279750.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin: 0 auto;
		margin-top: 30px;
		box-sizing: border-box;
		padding:0 12px;
		padding-top: 40px;
		font-size: 15px;
		color: #302d42;
	}
	.item{
		position: relative;
		height: 45px;
		background-color: #fff;
		width:100%;
		box-sizing: border-box;
		border-radius: 2.5px;
		display: flex;
		margin-bottom: 20px;
	}
	.item input{
		background-color: transparent;
		border:0;
		outline: none;
		flex:1;
		height: 100%;
		padding-left: 10px;

	}
	.item p{
		width: 90px;
		height: 100%;
		color: #d9372d;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		/*background-color: red;*/
	}
	.title{
		margin-bottom: 10px;
		padding-left: 10px;
	}
	.btn{
		position: relative;
		width: 100%;
		height: 44px;
		color: #fff;
		background-color: #d9372d;
		font-size: 15px;
		display: flex;
		align-items:center;
		justify-content: center;
		border-radius: 2.5px;
	}
</style>
