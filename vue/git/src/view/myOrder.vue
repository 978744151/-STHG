<template>
   <div class="myOrder">

       <div class="tabs">
           <div v-for="(item,index) in head">
               <p :class="sel==index?'active':''" @click="toggleTab(index,'myOrder'+index)">{{item.title}}</p>
           </div>
       </div>
       <div style="height: 10px"></div>
       <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
       <prince :is="currentTab" keep-alive></prince>
       </van-pull-refresh> 
   </div>
</template>

<script>
    import myOrder0 from './myOrder0'
    import myOrder1 from './myOrder1'
    import myOrder2 from './myOrder2'
    import myOrder3 from './myOrder3'
    import myOrder4 from './myOrder4'
    import api from '../network/request'
    import { PullRefresh } from 'vant'
    export default {
        name: "myOrder",
        components: {
           myOrder0,
           myOrder1,
           myOrder2,
           myOrder3,
           myOrder4,
        },

        data() {
            return {
                currentTab: 'myOrder0',
                head:[{
                    title:'全部'
                },{
                    title:'待付款'
                },{
                    title:'待发货'
                },{
                    title:'待收货'
                },{
                    title:'待评论'
                }],
                sel:0,
                page:0,
                data:'',
                isLoading: false
            }
        },
        methods: {
            onRefresh:function(){
                setTimeout(() => {
                this.onRefresh();
                this.isLoading = false;
              }, 500);
            },
            toggleTab:function(index,tab){
                var _this=this;
                _this.sel=index;
                localStorage.setItem('changeid',index)
                _this.currentTab=tab;
                // this.list();
            },
        },
        created() {
            var _this=this;
            // var id=this.$route.params.id;
            var id=localStorage.getItem('changeid')
            if(id==0){return}
            _this.currentTab='myOrder'+id;
            _this.sel=id;
            // this.$shareUrl.shareUrl("");

            // this.list();
        }
    }
</script>

<style scoped>
    .tabs{
        position: fixed;
        background-color: #fff;
        height: 40px;
        display: flex;
        font-size: 14px;
        color: #333333;
        width:100%;
        top: 0;
        left: 0;
        z-index: 1;
    }
    .tabs div{
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .tabs div p{
        height: 100%;
        line-height: 40px;
       
    }
    .tabs div p.active{
        color: #ef4242;
        border-bottom: 1px #ef4242 solid;
    }
    .content{
        position: relative;
        margin-top: 5px;
    }
    .item{
        position: relative;
        background-color: #fff;
        margin-bottom: 10px
    }
    .itemTitle{
        position: relative;
        border-bottom: 1px solid #dddddd;
        height: 44px;
        display: flex;
        align-items: center;
        padding-left: 13px;
        box-sizing: border-box;
        font-size: 14px;
        color: #333333;
    }
    .itemCon{
        position: relative;
        padding: 13px;
        border-bottom: 1px solid #dddddd;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .shopImg{
        position: relative;
        display: flex;
        align-items: center;
        /*font-size: 0;*/

    }
    .shopImg p{
        font-size: 14px;
        color: #343032
    }
    .shopImg span{
        color: #999999;
        font-size: 15px;
    }
    .shopImg img{
        width: 68px;
        height: 68px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-right: 5px;
    }
    .shopImg img:nth-of-type(3){
        margin: 0;
    }
    .shopInfo{
        position: relative;
        display: flex;
        flex-flow: column;
        font-size: 14px;
        color: #343032;
    }
    .shopInfo span{
        color: #ef4242;
        font-size: 12px;
        margin-top: 5px;
    }
    .shopInfo span.hasfh{
        color: #999999;
    }
    .shopInfo span.success{
        color: #5eb054
    }
    .itemStatus{
        position: relative;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 13px;
    }
    .price{
        font-size: 14px;
        color: #333333
    }
    .status{
        position: relative;
        display: flex;
        font-size: 14px;
    }
    .gray{
        background-color: #fff;
        border: 1px solid #dddddd;
        color: #333333;
        width: 74px;
        height: 30px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .red{
        background-color: #ef4242;
        border: 1px solid #ef4242;
        color: #fff;
        margin-left: 10px;
        width: 74px;
        height: 30px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .bottom{
        border-bottom: 1px #ddd solid;
    }
</style>
