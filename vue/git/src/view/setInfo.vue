<template>
   <div class="setInfo">
       <div class="head" style="margin-bottom: 11px;">
       		<span>头像</span>
       		<div class="right">
       			<img :src="avatar">
       			<p></p>
       		</div>
          <upload class="upLoad" size="small" @imgs="imgs" @delItem="delItem" style="position: absolute;right: 0;
          opacity: 0"></upload>

          <!-- <input type='file' /> -->
       </div>
       <div class="head">
       		<span>会员等级</span>
       		<div class="right">
       			<span>{{memberInfo.level}}</span>
       			<!-- <p></p> -->
       		</div>
       </div>
      <!--  <div class="head" @click="Binding()">
       		<span>手机号</span>
       		<div class="right">
            <span>{{memberInfo.mobile}}</span>
       			<p></p>
       		</div>
       </div> -->
       <div class="head" style="margin-bottom: 11px;" @click="changePsd(memberInfo.mobile)">
       		<span>支付密码</span>
       		<div class="right">
       			<span>修改</span>
       			<p></p>
       		</div>
       </div>
       <div class="head">
          <span>微信昵称</span>
          <div class="right">
            <span v-if="memberInfo.wechat==''">未设置</span>
            <span >{{memberInfo.wechat}}</span>
            <p></p>
          </div>
       </div>
       <div class="head" @click="changeBir()">
       		<span>生日</span>
       		<div class="right">
            <span v-if="memberInfo.birthyear==''">未设置</span>
       			<span v-else>{{memberInfo.birthyear}}-{{memberInfo.birthmonth}}-{{memberInfo.birthday}}</span>
       			<p></p>
       		</div>
       </div>
       <div class="head" @click="changesex()">
       		<span>性别</span>
       		<div class="right">
       			<span v-if="memberInfo.gender==1">男</span>
            <span v-else>女</span>
       			<p></p>
       		</div>
       </div>
       <div class="head" @click="add()">
       		<span>收货地址</span>
       		<div class="right">
       			<span>修改</span>
       			<p></p>
       		</div>
       </div>

       <van-picker :columns="columns" v-if="show" @cancel="onCancel" @confirm="onConfirm" class="sex" show-toolbar/>
       <div class="mask" v-if="show" ></div>
   </div>
</template>

<script>
    import api from '../network/request'
    import upload from 'components/upload/upload'
    import { Toast } from 'vant';
    import { Picker } from 'vant';
    export default {
        name: "setInfo",
        components: {
          upload
        },

        data() {
            return {
              memberInfo:'',
              imgss:'',
              avatar:'',
              columns: ['男', '女'],
              texts:"确定",
              show:false
            }

        },
        methods: {
          changesex:function(){
            this.show=true;
          },
          onConfirm(value, index) {
            this.show=false;
            var gen=value;
            const params={access_token:localStorage.getItem('access_token'),gender:gen};
              api.post('user/gender',params,res=>{
                  if(res.status==0){
                    console.log(res);
                    Toast.success('修改成功');
                    this.info();
                  }
                  if(res.status==600){
                    this.$router.push({name: 'login', params: {}})
                  }
              })
            // Toast(`当前值：${value}, 当前索引：${index}`);
          },
          onCancel() {
            // Toast('取消');
             this.show=false;
          },
          imgs:function(e){
              var len=e.length-1;
              var _this=this;
              this.avatar=e[len];
              const params={access_token:localStorage.getItem('access_token'),url:this.avatar};
              api.post('user/avatar',params,res=>{
                  if(res.status==0){
                    console.log(res);
                    Toast.success('修改成功');
                  }
                  if(res.status==600){
                    this.$router.push({name: 'login', params: {}})
                  }
              }) 
          },

          delItem(index) {
              this.imgs.splice(index,1)
          },
          info:function(){
            var _this=this;
            const params={access_token:localStorage.getItem('access_token')};
            api.post('user/account',params,res=>{
                if(res.status==0){
                  _this.memberInfo=res.data;
                  _this.avatar=res.data.avatar
                  console.log(res);
                }
                if(res.status==600){
                  this.$router.push({name: 'login', params: {}})
                }
            }) 
          },
          changeBir:function(){
            var _this=this;
            if(_this.memberInfo.birthyear!=''){
              var bir=_this.memberInfo.birthyear+'-'+_this.memberInfo.birthmonth+'-'+_this.memberInfo.birthday;
            }else{
              var bir=''
            }
            this.$router.push({name: 'changeBir', query: {bir:bir}})
            
          },
          changePsd:function(phone){
            this.$router.push({name: 'changePsd', params: {id:phone}})

          },
          Binding:function(){
              this.$router.push({name: 'Binding', params: {}})

          },
        	add:function(){
              this.$router.push({name: 'address', params: {}})
        	},

           
        },
        created() {
          this.info();
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
  }
  .sex{
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    font-size: 14px;
    z-index: 2;
  }
	.head{
		position: relative;
		height: 52px;
		background-color: #fff;
		/*margin-bottom: 10px;*/
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 11px;
		font-size: 16px;
		color: #262626;
		border-bottom: 1px #DADADA solid;
	}
	.right{
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #9B9B9B;
	}
	.right img{
		height: 39px;
		width: 39px;
		border-radius: 50%;

	}
	.right p{
		width: 7px;
		height: 12px;
		background-image: url('https://pic.repaiapp.com/static/png/20180428/14/1524897077454525451.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-left: 11px;
	}
  .head input{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: transparent;
    outline: none;
    border: 0;
    opacity: 0;
  }
</style>
