<template>
   <div class="share">
        <div class="content">
            <div class="headImg">
                <img :src="avatar">
            </div>
            <p>{{nickname}}</p>
            <img :src="qcode" class="scode">   
            <div class="join">
                <div>长按识别二维码 加入我们</div>
            </div> 
        </div>
        <div class="footer">
            <!-- <div>
                <img src="https://pic.repaiapp.com/static/png/20180413/10/1523585568515615051.png" class="img1">
                <p>微信快照</p>
            </div>
            <div>
                <img src="https://pic.repaiapp.com/static/png/20180413/10/1523585700569895753.png" class="img1">
                <p>朋友圈快照</p>
            </div> -->
            <div @click="share()">
                <img src="https://pic.repaiapp.com/static/png/20180413/10/1523585732130810253.png" class="img2">
                <p>微信</p>
            </div>
            <div @click="share()">
                <img src="https://pic.repaiapp.com/static/png/20180413/10/1523585834748804849.png" class="img3">
                <p>朋友圈</p>
            </div>
        </div>
        <div class="share-mask" v-if="showShare" @click="share()"></div>
        <div class="share-logo" v-if="showShare" @click="share()"></div>
   </div>
</template>

<script>
    import api from '../network/request'
    import { Toast } from 'vant'
    import wxapi from '../common/wxapi.js'
    export default {
        name: "share",
        components: {
        },

        data() {
            return {
                qcode:'',
                avatar:'',
                nickname:'',
                showShare:false,
            }
        },
        methods: {
            share:function(){
                this.showShare=!this.showShare
            },
            shares:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('commission/get_invite_code',params,res=>{
                console.log(res);
                    wxapi.wxRegister(_this.wxRegCallback)
                    if(res.status==0){
                        _this.qcode=res.data.qcode
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                    if(res.status!=0){
                        Toast.fail(res.msg)
                    }
                })
            },
            wxRegCallback () {
                //分享给朋友
                this.onMenuShareAppMessage();
                //分发到朋友圈
                this.ShareTimeline();
            },
            onMenuShareAppMessage () {
                // console.log(this.shareImg,"11111111")
                let opstion = {
                    title: '你的好友推荐了手提火锅', // 分享标题
                    desc:'',
                    link: this.url,
                    imgUrl: 'https://pic.repaiapp.com/static/png/20180417/16/1523952477820325556.png',// 分享图标
                    success: function () {
                        // Toast.('分享成功')
                    },
                    error: function () {
                        // Toast.('分享失败')
                    }
                }
                // 将配置注入通用方法
                wxapi.onMenuShareAppMessage(opstion)
            },
            ShareTimeline:function(){
                let opstion = {
                    title: '你的好友推荐了手提火锅', // 分享标题
                    link: this.url,
                    imgUrl: 'https://pic.repaiapp.com/static/png/20180417/16/1523952477820325556.png',// 分享图标
                    success: function () {
                        // Toast.('分享成功')
                    },
                    error: function () {
                        // Toast.('分享失败')
                    }
                }
                // 将配置注入通用方法
                wxapi.ShareTimeline(opstion)
            }               
           
        },
        created() {
            this.shares();
            this.avatar=localStorage.getItem('avatar');
            this.nickname=localStorage.getItem('nickname');

        }
    }
</script>

<style scoped>
    .share-logo{
        position: fixed;
        width: 240px;
        height: 221.5px;
        background-image: url('https://pic.repaiapp.com/static/png/20180515/10/1526352996486285299.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        z-index: 1005;
        top: -38px;
        right: -15px;
    }
    .share-mask{
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.8);
        top: 0;
        left: 0;
        z-index: 1005;
    }
	.share{
		position: fixed;
		height: 100%;
		width: 100%;
		background-image: url('https://pic.repaiapp.com/static/png/20180412/16/1523523345609394956.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
    .content{
        background-color: #fff;
        width: 325px;
        height: 370px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        top: 80px;
        border-radius: 5px;
        display: flex;
        /*justify-content: center;*/
        flex-flow: column;
        align-items: center;
    }
    .headImg{
        position: relative;
        width: 74px;
        height: 74px;
        top: -37px;
    }
    .headImg img{
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.1);
        border-radius: 50%;
    }
    .content p{
        font-size: 16px;
        color: #333333;
        top: -25px;
        position: relative;
    }
    .scode{
        position: relative;
        width: 225px;
        height: 225px;
        top:-15px;
        margin-bottom: 10px;
    }
    .join{
        font-size: 12px;
        color: #999;
        width: 225px;
        height: 1px;
        background-color: #cccccc;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .join div{
        background-color: #fff;
        width: 80%;
        text-align: center; 
    }
    .footer{
        display: flex;
        position: fixed;
        bottom: 30px;
        left: 0;
        width: 100%;
        box-sizing: border-box;
    }
    .footer div{
        width: 50%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        font-size: 14px;
        color: #ffffff;
        align-items: center;  
    }
    .footer div img{
        margin-bottom: 10px;
    }
    .img1{
        position: relative;
        width:30.5px;
        height: 27.5px; 
    }
    .img2{
        position: relative;
        width: 28.5px;
        height: 23.5px;
    }
    .img3{
        position: relative;
        width: 28px;
        height: 28px;
    }
</style>
