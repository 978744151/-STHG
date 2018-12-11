<template>
    <div class="review">
        <!-- <div class="head">
            <div class="backBtn"></div>
            <div class="title">全部评价</div>
            <div class="status"></div>
        </div> -->

        <div class="content">
            <div class="tab">
                <div :class="sel==index?'active':''" v-for="(item,index) in head" @click="change(index)">{{item.title}}</div>
               <!-- <div class="active">全部</div>
               <div>最新</div>
               <div>图评价</div> -->
            </div>
            <div class="overview">
                <div class="score">
                    <div class="scoreNum">{{shoplist.score}}</div>
                    <div class="scoreStar">
                        <p>综合评分</p>
                        <div class="star">
                        <div class="starBg"></div>
                        <div class="starLight" :style="'width:'+shoplist.score*20+'%'" >
                            <img src="https://pic.repaiapp.com/static/png/20180411/16/1523435822461174856.png">
                        </div>
                    </div>
                    </div>
                </div>
                <div class="desc">
                    <p>高于{{shoplist.colleague}}的同行</p>
                    <p>好评率{{shoplist.praise}}</p>
                </div>
            </div>
            <van-list v-model="loading" :finished="finished" @load="onLoad" >
                <div class="reviewList">
                    <div class="reviewItem" v-for="j in com_list">
                        <div class="avatar">
                            <img :src="j.memberlevel">
                        </div>
                        <div class="reviewContent">
                            <div class="name">{{j.nickname}}</div>
                            <div class="descTop">
                                <div class="star">
                                    <div class="starBg"></div>
                                    <div class="starLight" :style="'width:'+j.commit_level*20+'%'">
                                        <img src="https://pic.repaiapp.com/static/png/20180411/16/1523435822461174856.png">
                                    </div>
                                </div>
                                <div class="date">{{j.commit_time}}</div>
                            </div>
                            <p>{{j.content}}</p>
                            <div class="pjImg" v-if="j.comment_photo!=''">
                                <img :src="item" v-for="item in j.comment_photo" v-preview="item" preview-title-enable="true" preview-nav-enable="true">
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
    import api from '../network/request';
    import star from 'components/star/star';
    import upload from 'components/upload/upload';
    import { Toast } from 'vant'
    import { List } from 'vant';

    export default {
        name: "favorite",
        data(){
            return {
                type:"all",
                page:0,
                shoplist:'',
                head:[{title:'全部'},{title:'最新'},{title:'晒图评价'}],
                sel:0,
                com_list:[],
                sw:false,
                loading: false,
                finished: false
            }
        },
        methods: {
            change:function(index){
                Toast.loading({ duration: 0, forbidClick: true,  message: '正在加载中...'});
                this.sel=index;
                this.com_list=[];
                this.page=0;
                this.onLoad();
            },
            onLoad() {
                this.list();
                setTimeout(() => {
                    this.loading = false;
                    this.page=this.page+1;
                    if (this.sw) {
                      this.finished = true;
                    }
                }, 500);
            },
            list:function(){
                var _this = this;
                if(this.sel==0){
                    this.type="all"
                }
                if(this.sel==1){
                    this.type="new"
                }
                if(this.sel==2){
                    this.type="img"
                }
                const params={id:localStorage.getItem('orderid'),page:this.page,type:this.type}
                api.post('store/com_lists', params, res => {
                    if (res.status == 0) {
                        Toast.clear();
                        _this.shoplist=res.data;
                        if(res.data.lists.length==0){
                            _this.sw=true;
                        }else{
                             _this.com_list=_this.com_list.concat(res.data.lists);
                        }
                        // _this.com_list=res.data.lists
                        // console.log(res)
                    }
                })
            }
            // delItem(index) {
            //     this.picArr.splice(index,1)
            // },
            // hideBtn() {
            //     if(this.hideHandle === true) {
            //         this.hideHandle = false
            //     } else {
            //         this.hideHandle = true
            //     }
            // }
        },
        created() {
            // this.list();
          //   var _this=this;
          //   $(window).scroll(function (){    
          //     let scrollTop = $(this).scrollTop()
          //     let scrollHeight = $(document).height()
          //     let windowHeight = $(this).height();
          //     console.log(scrollTop + windowHeight);
          //     console.log(scrollHeight);
          //     if (scrollTop + windowHeight === scrollHeight)  {
          //         // console.log("到底了")
          //         if(_this.sw==true){
          //             _this.page=_this.page+1;
          //             _this.list()
          //         } 
          //     }  
          // });

        },
        components:{
            star,
            upload
        }
    }
</script>

<style scoped lang="scss">
    .pjImg{
        display: flex;
        margin-top: 10px;

    }
    .pjImg img{
        width: 85px;
        height: 85px;
        margin-right: 15px;
    }
    .star{
        position: relative;
        font-size: 0;
    }
    .starBg{
        position: relative;
        width: 65px;
        height: 10px;
        background-image: url('https://pic.repaiapp.com/static/png/20180411/16/1523435726983605151.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .starLight{
        position: absolute;
        overflow:hidden;
        height:10px;
        width: 100%;
        top:0;
        left: 0;
    }
    .starLight img{
        width: 65px;
        height: 10px;
    }
    .review{
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:#fff;
        overflow-y:auto;
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
            padding-top:20px;
            .tab{
                display: flex;
                width: 75%;
                margin:0px auto 20px;
                border: 1px solid #f90303;
                border-radius:3px;
                font-size:13px;
                div{
                    flex:1;
                    text-align: center;
                    padding:5px;
                    color:#db0505;
                    border-right: 1px solid #f90303;
                    &:last-child{
                        border-right: 0;
                    }
                    &.active{
                        color:#fff;
                        background:#f90303;
                    }
                }
            }
            .overview{
                /*padding-left:50px;
                padding-bottom: 20px;*/
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom:1px solid #ddd;
                padding-bottom: 20px;
                .score{
                    display: inline-block;
                    vertical-align: middle;
                    padding-right:15px;
                    border-right: 1px solid #ddd;
                    .scoreNum{
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 37px;
                        color: #f8b551;
                    }
                    .scoreStar{
                        display: inline-block;
                        vertical-align: middle;
                        p{
                            font-size: 13px;
                            color: #939393;
                        }
                    }
                }
                .desc{
                    display: inline-block;
                    vertical-align: middle;
                    margin-left:8px;
                    p{
                        margin-bottom: 3px;
                        font-size: 13px;
                        color:#939393;
                    }
                }
            }
            .reviewList{
                .reviewItem{
                    display:flex;
                    padding:10px;
                    border-bottom:1px solid #ddd;
                    &:last-child{
                        border:0;
                    }
                    .avatar{
                        img{
                            width: 37px;
                            height: 37px;
                            border-radius: 50%;
                        }
                    }
                    .reviewContent{
                        flex: 1;
                        margin-left:10px;
                        .name{
                            font-size: 14px;
                            color: #181818;
                        }
                        .descTop{
                            overflow: hidden;
                            .star{
                                float:left;
                                text-align: left;
                            }
                            .date{
                                float:right;
                                font-size: 12px;
                                color: #999;
                            }
                        }
                        p{
                            font-size: 14px;
                            color: #181818;
                        }
                    }
                }
            }
        }
    }
</style>

