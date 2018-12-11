<template>
    <div class="refund">
        <!-- <div class="head">
            <div class="backBtn"></div>
            <div class="title">申请退款</div>
            <div class="status"></div>
        </div> -->
        <div class="content">
            <div class="overview">
                <img :src="goods.thumb">
                <div class="textList">
                    <p class="title">{{goods.title}}</p>
                    <p class="orderNum">订单号：{{goods.ordersn}}</p>
                    <p class="price">售价：¥{{goods.price}}</p>
                    <p class="pay">实付：¥{{goods.realprice}}</p>
                </div>
            </div>
            <div class="inputItem">
                <p class="title">
                    <span class="redDot">*</span>商品状态
                </p>
                <div class="inputContent">
                    <div class="delivery">
                        <div :class="{active:deliveryState}" @click="handleSelect">已收到商品</div>
                        <div :class="{active:!deliveryState}" @click="handleSelect">未收到商品</div>
                    </div>
                </div>
            </div>
            <div class="inputItem">
                <p class="title">
                    <span class="redDot">*</span>您的个人信息
                </p>
                <div class="inputContent">
                    <div class="phone"><span>手机号</span><input placeholder="请输入您的手机号" maxlength="11" ref="input1"></input></div>
                </div>
            </div>
            <div class="inputItem">
                <p class="title">
                    <span class="redDot">*</span>描述详细原因
                </p>
                <div class="inputContent">
                    <div class="reason">
                        <textarea rows="5" maxlength="125" placeholder="请描述你遇到的问题，最多125个字符" ref="input2"></textarea>
                    </div>
                </div>
            </div>
            <div class="inputItem">
                <p class="title">
                    上传图片<span class="subTitle">(可选，最多可上传3张)</span>
                </p>
                <upload class="upload" size="small" @imgs="imgs" @delItem="delItem"></upload>
            </div>
            <div class="btn" @click="comfirm()">提交申请</div>
        </div>
        <div class="sj-hint"></div>    
    </div>
</template>

<script>
    import upload from 'components/upload/upload';
    import api from '../network/request'
    import { Toast } from 'vant'

    export default {
        name: "refund",
        data(){
            return {
                // "goodInfo":{
                //     "img":"https://pic.repaiapp.com/static/png/20180412/16/1523520607370764956.png",
                //     "title":"香天下手提火锅一盒",
                //     "orderNum":"201801123456",
                //     "price":28.8,
                //     "pay":28.8
                // },
                "picArr":[
                    "https://pic.repaiapp.com/static/png/20180417/11/1523935740194810257.png",
                    "https://pic.repaiapp.com/static/jpg/20180413/11/1523589580121399101.jpg",
                    "https://pic.repaiapp.com/static/png/20180412/16/1523520607370764956.png"
                ],
                "deliveryState": true,
                orderid:'',
                goodsid:'',
                goods:'',
                imgss:''
            }
        },
        components:{
            upload,
            // imgs,
        },
        methods: {
            imgs:function(e){
                console.log(e);
                this.imgs=e;
                this.imgss=e;
            },
            delItem(index) {
                this.imgs.splice(index,1)
            },
            handleSelect() {
                if(this.deliveryState){
                    this.deliveryState = false
                } else {
                    this.deliveryState = true
                }
            },
            shopInfo:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token'),orderid:_this.orderid,goodsid:_this.goodsid};
                api.post('refund/info',params,res=>{
                console.log(res);
                    if(res.status==0){
                        _this.goods=res.data.goods
                    }
                    if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                    }
                })
            },
            comfirm:function(){
                 var _this=this;
                if(this.imgs.length>0&&this.imgss!=''){
                    var usrimg=this.imgs.join(',');
                }else{
                    var usrimg=this.imgss;
                }
               
                var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
                if(this.deliveryState){
                    var rtype=1;
                }else{
                    var rtype=0;
                }
                var phone=this.$refs.input1.value;
                var content=this.$refs.input2.value
                if(phone==''){
                    $(".sj-hint").html("请输入手机号").fadeIn().delay(1500).fadeOut();
                    return;
                }
                if(!re.test(phone)){
                  $(".sj-hint").html("手机号格式有误").fadeIn().delay(1500).fadeOut();
                  return;
                }
                if(content==''){
                    $(".sj-hint").html("请输入退款原因").fadeIn().delay(1500).fadeOut();
                    return;
                }

                const params={access_token:localStorage.getItem("access_token"),orderid:_this.orderid,goodsid:_this.goodsid,rtype:rtype,phone:phone,content:content,img:usrimg};
                api.post('refund/application',params,res=>{
                console.log(res);
                    if(res.status==0){
                        Toast.success("申请成功");
                        this.goback()
                       // this.$router.go(-1);
                    }
                    if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                    }
                })
                // $(".sj-hint").html("确认成功").fadeIn().delay(1500).fadeOut();

            },
            goback:function(){
                var _this=this;
                setTimeout(function(){
                    _this.$router.go(-1);
                 },1800)
            }
        },
        created() {
            this.orderid=this.$route.params.orderid;
            this.goodsid=this.$route.params.goodsid;
            this.shopInfo();
        },
        
    }
