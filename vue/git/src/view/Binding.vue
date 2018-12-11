<template>
   <div class="Binding">
       <div class="item">
           <input type="number" name="" placeholder="请输入手机号" maxlength="11" ref="input1">
           <p v-if="djs" @click="send()">获取验证码</p>
           <p v-if="!djs">{{wait}}s后重试</p>
       </div>
       <div class="item">
           <input type="number" name="" placeholder="请输入验证码" ref="input2">
           <!-- <p>获取验证码</p> -->
       </div>
       <div class="addBtn" @click="comfirm()">提交</div>
   </div>
</template>

<script>
    import { Toast } from 'vant';
    import api from '../network/request'

    export default {
        name: "Binding",
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
            //获取验证码
          send:function(){
            var _this=this;
            var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
            if(this.$refs.input1.value==''){
                Toast('请输入手机号');
              // $(".sj-hint").html("请输入手机号").fadeIn().delay(1500).fadeOut();
              return;
            }
            if(this.$refs.input1.value.length!='11'){
                Toast('手机号格式有误');
              // $(".sj-hint").html("手机号格式有误").fadeIn().delay(1500).fadeOut();
              return;
            }
            if(!re.test(this.$refs.input1.value)){
                Toast('手机号格式有误');
              // $(".sj-hint").html("手机号格式有误").fadeIn().delay(1500).fadeOut();
              return;
            }
            // 发送验证码
            const params={phone:_this.$refs.input1.value,access_token:localStorage.getItem('access_token')};
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
            const params={mobile:_this.phone,code:_this.$refs.input2.value,access_token:localStorage.getItem('access_token')};
            api.post('user/phone',params,res=>{
              console.log(res)
              if(res.status==0){
                if(!res.data.is_reg){
                    Toast.success('修改成功');
                    //还未填写邀请码
                    // this.$router.push({name: 'inviteCode', params: {}})
                }else{
                    //保存access_token 到本地
                    // localStorage.setItem('access_token',res.data.access_token);
                    // this.$router.go(-1)
                }
              } 
              if(res.status==10000){
                 Toast.fail(res.msg);

              }
            });
          }
           
        },
        created() {
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
        width: 100px;
        text-align: center;
    }
    .item input{
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
