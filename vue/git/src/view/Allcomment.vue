<template>
   <div class="Allcomment">
      <div class="head">
      	<p v-for="(item,index) in head" :class="sel==index?'active':''" @click="changeHead(index,item.type)">{{item.name}}{{item.count}}</p>
      </div> 
      <van-list v-model="loading" :finished="finished" @load="onLoad" >
          <div class="commentCon" v-if="orderlits!=''">
            <div class="pjItem" v-for="(item,index) in orderlits">
                <div class="itemInfo">
                    <div class="InfoLeft">
                        <p>
                            <img :src="item.headimgurl">
                            <span>{{item.nickname}}</span>
                        </p>
                        <span class="time">{{item.createtime}}</span>
                    </div>
                    <div class="star">
                        <div class="starBg"></div>
                        <div class="starLight" :style="'width:'+item.level*20+'%'">
                            <img src="https://pic.repaiapp.com/static/png/20180411/16/1523435822461174856.png">
                        </div>
                    </div>
                </div>
                <div class="itemCon">{{item.content}}</div>
                <div  class="imgAll" v-if="item.images!=''">
                    <img :src="j" v-for="j in item.images" v-preview="j" preview-title-enable="true" preview-nav-enable="true">
                </div>
                <!-- <div class="hf" v-if="item.reply_content!=''">
                    [官网回复]:{{item.reply_content}}
                </div> -->
            </div>
          </div>
         
      </van-list>
        <div class="empty" v-if="orderlits.length==0&&emptyStatus">
            <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
            <span>暂无评论～</span>
        </div>
   </div>
</template>

<script>
    import api from '../network/request'
    import { Toast } from 'vant'
    import { List } from 'vant';
    export default {
        name: "Allcomment",
        components: {
            
        },

        data() {
            return {
                sel:0,
                head:[],
                type:'',
                page:0,
                orderlits:[],
                sw:false,
                loading: false,
                finished: false,
                emptyStatus:false,

            }
        },
        methods: {
            changeHead:function(index,type){
                // alert(type);
                var _this=this;
                _this.sel=index;
                _this.type=type;
                this.page=0;
                this.orderlits=[];
                this.finished=false;
                this.emptyStatus=false;
                this.sw=false;
                _this.onLoad();
            },
            title:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token'),goods_id:this.$route.query.id};
                api.post('shop/comment_type',params,res=>{
                console.log(res);
                    if(res.status==0){
                        _this.head=res.data;
                        _this.type=res.data[0].type;
                        // _this.shop();
                    }
                    if(res.status==600){
                        // this.$router.push({name: 'login', params: {}})
                    }
                }) 
            },
             onLoad() {
                setTimeout(() => {
                    this.shop();
                    this.loading = false;
                    this.page=this.page+1;
                    if (this.sw) {
                      this.finished = true;
                    }
                  }, 500);
            },
            shop:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token'),page:this.page,type:this.type,goods_id:this.$route.query.id};
                api.post('shop/goods_comment',params,res=>{
                console.log(res);
                    if(res.status==0){
                       if(res.data.length==0){
                        _this.sw=true;
                        _this.emptyStatus=true;
                      }else{
                        _this.orderlits=_this.orderlits.concat(res.data);
                      }
                    }
                    if(res.status==600){
                        // this.$router.push({name: 'login', params: {}})
                    }
                })
            },
           
        },
        created() {
            this.title(function(){

            });
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
	.head{
		position: relative;
		background-color: #fff;
		padding: 18px 13px;
		display:flex;
		flex-wrap: wrap;
		padding-right: 0;
		padding-bottom: 0;
	}
	.head p{
		width: 65px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		background: linear-gradient(to right, #ecd9d9, #ecd9d9); 
		color: #333333;
		border-radius: 5px;
		margin-right: 7px;
		margin-bottom: 13px;
	}
	.head p.active{
		background: linear-gradient(to right, #e03a3a, #c01d1d); 
		color: #fff;
	}
	.commentCon{
		position: relative;
		background-color: #fff;
		margin-top: 10px;
	}
	.pjItem{
    	position: relative;
    	padding: 13px;
    	background-color: #fff;
    	border-bottom: 1px #dddddd solid;
    	display: flex;
    	box-sizing: border-box;
    	flex-flow: column;
    }
    .itemInfo{
    	position: relative;
    	display: flex;
    	align-items: center;
    	justify-content: space-between;
    	width: 100%;
    	box-sizing: border-box;
    }
    .InfoLeft{
    	position: relative;
    	display: flex;
    	flex-flow: column;
    	font-size: 14px;
    	color: #0d0d0e;
    }
    .InfoLeft img{
    	width: 24px;
    	height: 24px;
    	margin-right: 10px;
    }
    .time{
    	font-size: 12px;
    	color: #999999;
    	margin-top: 8px;
    }
    .InfoLeft p{
    	display: flex;
    	align-items: center;
    }
    .star{
    	position: relative;
    	font-size: 0;
    }
    .starBg{
    	position: relative;
    	width: 65px;
    	height: 10px;
    	background-image: url('https://pic.repaiapp.com/static/png/20180411/16/1523435726983605151.png');
    	background-size: 100% 100%;
    	background-repeat: no-repeat;
    }
    .starLight{
    	position: absolute;
		overflow:hidden;
		height:10px;
		width: 100%;
    	top:0;
    	left: 0;
    }
    .starLight img{
    	width: 65px;
    	height: 10px;
    }
    .itemCon{
    	position: relative;
    	font-size: 15px;
    	color: #333333;
    	padding: 10px 0;
    }
    .imgAll{
    	position: relative;
    	display: flex;
    	flex-wrap: wrap;
    	/*justify-content: space-between;*/
    }
    .imgAll img{
    	width: 105px;
    	height: 105px;
    	margin-right: 10px;
    	margin-bottom: 10px;
    }
</style>
