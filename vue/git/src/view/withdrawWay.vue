<template>
   <div class="withdrawWay">
        <div class="item" v-for="(item,index) in head" @click="changeWay(index)">
            <div :class="sel==index?'check checked':'check'"></div>
            <img :src="item.img" :class="index==0?'img1':'img2'">
            <span>{{item.title}}</span>
        </div>  
        <div class="withdrawBtn" @click="next()">下一步</div>  
   </div>
</template>

<script>
    export default {
        name: "withdrawWay",
        components: {
        },

        data() {
            return {
                sel:0,
                head:[{
                    img:'https://pic.repaiapp.com/static/png/20180413/17/1523611024791415357.png',title:'支付宝'
                },{
                    img:'https://pic.repaiapp.com/static/png/20180413/17/1523611163321975599.png',title:'银行卡'
                }]
            }
        },
        methods: {
            //选择提现方式
            changeWay:function(index){
                var _this=this;
                _this.sel=index;
            },
            //下一步
            next:function(){
                var _this=this;
                if(_this.sel==0){
                    this.$router.replace({name: 'alipay', params: {}})
                }else{
                    this.$router.replace({name: 'bankCard', params: {}})
                }
                // console.log(_this.sel)
            }
           
        },
        created() {
        }
    }
</script>

<style scoped>
    .item{
        position: relative;
        background-color: #fff;
        padding: 0 15px;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        height: 65px;
        font-size: 15px;
        color: #000;
    }
    .check{
        position: relative;
        width: 20px;
        height: 20px;
        background-image: url('https://pic.repaiapp.com/static/png/20180413/17/1523610836674475555.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 50%;
        margin-right: 20px;
    }
    .checked{
        background-image: url('https://pic.repaiapp.com/static/png/20180413/17/1523611349718859899.png');
    }
    .img1{
        position: relative;
        width: 22.5px;
        height: 22.5px;
        margin-right: 18px;
    }
    .img2{
        position: relative;
        width: 29px;
        height: 20px;
        margin-right: 11.5px;
    }
    .withdrawBtn{
        position: relative;
        width: 95%;
        height: 40px;
        background-color: #dd3232;
        border-radius: 2.5px;
        margin: 0 auto;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        margin-top: 30px;
    }
</style>
