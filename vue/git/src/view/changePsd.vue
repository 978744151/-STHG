
<template>
   <div class="changePsd">
       <div class="item">
           <!-- <input type="number" name="" placeholder="请输入手机号" maxlength="11" ref="input1" disabled="disabled"> -->
           <div>{{phone}}</div>
           <p v-if="djs" @click="send()">获取验证码</p>
           <p v-if="!djs">{{wait}}s后重试</p>
       </div>
       <div class="item">
           <input type="number" name="" placeholder="请输入验证码" ref="input2">
           <!-- <p>获取验证码</p> -->
       </div>
       <div class="item">
           <input type="password" name="" placeholder="请输入密码（最少6位数字）" ref="input3">
           <!-- <p>获取验证码</p> -->
       </div>
       <div class="addBtn" @click="comfirm()">提交</div>
   </div>
</template>

<script>
    import { Toast } from 'vant';
    import api from '../network/request'
    import md5 from '../network/md5.js'
    export default {
        name: "changePsd",
        components: {
        },

        data() {
            return {
              djs:true,
              wait:60,
              phone:''
                
            }
        },
        methods: {
          send:function(){
            var _this=this;
            // var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
            // if(this.$refs.input1.value==''){
            //     Toast('请输入手机号');
            //   // $(".sj-hint").html("请输入手机号").fadeIn().delay(1500).fadeOut();
            //   return;
            // }
            // if(this.$refs.input1.value.length!='11'){
            //     Toast('手机号格式有误');
            //   // $(".sj-hint").html("手机号格式有误").fadeIn().delay(1500).fadeOut();
            //   return;
            // }
            // if(!re.test(this.$refs.input1.value)){
            //     Toast('手机号格式有误');
            //   // $(".sj-hint").html("手机号格式有误").fadeIn().delay(1500).fadeOut();
            //   return;
            // }
            // 发送验证码
            const params={phone:_this.phone,access_token:localStorage.getItem('access_token')};
            _this.phone=this.phone;
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
                },1000);
                Toast.success('发送成功');
              }else{
                if(res.status==600){
                    $(".sj-hint").html(res.msg).fadeIn().delay(1500).fadeOut(); 
                }else{
                   Toast.fail(res.msg);
                }
                
              }
            });
          },
          comfirm:function(){
            var _this=this;
            var password=md5.hexMD5(_this.$refs.input3.value)
            const params={code:_this.$refs.input2.value,passwd:password,access_token:localStorage.getItem('access_token')};
            api.post('user/pwd',params,res=>{
              if(res.status==0){
               console.log(res);
                Toast.success('修改成功');
                this.goback();
              }else{
                if(res.status==600){
                    $(".sj-hint").html(res.msg).fadeIn().delay(1500).fadeOut(); 
                }else{
                   Toast.fail(res.msg);
                }
                
              }
            });

          },
          goback:function(){
              var _this=this;
              setTimeout(function(){
                  _this.$router.go(-1);
                  Toast.clear();
               },800)
              
          },
           
        },
        created() {
          this.phone=this.$route.params.id
        }
    }
</script>

<style scoped>
    .item{
        position: relative;
        height: 50px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px #e0e0e0 solid;
        font-size: 16px;
        color: #000000;
        padding: 0 10px;
    }
    .item p{
        color: #9b9b9b;
        width: 80px;
    }
    .item input{
        /*font-size: 16px;*/
        font-size: 16px;
        flex:1;
        height: 100%;
        outline: none;
        background-color: transparent;
        border: 0
    }
    .addBtn{
        position: fixed;
        bottom:30px;
        left: 50%;
        text-align: center;
        margin-left: -173px;
        width: 346px;
        height:48px;
        border-radius: 3px;
        line-height: 48px;
        font-size: 17px;
        color:#fff;
        background:#d9372d;
    }
</style>
