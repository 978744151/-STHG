<template>
    <div class="evaluationList">
        <!-- <div class="head">
            <div class="backBtn"></div>
            <div class="title">评价列表</div>
            <div class="status"></div>
        </div> -->
        <div class="content">
            <div class="goodContent" v-for="(item,index) in goods">
                <img class="goodImg" :src='item.thumb'/>
                <div class="goodText">
                    <div class="goodTitle">{{item.title}}</div>
                </div>
                <!-- <div class="btn">查看详情</div> -->
                <div class="btn" v-if="item.status==0" @click="gotoreview(item.goodsid,item.thumb)">晒单评论</div>
                <div class="btn" v-else @click="reviewDetail(item.goodsid)">查看详情</div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../network/request'

    export default {
        name: "reviewList",
        components: {

        },
        data(){
            return {
                "goods":[
                    {
                        "img":"https://pic.repaiapp.com/static/png/20180412/16/1523520607370764956.png",
                        "title":"香天下手提火锅一盒"
                    },
                    {
                        "img":"https://pic.repaiapp.com/static/png/20180412/16/1523520607370764956.png",
                        "title":"香天下手提火锅一盒"
                    }
                ]
            }
        },
        methods: {
            list:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token'),orderid:localStorage.getItem('myorderid')};
                api.post('order/com_goods',params,res=>{
                console.log(res);
                    if(res.status==0){
                        _this.goods=res.data
                    }
                    if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                    }
                })
            },
            gotoreview:function(goodsid,img){
                this.$router.push({name: 'goodReview', params: {goodsid:goodsid,img:img}})
            },
            reviewDetail:function(goodsid){
                this.$router.push({name: 'reviewDetail', params: {goodsid:goodsid}})
            }

        },
        created() {
            this.list();

        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .evaluationList {
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:#fff;
        .head {
            height: 45px;
            line-height: 45px;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #000000;
            border-bottom: 1px #dadada solid;
            .backBtn {
                flex-basis: 45px;
                box-sizing: border-box;
                width: 10px;
                height: 16px;
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAfCAYAAADnTu3OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVEMTMzQjIxM0VDMjExRThBMTlCQUFGOTgzNkIzRDk4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVEMTMzQjIyM0VDMjExRThBMTlCQUFGOTgzNkIzRDk4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUQxMzNCMUYzRUMyMTFFOEExOUJBQUY5ODM2QjNEOTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUQxMzNCMjAzRUMyMTFFOEExOUJBQUY5ODM2QjNEOTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz591WfFAAABz0lEQVR42qSWSyjEURTG7xiJPGqGjUfSmAVFNsoGi5EyybAxWSplwV6WLCh2QsnCQkrNQh4xkpQlSUmyIathpeSRUh7f0Xfr+mfG/3999VucO/XNueeec2Z8oVBI/VNZ4JN8B/9RNlgG88CnD2yVCxKgyzgbtjUsBOsgYpzJlX02Vw6CfYfZpGQHPrxmWAr2QJ2R1SiYNovqVlXMrJrxOxgCi85XcqNampUxfgP9YPW3Z/9LjSAJShi/gl6wna6PMqkVbIEixo8gBg4zdXk6dYJdw+wetGUyy2TYB9ZAHuNb0AJO3MyhU4NgBeQwvgbN4NLtYJsaAQvAz/iCmd142RRaE2BKDzl0zEe587otxGCOTap1AHrAk80uExU4zpM2ZiJ/IBBQ7LUGUMPzdtbtzDZDmcs4r6pYhiXQbWuo51MMjnT2XKARW0PRMyfknLH04gZosjXUIxYFV8aDySKotzUUpWiaYlwMdkDY1lAxwygzFlWwncptDRVrKTV9YRymadDWUPHVY+wCxVrK9fNtDfUoxtmviq++aWwkz4aK7TOg/3KwPxPGZvoxem4lo/gAOhjLqFbyyzxnqDUDxo3f5VObn1GnxkCArTVrfvAlwACTDlZXtH61qQAAAABJRU5ErkJggg==") no-repeat;
                background-size: contain;
                background-position: 10px;
            }
            .title {
                flex: 1;
                text-align: center;
            }
            .status {
                flex-basis: 45px;
                color: #dd3232;
                font-size: 15px;
            }
        }
        .content {
            .goodContent {
                display: flex;
                align-items: center;
                padding: 17px;
                border-bottom: 1px solid #dadada;
                img {
                    box-sizing: border-box;
                    flex-basis: 80px;
                    width: 80px;
                    height: 80px;
                    border: 1px solid #bec2c9;
                }
                .goodText {
                    flex: 1;
                    align-self: flex-start;
                    padding-left: 16px;
                    font-size: 14px;
                    line-height: 18px;
                    color: #000;
                }
                .btn{
                    align-self: flex-end;
                    padding:5px 8px;
                    font-size:14px;
                    color: #333;
                    border:1px solid #999;
                    border-radius:2px;
                    /*&:hover{
                        color:#ef4242;
                        border:1px solid #ef4242;
                    }*/
                }
            }
        }
    }
</style>
