
<template>
   <div class="bankCard">
       <div class="info">提现信息</div>
        <div class="item">
            <span>提现金额</span>
            <!-- <span>¥{{money}}</span> -->
            <div style="display: flex;flex-flow: column;align-items: flex-end;">
              <span>¥{{money}}</span>
              <p class="server_money" @click="tips()">
                ( 含<span>¥{{shouxufeiprice}}</span>手续费<img src="https://pic.repaiapp.com/static/png/20180606/14/1528265948420556101.png" > )
              </p>
            </div>
        </div>
        <div class="item">
            <span>姓名</span>
            <input type="" name="" placeholder="请填写真实姓名" ref="input1" v-on:input="useinput1" :value="BankName">
        </div>
        <div class="item" @click="chooseBank()">
            <span>银行</span>
            <input type="" name="" placeholder="请选择银行" disabled="disabled" :value="value" ref="input2">
        </div>

        <div class="item">
            <span>银行卡账号</span>
            <input type="" name="" placeholder="请输入银行卡账号" ref="input3" v-on:input="useinput1" :value="BankCardNo">
        </div>
        

        <p class="money">本次共提现 <span>¥{{money}}</span></p>
        <!-- active 确定 -->
        <div :class="is_comfirm?'btn active':'btn '" @click="comfirm(is_comfirm,0)">确定</div>
        <van-picker :columns="columns"  v-if="show" class="showpicker" @cancel="canseltime" @confirm="bindComfirm" show-toolbar />
        <div class="mask" v-if="tipsStatus"></div>
        <div class="tips_popout" v-if="tipsStatus">
          <div class="tips_content">提现需扣除<span>{{shouxufei}}%</span>手续费，请知悉</div>
          <div class="tips_footer" @click="tips()">知道了</div>
        </div>
        <div class="mask" v-if="show1"></div>
        <div class="popout" v-if="show1">
            <div class="popout_head">验证手机号</div>
            <div class="popout_tips">输入手机尾号{{phone}}接收到的短信验证码</div>
            <div class="popout_code">
              <div>
                <input type="number" name=""  placeholder="短信验证码" maxlength="11" ref="input4"> 
              </div>
              <div>
                <span v-if="djs" @click="send()">获取验证码</span>
                <span v-if="!djs">{{wait}}s后重试</span>
              </div>
            </div>
            <div class="popout_footer">
              <p @click="close()">取消</p>
              <p @click="comfirm(is_comfirm,1)">确认</p>
            </div>
        </div>




   </div>
</template>

