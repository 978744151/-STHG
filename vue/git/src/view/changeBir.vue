<template>
   <div class="changeBir" >
   		<div class="input" @click="showtime()" v-if="dataStatus">
   			<div>生日</div>
            <div style="margin-left: 20px;color: #999;">{{date}}</div>
   		</div>
        <div class="input" v-if="!dataStatus">
            <div>生日</div>
            <div style="margin-left: 20px;color: #999;">{{date}}</div>
        </div>
       <!--  <div class="input" v-if="dates!=''">
            <div>生日</div>
            <input type="" name="" placeholder="请选择您的出生日期" disabled="disabled" :value="dates" >
        </div> -->
        <p style="font-size: 12px;color: #999;padding-left: 10px;padding-top: 5px;">生日一经填写无法修改</p>

   		<div class="btn" @click="comfirm" v-if="dataStatus">确 定</div>
        <div class="btn no" v-if="!dataStatus">确 定</div>
        <!-- <div class="btn" @click="comfirm" v-if="dates!=''&&btn">确 定</div> -->
   		<van-datetime-picker v-model="currentDate" type="date" class="time" @confirm='choosetime' @cancel="canseltime" :style="!shows?'display:none':'display:block'"/>

   </div>
</template>

<script>
	import { DatetimePicker } from 'vant'
	import { Toast } from 'vant'
    import api from '../network/request'
    import Calendar from 'vue2-datepick'
    export default {
        name: "changeBir",
        components: {
        },

        data() {
            return {
            	currentDate: new Date(),
            	shows:false,
            	dates:'',
            	year:'',
            	month:'',
            	day:'',
                btn:false,
                date:'请选择您的出生日期',
                dataStatus:true

            }
        },
        methods: {
        	showtime:function(){
                   // let vm = this;
                this.$picker.show({
                type:'datePicker',
                onOk: (date) =>{
                  this.date = date
                }
              });
          //       console.log("11")
        		// this.shows=true;
        	},
        	canseltime:function(){
        		this.shows=false;
        	},
        	choosetime:function(value){
        		console.log(value);
        		var _this = this;
        		var d = new Date(value);
        		var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        		this.dates=datetime;
        		this.year=d.getFullYear();
        		this.month= (d.getMonth() + 1);
        		this.day=d.getDate();
                this.shows=false;
                this.btn=true;
        		// this.shows=false;
        		 
        	},
        	comfirm:function(){
                var a=this.date;
                var dataArr=a.split("-");
        		const access_token = localStorage.getItem("access_token");
                const params={access_token:access_token,year:dataArr[0],month:dataArr[1],day:dataArr[2]};
                // console.log(params);
                // return;
                api.post('user/birthday', params, res => {
                    if (res.status == 0) {
                        console.log(res);
                        Toast.success('修改成功');
                        this.shows=false;
                        this.goback();
                        
                    }
                })

        	},
            goback:function(){
                var _this=this;
                setTimeout(function(){
                    _this.$router.go(-1);
                 },800)
                Toast.clear();
            },
          
        },
        created() {
            if(this.$route.query.bir!=''){
                this.date=this.$route.query.bir;
                this.dataStatus=false;
            }
        }
    }
</script>
<style scoped>
	.input{
		position: relative;
		height: 50px;
		background-color: #fff;
		border-bottom: 1px solid #e0e0e0;
		display: flex;
		align-items: center;
		padding: 0 10px;
		font-size: 16px;
		color: #000000;
		box-sizing: border-box;
	}
	.input input{
		flex: 1;
		border: 0;
		outline: none;
		height: 100%;
		padding-left: 10px;
		box-sizing: border-box;
	}
	.btn{
		position: relative;
		width: 345px;
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #d9372d;
		color: #fff;
		font-size: 16px;
		margin: 60px auto;
		margin-bottom: 0;
		border-radius: 5px;
	}
    .no{
        background-color: #999;
    }
	.time{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		font-size: 14px;
	}
</style>


