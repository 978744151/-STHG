<template>
	<div class="reward">
		<div class="head" >
			<div v-for="(item,index) in head" :class="sel==index?'active':''" @click="changeHead(index)">
				<p>{{item.title}}</p>
				<span v-if="index==0">{{ordermoney}}元</span>
				<span v-if="index==1">{{orderwaitmoney}}元</span>
				<span v-if="index==2">{{orderfailcount}}个</span>
				<p class="triangle" v-if="sel==index"></p>
			</div>
		</div>	
		<div :class="sel==2?'height70':'height60'"></div>
		<!-- <div :style="sel==2?'height: 70px':'height:60px'"></div> -->
		<div class="reward-num" v-if="sel==0">
			<p>{{ordercount}}份奖金</p>
			<p>共{{ordermoney}}元</p>
		</div>
		<div class="reward-num" v-if="sel==1">
			<p>{{orderwaitcount}}份奖金</p>
			<p>共{{orderwaitmoney}}元</p>
		</div>
		<!-- 奖金在路上 -->
		<div  v-for="(item,index) in list">
			<div class="item-head">
	            <span>{{item.time}}</span>
	            <p v-if="index==0">
	              <span @click="choosetime()">筛选</span>
	              <img src="https://pic.repaiapp.com/static/png/20180413/14/1523600681084156101.png">
	            </p>
          	</div>
          	<!-- <div class=""></div> -->
			<div class="reward-item" v-for="j in item.data" v-if="item.data!=''">
				<p>{{j.createtime}}</p>
				<div class="item-list">
					<div style="width: 50%">
						<p style="width: 100%;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{j.msg}}</p>
						<p class="tips" @click="alert(j.alert)"></p>
					</div>
					<div v-if="sel==0||sel==1">
						<p class="tips-money"></p>
						<span>{{j.commission}}元</span>
					</div>
					<div v-if="sel==2">
						<!-- <p class="tips-money"></p> -->
						<span style="color: #8a8a8a">已取消</span>
					</div>
				</div>
			</div>
			<div v-if="item.data==''">
				<div class="empty">
	              <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
	              暂无数据
	            </div>
			</div>
		</div>
		<!-- <div v-if="list==''">
			<div class="empty">
              <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
              暂无数据
            </div>
		</div> -->
		<!-- 邀请失败 -->
		<div class="reward-item" style="display: none;">
			<p>05-03 11:06</p>
			<div class="item-list">
				<div>
					<p>*红已经付款了【宿舍减压生气…】</p>
					<p class="tips"></p>
				</div>
				<div>
					<!-- <p class="tips-money"></p> -->
					<span style="color: #8a8a8a">已取消</span>
				</div>
			</div>
		</div>

		<div class="mask" v-if="showtips"></div>
       	<div class="click-tips" v-if="showtips">
       		<div>{{alertMsg}}</div>
	       	<p class="know" @click="showtip()">知道了</p>
       	</div>


       	<van-datetime-picker v-model="currentDate" type="year-month" class="time" v-if="show" @confirm="confrimday" @cancel="changeday"/>
      	<div class="masks" v-if="show"></div>
	</div>
</template>