<script>
	import { Picker } from 'vant'
    import api from '../network/request'
    import { Toast } from 'vant'
    export default {
        name: "bankCard",
        components: {
        },

        data() {
            return {
            	show1:false,
            	columns: [],
            	value:'',
            	money:'',
            	is_comfirm:false,
            	tipsStatus:false,
            	BankName:'',
            	BankCardNo:'',
            	djs:true,
              	wait:120,
              	show:false

            }
        },
        methods: {
      //   	onChange(picker, value, index) {
      //   		console.log(value);
		    //   // Toast(`当前值：${value}, 当前索引：${index}`);
		    // },
		    //查看手续费
			tips(){
				this.tipsStatus=!this.tipsStatus;
			},
		    canseltime:function(){
		    	this.show=!this.show
		    },
		    chooseBank:function(){
		    	this.show=!this.show
		    },
		    bindComfirm:function(value){
		    	console.log(value);
		    	this.show=!this.show
		    	this.value=value;
		    },
		    useinput1:function(){
	    		this.BankName=this.$refs.input1.value;
	            this.value=this.$refs.input2.value;
	            this.BankCardNo=this.$refs.input3.value;
              if(this.$refs.input1.value!=''&&this.$refs.input2.value!=''&&this.$refs.input3.value!=''){
                this.is_comfirm=true;
              }else{
                this.is_comfirm=false;

              }
            },
            close:function(){
              this.show1=!this.show1;
            },
		    bank:function(){
			    var _this=this;
	            api.post('shop/get_bank','',res=>{
	              console.log(res)
	              if(res.status==0){
	              	for(var i in res.data.data){
	              		// console.log(res.data.data[i].value)
	              		_this.columns.push(res.data.data[i].value)
	              	}
	                // _this.columns=res.data.data
	              } 
	            });
		    },
		    send:function(){
            // 发送验证码
            var _this=this;
            const params={phone:localStorage.getItem('apply_phone')};
            api.post('open/sendCode',params,res=>{
              if(res.status==0){
                _this.djs=false;
                var time=setInterval(function() {
                  _this.wait--;
                  if(_this.wait==0){
                     clearInterval(time)
                    _this.djs=true;
                    _this.wait=120;
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
		    comfirm:function(is_comfirm,status){
		    	 
		    	if(this.$refs.input1.value==''){
                  Toast("请输入真实姓名");
                  return;
                }
                // if(this.$refs.input2.value==''){
                //   Toast("请选择银行");
                //   return;
                // }
                if(this.$refs.input3.value==''){
                  Toast("请输入银行卡账号");
                  return;
                }
                this.show1=true;
                console.log(is_comfirm);
                console.log(status);
                if(status==1){
                	if(this.$refs.input4.value==''){
                      Toast("请输入验证码");
                      return;
                    }
                    var _this=this;
	                const params={access_token:localStorage.getItem('access_token'),money:this.money,name:this.$refs.input1.value,account:'',cardNo:'',bank:this.$refs.input2.value,bankNo:this.$refs.input3.value,type:3,code:this.$refs.input4.value};
	                api.post('commission/pull_commission_pay_info',params,res=>{
	                  if(res.status==0){
	                     console.log(res);
	                      this.show=!this.show;
	                      this.show1=!this.show1;
	                      localStorage.setItem('BankName',this.$refs.input1.value);
			              localStorage.setItem('BankAccount',this.$refs.input2.value);
			              localStorage.setItem('BankCardNo',this.$refs.input3.value);
	                      // Toast.success("体现成功");
	                      this.$router.replace({name:'embodySuccess', params: {}});
	                  }else{
	                  	Toast.fail(res.msg)
	                  }
	                  if(res.status==600){
	                      this.$router.push({name: 'login', params: {}})
	                  }
	                }) 
                }
                // if(){
                
                // }

		    }
           
        },
        created() {
        	this.money=localStorage.getItem('mymoney');
        	this.shouxufei=localStorage.getItem('shouxufei');
          	this.shouxufeiprice=localStorage.getItem('shouxufeiprice');

	        this.BankName=localStorage.getItem('BankName')||'';
	        this.value=localStorage.getItem('BankAccount')||'';
	        this.BankCardNo=localStorage.getItem('BankCardNo')||'';
	        if(this.BankName!=''&&this.value!=''&&this.BankCardNo!=''){
	           this.is_comfirm=true;
	        }
	        var phone=localStorage.getItem('apply_phone');
          	this.phone=phone.substr(-4);
        	this.bank();
        }
    }
</script>

<style scoped>
	.mask{
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    background-color: rgba(0,0,0,0.4);
	    top: 0;
	    left: 0;
	    z-index: 1;
	}
	.tips_footer{
	    position: relative;
	    left: 0;
	    bottom: 0;
	    height: 50px;
	    display: flex;
	    align-items:center;
	    justify-content: center;
	    font-size: 15px;
	    color: #DD3232;
	    border-top: 1px solid #DCDCDC;
	    width: 100%;
	    box-sizing: border-box;  
	  }
	  .tips_popout{
	    position: fixed;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	    background-color: #fff;
	    width: 250px;
	    height: 138px;
	    border-radius: 8px;
	    z-index: 2;
	    display: flex;
	    flex-flow: column;
	  }
	  .tips_content{
	    position: relative;
	    display:flex;
	    align-items: center;
	    justify-content: center;
	    flex:1;
	    font-size: 15px;
	    color: #000000
	  }
	  .tips_content span{
	    color: #dd3232
	  }
	  .server_money{
	    position: relative;
	    display: flex;
	    align-items: center;
	    font-size: 11px;
	    color: #777777;

	  }
	  .server_money span{
	    color: #dc2c2c;
	  }
	  .server_money img{	
	    width: 10px;
	    height: 10px;
	  }
	.showpicker{
		font-size: 12px;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
	}
	.info{
		position: relative;
	    height: 50px;
	    font-size: 15px;
	    color: #000000;
	    padding-left: 15px;
	    box-sizing: border-box;
	    display: flex;
	    align-items: center; 
	}
	.item{
	    position: relative;
	    height: 55px;
	    border-bottom: 1px solid #ddd;
	    padding:0 15px;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    font-size: 15px;
	    color: #000;
	    background-color: #fff;
	}
	.item input{
	    height: 100%;
	    display: flex;
	    align-items: center;
	    text-align: right;
	    border: 0;
	    outline: none;
	    background-color: transparent;
	    font-size: 15px;
	    flex:1;
	}
	.input input::-webkit-input-placeholder{
	    color:#9e9e9e;
	    font-size: 15px;
	}
	.money{
	    position: relative;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    font-size: 14px;
	    color: #000000;
	    margin-top: 36px;
	    margin-bottom: 19px;
	}
	.money span{
	    color: #dd3232;
	}
	.btn{
	    position: relative;
	    width: 95%;
	    margin: 0 auto;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    color:#fff;
	    background-color: #dfdfdf;
	    font-size: 16px;
	    height: 45px;
	    border-radius: 2.5px;
	}
	.active{
	    background-color: #dd3232;
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
  .popout{
    position: fixed;
    width: 316px;
    height: 222px;
    border-radius: 11px;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    z-index: 2;
  }
  .popout_head{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    border-bottom: 1px solid #D0D0D0;
    font-size: 18px;
    color: #000;
  }
  .popout_tips{
    position: relative;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #ABA9A9;
    padding-left: 15px;
    box-sizing: border-box;
  }
  .popout_code{
    position: relative;
    padding: 0 15px;
    box-sizing:border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .popout_code div{
    width: 140px;
    height: 48px;
    border: 1px #D0D0D0 solid;
    font-size: 14px;
    color: #ABA9A9;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popout_code div input{
    position: relative;
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .popout_footer{
    position: absolute;
    height: 52px;
    display: flex;
    justify-content: space-between;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    border-top:1px #D0D0D0 solid;
  }
  .popout_footer p{
    display: flex;
    position: relative;
    width: 49%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #ABA9A9;
  }
  .popout_footer p:nth-of-type(2){
    color: #dd3232;
    border-left: 1px solid #ddd;
  }
</style>
