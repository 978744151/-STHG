<template>
    <div class="review">
        <!-- <div class="head">
            <div class="backBtn"></div>
            <div class="title">评价</div>
            <div class="status"></div>
        </div> -->
        <div class="content">
            <div class="overview">
                <img :src="goodImg">
                <div>
                    <p class="title">商品评分</p>
                    <star class="star" :size="28" :score="score" position="left" @select="starSelect"></star>
                </div>
            </div>
            <textarea placeholder="你的评论能帮助其他小伙伴哦" rows="7" ref="input1" style="box-sizing: border-box;"></textarea>
            <upload class="upLoad" size="small" @imgs="imgs" @delItem="delItem"></upload>
            <div class="hideBtn"><span :class="{active:hideHandle}" @click="hideBtn">匿名评论</span></div>
            <div class="btn" @click="comfirm()">提交</div>
        </div>
        <div class="sj-hint"></div>    
    </div>
</template>

<script>
    import star from 'components/star/star';
    import upload from 'components/upload/upload';
    import api from '../network/request'
    import { Toast } from 'vant'
    export default {
        name: "favorite",
        data(){
            return {
                "goodImg":"https://pic.repaiapp.com/static/png/20180412/16/1523520607370764956.png",
                "score":5,
                "picArr":[
                    "https://pic.repaiapp.com/static/png/20180417/11/1523935740194810257.png",
                    "https://pic.repaiapp.com/static/jpg/20180413/11/1523589580121399101.jpg",
                    "https://pic.repaiapp.com/static/png/20180412/16/1523520607370764956.png"
                ],
                "hideHandle":true,
                imgss:''
            }
        },
        methods: {
            imgs:function(e){
                console.log(e);
                this.imgs=e;
                this.imgss=e;
            },
            starSelect(index){
                this.score = index;
                console.log(index)
            },
            delItem(index) {
                this.imgs.splice(index,1)
            },
            hideBtn() {
                if(this.hideHandle === true) {
                    this.hideHandle = false
                } else {
                    this.hideHandle = true
                }
            },
            //提交
            comfirm:function(){
                var _this=this;
                var orderid=localStorage.getItem('myorderid');
                var level=this.score;
                var content=this.$refs.input1.value;
                var goodsid=this.$route.params.goodsid;
                if(this.imgs.length>0&&this.imgss!=''){
                    var images=_this.imgs.join(',')
                }else{
                    var images=_this.imgss;
                }
                if(this.hideHandle){
                    var anonymous=1
                }else{
                    var anonymous=0;
                }

                if(level==0){
                    $(".sj-hint").html("请选择评分").fadeIn().delay(1500).fadeOut();
                    return;
                }
                const params={access_token:localStorage.getItem("access_token"),orderid:orderid,goodsid:goodsid,level:level,content:content,images:images,anonymous:anonymous};
                api.post('order/comment',params,res=>{
                console.log(res);
                    if(res.status==0){
                        Toast.success("评论成功")
                        // $(".sj-hint").html("评论成功").fadeIn().delay(1500).fadeOut();
                       this.goback();
                       // this.$router.go(-1);
                    }
                    if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                    }
                })
                
            },
            goback:function(){
                var _this=this;
                setTimeout(function(){
                    _this.$router.go(-1);
                 },800)
                // Toast.clear();
            },
        },
        created() {
            this.goodImg=this.$route.params.img

        },
        components:{
            star,
            upload
        }
    }
</script>

