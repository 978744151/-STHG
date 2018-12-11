<template>
    <div>
        <!-- <div class="head">
            <div class="backBtn"></div>
            <div class="title">设置</div>
            <div class="status"></div>
        </div> -->
        <div class="content">
            <div class="user" @click="setInfo()">
                <img class="avatar" :src="avatar"/>
                <div class="userInfo">
                    <div class="userName">{{nickname}}</div>
                    <div class="userID">ID:{{id}}</div>
                </div>
                <div class="userIcon"></div>
            </div>
           <!--  <div class="picLevel">
                <div class="icon picIcon"></div>
                <div class="title">图片质量</div>
                <div class="picModel">{{picModel}}</div>
                <div class="userIcon"></div>
            </div> -->
            <div class="setItem" style="margin: 10px 0;" @click="myteam">
                <div class="icon teamIcon"></div>
                <div class="title">我的团队</div>
                <div class="userIcon"></div>
            </div>
            <div class="setItem" @click="intro">
                <div class="icon companyIcon"></div>
                <div class="title">企业简介</div>
                <div class="userIcon"></div>
            </div>
            <div class="setItem" @click="opinion()">
                <div class="icon adviceIcon"></div>
                <div class="title">意见反馈</div>
                <div class="userIcon"></div>
            </div>
           <!--  <div class="setItem">
                <div class="icon scoreIcon"></div>
                <div class="title">给香天下评分</div>
                <div class="userIcon"></div>
            </div> -->
        </div>
        <!-- <div class="logoutBtn" @click="exit">退出登录</div> -->
    </div>
</template>

<script>
    import api from '../network/request'
    import { Dialog } from 'vant';
    export default {
        name: "setting",
        components: {
            
        },
        data(){
            return {
                "user":{
                    "img":"https://pic.repaiapp.com/static/jpg/20180413/11/1523589580121399101.jpg",
                    "name":"bin",
                    "id":"bin123"
                },
                "picModel":"智能模式",
                avatar:'',
                nickname:'',
                id:''
            }
        },
        methods: {
            myteam(){
                this.$router.push({name: 'myTeam', params: {}})
            },
            setInfo:function(){
                this.$router.push({name: 'setInfo', params: {}})
            },
            //意见反馈
            opinion:function(){
                this.$router.push({name: 'opinion', params: {}})  
            },
            //企业介绍
            // https://dc.xiaodian.in/web/index.php?c=xiangtianxia&a=view&do=copyInfo
            intro:function(){
                window.location.href="https://dc.xiaodian.in/web/index.php?c=xiangtianxia&a=view&do=copyInfo"
            },
            exit:function(){
                Dialog.confirm({
                  title: '提示',
                  message: '确定要退出登录吗？'
                }).then(() => {
                    var _this=this;
                    const params={access_token:localStorage.getItem('access_token')};
                    api.post('user/logout',params,res=>{
                    console.log(res);
                        if(res.status==0){
                            localStorage.setItem('access_token','');
                            this.$router.push({name: 'index', params: {}})
                        }
                        if(res.status==600){
                            this.$router.push({name: 'login', params: {}})
                        }
                    })

                }).catch(() => {
                    this.restSlide();
                  // on cancel
                });

            }

        },
        created() {
            this.avatar=localStorage.getItem('avatar')
            this.nickname=localStorage.getItem('nickname')
            this.id=localStorage.getItem('useId')

        }
    }
</script>

