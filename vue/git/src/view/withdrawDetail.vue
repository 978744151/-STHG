<template>
   <div class="withdrawDetail">
   		<div class="head">提现信息</div>
   		<div class="item" style="">
   			<p>提现金额</p>
   			<div style="display: flex;flex-flow: column;align-items: flex-end;">
           ¥{{listArr.realmoney}}  
            <div class="server_money" @click.stop="tips()" v-if="deductionmoney!=0||deductionmoney!=0.00">
                ( 含<span>¥{{deductionmoney}}</span>手续费<img src="https://pic.repaiapp.com/static/png/20180606/14/1528265948420556101.png" > )
            </div>
         
        </div>
   		</div>
   		<div class="item">
   			<p>姓名</p>
   			<p>{{listArr.realname}}</p>
   		</div>
   		<div class="item" v-if="listArr.type==2">
   			<p>支付宝账号</p>
   			<p>{{listArr.alipay}}</p>
   		</div>
   		<div class="item" v-if="listArr.type==2">
   			<p>身份证号</p>
   			<p>{{listArr.cardno}}</p>
   		</div>
   		<div class="item" v-if="listArr.type==3">
   			<p>银行</p>
   			<p>{{listArr.bankname}}</p>
   		</div>
   		<div class="item" v-if="listArr.type==3">
   			<p>银行卡账号</p>
   			<p>{{listArr.bankcard}}</p>
   		</div>
   		<div class="tips">
   			本次共提现  &nbsp;<span> ¥{{listArr.realmoney}}</span>

          <div class="server_money" @click.stop="tips()">
                ( 含<span>¥{{deductionmoney}}</span>手续费<img src="https://pic.repaiapp.com/static/png/20180606/14/1528265948420556101.png" > )<span>，</span>
            </div>
        <span v-if="listArr.status==1">提现中</span>
        <span v-if="listArr.status==3">提现成功</span>
        <span v-if="listArr.status==-2">提现失败</span>
   		</div>

      <div class="mask" v-if="tipsStatus"></div>
      <div class="tips_popout" v-if="tipsStatus">
        <div class="tips_content">提现需扣除<span>¥{{deductionmoney}}</span>手续费，请知悉</div>
        <div class="tips_footer" @click.stop="tips()">知道了</div>
      </div>



   </div>
</template>

<script>
    import api from '../network/request'

    export default {
        name: "withdrawDetail",
        components: {
        },

        data() {
            return {
                listArr:'',
                is_alipay:'',
                tipsStatus:false,
                deductionmoney:''
            }
        },
        methods: {
          //查看手续费
          tips(){
            this.tipsStatus=!this.tipsStatus;
          },
          info:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token'),id:this.$route.query.id};
                api.post('commission/get_pay_log_detail',params,res=>{
                  if(res.status==0){
                    console.log(res);
                    this.listArr=res.data;
                    //支付宝
                    if(res.data.alipay==1){
                    	this.is_alipay=1;
                    }else{
                    	this.is_alipay=0;
                    }
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
            }
           
        },
        created() {
          this.info();
          this.deductionmoney=this.$route.query.deductionmoney;
        }
    }
</script>

<style scoped>
   .mask{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    z-index: 2;
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
      justify-content: flex-end;

    }
    .server_money span{
      color: #dc2c2c;
    }
    .server_money img{
      width: 10px;
      height: 10px;
    }
	.head{
		padding:15px;
		font-size: 15px;
		color: #999;
	}
	.item{
		position: relative;
		background-color: #fff;
		border-bottom: 1px #ddd solid;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #333;
		padding: 15px;
	}
	.tips{
		padding: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #999;
	}
	.tips span{
		color: rgb(221, 50, 50);
	}
</style>
