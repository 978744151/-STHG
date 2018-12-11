<template>
  <div class="reviewDetail">
  	<div class="pjItem">
	    <div class="itemInfo">
	        <div class="InfoLeft">
	            <p>
	                <img :src="details.headimgurl">
	                <span>{{details.nickname}}</span>
	            </p>
	            <span class="time">{{details.createtime}}</span>
	        </div>
	        <div class="star">
	            <div class="starBg"></div>
	            <div class="starLight" :style="'width:'+details.level*20+'%'" :data-level='details.level'>
	                <img src="https://pic.repaiapp.com/static/png/20180411/16/1523435822461174856.png">
	            </div>
	        </div>
	    </div>
	    <div class="itemCon">{{details.content}}</div>
	    <div class="imgAll" >
            <img :src="j" v-for="j,index in details.images" v-preview="j" preview-title-enable="true" preview-nav-enable="true">
	        <!-- <img :src="j" v-for="j in details.images"> -->
	    </div>
	</div>
  </div>
</template>

<script>
    import api from '../network/request'
    export default {
        name: "reviewDetail",
        components: {
        },

        data() {
            return {
              show:false,
              details:''
            }
        },
        methods: {
        	detail:function(){
        		var _this=this;
        		var orderid=localStorage.getItem('myorderid');
                var goodsid=this.$route.params.goodsid;
                const params={access_token:localStorage.getItem('access_token'),orderid:orderid,goodsid:goodsid};
                api.post('user/goods_com',params,res=>{
                console.log(res);
                    if(res.status==0){
                        _this.details=res.data;
                        // if(res.data.images!=''){
                        //     var imgs=res.data.images.split(',')
                        // }
                        // console.log(imgs)
                    	// _this.status=res.data;
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                }) 
        	}
           
        },
        created() {
        	this.detail()

        }
    }
</script>
<style scoped>
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
