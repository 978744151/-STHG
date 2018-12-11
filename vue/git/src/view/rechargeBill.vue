<template>
   <div class="rechargeBill">
      <div v-for="(item,index) in billInfo" v-if="billInfo.data!=''||noCon">
         <div class="tips">
            <span v-if="index==0&&billInfo.length!=1">本月</span>
         		<span v-if="index!=0&&billInfo.length!=1">{{item.time}}</span>
         		<span v-if="billInfo.length==1">{{item.time}}</span>
         		<p v-if="index==0" @click="choosetime()">筛选
         			<img src="https://pic.repaiapp.com/static/png/20180413/14/1523600681084156101.png">
         		</p>
         </div>
         <div class="content">
         		<div class="item" v-for="j in item.data">
         			<div class="itemLeft">
         				<img :src="j.img_77">
         			</div>
         			<div class="itemRight">
         				<p>
         					<span>{{j.title}}</span>
         					<span class="add" v-if="j.type==0">+{{j.realmoney}}</span>
                  <span class="add" v-if="j.type==1">-{{j.realmoney}}</span>
         				</p>
         				<p>
         					<span>{{j.createtime}}</span>
         					<span>余额：{{j.surplus_money}}</span>
         				</p>
         			</div>
         		</div>	
         </div>
      </div>
      <div class="empty" v-if="billInfo.data==''||noCon||billInfo==''">
        <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
        暂无记录
     </div>
      <van-datetime-picker v-model="currentDate" type="year-month" class="time" v-if="show" @confirm="confrimday" @cancel="changeday"/>
      <div class="mask" v-if="show"></div>
   </div>
</template>

<script>
    import api from '../network/request'
    import { DatetimePicker } from 'vant'
    export default {
        name: "rechargeBill",
        components: {
        },

        data() {
            return {
                billInfo:'',
                currentDate: new Date(),
                show:false,
                dates:'',
                year:'',
                month:'',
                noCon:false,
            }
        },
        methods: {

          bill:function(){
            var _this=this;
            const params={access_token:localStorage.getItem('access_token')};
            api.post('recharge/recharge_lists',params,res=>{
                if(res.status==0){
                  console.log(res);
                  _this.billInfo=res.data;

                }
                if(res.status==600){
                  this.$router.push({name: 'login', params: {}})
                }
            })    
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
        		const params={access_token:localStorage.getItem('access_token'),year:this.year,month:this.month};
            api.post('recharge/recharge_lists',params,res=>{
                if(res.status==0){
                  console.log(res);
                  _this.billInfo=res.data;
                  if(_this.billInfo[0].data==''){
                    this.noCon=true
                  }else{
                     this.noCon=false
                  }
                  // console.log(_this.billInfo[0].data);
                  this.show=false;
                }
                if(res.status==600){
                  this.$router.push({name: 'login', params: {}})
                }
            })

          },
          changeday:function(){
          	this.show=false;
          }
        },
        created() {
          this.bill();
        }
    }
</script>

<style scoped>
  .mask{
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
  }
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
	.time{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		font-size: 14px;
    z-index: 2;
	}
	.tips{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 30px;
		border-bottom: 1px #e5e5e5 solid;
		font-size: 13px;
		color: #2b2b2b;
		padding: 0 15px;
	}
	.tips p{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tips p img{
		width: 6.5px;
		height: 4.5px;
		margin-left: 10px;
	}
	.content{
		position: relative;
		background-color: #fff;
	}
	.item{
		position: relative;
		display: flex;
		border-bottom: 1px #e5e5e5 solid;
		padding: 0 15px;
		height: 65px;
		align-items: center;
	}
	.itemLeft{
		position: relative;
		width: 37px;
		height: 37px;
	}
	.itemLeft img{
		width:100%;
		height: 100%;
	}
	.itemRight{
		display: flex;
		flex:1;
		height: 100%;
		flex-flow: column;
		justify-content: center;
		margin-left: 7.5px;
		/*align-items: center;*/
	}
	.itemRight p{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 16px;
		color: #000000;
	}
	.add{
		font-size: 18px;
	}
	.itemRight p:nth-of-type(2){
		font-size: 13px;
		color: #9d9d9d;
		margin-top: 5px;
	}
</style>