<style scoped lang="scss">
    .review{
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
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAfCAYAAADnTu3OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVEMTMzQjIxM0VDMjExRThBMTlCQUFGOTgzNkIzRDk4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVEMTMzQjIyM0VDMjExRThBMTlCQUFGOTgzNkIzRDk4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUQxMzNCMUYzRUMyMTFFOEExOUJBQUY5ODM2QjNEOTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUQxMzNCMjAzRUMyMTFFOEExOUJBQUY5ODM2QjNEOTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz591WfFAAABz0lEQVR42qSWSyjEURTG7xiJPGqGjUfSmAVFNsoGi5EyybAxWSplwV6WLCh2QsnCQkrNQh4xkpQlSUmyIathpeSRUh7f0Xfr+mfG/3999VucO/XNueeec2Z8oVBI/VNZ4JN8B/9RNlgG88CnD2yVCxKgyzgbtjUsBOsgYpzJlX02Vw6CfYfZpGQHPrxmWAr2QJ2R1SiYNovqVlXMrJrxOxgCi85XcqNampUxfgP9YPW3Z/9LjSAJShi/gl6wna6PMqkVbIEixo8gBg4zdXk6dYJdw+wetGUyy2TYB9ZAHuNb0AJO3MyhU4NgBeQwvgbN4NLtYJsaAQvAz/iCmd142RRaE2BKDzl0zEe587otxGCOTap1AHrAk80uExU4zpM2ZiJ/IBBQ7LUGUMPzdtbtzDZDmcs4r6pYhiXQbWuo51MMjnT2XKARW0PRMyfknLH04gZosjXUIxYFV8aDySKotzUUpWiaYlwMdkDY1lAxwygzFlWwncptDRVrKTV9YRymadDWUPHVY+wCxVrK9fNtDfUoxtmviq++aWwkz4aK7TOg/3KwPxPGZvoxem4lo/gAOhjLqFbyyzxnqDUDxo3f5VObn1GnxkCArTVrfvAlwACTDlZXtH61qQAAAABJRU5ErkJggg==") no-repeat;
                background-size: contain;
                background-position:10px;
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
         .content {
             background: #fff;
             .overview{
                 display: flex;
                 padding:15px;
                 img{
                     flex-basis: 75px;
                     width: 75px;
                     height: 75px;
                 }
                 div{
                     flex: 1;
                     margin-top:10px;
                     margin-left: 20px;
                     .title{
                         font-size: 16px;
                         color: #333;
                     }
                 }
             }
             textarea{
                 resize:none;
                 outline:none;
                 width: 100%;
                 padding: 10px;
                 border:0;
                 font-size: 14px;
                 background: #f6f6f6;
             }
             .upLoad{
                 padding: 10px 10px;
             }
             .hideBtn{
                 padding: 13px;
                 border-top: 1px solid #d3d3d3;
                 font-size: 14px;
                 color: #333;
                 span{
                     padding-left: 30px;
                     background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxQjU4ODFBM0VFRTExRThBNTdDQkRGQTkzQzEyOEZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkxQjU4ODFCM0VFRTExRThBNTdDQkRGQTkzQzEyOEZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTFCNTg4MTgzRUVFMTFFOEE1N0NCREZBOTNDMTI4RkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTFCNTg4MTkzRUVFMTFFOEE1N0NCREZBOTNDMTI4RkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5PyeKHAAACYElEQVR42ryWTYtSURzGj17Qhflyw5edEr4UrZScRWURLoQmahNMm6S+Rn2Amg/QBxiwTdNyeiEEF1M0Cx0QV5MpoTtf4Kq4MTR7Huc4i0qzq6cHHv56lf+Pc+695/9YptOpWKZcLmdBuQHfga/DEViXPxtwDf4Mv4E/ZrPZpQ0ti4AAWVEew088Hk8kFAoJv98v3G63sNvts/+MRiPR7/dFu90WjUZD9Ho9wp/DewD/WBkI2AWUVwBsJRKJGWgVEVwul0Wr1Sri6wNAv/0VCNgtTdNeJ5NJbywWE2ZUrVZFqVTqTiaT+4AeLgQClrHZbAfpdNrm8/nEOup0OqJQKHyH7gH64TcgYBexsmImk3F6vV6xCXW7XZHP54fj8TgJ6Bdes0qYxoJt3BiMYi/0PHeKmDFOgdAjPiBm79kyRaNREQgEtuQTL7RwOMz3bD+VSp13OBxChZxOp6jX65crlcoLrvCmruuRVR99M2JvMsgicDsYDArVkoxtAq+pXN1cuI8sVwmM8rhSLZfLxRIjUJ+fjSolGbpV/GcRaPDUVy3JMAj8yhGjWoPBYHauE3jEsaJaGFksRwS+bTabyoGS8Y7AQ8MwaipXyd5kMIJYZQbZ5aRWJdl7l7Fj/lrsYY9LnNSbVq1W4/07JuNsPIE8YUEsGHJobkrsVSwWh/j4UDLO5iGhJ8ggO4wFjAfrah4xMO132HtZiLqNqLHPSb1miBpyAYC9XyUmXkJ5iRP+SjweNxMTj+U2npgJwk8RhMMrBuE6Lj/75yD8B3AKvsvZCYd/ifp1GfUP4E+LQHP9FGAASZs2iAPYsbgAAAAASUVORK5CYII=") no-repeat;
                     background-size: 15px 15px;
                     background-position: 7px 50%;
                     &.active{
                          background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1M0Y2M0RBNDIyMzExRThCRUYxQkI4MTMzRjkyQkRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1M0Y2M0RCNDIyMzExRThCRUYxQkI4MTMzRjkyQkRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTUzRjYzRDg0MjIzMTFFOEJFRjFCQjgxMzNGOTJCREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTUzRjYzRDk0MjIzMTFFOEJFRjFCQjgxMzNGOTJCREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5gwofSAAAEB0lEQVR42sSYW0hUQRjH/7su67KZtqnrJW+tZXZTiETLLoKSRQY9REEiFF66aQWFiln4IiVIUhpmD72VkA899BAiPmRi9RBEBamIq26LZXnbLc1sd/vmNB5XW/fqrh/82DN75sz8z5yZb75vJO+2bYOLtp7IJvYQm4lYYjW/ZyQGiU9EJ9FKaF1pXOZkPT/iOFFM7CIkS9QL5uwgcgkL8YpoIJ4QJkcdSZ0Qk0V8JB4Tu+2IsWUS/sxj3kaWJ4IURBPRRiTCc0vkbTXxtl0SFEp0EEVYfivibYc6K4hVfEmkwHuWwvsIdSRISTwjNsH7ton3pbQn6A6RCt9ZKu/TpiC2AgrgeyuwXn1Sq9+7WDmr575OFHSCe92VskTueEVBF3zZ+6rkZGxsbkZ4cbH138VzW8d67k19YqqcHESWlUG2Zg3M09PWt9iWpGGCDrq4HbhlUqUSYQUFUBcWCmXDixfQVVYu3maymaB0b4uRR0djHY1K4P79QnmitRW6a9dgnplZXDWdCdrqTTEBqamIopHwj4sTymNPn+JzVRUsZrOt6luYoGhviQk+dgwRV67ALyBAKH9/9Aj6W7fsPRIrswqulm+++Psj/NIlhOblif99bWrCl4YGhwNqNx5ibxaUlQWJVOq0GIVGg7j6+gVihm/fdkaMGDEaeZT3n0VcvgzV0aOYbGvDcF0dZkdG7DYWlJmJyKtXIY+KEsoWmrT6mhqMtrQ4+z4/2KvrlnzbhARh+Jnv0DQ2ChPUZlgol0Odn4/Y2lpRjPnnT+hu3HBFDLMhv7Nq9T662G7rrrGrC0pKAuQREZAFB0OVnQ2LyYTp3l5YZmf/DfHatVhXXg71qVPipzUZDBiqqBBG1kVrZ4LC6OKwrbvsLQ0dHViVlAR5ZCQkMhlWp6VBER+PmYEBQUzMzZsIysgQn/kzOooh8jnGzk531sN9CaVBGrros+etmZuPpTkUsHPnfMfj4zQUJshCQsT/fg8PY5Dm0NT79+6IYRnKBjbG/USXvZp/JiYwQBPc+Pr1vEiVaoGYGa0W2vPn3RUDni71z63ne45qmyYnMVRaKnzCxTb14QP6z53Dr74+T9xXg3X4wZK4bkdPsM+ku34dk+3t8xOfRk1bUoLfer0nYrq5BjFzZRllCc+b7IsaG4O+ulpYURKFAoO0NZiMRk+d+8W5rFayKLd/SJz2cbTI+sxfKutgUdsbH4p5w7/MkmnQFHGE6PGBmB7e15SjzPUbwbz3Wy+Kecv7+OZsbs920b3EAy+IecDPlkZcPf1gEfgZ4sAyfcIe3hZr85cn50NtPMw9yb2pxQ0PnMvbcOhWnD1BYz6imcPSpkN82FmCF0ME8noGFkJwR8d21+euHun9FWAAzI4XO5RWCRAAAAAASUVORK5CYII=") no-repeat;
                          background-size: 15px 15px;
                          background-position: 7px 50%;
                     }
                 }
             }
             .btn{
                 position: fixed;
                 bottom:30px;
                 left: 50%;
                 text-align: center;
                 margin-left: -173px;
                 width: 346px;
                 height:48px;
                 border-radius: 3px;
                 line-height: 48px;
                 font-size: 17px;
                 color:#fff;
                 background:#e03a3a ;
             }
         }
    }
</style>
