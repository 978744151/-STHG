<template>
   <div class="equity">
   		<div class="head">
   			<p>可享权益（个）</p>
   			<p class="nums"><span>{{mypower}}</span>/{{allpower}}</p>
   		</div>

   		<div class="Con">
   			<div v-for="item,index in equityArr.list" style="margin-bottom: 8px">
	   			<div class="memberHead">
	   				<img src="https://pic.repaiapp.com/static/png/20180412/16/1523520564586719948.png" v-if="index==0">
	   				<img src="https://pic.repaiapp.com/static/png/20180412/16/1523521944533852102.png" v-if="index==1">
	   				<span>{{item.name}}</span>
	   			</div>
	   			<div class="memberCon">
	   				<div v-for="j in item.data">
	   					<img :src="j.image">
	   					<span :class="j.status==0?'gray':''">{{j.memberDiscount}}</span>
	   					<p class="lock" v-if="j.status==0"></p>
	   				</div>
	   				<!-- <div>
	   					<img src="https://pic.repaiapp.com/static/png/20180412/16/1523521520071402100.png">
	   					<span>间推会员消费奖励8%</span>
	   				</div>
	   				<div style="border-right: 0">
	   					<img src="https://pic.repaiapp.com/static/png/20180412/16/1523521539368805655.png">
	   					<span>火锅直营店消费8.8折优惠</span>
	   				</div>
	   				<div>
	   					<img src="https://pic.repaiapp.com/static/png/20180412/16/1523521559109385048.png">
	   					<span class="gray">会员享受直推加盟奖励10%</span>
	   					<p class="lock"></p>
	   				</div> -->
	   			</div>
   			</div>
   			<!-- <div class="franchiseeHead">
   				<img src="https://pic.repaiapp.com/static/png/20180412/16/1523521944533852102.png">
   				<span>加盟商收益</span>
   			</div>
   			<div class="memberCon">
   				<div>
   					<img src="https://pic.repaiapp.com/static/png/20180412/16/1523522163015595497.png">
   					<span>APP系统总销售额奖励10%</span>
   				</div>
   				<div>
   					<img src="https://pic.repaiapp.com/static/png/20180412/16/1523522175962410149.png">
   					<span>直推加盟奖励20%及APP系统总销售额奖励5%</span>
   				</div>
   				<div style="border-right: 0">
   					<img src="https://pic.repaiapp.com/static/png/20180412/16/1523522223877935348.png">
   					<span>间推加盟奖励10%及APP系统总销售额3%</span>
   				</div>
   				<div>
   					<img src="https://pic.repaiapp.com/static/png/20180412/16/1523522236365315048.png">
   					<span>直推加盟进货额奖励10%</span>
   				</div>
   				<div>
   					<img src="https://pic.repaiapp.com/static/png/20180412/16/1523522267126929753.png">
   					<span>间推加盟进货额奖励5%</span>
   				</div>
   				<div style="border-right: 0">
   					<img src="https://pic.repaiapp.com/static/png/20180412/16/1523522299391875448.png">
   					<span>直推会员消费奖励15%</span>
   				</div>
   				<div>
   					<img src="https://pic.repaiapp.com/static/png/20180412/16/1523521520071402100.png">
   					<span>间推会员消费奖励8%</span>
   				</div>
   				<div>
   					<img src="https://pic.repaiapp.com/static/png/20180412/16/1523521539368805655.png">
   					<span>火锅直营店消费8.8折优惠</span>
   				</div>
   			</div> -->
   		</div>
   </div>
</template>

<script>
    import api from '../network/request'

    export default {
        name: "equity",
        components: {
           
        },

        data() {
            return {
               equityArr:'' ,
               mypower:'',
               allpower:''
            }
        },
        methods: {
        	menber:function(){
        		var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('commission/get_power',params,res=>{
                  if(res.status==0){
                     console.log(res);
                     _this.equityArr=res.data;
                     _this.mypower=res.data.data.mypower;
                     _this.allpower=res.data.data.allpower;
                     // _this.couponArr=res.data
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
        	}
           
        },
        created() {
        	this.menber();
        }
    }
</script>

<style scoped>
	.memberCon div:nth-child(3n+3) {
		border-right: 0 !important;
	}
	.head{
		position: relative;
		height: 157px;
		width: 100%;
		background-image: url('https://pic.repaiapp.com/static/png/20180412/16/1523520098410515498.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
		font-size: 14px;
		color: #fff;
	}
	.head span{
		font-size: 60px;
	}
	.nums{
		font-size: 18px;
	}
	.Con{
		position: relative;
	}
	.memberHead{
		position: relative;
		background-color: #fff;
		display: flex;
		align-items: center;
		padding-left: 15px;
		height: 48px;
		border-bottom: 1px solid #ddd;
		font-size: 17px;
		color: #000000;
		/*margin-bottom: 8px;*/
	}
	.franchiseeHead{
		margin-top: 8px;
		position: relative;
		background-color: #fff;
		display: flex;
		align-items: center;
		padding-left: 15px;
		height: 48px;
		border-bottom: 1px solid #ddd;
		font-size: 17px;
		color: #000000;
	}
	.franchiseeHead img{
		width: 22px;
		height: 14px;
		margin-right: 6px;
	}
	.memberHead img{
		width: 18px;
		height: 15px;
		margin-right: 6px;
	}
	.memberCon{
		position: relative;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
	}
	.memberCon div{
		width: 33.333333%;
		border-bottom: 1px #ddd solid;
		box-sizing: border-box;
		position: relative;
		font-size: 13px;
		color: #5a5a5a;
		padding: 0 12.5px;
		padding-top: 14px;
		align-items: center;
		display: flex;
		flex-flow: column;
		height: 145px;
		text-align: center;
		border-right: 1px #ddd solid;
	}
	.memberCon div img{
		width: 47px;
		height: 47px;
		margin-bottom: 10px;
		border-radius: 50%;
	}
	.lock{
		position: absolute;
		width: 36px;
		height: 36px;
		background-image: url('https://pic.repaiapp.com/static/png/20180412/16/1523521707089405152.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		right: 0;
		top: 0;
	}
	.gray{
		color: #d6d6d6;
	}
</style>
