    
<template>
   <div class="coupon">
        <div class="head">
            <div>
                <p :class="sel==0?'active':''" @click="changeHead(0)">可使用({{ylength}})</p>
            </div>
            <div>
                <p :class="sel==1?'active':''" @click="changeHead(1)">不可用({{nlength}})</p>
            </div>
            <!-- <div v-for="(item,index) in head">
                <p :class="sel==index?'active':''" @click="changeHead(index)">{{item.title}}</p>
            </div> -->
        </div>
        <div style="height: 40px;"></div>
        <div class="content" v-if="sel==0">
            <div class="item" v-for="item,index in couponArr.y" v-if="couponArr.y!=''" @click="chooseCoupon(index,item.id,item.deduct)">
                <div class="left">
                    <p>¥<span class="price">{{item.deduct}}</span></p>
                    <span class="full">满{{item.enough}}元可用</span>
                </div>
                <div class="right">
                    <div class="rightCon">
                        <p>
                            <span>{{item.couponname}}</span>
                            <!-- <span>全场商品通用</span>   -->
                            <span>{{item.display_title}}</span>
                            <span>{{item.start_time}}至{{item.end_time}}</span>    
                        </p>
                    </div>
                </div>

                <!-- <div class="usebtn"></div> -->
                <div :class="coupon_sel==index?'usebtn':'usebtn no'"></div>
            </div>
            <div style="height: 54px;"></div>
            <div class="bottomstyle"></div>
            <div class="comfirmBtn" @click="comfirmBtn">确定</div>

            <div class="empty" v-if="couponArr.y==''">
                <div class="emptyCon">
                    <div class="emptyImg"></div>
                    <p class="emptyWord">暂无优惠券~</p>
                </div>
            </div>
 
        </div>
        <div class="content" v-if="sel==1">
            <div class="item" v-for="item in couponArr.n" v-if="couponArr.n!=''">
                <div class="left">
                    <p>¥<span class="price">{{item.deduct}}</span></p>
                    <span class="full">满{{item.enough}}元可用</span>
                </div>
                <div class="right">
                    <div class="rightCon">
                        <p>
                            <span>{{item.couponname}}</span>
                            <span>{{item.display_title}}</span>
                            <!-- <span>全场商品通用</span>   -->
                            <span>{{item.start_time}}至{{item.end_time}}</span>    
                        </p>
                    </div>
                </div>

            </div>

            <div class="empty" v-if="couponArr.n==''">
                <div class="emptyCon">
                    <div class="emptyImg"></div>
                    <p class="emptyWord">暂无优惠券~</p>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
    import { Toast } from 'vant'
    import api from '../network/request'
    import { Dialog } from 'vant';
    export default {
        name: "coupon",
        components: {
        },

        data() {
            return {
                // head:[{title:'线上优惠券(3)'},{title:'线下优惠券(3)'}],
                coupon_sel:-1,
                sel:0,
                couponArr:'',
                ylength:'',
                nlength:'',
                couponId:'',
                couponMoney:''
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
                const params={access_token:localStorage.getItem('access_token'),money:this.$route.params.Allprice+this.$route.params.express,goods_ids:this.$route.params.ids};
                api.post('order/coupon_lists',params,res=>{
                  if(res.status==0){
                     console.log(res);
                     _this.couponArr=res.data;
                     for(var i in _this.couponArr.y){
                        if(localStorage.getItem("couponId")==_this.couponArr.y[i].id){
                            _this.coupon_sel=i;
                            break;
                        }
                     }
                     _this.ylength=res.data.y.length;
                     _this.nlength=res.data.n.length;

                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
            },
            chooseCoupon:function(index,id,money){
            	if(this.coupon_sel==index){
            		this.coupon_sel=-1;
            		this.couponId='';
            		this.couponMoney='';
            	}else{
            		this.coupon_sel=index;
            		this.couponId=id;
            		this.couponMoney=money;
            	}
            	
            	// if()
            },
            //选中优惠券
            comfirmBtn:function(){
            	console.log(this.couponId);
            	console.log(this.couponMoney);
            	if(this.couponId==''){
            		Dialog.confirm({
					  title: '提示',
					  message: '暂未选择优惠券，是否返回？'
					}).then(() => {
					  // on confirm
                        localStorage.setItem('couponId','');
                        localStorage.setItem('couponMoney','');
                        this.$router.go(-1);
					}).catch(() => {
					});
            	}else{
            		 // _this.$emit('couponId',this.couponId);
            		localStorage.setItem('couponId',this.couponId);
            		localStorage.setItem('couponMoney',this.couponMoney);
					this.$router.go(-1);
					// 	this.$router.push({name: 'orderCheck', params: {couponId:this.couponId,couponMoney:this.couponMoney}})  
            	}

            }
           
        },
        created() {
            this.coupons();
            // Toast.
        }
    }
</script>

<style scoped>
	.bottomstyle{
		position: fixed;
		height: 54px;
		background-color: #f3f3f3;
		bottom: 0;
		width: 100%;
		left: 0;
	}
	.comfirmBtn{
		position: fixed;
		width: 351px;
		height: 44px;
		border-radius: 3px;
		background: linear-gradient(to right, #E03A3A, #C01D1D); 
		left: 50%;
		transform: translateX(-50%);
		bottom: 10px;
		font-size: 18px;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.usebtn{
		position: absolute;
		width: 18px;
		height: 18px;
		background-image: url('https://pic.repaiapp.com/static/png/20180509/17/1525859530935129854.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
	}
	.no{
		background-image: url('https://pic.repaiapp.com/static/png/20180510/09/1525915621377289850.png');
	}
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
        z-index: 1;
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
        /*background-color: #fff;*/
        background-image: url('https://pic.repaiapp.com/static/png/20180509/17/1525859204914357100.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin:0 auto;
        margin-bottom: 5px;
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
        color: #fff;
        flex-flow: column;
    }
    .price{
        position: relative;
        font-size: 34px;
    }
    .full{
        font-size: 12px;
        color: #fff;
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
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .rightCon p{
        display: flex;
        flex-flow: column;
        justify-content: center;
        position: relative;
        flex: 1;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        /*align-items: center;*/
    }
    .rightCon p span:nth-of-type(2){
        font-size: 12px;
        color: #4f4f4f;
        margin: 5px 0;
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
