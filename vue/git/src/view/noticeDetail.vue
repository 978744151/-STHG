<template>
   <div class="noticeDetail">
      <div class="gotoindex" @click="goto()"></div> 
      <div v-html="detail"></div>
   </div>
</template>

<script>
    import api from '../network/request'
    import wxapi from '../common/wxapi.js'
    export default {
        name: "noticeDetail",
        components: {
        },

        data() {
            return {
                detail:""
                
            }
        },
        methods: {
            info:function(){
                var _this=this;
                const params={id:this.$route.query.id};
                api.post('shop/notice_detail',params,res=>{
                  if(res.status==0){
                       console.log(res)
                       _this.detail=res.data.detail;
                       _this.$shareUrl.shareUrl("noticeDetail",res.data.id,res.data.title);
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
                
            },
            wxRegCallback () {
                var that=this;
                this.getUrl(function(cb){
                    //分享给朋友
                    that.onMenuShareAppMessage();
                    //分发到朋友圈
                    that.ShareTimeline();
                });
                
            },
            // 获取分享url
            getUrl:function(cb){
                // alert(window.location.hash);
                // return;
                const params={access_token:this.access_token};
                api.post('shop/share_goods',params,res=>{
                    console.log(res);
                    if(res.status==0){
                        this.shareUrl=res.data.url;
                        cb&&cb();
                    }
                    
                })
            },
            onMenuShareAppMessage () {
                let opstion = {
                    title: '', // 分享标题
                    desc:this.shareTitle,
                    link:this.shareUrl,
                    imgUrl: this.shareImg,// 分享图标
                    success: function () {
                    },
                    error: function () {
                    }
                }
                // 将配置注入通用方法
                wxapi.onMenuShareAppMessage(opstion)
            },
            ShareTimeline:function(){
                let opstion = {
                    title: '', // 分享标题
                    link: this.shareUrl,
                    imgUrl: this.shareImg,// 分享图标
                    success: function () {
                    },
                    error: function () {
                    }
                }
                // 将配置注入通用方法
                wxapi.ShareTimeline(opstion)
            }
           
        },
        created() {
            // wxapi.wxRegister(this.wxRegCallback)
            this.info();
        }
    }
</script>

<style scoped>
  .noticeDetail{
    /*position: fixed;*/
    width: 100%;
    height: 100%;
    background-color: #fff;
    font-size: 14px;
    padding: 10px;
  }
</style>