<style scoped lang="scss">
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
    .content{
        .user{
            display: flex;
            align-items: center;
            padding:14px;
            border-bottom: 1px solid #dadada;
            background:#fff;
            .avatar{
                width: 71px;
                height: 71px;
                margin-right: 12px;
                border-radius: 50%;
                border:1px solid #efeff4;
            }
            .userInfo{
                display: flex;
                flex:1;
                flex-flow: column;
                justify-content:center;
                .userName{
                    font-size: 16px;
                    font-weight: 600;
                    color:#262626;
                }
                .userID{
                    font-size: 15px;
                    color: #b9b9b9;
                }
            }
            .userIcon{
                flex-basis: 7px;
                width: 7px;
                height: 12px;
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkyMERDMkU2M0VDQTExRThBRkE4Q0NFQ0I3MEQ2MjMyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkyMERDMkU3M0VDQTExRThBRkE4Q0NFQ0I3MEQ2MjMyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTIwREMyRTQzRUNBMTFFOEFGQThDQ0VDQjcwRDYyMzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTIwREMyRTUzRUNBMTFFOEFGQThDQ0VDQjcwRDYyMzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz68wyF2AAABWUlEQVR42pTTvStFcRzH8XOvk4EBSRbFomzKKCalyOAhkSgGiwHJQEoxYfFQYkEGSRKF0mUwMRyj8h/YLOqm6OL9rc+pa7i/8/OtV51vnc85v8dUFEUXQRC0YBB3gWelUYdKXKPnP8FOvKAYpxj1Db6iFU8owj4mfYJWb2jDPVLYxKJP0Opdw75Sv4R1fcgZtPpAL47VT2NPU3AGrb4wjF31YzjR4jmDVt+YwIr6PlyiNClo9YN5zOm5HRmUJwXjWtXfc2jWylenPQ+KzXdE82+0YfsGrSoQxgvoG1zAtvb0EV1hQsBeXMOsers93ci6grbpOxhXf66r9+laVdvso7zQIfrjUKFgCexyD6jf0unJuU5OGW7QoX4ZUzoAfyp/jlUKNenFGWwUWoA4WINbNGhINrcD13JbsF6hWk1+CGdJGxtqeBbK6i5mfE6EBZ+1Z/anB9/z9yvAADpZQ9+r829VAAAAAElFTkSuQmCC") no-repeat;
                background-size: contain;
            }
        }
        .picLevel{
            display:flex;
            align-items: center;
            padding: 18px 14px;
            margin:10px 0;
            border-top:1px solid #dadada;
            border-bottom:1px solid #dadada;
            font-size: 16px;
            color:#262626;
            background:#fff;
            .icon{
                width: 16px;
                height: 16px;
                margin-right: 10px;
                background-size: contain;
                background-position: 50%;
            }
            .title{
                flex:1;
            }
            .picModel{
                flex-basis: 60px;
                margin-right: 7px;
                font-size: 14px;
                color: #b9b9b9;
            }
            .userIcon{
                flex-basis: 7px;
                width: 7px;
                height: 12px;
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkyMERDMkU2M0VDQTExRThBRkE4Q0NFQ0I3MEQ2MjMyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkyMERDMkU3M0VDQTExRThBRkE4Q0NFQ0I3MEQ2MjMyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTIwREMyRTQzRUNBMTFFOEFGQThDQ0VDQjcwRDYyMzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTIwREMyRTUzRUNBMTFFOEFGQThDQ0VDQjcwRDYyMzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz68wyF2AAABWUlEQVR42pTTvStFcRzH8XOvk4EBSRbFomzKKCalyOAhkSgGiwHJQEoxYfFQYkEGSRKF0mUwMRyj8h/YLOqm6OL9rc+pa7i/8/OtV51vnc85v8dUFEUXQRC0YBB3gWelUYdKXKPnP8FOvKAYpxj1Db6iFU8owj4mfYJWb2jDPVLYxKJP0Opdw75Sv4R1fcgZtPpAL47VT2NPU3AGrb4wjF31YzjR4jmDVt+YwIr6PlyiNClo9YN5zOm5HRmUJwXjWtXfc2jWylenPQ+KzXdE82+0YfsGrSoQxgvoG1zAtvb0EV1hQsBeXMOsers93ci6grbpOxhXf66r9+laVdvso7zQIfrjUKFgCexyD6jf0unJuU5OGW7QoX4ZUzoAfyp/jlUKNenFGWwUWoA4WINbNGhINrcD13JbsF6hWk1+CGdJGxtqeBbK6i5mfE6EBZ+1Z/anB9/z9yvAADpZQ9+r829VAAAAAElFTkSuQmCC") no-repeat;
                background-size: contain;
            }
        }
        .setItem{
            display:flex;
            align-items: center;
            padding: 18px 14px;
            border-top:1px solid #dadada;
            font-size: 16px;
            color:#262626;
            background:#fff;
            .icon{
                width: 16px;
                height: 16px;
                margin-right: 10px;
                background-size: contain;
                background-position: 50%;
            }
            .title{
                flex:1;
            }
            .userIcon{
                flex-basis: 7px;
                width: 7px;
                height: 12px;
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkyMERDMkU2M0VDQTExRThBRkE4Q0NFQ0I3MEQ2MjMyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkyMERDMkU3M0VDQTExRThBRkE4Q0NFQ0I3MEQ2MjMyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTIwREMyRTQzRUNBMTFFOEFGQThDQ0VDQjcwRDYyMzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTIwREMyRTUzRUNBMTFFOEFGQThDQ0VDQjcwRDYyMzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz68wyF2AAABWUlEQVR42pTTvStFcRzH8XOvk4EBSRbFomzKKCalyOAhkSgGiwHJQEoxYfFQYkEGSRKF0mUwMRyj8h/YLOqm6OL9rc+pa7i/8/OtV51vnc85v8dUFEUXQRC0YBB3gWelUYdKXKPnP8FOvKAYpxj1Db6iFU8owj4mfYJWb2jDPVLYxKJP0Opdw75Sv4R1fcgZtPpAL47VT2NPU3AGrb4wjF31YzjR4jmDVt+YwIr6PlyiNClo9YN5zOm5HRmUJwXjWtXfc2jWylenPQ+KzXdE82+0YfsGrSoQxgvoG1zAtvb0EV1hQsBeXMOsers93ci6grbpOxhXf66r9+laVdvso7zQIfrjUKFgCexyD6jf0unJuU5OGW7QoX4ZUzoAfyp/jlUKNenFGWwUWoA4WINbNGhINrcD13JbsF6hWk1+CGdJGxtqeBbK6i5mfE6EBZ+1Z/anB9/z9yvAADpZQ9+r829VAAAAAElFTkSuQmCC") no-repeat;
                background-size: contain;
            }
        }
        .setItem:last-child{
            border-bottom:1px solid #dadada;
        }
    }
    .logoutBtn{
        margin: 40px auto;
        text-align: center;
        width: 345px;
        height:48px;
        border-radius: 3px;
        line-height: 48px;
        font-size: 17px;
        color:#fff;
        background:#d9372d ;
    }
    .picIcon{
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAYAAADm63ZmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwQzRDN0E0M0VDQzExRTg5OEUzREIyQThGOTBGMjY0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwQzRDN0E1M0VDQzExRTg5OEUzREIyQThGOTBGMjY0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjBDNEM3QTIzRUNDMTFFODk4RTNEQjJBOEY5MEYyNjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjBDNEM3QTMzRUNDMTFFODk4RTNEQjJBOEY5MEYyNjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6CschrAAACuUlEQVR42sSXSWhUQRCGZ8LgaGJMUJCIHtSDC1E0ghuCC0gCKq6oKF48uICgOeghiogevLngQYyCopcoLig6Io6KuSUuMZEYMQEvGlQ8GJcEJ4rx7/A1NJIZ34TpNwUfPXS/6f5fdXdVvWgikYg4NkTsFJvENDE84td+iFZRJ86IXtMZcx4YK+6ImZHwzLz0PNgqVojOAsdDVlCHWCdKRNQzJazVwdpm2+LWUzvobBdzRVdInvombohHokHMENutpzbT1oQoyDWz5n6rxXpqFu2DNH+aLaaLD+KhPZA5tiRtRcw5U9adrhWKq2KZ0/dWrBSvcizqO2284D8PnkLQF67tGzFR3HZeJOcWyzAWF1vEH65sO33NYopYKu76EJXJUyMR0YUgYynxlN9lvjyVSdQn8RFxe4grc8Rqxl/kQ5TZtgP8PklKaBTF4loWosrFYVFvorX4xe1tY96KbM6UsfPiN5OO53aec8RmskXikFiSZnwq7OaG7wriKWuXxARRRFrYy9lKZ+Pw5GMEfeVFTF4bzTEYKuaL46JbbBBNQT3lWk+AZzaS7UvZbrM9xwbIEinSSgPPmHCzIBtPBc32ZqsvIyjJ1hwMkLbeEV7q04kqHIQgM2ELpUcPZ6NKvM9ijp9ivSsq6gya0mFUwIkmkeGTRPlmcuRp0TeIl/vsinInWEwluE0MG+CPpm+VuCVeizWcnRoEtflIM/dFpTgrTojnxJYiKtNybo49rBfEEaoHb7mvioi9jyu78J/xPoLmFXGRiB9KQr4JZVSjY4jCxhsv3b33XSX0UoqMcGoq44V7IX9E9H/h2JDQ5FzvfFklbasVVUd7lOAXtpWydr8WK6qWADhZPBFrqQZ8WzFrNbK2ObO1Med6L3e+/a7nwVstaEi5aaaTb75q8Yzs7du6WauaAtJoiPwVYABXkJsUwMgdxwAAAABJRU5ErkJggg==") no-repeat;
    }
    .teamIcon{
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcyMDhERjk3M0VDQzExRThCNUZDQjE5OTlFMUUxNTc0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcyMDhERjk4M0VDQzExRThCNUZDQjE5OTlFMUUxNTc0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzIwOERGOTUzRUNDMTFFOEI1RkNCMTk5OUUxRTE1NzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzIwOERGOTYzRUNDMTFFOEI1RkNCMTk5OUUxRTE1NzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6NDwRcAAAE60lEQVR42rxYW0xcVRQ9MyBF4hDIIAlRB2EKBVGpjzi2PtpiIrZUpYn++IhJNcYfwaQfJv7ZRBM/ba0xRn9M/0xaaoyFj/pIaooapYoYZVASUo0hEKDyGsoMrnWzbrlzZ6bzuMPsZM2Ze885e697HvvsfXwbGxvGiwwNDZWjeBF4DujU65+Bk8DH3d3d6170+7wQBLkgigHgwQxNzgO9IDlbcoIg50PxJbC3srLStLa2mrq6OqtuZmbGjI+Pm9XVVT5+A+wDyYIMlXsY/UMkV1FRYSKRiCFJWxoaGkxtba0ZHh42sVhsj9qeyvChaZXjg6zS74Hg8/wJh8NJ5Gzhu+bm5qS2hYgXgvfyx57WdOKoe6BQI+UFrL3rURzmTFoKyjOrcNTdiH5RlO9qZ69syQjCyJMofgfeA8r4bmFhIWN7R10M2A4cZ3/o6S3qCELhNhTHgJf16g/gR+CZyclJayp9Pl9SH3oH1kneVJ+3gR3Aaej8EGWfyBc+glBUjeKsyNFv9AO3A68C03Nzc2Z0dNSsr2/6Y/7nO9axDfA+pvWU+pHUsvRRb3XBfhDkKqSkC7gE9MDQL456OugvgEBZWZmpqamx3s/Pz5t4PM6//wEH0Oe8S++d6neTfOl+YK0QN3PcQW6Pk5yU0PAu4BwJzc7OWhC5c8BuNzn1o56HpLdLdvIbQS3k05pWGhrJshRCKO7Q4yjaT+WwfHaiuEC3KWc+4B7BtATlSrhbabQfjY+ZLRLY6pP74Qe1ASu5TPFhkeNUnDBbKydkJ6SoKKdd3K/yKL4kvsUEqf+o/vdlJYghj6BoAf4FzpjSyBnZo91IthF8VOWA12AzD1nXhnTaz0jwfpVfmdLK1yp3ZSPYrvK3EhO07bVlIxhU+XeJCV6yo7RsBO2zsQsb5tYSEKONJ4DH9BxIe5KAzG75pJ0uBWflrKNFdtBtCtsecVUlgIdh79urBNH4cfz/FNjGHIOHfiKRsKIRnasMS7rQ6WKRyN2lIKGGQQbzF7/fbwUZa2tWzHAFeAr2PvMNDg42KFYLhEIhKztjJwobj42NmelpRkzmL+A2dIp5JMfYcozpTH19veno6DAcFMtjYzCYDU5NWcf4ItDKNXiE5Ni4vb39KjkKO3Z2dppAwFoWzIBeKMIAMsEPUyd12+QotE0O5AK5gdxI8CCfmpqa0ke0GPrGxkb7sacIBLmcLJ3UnU4cXA76lSuY6urMga1GkHJLEQiGXDpT3cgml+1+xXtJIXvKaR6PO5MfrxJz6Uw99za5XCbB7+3rikziqBspAsGRPOxd9OsWykxMTNhbPEmWlpbsXWXsth7F0kGdi4uLKZXkQC52W7oZpp7DwD1VVVWWmwkGg5YfpHuJRqM2cUY3h4rkB0nyWe7glpYWa9dywzCfoZtZXmbSZ35i6GU7avrCz4G7s5yVPe7EqUCC9+nWqzJDE9rYD1v/OI86OqRX5Kc65M25Xj7R5c8+5bOvAx8UEivqspM23gGq5LDnlGxdp+eT0r+W8/1ghpuFNzTtiRz6c60zS3zLEU5d82YhJavLdE/nkl5lYCE9T+kM53T9qmVwRaNxs2ZiL/C0q89rjgj6mveD+d5uMW/ll7ykxCqso/JIDn3/1Md9ZKeWW3XDuqKbAIKL/YDKHQo2eQxcpjvTUvhBIdt3vFPK19j/AgwAAq3mUMGmxVsAAAAASUVORK5CYII=") no-repeat;
    }
    .companyIcon{
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAfCAYAAACPvW/2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcwNDhBNTMwM0VDQzExRTg5QTBGRkI5Njc0RDgxMUJCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcwNDhBNTMxM0VDQzExRTg5QTBGRkI5Njc0RDgxMUJCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzA0OEE1MkUzRUNDMTFFODlBMEZGQjk2NzREODExQkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzA0OEE1MkYzRUNDMTFFODlBMEZGQjk2NzREODExQkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7nJlLCAAAA7ElEQVR42mLcsWMHAxJQBeIOIHYBYj4GwuATEO8B4gogvs1ABcCCxFYH4hNALECCfpCjg4DYCYgtgPgmpQ5iQmK3QR2zHYilgJiRCCwFVS8A1c9ATQe5QOlkIH5OpP7nUPUg4EZtB/EhWUIKgKnnobaDBgUYcg46DMT/seDDgy2EGGnlIBYC8rajaYjK5q0F4o840h06/ghVr0pLBwURWQciVzunoNUWTRxEcbVD7WxPcbVD7WxPcbUzorI9WaX8QJRDjJSU1JQA28EWZaO1/WhtP5rtR7P9kHUQLPHBwH8yMLX0Hh5sIcQIEGAAPQNlJUiWKaYAAAAASUVORK5CYII=") no-repeat;
    }
    .adviceIcon{
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAhCAYAAACxzQkrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZENkJDMjQ1M0VDQzExRTg5QTdDQzE3N0M1ODc2Q0U1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZENkJDMjQ2M0VDQzExRTg5QTdDQzE3N0M1ODc2Q0U1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkQ2QkMyNDMzRUNDMTFFODlBN0NDMTc3QzU4NzZDRTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkQ2QkMyNDQzRUNDMTFFODlBN0NDMTc3QzU4NzZDRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5bDxm0AAAB+klEQVR42uyYTygEURzHZ5gV2uRCTg6EVhTFCUnKARcOOMjBxYEo+X/BzUGRRDlIysVFabHlT2gpDjiIOKDcFFm2Vaz4/uo3NY2Z3cXMmrK/+tSveTvvfWbemzfzW9HlcglBwg2KBOPjBdyAdTAKbulgVAgnvgnmRBxwgHZwCqpCFSoD8UA0GOqzGpyBBLAIUiUdCTohUXUs9hd34xF8aEzZCi+JfZAN+pRCdtAKGkEWsBk4PTTtF2ABTAKvos1DImAZVIi8qNPAKovIHXgNFLIrLpDEKsGVqv0Z+CWeyzWQCY5AN9gB7wYKRYNSfpryAd2FPODjdvniJVrUbSxzAkrAlsEyAvdH/RaDY5DB434JEmrgvF9hbFZQ/wOc1+sJ5XC+K4Qn5HEcekI2hX04wqfYGDWFLBURoYhQROjfCUkWcvmwmtC41YQ6LbuonzhPCdOY8jj3ekLuQN8nJoQ8zqGe0DTnw6DAZJlCHodiSu+xd4J50AT2wCzY5NJFHRuqUqkHPIDrICJUUpWDZhDD4zk16y+uOkhsBHQEefJERT4Ihr55h/xgAvRyrrsxUmMXmAF1/HmZHKDjGhaij/dtjSJQHXfgnKvTy0A/FEP4s0EduVxp2nnvGPvLd1kSWGKZOaNlfiJEU5oODkCLFd72Hi6Fa8GrGUKfAgwAmRxnQNEQPRMAAAAASUVORK5CYII=") no-repeat;
    }
    .scoreIcon{
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAdCAYAAADLnm6HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZBMDRGQjA0M0VDQzExRThBMDI3ODYwQUExNTRCN0ZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZBMDRGQjA1M0VDQzExRThBMDI3ODYwQUExNTRCN0ZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkEwNEZCMDIzRUNDMTFFOEEwMjc4NjBBQTE1NEI3RkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkEwNEZCMDMzRUNDMTFFOEEwMjc4NjBBQTE1NEI3RkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4XygHxAAABm0lEQVR42sSXvS8EQRjG95aoHBcFEv+AQiESH7WIRkdFQaGgUFC56IXVaDRCJUEUOsUWKtVJRHKiEbVoRVxxEs7zXp43GRvZmN3ZvUl+2d3Z3Pye+djb2UIYhl5OZQe8gcCsbDfOO8AqmAdDoDOBpBAjLxvXQTTAALgCwxn1XORfwAe7ZgifPVf5M5gD3eyNLXHyJbAGGgyxqSOwQvkTmOA8ue65yE+Newc6EjICC6zcykkujm+e90iAEV5c5yCXzp6ANrAn06BrQMp73nKdAq8VPdcbfivlrgIklrsI8F958Jc8bQAbeTny2wb59S5IKl8EZxby1CPgTJ4kgFO5bQDncpsAmchtAmzwuOxSbhNA35I3LuU2j6EE6AOT4BaMgqO0ctsAUo4j9ankNgEuwCvo5Uj0c1eTSq4BPrkn6IrZE+wTF0V32x+6CO9ZMZXT98E0j48a4JwV26CUsbxEj6deCXAIqmAQVMAsKDoWF9luhZ4HeptroA5mjG+Dy4xHoUpf3fwjegHjYB3cgZpjaY3tSvtj9DXLjwADAOUuiZaTAMs+AAAAAElFTkSuQmCC") no-repeat;
    }


</style>
