
<template>
   <div class="addAddress">
       <div class="item">
       		<p>联系人</p>
          <!-- 收货人姓名 -->
       		<input type="" name="" placeholder="" ref="input1" :value="realname" v-on:input="useinput1">
       </div>
       <div class="item">
       		<p>电话</p>
          <!-- 收货人电话 -->
       		<input type="" name="" placeholder=""	maxlength="11" ref='input2' :value="mobile" v-on:input="useinput2">
       </div>
       <div class="item" @click="chooseAdd()">
       		<p>地址</p>
       		<div style="padding-left: 10px;box-sizing: border-box;" v-if="showAdd">
       			<span class="province">{{selectStr.select1.text}}</span>
	       		<span class="city">{{selectStr.select2.text}}</span>
	       		<span class="district">{{selectStr.select3.text}}</span>
       		</div>
          <div v-if="!showAdd" class="choose-add">
              <span>请选择</span>
              <img src="https://pic.repaiapp.com/static/png/20180522/13/1526968032290104954.png">
          </div>
       		<!-- <input type="" name="" placeholder="选择收货地址" disabled="disabled" v-if="!showAdd"> -->
       </div>
       <div class="item" style="height: auto;padding: 15px;align-items: flex-start;">
       		<p>详细地址</p>
          <textarea ref="input3" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等" style="resize:none;height: 60px;outline: none;border: 0;flex:1" v-model="address"></textarea>
       		<!-- <input type="" name="" placeholder="详细地址如门牌号等" ref="input3" :value="address"> -->
       </div>
       <div class="item" style="justify-content: space-between;">
          <p style="width: 85px;">设为默认地址</p>
          <van-cell-group class="witch" style="padding: 0">
            <van-switch-cell v-model="checked" @change="changeWitch()" style="padding: 0"/>
          </van-cell-group>

       </div>
       <vue-pickers :show="show" :selectData="pickData3" v-on:cancel="close" v-on:confirm="confirmFn"></vue-pickers>
       <div class="btn" @click="comfirm()">保 存</div>
       <div class="sj-hint">加入成功</div>
       <div class="mask" v-if="show"></div>
   </div>
</template>