</script>

<style scoped lang="scss">
    .refund{
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
            .overview {
                display: flex;
                padding: 15px;
                background: #fff;
                img{
                    flex-basis: 72px;
                    width: 72px;
                    height: 72px;
                    margin-right: 15px;
                }
                .textList{
                    flex: 1;
                    .title{
                        font-size: 14px;
                        color:#343032;
                    }
                    .orderNum{
                        font-size: 12px;
                        color: #999;
                    }
                    .price{
                        font-size: 12px;
                        color: #999;
                    }
                    .pay{
                        font-size: 12px;
                        color: #ec1a1d;
                    }
                }
            }
            .inputItem{
                .title{
                    padding-left: 13px;
                    height: 37px;
                    line-height: 37px;
                    font-size: 14px;
                    color: #999;
                    background:#f6f6f6;
                    .redDot{
                        margin-right:2px ;
                        color: #e42d2d;
                    }
                    .subTitle{
                        font-size: 12px;
                    }
                }
                .upload{
                    margin-left: 10px;
                }
                .inputContent{
                    font-size: 14px;
                    color:#333;
                    background: #fff;
                    .delivery{
                        padding-left:10px;
                        div{
                            padding:13px 30px;
                            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxQjU4ODFBM0VFRTExRThBNTdDQkRGQTkzQzEyOEZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkxQjU4ODFCM0VFRTExRThBNTdDQkRGQTkzQzEyOEZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTFCNTg4MTgzRUVFMTFFOEE1N0NCREZBOTNDMTI4RkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTFCNTg4MTkzRUVFMTFFOEE1N0NCREZBOTNDMTI4RkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5PyeKHAAACYElEQVR42ryWTYtSURzGj17Qhflyw5edEr4UrZScRWURLoQmahNMm6S+Rn2Amg/QBxiwTdNyeiEEF1M0Cx0QV5MpoTtf4Kq4MTR7Huc4i0qzq6cHHv56lf+Pc+695/9YptOpWKZcLmdBuQHfga/DEViXPxtwDf4Mv4E/ZrPZpQ0ti4AAWVEew088Hk8kFAoJv98v3G63sNvts/+MRiPR7/dFu90WjUZD9Ho9wp/DewD/WBkI2AWUVwBsJRKJGWgVEVwul0Wr1Sri6wNAv/0VCNgtTdNeJ5NJbywWE2ZUrVZFqVTqTiaT+4AeLgQClrHZbAfpdNrm8/nEOup0OqJQKHyH7gH64TcgYBexsmImk3F6vV6xCXW7XZHP54fj8TgJ6Bdes0qYxoJt3BiMYi/0PHeKmDFOgdAjPiBm79kyRaNREQgEtuQTL7RwOMz3bD+VSp13OBxChZxOp6jX65crlcoLrvCmruuRVR99M2JvMsgicDsYDArVkoxtAq+pXN1cuI8sVwmM8rhSLZfLxRIjUJ+fjSolGbpV/GcRaPDUVy3JMAj8yhGjWoPBYHauE3jEsaJaGFksRwS+bTabyoGS8Y7AQ8MwaipXyd5kMIJYZQbZ5aRWJdl7l7Fj/lrsYY9LnNSbVq1W4/07JuNsPIE8YUEsGHJobkrsVSwWh/j4UDLO5iGhJ8ggO4wFjAfrah4xMO132HtZiLqNqLHPSb1miBpyAYC9XyUmXkJ5iRP+SjweNxMTj+U2npgJwk8RhMMrBuE6Lj/75yD8B3AKvsvZCYd/ifp1GfUP4E+LQHP9FGAASZs2iAPYsbgAAAAASUVORK5CYII=") no-repeat;
                            background-size: 15px 15px;
                            background-position: 7px 50%;
                            &:last-child{
                                border-top:1px solid #ddd;
                            }
                            &.active{
                                  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1M0Y2M0RBNDIyMzExRThCRUYxQkI4MTMzRjkyQkRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1M0Y2M0RCNDIyMzExRThCRUYxQkI4MTMzRjkyQkRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTUzRjYzRDg0MjIzMTFFOEJFRjFCQjgxMzNGOTJCREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTUzRjYzRDk0MjIzMTFFOEJFRjFCQjgxMzNGOTJCREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5gwofSAAAEB0lEQVR42sSYW0hUQRjH/7su67KZtqnrJW+tZXZTiETLLoKSRQY9REEiFF66aQWFiln4IiVIUhpmD72VkA899BAiPmRi9RBEBamIq26LZXnbLc1sd/vmNB5XW/fqrh/82DN75sz8z5yZb75vJO+2bYOLtp7IJvYQm4lYYjW/ZyQGiU9EJ9FKaF1pXOZkPT/iOFFM7CIkS9QL5uwgcgkL8YpoIJ4QJkcdSZ0Qk0V8JB4Tu+2IsWUS/sxj3kaWJ4IURBPRRiTCc0vkbTXxtl0SFEp0EEVYfivibYc6K4hVfEmkwHuWwvsIdSRISTwjNsH7ton3pbQn6A6RCt9ZKu/TpiC2AgrgeyuwXn1Sq9+7WDmr575OFHSCe92VskTueEVBF3zZ+6rkZGxsbkZ4cbH138VzW8d67k19YqqcHESWlUG2Zg3M09PWt9iWpGGCDrq4HbhlUqUSYQUFUBcWCmXDixfQVVYu3maymaB0b4uRR0djHY1K4P79QnmitRW6a9dgnplZXDWdCdrqTTEBqamIopHwj4sTymNPn+JzVRUsZrOt6luYoGhviQk+dgwRV67ALyBAKH9/9Aj6W7fsPRIrswqulm+++Psj/NIlhOblif99bWrCl4YGhwNqNx5ibxaUlQWJVOq0GIVGg7j6+gVihm/fdkaMGDEaeZT3n0VcvgzV0aOYbGvDcF0dZkdG7DYWlJmJyKtXIY+KEsoWmrT6mhqMtrQ4+z4/2KvrlnzbhARh+Jnv0DQ2ChPUZlgol0Odn4/Y2lpRjPnnT+hu3HBFDLMhv7Nq9T662G7rrrGrC0pKAuQREZAFB0OVnQ2LyYTp3l5YZmf/DfHatVhXXg71qVPipzUZDBiqqBBG1kVrZ4LC6OKwrbvsLQ0dHViVlAR5ZCQkMhlWp6VBER+PmYEBQUzMzZsIysgQn/kzOooh8jnGzk531sN9CaVBGrros+etmZuPpTkUsHPnfMfj4zQUJshCQsT/fg8PY5Dm0NT79+6IYRnKBjbG/USXvZp/JiYwQBPc+Pr1vEiVaoGYGa0W2vPn3RUDni71z63ne45qmyYnMVRaKnzCxTb14QP6z53Dr74+T9xXg3X4wZK4bkdPsM+ku34dk+3t8xOfRk1bUoLfer0nYrq5BjFzZRllCc+b7IsaG4O+ulpYURKFAoO0NZiMRk+d+8W5rFayKLd/SJz2cbTI+sxfKutgUdsbH4p5w7/MkmnQFHGE6PGBmB7e15SjzPUbwbz3Wy+Kecv7+OZsbs920b3EAy+IecDPlkZcPf1gEfgZ4sAyfcIe3hZr85cn50NtPMw9yb2pxQ0PnMvbcOhWnD1BYz6imcPSpkN82FmCF0ME8noGFkJwR8d21+euHun9FWAAzI4XO5RWCRAAAAAASUVORK5CYII=") no-repeat;
                                  background-size: 15px 15px;
                                  background-position: 7px 50%;
                            }
                        }
                    }
                    .phone{
                        height:60px;
                        line-height:60px;
                        span{
                            padding-left: 13px;
                        }
                        input{
                            margin-left:20px;
                            border:0;
                            outline: none;
                            height: 100%;
                        }
                    }
                    .reason{
                        textarea{
                            box-sizing: border-box;
                            resize:none;
                            outline:none;
                            width: 100%;
                            padding: 2%;
                            border:0;
                        }
                    }
                }
            }
            .btn{
                text-align: center;
                margin: 20px auto;
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
