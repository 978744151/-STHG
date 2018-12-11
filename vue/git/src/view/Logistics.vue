<template>
	<div class="Logistics">
		<div class="head" v-if="!data.is_self">
			<img :src="data.express_img">
			<div class="middle" >
				<span>{{data.status}}</span>
				<p >{{data.expresscom}}:{{data.expresssn}}</p>
				<!-- <p>官方电话：<span style="color: #1a87f6">{{1234}}</span></p> -->
			</div>
			<!-- <div class="btn">复制</div> -->
            <button class="btn" data-clipboard-text="data.expresssn" @click="copy" v-if="!data.is_self">复制</button>  
		</div>	
        <iframe :src="url" frameborder="0" v-if="!data.is_self"></iframe>
        <div v-if="data.is_self" class="another-head">
            <img src="https://pic.repaiapp.com/static/png/20180523/14/1527055334394150101.png">
            <p>
                自提商品
                <span>{{data.self}}</span>
            </p>
        </div>
        <div class="another-content" v-if="data.is_self">
            <p class="new-cir"></p>
            <div>
                <span>{{data.self}}</span>
                <span style="margin-top: 5px;">{{data.time}}</span>
            </div>
        </div>
		<!-- <div style="font-size: 0;">
			<img src="https://pic.repaiapp.com/static/png/20180516/20/1526472580504715451.png" class="status-img">	
			<div class="item" v-for="item,index in data.list">
				<div class="item-status">
					<div class="new" v-if="index==0"></div>
					<div class="last-line" v-if="index==0"></div>
					<div class="cir" v-if="index!=0&&index!=len" :data-len="len"></div>
					<div class="line" v-if="index!=0&&index!=len"></div>
					<img src="https://pic.repaiapp.com/static/png/20180516/19/1526471009471310255.png" v-if="index==len">
					<div class="first-line" v-if="index==len"></div>
				</div>
				<p>
					<span>{{item.context}}</span>
					<span>{{item.time}}</span>
				</p>
			</div>
		</div> -->
	</div>
</template>

<script>
    import api from '../network/request'
    import Clipboard from 'clipboard'
    import { Toast } from 'vant'
    export default {
        name: "Logistics",
        components: {
        },

        data() {
            return {
            	data:'',
            	len:'',
                url:''
            }
        },
        methods: {
        	info:function(){
        		var _this=this;
				const params={access_token:localStorage.getItem('access_token'),orderid:localStorage.getItem('myorderid')};
				api.post('order/express',params,res=>{
				console.log(res);
					if(res.status==0){
						_this.data=res.data;
                        if(res.data.express='zhongtong'){
                            _this.url='http://dc.xiaodian.in/web/index.php?c=xiangtianxia&a=getexpress&nu='+res.data.expresssn
                        }else{
                            _this.url='http://dc.xiaodian.in/web/index.php?c=xiangtianxia&a=getexpress&type=1'
                        }
                        // _this.url='https://m.kuaidi100.com/result.jsp?nu='+res.data.expresssn
						// _this.len=(res.data.list.length)-1
					}
					if(res.status==600){
					    this.$router.push({name: 'login', params: {}})
					}
				})
        	},
            copy:function(){
                var clipboard = new Clipboard('.btn')
                clipboard.on('success', e => {  
                    Toast.success("复制成功")
                    console.log('复制成功')  
                    // 释放内存  
                    clipboard.destroy()  
                })  
                clipboard.on('error', e => {  
                    // 不支持复制  
                    console.log('该浏览器不支持自动复制')  
                    // 释放内存  
                    clipboard.destroy()  
                }) 
            }
           
        },
        created() {
        	this.info();

        }
    }
</script>


