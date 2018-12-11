<template>
   <div class="alipay">
        <div class="info">提现信息</div>
        <div class="item">
            <span>提现金额</span>
            <div style="display: flex;flex-flow: column;align-items: flex-end;">
              <span>¥{{money}}</span>
              <p class="server_money" @click="tips()">
                ( 含<span>¥{{shouxufeiprice}}</span>手续费<img src="https://pic.repaiapp.com/static/png/20180606/14/1528265948420556101.png" > )
              </p>
            </div>
        </div>
        <div class="item">
            <span>姓名</span>
            <input type="" name="" placeholder="请填写真实姓名" ref="input1" v-on:input="useinput1" :value="alipayName">
        </div>
        <div class="item">
            <span>支付宝账号</span>
            <input type="" name="" placeholder="请输入支付宝账号" ref="input2" v-on:input="useinput1" v-model="account">
        </div>
        <div class="item">
            <span>身份证号</span>
            <input type="" name="" placeholder="请输入身份证号" ref="input3" v-on:input="useinput1" :value="alipaycardNo">
        </div>
        <p class="money">本次共提现 <span>¥{{money}}</span></p>
        <!-- active -->
        <div :class="is_comfirm?'btn active':'btn '" @click="comfirm(is_comfirm,0)">确定</div>
        <!-- 确认弹框 -->
        <div class="mask" v-if="show"></div>
        <div class="popout" v-if="show">
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
            <!-- <div class="popoutTop">
                <p>确认将奖金提现到支付宝账号</p>
                <div><span>{{account}}</span>?</div>
            </div>
            <div class="popoutBot">
                <p @click="close()">取消</p>
                <p @click="comfirm(is_comfirm,1)">确认</p>
            </div> -->
        </div>
        <div class="mask" v-if="tipsStatus"></div>
        <div class="tips_popout" v-if="tipsStatus">
          <div class="tips_content">提现需扣除<span>{{shouxufei}}%</span>手续费，请知悉</div>
          <div class="tips_footer" @click="tips()">知道了</div>
        </div>
   </div>
</template>

<script>
    import { Toast } from 'vant'
    import api from '../network/request'

    export default {
        name: "alipay",
        components: {
        },

        data() {
            return {
              show:false,
              money:'' ,
              shouxufei:'',
              shouxufeiprice:'',
              is_comfirm:false,
              account:'',
              djs:true,
              wait:120,
              tipsStatus:false
            }
        },
        methods: {
          //查看手续费
          tips(){
            this.tipsStatus=!this.tipsStatus;
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
                if(this.$refs.input2.value==''){
                  Toast("请输入支付宝账号");
                  return;
                }
                if(this.$refs.input3.value==''){
                  Toast("请输入身份证号");
                  return;
                }
                // localStorage.setItem('alipayName',this.$refs.input1.value);
                // localStorage.setItem('alipayAccout',this.$refs.input2.value);
                // localStorage.setItem('alipaycardNo',this.$refs.input3.value);
                this.show=true;
                // return;
                if(is_comfirm&&status==1){
                    if(this.$refs.input4.value==''){
                      Toast("请输入验证码");
                      return;
                    }
                    var _this=this;
                    const params={access_token:localStorage.getItem('access_token'),money:this.money,name:this.$refs.input1.value,account:this.$refs.input2.value,cardNo:this.$refs.input3.value,bank:'',bankNo:'',type:2,code:this.$refs.input4.value};
                    api.post('commission/pull_commission_pay_info',params,res=>{
                      if(res.status==0){
                         console.log(res);
                          this.show=!this.show;
                          this.$router.replace({name:'embodySuccess', params: {}});
                          localStorage.setItem('alipayName',this.$refs.input1.value);
                          localStorage.setItem('alipayAccout',this.$refs.input2.value);
                          localStorage.setItem('alipaycardNo',this.$refs.input3.value);

                          // Toast.success("体现成功");
                      }else{
                        Toast.fail(res.msg)
                      }
                      if(res.status==600){
                          this.$router.push({name: 'login', params: {}})
                      }
                    }) 
                }
               

            },
            close:function(){
              this.show=!this.show;
            },
            useinput1:function(){
              this.alipayName=this.$refs.input1.value;
              this.account=this.$refs.input2.value;
              this.alipaycardNo=this.$refs.input3.value;
              if(this.$refs.input1.value!=''&&this.$refs.input2.value!=''&&this.$refs.input3.value!=''){
                this.is_comfirm=true;
              }else{
                this.is_comfirm=false;

              }
            },
           
           
        },
        created() {
          this.money=localStorage.getItem('mymoney');
          this.shouxufei=localStorage.getItem('shouxufei');
          this.shouxufeiprice=localStorage.getItem('shouxufeiprice');

          this.alipayName=localStorage.getItem('alipayName')||'';
          this.account=localStorage.getItem('alipayAccout')||'';
          this.alipaycardNo=localStorage.getItem('alipaycardNo')||'';
          if(this.alipayName!=''&&this.account!=''&&this.alipayName!=''){
            this.is_comfirm=true;
          }
          var phone=localStorage.getItem('apply_phone');
          this.phone=phone.substr(-4);
          // alert(this.phone);

        }
    }
</script>

<style scoped>
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
    outline: none;
    border: 0;
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
  /*.popout{
    width: 250px;
    background-color: #fff;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 10px;
    z-index: 2;
    top: 113px;
  }
  .popoutTop{
    position: relative;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    font-size: 15px;
    color: #000;
  }
  .popoutTop p{
    margin-bottom: 10px;
  }
  .popoutTop span{
    color:#dd3232;
  }
  .popoutBot{
    height: 50px;
    border-top: 1px solid #ddd;
    display: flex;
  }
  .popoutBot p{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: #000;  
  }
  .popoutBot p:nth-of-type(2){
    color: #dd3232;
    border-left: 1px solid #ddd;
  }*/
</style>