<script>
    import api from '../network/request'
    import { Toast } from 'vant'
    export default {
        name: "reward",
        components: {
        },

        data() {
            return {
            	sel:0,
                head:[{title:'已获得奖金',money:''},{title:'奖金在路上',money:''},{title:'邀请失败',money:''}],
                orderfailcount:'',
                orderwaitcount:'',
                orderwaitmoney:'',
                ordermoney:'',
                ordercount:'',
                list:'',
                showtips:false,
                alertMsg:'',
                currentDate: new Date(),
				show:false,
              	dates:'',
              	year:'',
              	month:'',
            }
        },
        methods: {
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
	            console.log(this.year);
	            console.log(this.month);
	            var _this=this;
        		if(this.sel==0){
        			var status=3;
        		}else if(this.sel==1){
        			var status=1;
        		}else{
        			var status=-1
        		}
        		
                const params={access_token:localStorage.getItem('access_token'),status:status,year:this.year,month:this.month};
                api.post('commission/get_list',params,res=>{
                  if(res.status==0){
                  	Toast.clear();
                  	_this.orderfailcount=res.data.orderfailcount;
                  	_this.orderwaitcount=res.data.orderwaitcount;
                  	_this.ordermoney=res.data.ordermoney3;
                  	_this.ordercount=res.data.ordercount3;
                  	_this.orderwaitmoney=res.data.orderwaitmoney;
                  	_this.list=res.data.list;
                  	_this.show=false;
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                })
          	},
          	changeday:function(){
            	this.show=false;
          	},
        	alert:function(msg){
        		this.alertMsg=msg;
        		this.showtips=!this.showtips;
        	},
        	showtip:function(){
        		this.showtips=!this.showtips;
        	},
        	info:function(){
        		var _this=this;
        		if(this.sel==0){
        			var status=3;
        		}else if(this.sel==1){
        			var status=1;
        		}else{
        			var status=-1
        		}
        		
                const params={access_token:localStorage.getItem('access_token'),status:status};
                api.post('commission/get_list',params,res=>{
                  if(res.status==0){
                  	Toast.clear();
                  	_this.orderfailcount=res.data.orderfailcount;
                  	_this.orderwaitcount=res.data.orderwaitcount;
                  	_this.ordermoney=res.data.ordermoney3;
                  	_this.ordercount=res.data.ordercount3;
                  	_this.orderwaitmoney=res.data.orderwaitmoney;
                  	_this.list=res.data.list
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                })
        	},
        	changeHead:function(index){
        		Toast.loading({
	              duration: 0,       // 持续展示 toast
	              forbidClick: true, // 禁用背景点击
	              message: '加载中...'
	            });
        		this.sel=index;
        		this.info();
        	}
           
        },
        created() {
        	this.info();
        }
    }
</script>

<style scoped>
	.height70{
		height: 70px;
	}
	.height60{
		height: 60px;
	}
	.time{
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    font-size: 14px;
	    z-index: 2;
	  }
	.masks{
	    position: fixed;
	    height: 100%;
	    width: 100%;
	    background-color: rgba(0,0,0,0.5);
	    top: 0;
	    left: 0;
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
	.mask{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		left: 0;
		z-index: 2;
	}
	.click-tips{
		position: fixed;
		width: 316px;
		height: 166px;
		border-radius: 11px;
		top: 50%;
		left: 50%;
		background-color: #fff;
		z-index: 3;
		transform: translate(-50%,-50%);
		font-size: 14px;
		color: #000000;
		display: flex;
		align-items: center;
		/*justify-content: center;*/
		flex-flow: column;
		/*padding-top: 23px;*/
	}
	.click-tips div{
		flex:1;
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 70px;
    	text-align: center;
	}
	.click-tips span{
		margin-top: 23px;
	}
	.know{
		position: relative;
		width: 100%;
		height: 50px;
		bottom: 0;
		left: 0;
		border-top: 1px #D0D0D0 solid;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #E63838
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
	.head{
		position: fixed;
		width: 100%;
		height: 60px;
		background-color: #fff;
		top: 0;
		left: 0;
		display: flex;
		z-index: 1002;
	}
	.head div{
		width: 33%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
		font-size: 15px;
		color: #000000;
	}
	.head div span{
		font-size: 13px;
		color: #000000;
	}
	.triangle{
		position: absolute;
		width: 9px;
		height: 4.5px;
		background-image: url('https://pic.repaiapp.com/static/png/20180511/11/1526007701282751100.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		bottom: -4.5px;
		left: 50%;
		transform: translateX(-50%);
	}
	.active{
		background-color: #D9372D;
		color: #fff !important;
	}
	.active span{
		color: #fff !important;
	}
	.reward-num{
		position: relative;
		margin: 10px 0;
		height: 62px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 15px;
		color: #D9372D;
		padding: 0 20px;
		background-color: #fff;
		margin-bottom: 0;
	}
	.reward-item{
		position: relative;
		height: 65px;
		background-color: #fff;
		display: flex;
		justify-content: center;
		/*align-items: center;*/
		flex-flow: column;
		font-size: 15px;
		color: #000000;
		padding: 0 20px;
		border-bottom: 1px #DADADA solid;
	}
	.item-list{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.item-list div{
		display: flex;
		align-items: center;
	}
    .item-list p{
    	font-size: 13px;
    	color: #8A8A8A;
    }
    .item-list span{
    	font-size: 15px;
    	color: #D9372D;
    }
    .tips{
    	width: 15px;
    	height: 15px;
    	background-image: url('https://pic.repaiapp.com/static/png/20180511/11/1526008373271805753.png');
    	background-repeat: no-repeat;
    	background-size: 100% 100%;
    }
    .tips-money{
    	width: 13px;
    	height: 13px;
    	background-image: url('https://pic.repaiapp.com/static/png/20180511/11/1526008582792755102.png');
    	background-repeat: no-repeat;
    	background-size: 100% 100%;
    	margin-right: 5px;
    }
</style>