<style scoped>
    iframe{
        position: relative;
        top: 0;
        width: 100%;
        margin: 0;
        padding: 0;
        height: 690px;

    }
    .another-content{
        position: relative;
        background-color: #fff;
        padding: 13px;
        margin-top: 9px;
        font-size: 14px;
        color: #22AF63;
        display: flex;
    }
    .another-content div{
        position: relative;
        flex:1;
        display: flex;
        flex-flow: column;
    }
    .new-cir{
        position: relative;
        width: 4px;
        height: 4px;
        background-color:#ACACAC;
        border-radius: 50%;
        top: 7px;
        margin-right: 5px;
    }
    .another-head{
        position: relative;;
        width: 100%;
        box-sizing: border-box;
        height: 82px;
        padding: 0 18px;
        font-size: 15px;
        color: #333333;
        display: flex;
        align-items: center;
        background-color: #fff;
        /*justify-content: space-between;*/
    }
    .another-head img{
        width: 59px;
        height: 59px;
        margin-right: 15px;
    }
    .another-head p{
        position: relative;
        display: flex;
        flex-flow: column;
    }
    .another-head p span{
        font-size: 14px;
        color: #666666;
    }
	.head{
		position: fixed;
		width: 100%;
		/*height: 82px;*/
        height: 60px;
		margin: 11px 0;
		background-color: #fff;
		display: flex;
		align-items: center;
		padding: 0 18px;
		font-size: 14px;
		color: #333333;
        margin-top: 0;
        top: 0;
        left: 0;
        z-index: 2;
        box-sizing: border-box;
	}
	.head img{
		width: 59px;
		height: 59px;
		margin-right: 14px;
	}
	.middle{
		position: relative;
		display: flex;
		/*align-items: center;*/
		justify-content: center;
		flex-flow: column;
		flex:1;
	}
	.middle span{
		color: #DA3030;
		font-size: 16px;
	}
    .btn{
    	position: relative;
    	width: 45px;
    	height: 21px;
    	border: 1px #1A87F6 solid;
    	color: #1A87F6;
    	font-size: 13px;
    	border-radius: 2px;
    	display: flex;
    	align-items: center;
    	justify-content: center;
        background-color: #fff;
    }
    .status-img{
    	position: relative;
    	width: 100%;
    	height: 70px;
    	font-size: 0;
    }
    .item{
    	position: relative;
    	width: 100%;
    	/*padding: */
    	/*height: 76px;*/
    	background-color: #fff;
    	/*padding-left: 51px;*/
    	box-sizing: border-box;
    	display: flex;
    }
    .item-status{
    	width: 51px;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	position: relative;
    }
    .item-status img{
    	width: 26px;
    	height: 21px;
    	position: relative;
    	z-index: 2;
    	background-color: #fff;
    }
    .item p{
    	position: relative;
    	width: 100%;
    	padding: 16px 0;
    	/*height: 100%;*/
    	display: flex;
    	justify-content: center;
    	border-bottom: 1px ##E3E3E3 solid;
    	font-size: 14px;
    	color: #949393;
    	flex-flow: column;
    	line-height: 2;
    	flex:1;
    	border-bottom: 1px #E3E3E3 solid;
    }
    .cir{
    	width: 14px;
    	height: 14px;
    	background-color: #CECECE;
    	border-radius: 50%;
    	position: relative;
    	z-index: 2;
    }
    .new{
    	width: 20px;
    	height: 20px;
    	background-image: url('https://pic.repaiapp.com/static/png/20180516/19/1526471258670279999.png');
    	background-size: 100% 100%;
    	background-repeat: no-repeat;
    	position: relative;
    	z-index: 2;
    	background-color: #fff;

    }
    .line{
    	position: absolute;
    	width: 1px;
    	height: 100%;
    	background-color: #E3E3E3;
    	left: 50%;
    	transform: translateX(-50%);
    }
    .first-line{
    	position: absolute;
    	width: 1px;
    	height: 50%;
    	background-color: #E3E3E3;
    	left: 50%;
    	transform: translateX(-50%);
    	top: 0;
    }
    .last-line{
    	position: absolute;
    	width: 1px;
    	height: 50%;
    	background-color: #22AF63;
    	left: 50%;
    	transform: translateX(-50%);
    	bottom: 0;

    }
</style>
