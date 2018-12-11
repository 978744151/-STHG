<template>
   <div class="integral">
   		<div class="head">
   			<div class="left">
   				<p>可兑换积分</p>
   				<span>每消费10元可获得1个积分,每日签到可获得1个积分.</span>
   			</div>
   			<p class="right">{{data}}<span>分</span></p>
   		</div>
      <van-list v-model="loading" :finished="finished" @load="onLoad" >
        <div class="item" v-for="(item,index) in integralArr">
          <div class="item-head">
            <span>{{item.time}}</span>
            <p v-if="index==0">
              <span @click="choosetime()">筛选</span>
                <img src="https://pic.repaiapp.com/static/png/20180413/14/1523600681084156101.png">
            </p>
          </div>
          <div class="item-list" v-for="j in item.data" v-if="item.data!=''">
            <div class="item-left">
                <img :src="j.img">
                <div style="flex:1">
                  <p style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{j.title}}</p>
                  <span>{{j.created_at}}</span>
                </div>
              </div>
              <div class="item-right" v-if="j.type!='退款'" :data-type="j.type">+{{j.credit}}</div>
              <div class="item-right" v-if="j.type=='退款'">-{{j.credit}}</div>
          </div>
          <div class="empty" v-if="item.data==''">
            <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
            暂无记录
          </div>
        </div>
      </van-list>
      <van-datetime-picker v-model="currentDate" type="year-month" class="time" v-if="show" @confirm="confrimday" @cancel="changeday"/>
      <div class="mask" v-if="show"></div>
   </div>
</template>

<script>
	import api from '../network/request'
  import { DatetimePicker } from 'vant'
  import { List } from 'vant';
    export default {
        name: "integral",
        components: {
        },

        data() {
            return {
            	page:0,
            	integralArr:[],
            	sw:false,
              loading: false,
              finished: false,
            	data:'',
              currentDate: new Date(),
              show:false,
              dates:'',
              year:'',
              month:'',
                
            }
        },

        methods: {
          onLoad() {
              this.integrals();
              setTimeout(() => { 
                this.loading = false;
                this.page=this.page+1;
                if (this.sw) {
                  this.finished = true;
                }
              }, 1800);
          },
        	integrals:function(){
      		    var _this=this;
              const params={access_token:localStorage.getItem('access_token'),page:this.page,month:this.month,year:this.year};
              api.post('user/credit_list',params,res=>{
              console.log(res);
                  if(res.status==0){
                  	_this.data=res.data.data;
                    for(var i in res.data.list){
                      for(var j in res.data.list[i].data){
                        if(res.data.list[i].data[j].type=="消费"||res.data.list[i].data[j].type=="退款"){
                            res.data.list[i].data[j].title=this.getSubStr(res.data.list[i].data[j].title);
                        }
                      }
                    }
                  	if(res.data.list==''){
                  		_this.sw=true;
                      _this.finished=true;
                  	}else{
                  		_this.integralArr=_this.integralArr.concat(res.data.list);
                  	}
                  	
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              })
        	},
          getSubStr(str){
            var subStr1 = str.substr(0,12);
            var subStr2 = str.substr(str.length-6,8);
            var subStr = subStr1 + "..." + subStr2;
            return subStr;
          },
          choosetime:function(){
            this.show=true;
          },
          confrimday:function(value){
            var _this=this;
            var d = new Date(value);
            var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            this.dates=datetime;
            this.year=d.getFullYear();
            this.month= (d.getMonth() + 1);
            this.show=false;
            this.sw=false;
            this.page=0;
            this.integralArr=[];
            this.onLoad();
            // this.sw=false;
            // this.show=false;
            // this.finished=false;
            // this.loading=false;
            // this.onLoad();
            // const params={access_token:localStorage.getItem('access_token'),page:this.page,year:this.year,month:this.month};
            // api.post('user/credit_list',params,res=>{
            // console.log(res);
            //     if(res.status==0){
            //       this.show=false;
            //       _this.data=res.data.data;
            //       if(res.data.list==''){
            //         _this.sw=true;
            //         _this.integralArr=res.data.list;
            //       }else{
            //         _this.integralArr=_this.integralArr.concat(res.data.list);
            //       }
                  
            //     }
            //     if(res.status==600){
            //         this.$router.push({name: 'login', params: {}})
            //     }
            // })
          },
          changeday:function(){
            this.show=false;
          }
           
        },
        created() {        	
        }
    }
</script>

<style scoped>
  .empty img{
      width: 50px;
      height: 60px;
      margin-bottom: 10px;

    }
    .empty{
      padding-top: 100px;
      font-size: 14px;
      display: flex;
      align-items: center;
      flex-flow: column;
      color: #999;
    }
  .mask{
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
  }
	.head{
		position: relative;
		/*height: 80px;*/
		background-color: #f6f6f6;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 16px;
		color: #000000;
		padding: 15px;
	}
	.right{
		font-size: 30px;
		color: #000;
	}
	.right span{
		font-size: 14px;
		color: #000000;
	}
	.left{
		display: flex;
		flex-flow: column;
		/*align-items: center;*/
		justify-content: center;
	}
	.left span{
		font-size:12px;
		color: #787878;
		margin-top: 15px;
	}
  .item-head{
    position: relative;
    height: 34px;
    background-color:#E9E9E9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: #2B2B2B;
    padding: 0 14px;
  }
  .item-head p{
    display: flex;
    align-items: center;
  }
  .item-head img{
    width: 6.5px;
    height: 4.5px;
    margin-left: 10px;
  }
  .item-list{
    position: relative;
    height: 64px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px #E5E5E5 solid;
    padding: 0 15px;
    box-sizing: border-box;
    justify-content: space-between
  }
	/*.item{
		position: relative;
		background-color: #fff;
		display: flex;
		width: 100%;
		box-sizing: border-box;
		height: 64px;
		padding: 0 15px;
		font-size: 16px;
		color: #000000;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px #E5E5E5 solid;
	}*/
	.item-left{
		position: relative;
		display: flex;
		align-items: center;
	}
	.item-left div{
		display: flex;
		flex-flow: column;
    font-size: 16px;

	}
	.item-left div span{
		font-size: 13px;
		color: #9D9D9D;
		margin-top: 5px;
	}
	.item-left img{
		width:37px;
		height: 37px;
		border-radius: 50%;
		margin-right: 8px;
	}
	.item-right{
		font-size: 18px;
	}
  .time{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 14px;
    z-index: 2;
  }
</style>
