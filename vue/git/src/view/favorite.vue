<template>
    <div>
        <!-- <div class="head">
            <div class="backBtn"></div>
            <div class="title">我的收藏</div>
            <div class="status">编辑</div>
        </div> -->
        <div v-if="favoriteList==''" class="empty">
            <img src="https://pic.repaiapp.com/static/png/20180426/18/1524738352003615097.png">
        </div>
        <div class="favoriteList" v-if="favoriteList!=''">
            <div class="dateItem" v-for="(item,index) in favoriteList">
                <div class="dateTitle">{{item.time}}</div>
                <div class="goodContent" v-for="j in item.data">
                    <div class="goodImg"><img :src='j.thumb'/></div>
                    <div class="goodText">
                        <div class="goodTitle">{{j.title}}</div>
                        <div>
                            <span class="price">¥{{j.marketprice}}</span>
                            <span class="oldPrice">¥{{j.productprice}}</span>
                        </div>
                    </div>
                    <div class="delBtn" @click="channel(j.id)"></div>
                </div>
            </div>
        </div>
        <div class="sj-hint">加入成功</div>

    </div>
</template>

<script>
    import api from '../network/request'
    import { Toast } from 'vant'
    export default {
        name: "favorite",
        components: {

        },
        data(){
            return {
                favoriteList:''
            }
        },
        methods: {
            shop:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('user/favori_lists',params,res=>{
                console.log(res);
                    if(res.status==0){
                        _this.favoriteList=res.data.lists;
                        // _this.status=res.data;
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                }) 
            },
            channel:function(id){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token'),goods_ids:id,type:-1};
                api.post('user/favorite',params,res=>{
                console.log(res);
                    if(res.status==0){
                        Toast.success("删除成功")
                        // $(".sj-hint").html("取消成功").fadeIn().delay(1500).fadeOut();
                        this.shop();
                        // _this.favoriteList=res.data.lists;
                        // _this.status=res.data;
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                })
            }

        },
        created() {
            this.shop();


        }
    }
</script>

<style scoped lang="scss">
    .empty{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 500px;
    }
    .empty img{
        width: 142px;
        height: 112px;
    }
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

    .favoriteList{
        position: relative;
        font-size: 13px;
        background-color: #fff;
        .dateItem{
            .dateTitle{
                padding-left: 15px;
                line-height: 35px;
                color:#838383;
                background-color: #f6f6f6;
            }
            .goodContent{
                display: flex;
                align-items:center;
                padding:17px;
                border-bottom: 1px solid #dadada;
                .goodImg{
                    img{
                        box-sizing: border-box;
                        width: 80px;
                        height: 80px;
                        border: 1px solid #bec2c9;
                    }
                }
                .goodText{
                    display: flex;
                    flex: 1;
                    flex-flow:column;
                    justify-content: space-between;
                    height: 75px;
                    padding-left:10px;
                    .goodTitle{
                        font-size: 14px;
                        font-weight: 600;
                        line-height: 18px;
                        color:#000;
                    }
                    .price{
                        font-size: 16px;
                        color:#ea4c3c
                    }
                    .oldPrice{
                        padding-left: 10px;
                        font-size: 11px;
                        color: #96989a;
                        text-decoration:line-through;
                    }
                }
                .delBtn{
                    width: 13px;
                    height: 16px;
                    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAfCAYAAAD5h919AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBENTQ2MjI0M0UzODExRThCOUQ0RjQxMjc3QzM2NEIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBENTQ2MjI1M0UzODExRThCOUQ0RjQxMjc3QzM2NEIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEQ1NDYyMjIzRTM4MTFFOEI5RDRGNDEyNzdDMzY0QjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEQ1NDYyMjMzRTM4MTFFOEI5RDRGNDEyNzdDMzY0QjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz64SxHoAAABKUlEQVR42rxWSw6CMBAFY4J83ek5XJiwkAu49DJewZOwdOkF8EICih+ktklNSDMMaIdO8tJAS1/75pWOnaap1RNbjiOH09H/4NhxnLBJJpahmA4YI1Y60yUSO8o42MjITElnC+kSE0zGzNAmijn2iI1/CUfOtYKI1hwHjiUB0ULOFUNEtWxdAiJvSI7UQZlEV0D938VW0IEtZesrH216Vg/1B7J9Qjt6yzYikC78RzqdHN0gomIEM7wgokbRVyeCIdKFhERXTDrKHNWYdJ6pAxsQ2huULh/BDKB0jFA61/SBLSGiC6G9I+W3BlZBao7O4s5HJoX6/SHllqpvX02RINIVmHSUZmgwM1BcE3PMdaxLXw3X5VCO8tY7RlRlsS7p7oSlXNV++AgwAP56RxPIv7uiAAAAAElFTkSuQmCC")  no-repeat;
                    background-size: contain;
                    align-self: flex-end;
                }
            }
            .goodContent:last-child{
                border-bottom: 0;
            }
        }
    }

</style>
