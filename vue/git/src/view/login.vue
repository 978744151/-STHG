<template>
   <div class="login">
      <div class="logo"><img src="https://pic.repaiapp.com/static/png/20180413/15/1523603650824449101.png"></div>
      <div class="content">
          <p class="tips">您的微信号{{wechat}}已通过认证</p>
          <div class="userInput">
              <input type="number" name="" placeholder="请输入手机号" maxlength="11" ref="input1" v-on:input="user">
              <div class="rightTime">
                <span v-if="djs" @click="send()">获取验证码</span>
                <span v-if="!djs">{{wait}}s后重试</span>
                <div class="line"></div>
              </div>
          </div>
          <div class="userInput" style="margin:15px 0;">
              <input type="number" name="" placeholder="请输入验证码" ref="input2">
          </div>
          <div class="userInput" v-if="is_shareCode">
              <input type="number" name="" placeholder="请输入邀请码(必填)" ref="input3">
          </div>
          <!-- <div class="btn" @click="login()">绑定手机号</div> -->
          <div class="btn" @click="register()">绑定手机号</div>
      </div>
      <div class="successLogin">登录即表示同意《香天下用户协议》</div>
      <div class="sj-hint">加入成功</div>
   </div>
</template>

<script>
    import api from '../network/request'
    import { Toast } from 'vant'
    export default {
        name: "login",
        components: {
           
        },

        data() {
            return {
                djs:true,
                wait:60,
                phone:'',
                wechat:"",
                is_shareCode:false
            }
        },
        methods: {
          user:function(){
            this.phone=this.$refs.input1.value;
          },
          //获取验证码
          send:function(){
            var _this=this;
             _this.phone=this.$refs.input1.value;
            var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
            if(_this.phone==''){
              Toast("请输入手机号")
              // $(".sj-hint").html("请输入手机号").fadeIn().delay(1500).fadeOut();
              return;
            }
            if(_this.phone.length!='11'){
              Toast("手机号格式有误")
              // $(".sj-hint").html("手机号格式有误").fadeIn().delay(1500).fadeOut();
              return;
            }
            // if(!re.test(this.$refs.input1.value)){
            //   // $(".sj-hint").html("手机号格式有误").fadeIn().delay(1500).fadeOut();
            //   Toast("手机号格式有误")
            //   return;
            // }
            var isphone=_this.phone;
            var code=sessionStorage.getItem('code')||'';
            // var flag=0;
            // for(var i=0;i<localStorage.length;i++){
            //     if(localStorage.key(i)=="code"){
            //         flag=1;
            //     }
            // }
            if(code==''){
              api.post('open/is_register',{phone:isphone},res=>{
                console.log(res);
                if(res.status!=0){
                  this.is_shareCode=true;
                }
              })
            }
            
            // return;
            // if(this.$refs.input3.value==''){
            //   $(".sj-hint").html("请输入邀请码").fadeIn().delay(1500).fadeOut();
            //   return;
            // }
            // 发送验证码
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
          //注册
          register:function(){
            // open/binding
            if(this.phone==''){
              Toast("请输入手机号")
              // $(".sj-hint").html("请输入手机号").fadeIn().delay(1500).fadeOut();
              return;
            }
            if(this.$refs.input2.value==''){
              Toast("请输入验证码");
              // $(".sj-hint").html("请输入验证码").fadeIn().delay(1500).fadeOut();
              return;
            }

            // if(this.$refs.input3.value==''){
            //   Toast("请输入邀请码")
            //   // $(".sj-hint").html("请输入邀请码").fadeIn().delay(1500).fadeOut();
            //   return;
            // }
            var phone=this.phone;
            var code=this.$refs.input2.value;
            
            var flag=sessionStorage.getItem('code')||'';
            if(flag==''){
                if(this.is_shareCode){
                  if(this.$refs.input3.value==''){
                    Toast("请输入邀请码");return;
                  }
                  var shareCode=this.$refs.input3.value;
                }else{
                  var shareCode='';
                }
                
                
            }else{
                var shareCode = sessionStorage.getItem('code')||'';
            }
            // var flag=0;
            // for(var i=0;i<localStorage.length;i++){
            //     if(localStorage.key(i)=="code"){
            //         flag=1;
            //     }
            // }
            // if(flag==1){
            //    var shareCode = localStorage.getItem('code');
            // }else{
            //   if(this.$refs.input3.value==''){
            //     Toast("请输入邀请码");return;
            //   }
            //   var shareCode=this.$refs.input3.value;
            // }
            Toast.loading({ duration: 0,message: '正在绑定'})
            const params={phone:phone,code:code,shareCode:shareCode,mp:"1"};
            api.post('open/binding',params,res=>{
              console.log(res)
              if(res.status==0){
                  localStorage.setItem('access_token',res.data.access_token);
                  Toast.success("绑定成功");
                  // $(".sj-hint").html("绑定成功").fadeIn().delay(1500).fadeOut();
                  this.$router.replace({name: 'index', params: {}});
                  // this.$router.go(-1);
              } 
              if(res.status!=0){
                Toast.fail(res.msg)
              }
            });
          },
          //登陆
          // login:function(){
          //   var _this=this;
          //   if(_this.phone==''){
          //     $(".sj-hint").html("请输入手机号").fadeIn().delay(1500).fadeOut();
          //     return;
          //   }
          //   //保存手机号到本地
          //   localStorage.setItem('phone',_this.phone);
          //   const params={phone:_this.phone,code:_this.$refs.input2.value};
          //   api.post('open/login',params,res=>{
          //     console.log(res)
          //     if(res.status==0){
          //       if(!res.data.is_reg){
          //           //还未填写邀请码
          //           this.$router.push({name: 'inviteCode', params: {}})
          //       }else{
          //           //保存access_token 到本地
          //           localStorage.setItem('access_token',res.data.access_token);
          //           this.$router.go(-1)
          //       }
          //     } 
          //   });
          // }

        },
        created() {
          Toast.clear();
          //判断是否登录
          var access_token=localStorage.getItem('access_token')||'';
          var new_code=api.getQueryString("code")||'';
          if(new_code!=''){
            sessionStorage.setItem('code',new_code);
          }
          if(access_token!=''){
            this.$router.replace({name: 'index', params: {}});
            return;
          }


          // var user_infos=localStorage.getItem('user_info');
          // var user_info=JSON.parse(user_infos); 
          // this.wechat=user_info.nickname;
        }
    }
</script>

<style scoped>
  .login{
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #fff;
  }
  .logo{
    position: relative;
    padding-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 30px;
  }
  .logo img{
    width: 105.5px;
    height: 73px;
  }
  .content{
    padding: 0 28px;
  }
  .tips{
    font-size: 16px;
    color: #333333;
    margin-bottom: 14px;
  }
  .userInput{
    display: flex;
    position: relative;
    height: 40px;
    background-color: #eeeeee;
    border-radius: 2.5px;
  }
  .userInput input{
    display: flex;
    flex:1;
    height: 100%;
    outline: none;
    border: 0;
    background-color: transparent;
    padding-left: 14px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .rightTime{
    width: 102px;
    height: 100%;
    position: relative;
    color: #739ec5;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .line{
    position: absolute;
    width: 1px;
    height: 27px;
    background-color: #c8c8c8;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  .btn{
    position: relative;
    width: 100%;
    box-sizing: border-box;
    height: 44px;
    border-radius: 2.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #fff;
    background: linear-gradient(to right, #e03a3a, #c01d1d); 
    margin-top: 30px;
  }
  /*.sj-hint{
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
  }*/
  .successLogin{
    position: fixed;
    color: #999999;
    font-size: 12px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 15px;
  }
</style>
