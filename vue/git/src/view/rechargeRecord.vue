
<template>
   <div class="rechargeRecord">
      <div v-html="content"></div>
       <!-- <p>尊敬的用户，为保障您的合法权益，请您在充值前仔细阅读本规则，以免造成误解。当您点击“充值”按钮后，即视为您已阅读、理解协议，并同意按本协议的规定参与充值。</p>
       <p>1.余额构成：</p>
       <p>余额是指您实际的充值金额所构成的账户余额（人民币）</p>
       <p>2.充值余额的有效期：</p>
       <p>充值金额有效期限为自充值日起至用完即止；</p>
       <p>3.余额使用规则：</p>
       <p>充值余额仅用于店内账单结算。</p>
       <p>4.充值金额提现：</p>
       <p>充值金额暂不支持提现功能。</p>
       <p>5.正当性保证：</p>
       <p>充值活动仅面向正当、合法使用本充值卡的用户。一旦您存在利用我们规则漏洞进行任何形式作弊行为（包括但不限于通过我们活动获得不正当的经济利益），我们有权追回您作弊所得的不正当经济利益、关闭作弊账户或与您相关的所有账户，并保留您后续使用我们服务的权利，及依据严重程度追究您的法律责任。</p> -->
   </div>
</template>

<script>
    import api from '../network/request'
    export default {
        name: "rechargeRecord",
        components: {
        },

        data() {
            return {
                content:''
            }
        },
        methods: {
          rule:function(){
            var _this=this;
            const params={access_token:localStorage.getItem('access_token')};
            api.post('recharge/recharge_rule',params,res=>{
            console.log(res);
                if(res.status==0){
                  _this.content=res.data.content
                  // _this.status=res.data;
                }
                if(res.status==600){
                    this.$router.push({name: 'login', params: {}})
                }
            })
          }
           
        },
        created() {
          this.rule()
        }
    }
</script>

<style scoped>
	.rechargeRecord{
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: #fff;
		padding: 15px;
		color: #000000;
		font-size: 14px;
	}
	.rechargeRecord p{
		line-height: 24px;
	}
</style>
