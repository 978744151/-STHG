<template>
   <div class="search">
   		<div class="head">
   			<!-- <form action="#" style="flex:1"> -->
   				<input type="search" name="" placeholder="请输入搜索内容" ref="input1">
   			<!-- </form> -->
   			<div @click="submit">搜索</div>
   		</div>
   		<!-- <div></div> -->
   		<div v-if="lists!=''&&show" class="hasCon">
   			<div class="popularCon">
                    <div class="list" v-for="(item,index) in lists" @click="particulars(item.id)" :key="index" :data-id="item.id">
                        <img :src="item.thumb">
                        <div style="padding: 0 5px">
                            <p class="listTitle">{{item.title}}</p>
                            <p class="nums">{{item.sales}}人已购买</p>
                            <p class="price1">￥{{item.marketprice}}</p>
                            <div class="shopCart"></div>
                        </div>
                    </div>
                </div>
   		</div>
   		<div class="empty" v-if="lists==''&&show">
   			<p></p>
   			<span>暂无结果，换个词试试~</span>
   		</div>
   </div>
</template>

<script>
	import api from '../network/request'
    import { Toast } from 'vant'
    export default {
        name: "search",
        components: {
        },

        data() {
            return {
            	lists:'',
            	show:false,
                
            }
        },
        methods: {
        	submit(){
                // key.Code === 13表示回车键 
                var con=this.$refs.input1.value;
                if(con==''){
                    Toast.fail("请输入内容")
                    return;
                }
                // if(e.keyCode === 13){
                  var _this=this;
                  const params={access_token:localStorage.getItem('access_token'),keyword:con};
                  api.post('shop/search',params,res=>{
                  
                  if(res.status==0){
                    console.log(res);
                    _this.lists=res.data.lists
                    _this.show=true;
                        
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                })
               // }
            },
    		particulars:function(id){
                if(localStorage.getItem('access_token')==''){
                    this.$router.push({name: 'login', params: {}})
                }else{
                    console.log(id)
                    localStorage.setItem('indexShopid',id);
                    this.$router.replace({name: 'particulars', query: {"id":id}})
                }
                
            },
           
        },
        created() {
        }
    }
</script>

<style scoped>
	::-webkit-search-cancel-button { display: none; }
	.hasCon{
		position: relative;
		padding-top: 10px;
	}
	.head{
		position: relative;
		height: 40px;
		background-color: #fff;
		display: flex;
		align-items: center;
		border-bottom: 1px #dddddd solid;
		font-size: 15px;
		color: #666666;
		padding: 0 12px;
	}
	.head input{
		flex: 1;
		border: 0;
		outline: none;
		background-color: #f0f0f0;
		border-radius: 15px;
		height: 30px;
		font-size: 14px;
		padding-left: 12px;
		box-sizing: border-box;
		width: 100%;
	}
	.head div{
		margin-left: 15px;
	}
	.empty{
		position: fixed;
		height: 100%;
		width: 100%;
		top: 40px;
		left: 0;
		background-color: #fff;
		display: flex;
		align-items: center;
		flex-flow: column;
		font-size: 15px;
		color: #999;
		
		/*justify-content: center;*/
	}
	.empty p{
		width: 84px;
		height: 90px;
		background-image: url('https://pic.repaiapp.com/static/png/20180506/21/1525612781002775798.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-top: 120px;
		margin-bottom: 20px;
	}
	.popularCon{
        position: relative;
        padding: 0 12.5px;
        justify-content: space-between;
        flex-wrap: wrap;
        display: flex;
    }
    .list{
        position: relative;
        display: flex;
        width: 169px;
        border:1px solid #e5e5e5;
        /*height: 100px;*/
        margin-bottom: 10px;
        flex-flow: column;
        background-color: #fff;
    }
    .list img{
        width: 100%;
        height: 170px;
    }
    .listTitle{
        position: relative;
        width: 100%;
        font-size: 14px;
        color: #333333;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-top: 10px;
    }
    .nums{
        position: relative;
        font-size: 11px;
        color: #9a9a9a;
        margin: 5px 0;
        /*margin-top: 5px;*/
        /*margin-bottom: 7px;*/
    }
    .list .price1{
        font-size: 14px;
        color: #e73131;
        margin-bottom: 9px;
    }
    .shopCart{
        position: absolute;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background-image: url('https://pic.repaiapp.com/static/png/20180410/15/1523343896096155199.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        right: 10px;
        bottom: 10px;
    }
</style>