<script>
	  import VuePickers from 'vue-pickers'
    import {provs_data, citys_data, dists_data} from 'vue-pickers/lib/areaData'
    import api from '../network/request'
    import { SwitchCell } from 'vant';
    import { Toast } from 'vant'

    export default {
        name: "addAddress",
        components: {
           VuePickers
        },

        data() {
            return {
              checked: false,
            	selectStr:'',
            	show:false,
            	showAdd:false,
              realname:'',
              mobile:'',
              province:'',
              city:'',
              area:'',
              address:'',
              id:'',
              pickData3: {
                columns: 3,
                link: true,
                pData1: provs_data,
                pData2: citys_data,
                pData3: dists_data,
              },
            }
        },
        methods: {
          useinput1:function(){
             this.realname=this.$refs.input1.value;
          },
          useinput2:function(){
              this.mobile=this.$refs.input2.value;
          },
          changeWitch:function(){
            if(this.realname!=''){
              
            }
            if( this.mobile!=''){
              
            }
            
            this.realname=this.$refs.input1.value;
            this.mobile=this.$refs.input2.value;
            this.address=this.$refs.input3.value;
            // console.log(this.checked)
          },
          	chooseAdd:function(){
          		this.show=true;
              this.realname=this.$refs.input1.value;
              this.mobile=this.$refs.input2.value;
          	},
        	 close:function() {
                this.show = false
            }, 
            confirmFn(data) {
                var a={
                  text:'',
                  value:'',
                }

                for(var i in data){
                  if(data[i]==undefined){
                    data[i]=a;
                  }
                }

                console.log(data);
                // return;
                this.selectStr = data;
                this.showAdd=true;
                if (this.selectStr) {
                	this.close()
            	}
            },
            //保存
            comfirm:function(){
              // console.log(this.checked);
              // return;
            	var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
            	var province=$(".province").html();
              var city=$('.city').html();
              var district=$('.district ').html();
            	if(this.$refs.input1.value==''){
                  Toast("请输入名字")
                    // $(".sj-hint").html("请输入名字").fadeIn().delay(1500).fadeOut();
                    return;
            	}
            	if(this.$refs.input2.value==''){
                  Toast("请输入手机号")

	              	// $(".sj-hint").html("请输入手机号").fadeIn().delay(1500).fadeOut();
	              	return;
	            }
	            // if(!re.test(this.$refs.input2.value)){
             //      Toast("手机号格式有误")

	            //   	// $(".sj-hint").html("手机号格式有误").fadeIn().delay(1500).fadeOut();
	            //   	return;
	            // }
	            if(this.selectStr==''){
                  Toast("请选择城市")
                   // $(".sj-hint").html("请选择城市").fadeIn().delay(1500).fadeOut();
                  //  return;
              }
              if(this.$refs.input3.value==''){
                  Toast("请输入详细地址");
                   // $(".sj-hint").html("请输入详细地址").fadeIn().delay(1500).fadeOut();
                   return;
              }
              //是否设置为默认
              if(this.checked){
                var isdefault=1
              }else{
                var isdefault=0;
              }
                var _this = this;
                let access_token = localStorage.getItem("access_token");
                // var a={
                //   text:'',
                //   value:''
                // }
                // for(var i in this.selectStr){
                //   if(this.selectStr[i]==''){
                //     this.selectStr[i].push(a);
                //   }
                // }
                // console.log(this.selectStr)
                // return;
                // let params={access_token:access_token,realname:this.$refs.input1.value,mobile:this.$refs.input2.value,province:this.selectStr.select1.text,city:this.selectStr.select2.text,area:this.selectStr.select3.text,address:this.$refs.input3.value,id:_this.id,isdefault:isdefault};
                     let params={access_token:access_token,realname:this.$refs.input1.value,mobile:this.$refs.input2.value,province:'江苏',city:'苏州',area:'园区',address:this.$refs.input3.value,id:_this.id,isdefault:isdefault};
                console.log(params);
                api.post('user/save_address',params,res => {
                    if (res.status == 0) {
                    	console.log(res);
                      if(_this.id==''){
                        Toast.success("添加成功")
                        // $(".sj-hint").html("添加成功").fadeIn().delay(1500).fadeOut();
                      }else{
                        Toast.success("修改成功")
                        // $(".sj-hint").html("修改成功").fadeIn().delay(1500).fadeOut();
                      }
                      setTimeout(function(){
                        Toast.clear();
                        _this.$router.go(-1);
                      },800)
                    }
                })

            }
           
        },
        created() {
          var _this=this;

          if(this.$route.params.addInfo!=''){
              var obj = new Object();  
              _this.realname=this.$route.params.addInfo.realname;
              _this.mobile=this.$route.params.addInfo.mobile;
              _this.address=this.$route.params.addInfo.address;
              _this.id=this.$route.params.addInfo.id;
              if(this.$route.params.addInfo.isdefault==1){
                  _this.checked=true;
              }else{
                  _this.checked=false;
              }
             
              obj.select1={text:this.$route.params.addInfo.province};
              obj.select2={text:this.$route.params.addInfo.city};
              obj.select3={text:this.$route.params.addInfo.area};
              _this.selectStr=obj;
              _this.showAdd=true;
              // $('.province').html("111")
              // console.log(obj);
          }
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
  input::-webkit-input-placeholder{
      color:#C1C1C1;
  }
  textarea::-webkit-input-placeholder{
      color:#C1C1C1;
  }

  .witch{
    transform: scale(0.8);
  }
  .choose-add{
    position: relative;
    flex:1;
    text-align: right;
    font-size: 14px;
    color: #C1C1C1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .choose-add img{
    position: relative;
    width: 8px;
    height: 14px;
    margin-left: 12px;
  }
	.item{
		position: relative;
		background-color: #fff;
		height: 50px;
		border-bottom: 1px #dadada solid;
		display: flex;
		align-items: center;
		padding: 0 15px;
		font-size: 14px;
		color: #000000;
	}
	.item p{
		width: 65px;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.item input{
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		border: 0;
		outline: 0;
		background-color: transparent;
		font-size: 14px;
		padding-left: 10px;
		box-sizing: border-box;
	}
	.btn{
		position: relative;
		height: 44px;
		background-color: #d9372d;
		font-size: 18px;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90%;
		margin: 0 auto;
		border-radius: 2.5px;
		margin-top: 50px;
	}
</style>
