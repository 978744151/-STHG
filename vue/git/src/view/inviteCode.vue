<template>
   <div class="inviteCode">
       <div class="title">填写你的邀请码</div>	
       <div class="invite">
       		<input type="" name="" ref="input1" class="invite" placeholder="请输入邀请码(必填)">
       </div>
       <div class="btn" @click="complete()">完成</div>
       <div class="sj-hint"></div>

   </div>
</template>

<script>
    import api from '../network/request'
    export default {
        name: "inviteCode",
        components: {
        },

        data() {
            return {
                
            }
        },
        methods: {
        	complete:function(){
        		var _this=this;
        		if(this.$refs.input1.value==''){
	              $(".sj-hint").html("邀请码必填").fadeIn().delay(1500).fadeOut();
	              return;
            	}
            	const params={phone:localStorage.getItem('phone'),shareCode :_this.$refs.input1.value,};
                api.post('open/inviteCode',params,res=>{
                	console.log(res);
                    if(res.status==0){
                    	localStorage.setItem('access_token',res.data.access_token);
                    	$(".sj-hint").html("绑定成功").fadeIn().delay(1500).fadeOut();
                    	this.$router.push({name: 'index', params: {}});
                       // _this.shops=res.data;
                    }   
                })
        	}
           
        },
        created() {
        }
    }
</script>

<style scoped>
	.sj-hint{
	    position: absolute;
	    left: 50%;
	    top: 60%;
	    transform: translate(-50%, -50%);
	    width: 3.35rem;
	    height: 1rem;
	    background: #000;
	    opacity: 0.8;
	    line-height: 1rem;
	    text-align: center;
	    border-radius: .05rem;
	    font-size: .28rem;
	    color: #fff;
	    z-index: 23;
	    display: none;
	}
	.inviteCode{
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: #fff;
		padding: 30px 25px;
		padding-bottom: 0;
		font-size: 16px;
		color: #333333;
	}
	.invite{
		position: relative;
		width: 100%;
		box-sizing: border-box;
		height: 40px;
		background-color: #eeeeee;
		border-radius: 2.5px;
		margin-top: 13px;
		margin-bottom: 40px;
		
	}
	.invite input{
		border: 0;
		background-color: transparent;
		border-radius: 0;
		outline: 0;
		height: 100%;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 12px;
		box-sizing: border-box;	
	}
	.btn{
		position: relative;
		height: 45px;
		width: 100%;
		border-radius: 2.5px;
		color: #fff;
		font-size: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(to right, #e03a3a, #c01d1d); 
	}
	/*.title*/
</style>
