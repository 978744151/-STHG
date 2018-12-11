<template>
   <div class="moreNotice">
   		<div class="item" v-for="item in allNotice" @click="noticeDetail(item.id)">
   			<div class="left">
   				<p class="title">{{item.title}}</p>
   				<p class="time">{{item.time}}</p>
   			</div>
   			<div class="right">
   				<img :src="item.thumb">
   			</div>
   		</div>
   </div>
</template>

<script>
    import api from '../network/request'

    export default {
        name: "moreNotice",
        components: {
        },

        data() {
            return {
                page:0,
                allNotice:''
            }
        },
        methods: {
           notice:function(){
           		var _this=this;
	            const params={access_token:localStorage.getItem('access_token'),page:_this.page};
	            api.post('shop/notice_lists',params,res=>{
	              if(res.status==0){
	              		for(var i in res.data){
	              			res.data[i].time=this.timestampToTime(res.data[i].createtime)
	              		}
	              		console.log(res.data)
	                  _this.allNotice=res.data
	              }
	              if(res.status==600){
	                  this.$router.push({name: 'login', params: {}})
	              }
	            }) 
           },
           timestampToTime:function(timestamp){
        		var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		        var Y = date.getFullYear() + '-';
		        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        var D = date.getDate() + ' ';
		        var h = date.getHours() + ':';
		        var m = date.getMinutes() + ':';
		        var s = date.getSeconds();
		        return Y+M+D+h+m+s;
        	},
        	noticeDetail:function(id){
        		this.$router.push({name: 'noticeDetail', query: {id:id}})
        	},
        },
        created() {
        	this.notice();
        }
    }
</script>

<style scoped>
	.item{
		position: relative;
		padding: 12px;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.right{
		width: 118px;
		height: 85px;
		margin-left: 20px;
	}
	.right img{
		width: 100%;
		height: 100%;
	}
	.left{
		display: flex;
		flex:1;
		font-size: 15px;
		color: #000000;
		flex-flow: column;
	}
	.title{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	.time{
		font-size: 13px;
		color: #818181;
		margin-top: 10px;
	}
</style>
