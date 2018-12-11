<template>
   <div class="applyF">
       <!-- <div class="tips" v-if="showTips">
       		<span>提示：如有疑问请联系客服，客服热线0512-012345</span>
       		<img src="https://pic.repaiapp.com/static/png/20180412/15/1523517905497349899.png" @click="tips()">
       </div> -->
       <div class="zl">加盟商资料</div>
       <div class="userInput">
       		<div class="item">
       			<p>姓名</p>
       			<input type="" name="" placeholder="请输入您的姓名" ref="input1">
       		</div>
       		<div class="item">
       			<p>手机号码</p>
            <div>{{tel}}</div>
       			<!-- <input type="number" name="" placeholder="请输入您的手机号码" ref="input2" maxlength="11"> -->
       		</div>
       		<div class="item">
       			<p>身份证号</p>
       			<input type="" name="" placeholder="请输入您的身份证号码" ref="input3">
       		</div>
       </div>

       <div class="uploadImg">
       		<div style="display: flex;">
	       		<p>打款凭证</p>
            <div style="position: relative;">
              <van-uploader :after-read="onRead" style="width: 80px;height: 80px;" class="vantupload">
                <van-icon name="photograph" />
              </van-uploader>
  	       		<div class="upload">
                <img :src="img">
  	       			<!-- <img src="https://pic.repaiapp.com/static/png/20180412/15/1523518709868125054.png"> -->
  	       			<!-- <span>上传照片</span> -->
  	       		</div>
            </div>
       		</div>
       		<div class="lookDemo">
       			<span @click="look">查看示例</span>
       			<!-- <img src="https://pic.repaiapp.com/static/png/20180412/15/1523518937966885698.png"> -->
       		</div>
       </div>
       <!-- btn -->
       <div class="btn" @click="comfirm()">提交资料</div>
       <div class="mask" v-if="show" @click="look"></div>
       <div class="slimg" v-if="show"></div>
   </div>
</template>

<script>
    import { Uploader } from 'vant'
    import api from '../network/request'
    import { Toast } from 'vant'
    import upload from 'components/upload/upload'
    export default {
        name: "applyF",
        components: {
          upload
        },

        data() {
            return {
                img:"https://pic.repaiapp.com/static/png/20180514/11/1526269178261199101.png",
                show:false, 
                showTips:true,
                tel:''               
            }
        },
        methods: {
            tips:function(){
              this.showTips=!this.showTips
            },
            look:function(){
              this.show=!this.show;
            },
            onRead(res) {
              console.log(res);
              Toast.loading({ duration: 0,message: '正在上传...'});
              api.post('img/push',{img:res.content},res=>{
              console.log(res);
                  if(res.status==0){
                    Toast.clear();
                    this.img=res.data.url;
                    Toast.success("上传成功")
                  }
                  if(res.status==600){
                    this.$router.push({name: 'login', params: {}})
                  }
              })
            },
            imgs:function(e){
                console.log(e);
                this.imgs=e;
                this.imgss=e;
            },
            delItem(index) {
                this.imgs.splice(index,1)
            },
            comfirm:function(){
            var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
            if(this.$refs.input1.value==''){
              Toast("请输入姓名");
              return;
            }
            // if(this.$refs.input2.value==''){
            //   Toast("请输入手机号");
            //   return;
            // }
            // if(!re.test(this.$refs.input2.value)){
            //   Toast("请输入正确的手机号");
            //   return;
            // }
            if(this.$refs.input3.value==''){
              Toast("请输入身份证号");
              return;
            }
            var _this=this;
            const params={access_token:localStorage.getItem('access_token'),name:this.$refs.input1.value,mobile:this.tel,cardNo:this.$refs.input3.value,paymoneyimage:this.img};
            api.post('commission/pull_apply_shop',params,res=>{
              if(res.status==0){
                Toast.success("提交成功");
                this.goBack();
              }
              if(res.status==600){
                  this.$router.push({name: 'login', params: {}})
              }
            }) 

          },
          goBack(){
            var _this=this;
            setTimeout(function(){
              Toast.clear;
              _this.$router.go(-1);
            },800)
          }
          
           
        },
        created() {
          this.tel=localStorage.getItem('apply_phone')
          // this.tel=this.$route.params.tel
        }
    }
</script>

<style scoped>
  .slimg{
    position: fixed;
    width: 265px;
    height:474px;
    background-image: url('https://pic.repaiapp.com/static/png/20180514/11/1526270107922795651.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 1002;
  }
  .mask{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    z-index: 1002;
  }
  .vantupload{
    position: absolute;
    height: 80px;
    width: 80px;
    z-index: 1001;
    opacity: 0;
  }
	.tips{
		position: relative;
		height: 35px;
		background-color: #ff7d7a;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 13px;
		font-size: 13px;
		color: #f6f6f6;
	}
	.tips img{
		width: 10.5px;
		height: 10.5px;
	}
	.zl{
		position: relative;
		height: 33px;
		display: flex;
		align-items: center;
		padding-left: 13px;
		box-sizing: border-box;
		font-size: 13px;
		color: #838383;
	}
	.userInput{
		position: relative;
		background-color: #fff;
	}
	.item{
		position: relative;
		border-bottom: 1px solid #ddd;
		padding: 0 13px;
		height: 45px;
		display: flex;
		align-items: center;
		font-size: 15px;
		color: #222222;
	}
	.item p{
		width: 90px;
	}
	.item input{
		flex:1;
		height: 33px;
		display: flex;
		align-items: center;
		font-size: 14px;
		outline:none;
    border:0;
	}
	.input input::-webkit-input-placeholder{
       	color:#9e9e9e;
       	font-size: 14px;
  }
  .uploadImg{
  	position: relative;
  	background-color: #fff;
  	padding: 13px;
  	font-size: 15px;
		color: #222222;
		display: flex;
		justify-content: space-between;
  }
  .uploadImg p{
  	width: 90px;
  }
  .upload{
  	position: relative;
  	width: 80px;
  	height: 80px;
  	border: 1px #ddd dashed;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	flex-flow: column;
  	font-size: 12px;
  	color: #bdbec5;
  }
  .upload img{
  	width: 100%;
    height: 100%;
  }
  .lookDemo{
  	font-size: 14px;
  	color: #9b9b9b;
  	display: flex;
  	/*align-items: center;*/
  }
  .lookDemo img{
  	width: 7px;
  	height: 12px;
  	margin-left: 9px;
  }
  .btn{
  	position: relative;
  	height: 48px;
  	background-color: #d9372d;
  	color: #ffffff;
  	font-size: 17px;
  	width: 95%;
  	margin: 0 auto;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	border-radius: 5px;
  	margin-top: 50px;
  }
</style>
