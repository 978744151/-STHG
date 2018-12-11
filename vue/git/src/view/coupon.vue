<template>
   <div class="coupon">
        <div class="head">
            <div>
                <p :class="sel==0?'active':''" @click="changeHead(0)">线上优惠券({{couponArr.coupon_count}})</p>
            </div>
            <div>
                <p :class="sel==1?'active':''" @click="changeHead(1)">线下优惠券({{couponArr.checkstand_count}})</p>
            </div>
            <!-- <div v-for="(item,index) in head">
                <p :class="sel==index?'active':''" @click="changeHead(index)">{{item.title}}</p>
            </div> -->
        </div>
        <div style="height: 40px;"></div>
        <div class="content" v-if="sel==0">
            <div :class="item.used!=1&&item.status?'item':'item gray'" v-for="item in couponArr.coupon" v-if="couponArr.coupon!=''" @click="useconpon(item.status,item.used)">
                <div class="left">
                    <p>¥<span class="price">{{item.deduct}}</span></p>
                    <span class="full">满{{item.enough}}元可用</span>
                </div>
                <div class="right">
                    <div class="rightCon">
                        <p>
                            <span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{item.couponname}}</span>
                            <span>{{item.display_title}}</span>  
                            <span>{{item.start_time}}至{{item.end_time}}</span>    
                        </p>
                        <!-- @click="useCoupon()" -->
                        <div class="btn"  v-if="item.status&&item.used==0">立即使用</div>
                        <div class="use" v-if="item.used==1"></div>
                        <div class="guoqi" v-if="!item.status"></div>
                    </div>
                </div>
            </div>

            <div class="empty" v-if="couponArr.coupon==''">
                <div class="emptyCon">
                    <div class="emptyImg"></div>
                    <p class="emptyWord">暂无优惠券~</p>
                </div>
            </div>   
        </div>
        <div class="content" v-if="sel==1">
            <div :class="item.used!=1&&item.status?'item':'item gray'" v-for="item in couponArr.checkstand" v-if="couponArr.coupon!=''" @click="gotouse(item.sn,item.sn_img,item.couponname,item.deduct)">
                <div class="left">
                    <p>¥<span class="price">{{item.deduct}}</span></p>
                    <span class="full">满{{item.enough}}元可用</span>
                </div>
                <div class="right">
                    <div class="rightCon">
                        <p>
                            <span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{item.couponname}}</span>
                             <span>{{item.display_title}}</span>  
                            <span>{{item.start_time}}至{{item.end_time}}</span>    
                        </p>
                        <!-- @click="useCoupon()" -->
                        <div class="btn"  v-if="item.status&&item.used==0">立即使用</div>
                        <div class="use" v-if="item.used==1"></div>
                        <div class="guoqi" v-if="!item.status"></div>
                    </div>
                </div>
            </div>

            <div class="empty" v-if="couponArr.checkstand==''">
                <div class="emptyCon">
                    <div class="emptyImg"></div>
                    <p class="emptyWord">暂无优惠券~</p>
                </div>
            </div>   
        </div>
        <!-- <div class="empty" v-if="sel==1">
            <div class="emptyCon">
                <div class="emptyImg"></div>
                <p class="emptyWord">暂无优惠券~</p>
            </div>
        </div> -->
   </div>
</template>

<script>
    import { Toast } from 'vant'
    import api from '../network/request'
    export default {
        name: "coupon",
        components: {
        },

        data() {
            return {
                // head:[{title:'线上优惠券(3)'},{title:'线下优惠券(3)'}],
                sel:0,
                couponArr:''
            }
        },
        methods: {
            changeHead:function(index){
                var _this=this;
                _this.sel=index;
            },
            //使用优惠券
            useCoupon:function(){
                this.$router.push({name: 'useCoupon', params: {}})  
            },
            coupons:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('user/my_coupon',params,res=>{
                  if(res.status==0){
                     console.log(res);
                     Toast.clear();
                     _this.couponArr=res.data
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
            },
            useconpon:function(status,used){
                console.log(status,used)
                if(used==0&&status){
                     this.$router.push({name: 'index', params: {}})
                     return;
                }
                
            },
            gotouse:function(sn,sn_img,couponname,deduct){
                this.$router.push({name: 'useCoupon', params: {sn:sn,sn_img:sn_img,couponname:couponname,deduct:deduct}})

            }
           
        },
        created() {
            this.coupons();
            Toast.loading({ duration: 0,message: '加载中...'})
            // Toast.
        }
    }
</script>

<style scoped>
    .head{
        position: fixed;
        height: 40px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        box-sizing: border-box;
        left: 0;
        top: 0;
    }
    .head div{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333333;
    }
    .head div p{
        height: 100%;
        line-height: 40px;
    }
    .active {
        color: #c91616;
        border-bottom: 1px #c91616 solid;
    }
    .content{
        position: relative;
        padding-top: 15px;
    }
    .item{
        position: relative;
        width: 345px;
        height: 100px;
        background-image: url('https://pic.repaiapp.com/static/png/20180417/17/1523956627162995197.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin:0 auto;
        margin-bottom: 15px;
        display: flex;
    }
    .left{
        position: relative;
        width: 103px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        color: #383130;
        flex-flow: column;
    }
    .price{
        position: relative;
        font-size: 34px;
    }
    .full{
        font-size: 12px;
        color: #4f4f4f;
        /*margin-top: 11px;*/
    }
    .right{
        position: relative;
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .rightCon{
        width: 218px;
        height: 81px;
        display: flex;
        font-size: 16px;
        color: #383130;
        padding:0 15px;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
    }
    .rightCon p{
        display: flex;
        flex-flow: column;
        justify-content: center;
        position: relative;
        flex: 1;
        width: 65%;
        /*align-items: center;*/
    }
    .rightCon p span:nth-of-type(2){
        font-size: 12px;
        color: #4f4f4f;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .rightCon p span:nth-of-type(3){
        font-size: 10px;
        color: #4d4d4d
    }
    .gray{
        background-image: url('https://pic.repaiapp.com/static/png/20180417/17/1523956936935410157.png');
    }
    .btn{
        width: 63px;
        height: 24px;
        border: 1px #9b8049 solid;
        font-size: 12px;
        color: #9b8049;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center; 
    }
    .use{
        position: absolute;
        background-image: url('https://pic.repaiapp.com/static/png/20180417/17/1523958516448498100.png');
        width: 73px;
        height: 73px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        top: 50%;
        transform: translateY(-50%);
        right: 5px;
    }
    .guoqi{
        position: absolute;
        background-image: url('https://pic.repaiapp.com/static/png/20180417/17/1523958652357910253.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width:55px;
        height:50px;
        right: 0;
        top: 0;
    }
    .emptyCon{
        position: relative;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        padding-top: 100px;
    }
    .emptyImg{
        position: relative;
        width:107px ;
        height: 72px;
        background-image: url('https://pic.repaiapp.com/static/png/20180417/17/1523958919491995455.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-bottom: 20px;
    }
    .emptyWord{
        font-size: 14px;
        color: #999999;
        text-align: center;
    }
</style>
