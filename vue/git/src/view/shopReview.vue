<template>
    <div class="review">
        <!-- <div class="head">
            <div class="backBtn"></div>
            <div class="title">评价</div>
            <div class="status"></div>
        </div> -->
        <div class="content">
            <div class="starContent">
                <p>对餐厅的评价是?</p>
                <star :size="48" :score="score" :showTip="true" @select="starSelect"></star>
            </div>
            <div class="inputContent">
                <textarea type="text" placeholder="请输入您对菜品或餐厅的评价（写够15字才是好同志）"  rows="3" ref="input1"></textarea>
                <upload class="upload" size="big" @imgs="imgs" @delItem="delItem"></upload>
                <!-- <upload class="upload" size="big" :imgArr="picArr" @delItem="delItem" :onlyRead=false></upload> -->
            </div>
            <div class="btn" @click="comfirm()">发表评价</div>
        </div>
        <div class="sj-hint"></div>    
    </div>
</template>

<script>
    import star from 'components/star/star';
    import upload from 'components/upload/upload';
    import api from '../network/request'
    export default {
        name: "review",
        data(){
            return {
                imgss:'',
                "score":0,
                "picArr":[
                        "https://pic.repaiapp.com/static/png/20180417/11/1523935740194810257.png",
                        "https://pic.repaiapp.com/static/png/20180417/11/1523935740194810257.png"
                ]
            }
        },
        methods: {
            delItem(index) {
                this.picArr.splice(index,1)
            },
            imgs:function(e){
                console.log(e);
                this.imgs=e;
                this.imgss=e;
            },
            starSelect(index){
                this.score = index;
                console.log(index)
            },
            
            comfirm:function(){
                var _this=this;
                var orderid=localStorage.getItem("orderid");
                var content=this.$refs.input1.value;
                var level=this.score;
                if(this.imgs.length>0&&this.imgss!=''){
                    var images=_this.imgs.join(',')
                }else{
                    var images=_this.imgss;
                }
                if(level==0){
                    $(".sj-hint").html("请选择评分").fadeIn().delay(1500).fadeOut();
                    return;
                }
                // console.log(images);
                // return;
                const params={access_token:localStorage.getItem("access_token"),storeid:orderid,level:level,content:content,images:images};
                api.post('user/store_com',params,res=>{
                console.log(res);
                    if(res.status==0){
                        this.$router.go(-1);

                        // $(".sj-hint").html("评论成功").fadeIn().delay(1500).fadeOut();
                        // setTimeout("goback1()",1000 );
                        // this.$router.push({name: 'login', params: {}})
                        // setTimeout("goback()",1000);
                       // this.$router.go(-1);
                    }
                    if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                    }
                })
            },
            goback1:function(){
                 this.$router.go(-1);
            },
        },
        created() {

        },
        components:{
            star,
            upload
        }
    }
</script>

<style scoped lang="scss">
    .review{
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:#fff;
        .head{
            height: 45px;
            line-height: 45px;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #000000;
            border-bottom: 1px #dadada solid;
            .backBtn{
                flex-basis: 45px;
                box-sizing: border-box;
                width: 10px;
                height: 16px;
            }
            .title{
                flex: 1;
                text-align: center;
            }
            .status{
                flex-basis: 45px;
                color: #dd3232;
                font-size: 15px;
            }
        }
        .content{
            background:#fff;
            height:100%;
            .starContent{
                text-align:center;
                padding:20px;
                border-bottom:1px solid #e2e2e2;
                p{
                    margin-bottom: 20px;
                    font-size: 14px;
                    color:#a6a5a5
                }
            }
            .inputContent{
                border-bottom:1px solid #e2e2e2;
                textarea{
                    overflow: hidden;
                    width: 92%;
                    margin:4%;
                    border:0;
                    resize:none;
                    outline:none;
                    font-size: 14px;
                }
                .upload {
                    margin-left: 20px;
                    padding-bottom: 20px;
                }
            }
            .btn{
                width: 90%;
                height: 44px;
                margin:20px auto;
                border-radius: 3px;
                line-height: 44px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                background: #f70404;

            }
        }
    }
</style>
