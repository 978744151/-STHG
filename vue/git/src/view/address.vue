<template>
    <div>
        <!-- <div class="head">
            <div class="backBtn"></div>
            <div class="title">收货地址</div>
            <div class="status"></div>
        </div> -->
        <div class="content" v-if="list!=''&&emptyStatus">
            <div class="addressItem" v-for="(item,index) in list" @click="chooseAdd(item.id)">
                <div class="Info">
                    <div class="firstRow">
                        <span>{{item.realname}}</span>
                        <span>{{item.mobile}}</span>
                    </div>
                    <div class="secRow">
                        {{item.province}}{{item.city}}{{item.area}}{{item.address}}
                    </div>
                </div>
                <div class="handle">
                    <div class="defaultBtn" @click.stop="defaults(item.id)"><span :class="{change:item.isdefault==1,defaultIcon:true}" ></span>设为默认</div>
                    <div class="rightBtn">
                        <div class="editBtn" @click.stop="change(item.id)"><span class="editIcon" ></span>编辑</div>
                        <div class="delBtn" @click.stop="del(item.id)"><span class="delIcon" ></span>删除</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty" v-if="list==''&&emptyStatus">
            <img src="https://pic.repaiapp.com/static/png/20180613/10/1528858078356110154.png">
        </div>
        <div class="addBtn" @click="handleAddAddress">新增地址</div>
        
    </div>
</template>

<script>
    import api from '../network/request'
    import { Toast } from 'vant'
    export default {
        name: "addresss",
        components: {

        },
        data(){
            return {
                "list":'',
                emptyStatus:false,
            }
        },
        methods: {
            //跳转商品详情页
            // particulars: function (id) {
            //     // console.log(id)
            //     this.$router.push({name: 'particulars', params: {'id': id}})
            // },
            chooseAdd:function(id){
                var _this=this;
                if(_this.type==1){
                    localStorage.setItem('chooseAddId',id);
                    setTimeout(function(){
                        _this.$router.go(-1);
                    },200)
                }
                
            },
            //获取用户地址信息
            getAddressData() {
                const access_token = localStorage.getItem("access_token");
                const params={access_token:access_token};
                var _this = this;
                api.post('user/address', params, res => {
                    if (res.status == 0) {
                        console.log(res);
                        _this.list = res.data.lists;
                        _this.emptyStatus=true;
                    }
                })
            },
            //删除地址
            del:function(id){
                const access_token = localStorage.getItem("access_token");
                const params={access_token:access_token,id:id};
                var _this = this;
                api.post('user/del_address', params, res => {
                    if (res.status == 0) {
                        console.log(res);
                        Toast.success("删除成功")
                        // $(".sj-hint").html("删除成功").fadeIn().delay(1500).fadeOut();
                        _this.getAddressData();
                        // _this.list = res.data.lists;
                    }
                }) 
            },
            //设置默认
            defaults:function(id){
                const access_token = localStorage.getItem("access_token");
                const params={access_token:access_token,id:id};
                var _this = this;
                api.post('user/default_address', params, res => {
                    if (res.status == 0) {
                        console.log(res);
                        Toast.success("设置成功")
                        // $(".sj-hint").html("设置成功").fadeIn().delay(1500).fadeOut();
                        if(_this.type==1){
                            setTimeout(function(){
                            _this.$router.go(-1);
                          },800)
                        }
                        _this.getAddressData();

                        // _this.list = res.data.lists;
                    }
                })
            },
            //重新编辑地址
            change:function(id){
                var _this=this;
                var addInfo='';
                for(var i in _this.list){
                    if(id==_this.list[i].id){
                        addInfo=_this.list[i];
                        break;
                    }
                }
               this.$router.push({name: 'addAddress',params:{addInfo:addInfo}})
            },
            //跳转到新增地址页面
            handleAddAddress() {
                this.$router.push({name: 'addAddress', params: {addInfo:''}})
            }
        },
        created() {
            var obj=this.$route.params;
            var _this=this;
            if(obj.hasOwnProperty("type")){
                _this.type=this.$route.params.type
            }
            
            this.getAddressData();
        }
    }
</script>

<style scoped lang="scss">
    .empty{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #999;
        padding-top: 100px;
    }
    .empty img{
        position: relative;
        width: 129px;
        height: 127px;
        margin-bottom: 10px;
    }
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
        .addressItem{
            margin-bottom:10px ;
            background: #fff;
            .Info{
                padding: 13px 15px 12px 15px;
                border-bottom:1px solid #dadada;
                .firstRow{
                    overflow: hidden;
                    font-size: 15px;
                    color:#000;
                    margin-bottom:2px;
                    span:first-child{
                        float: left;
                    }
                    span:last-child{
                        float: right;
                    }
                }
                .secRow{
                    font-size: 13px;
                    color:#2a2a2a;
                }
            }
            .handle{
                padding:14px 16px;
                font-size: 14px;
                color:#000;
                overflow:hidden;
                .defaultBtn{
                    float:left;
                    .defaultIcon{
                        display: inline-block;
                        vertical-align: middle;
                        width: 14px;
                        height: 14px;
                        margin-top: -2px;
                        margin-right: 3px;
                        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxQjU4ODFBM0VFRTExRThBNTdDQkRGQTkzQzEyOEZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkxQjU4ODFCM0VFRTExRThBNTdDQkRGQTkzQzEyOEZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTFCNTg4MTgzRUVFMTFFOEE1N0NCREZBOTNDMTI4RkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTFCNTg4MTkzRUVFMTFFOEE1N0NCREZBOTNDMTI4RkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5PyeKHAAACYElEQVR42ryWTYtSURzGj17Qhflyw5edEr4UrZScRWURLoQmahNMm6S+Rn2Amg/QBxiwTdNyeiEEF1M0Cx0QV5MpoTtf4Kq4MTR7Huc4i0qzq6cHHv56lf+Pc+695/9YptOpWKZcLmdBuQHfga/DEViXPxtwDf4Mv4E/ZrPZpQ0ti4AAWVEew088Hk8kFAoJv98v3G63sNvts/+MRiPR7/dFu90WjUZD9Ho9wp/DewD/WBkI2AWUVwBsJRKJGWgVEVwul0Wr1Sri6wNAv/0VCNgtTdNeJ5NJbywWE2ZUrVZFqVTqTiaT+4AeLgQClrHZbAfpdNrm8/nEOup0OqJQKHyH7gH64TcgYBexsmImk3F6vV6xCXW7XZHP54fj8TgJ6Bdes0qYxoJt3BiMYi/0PHeKmDFOgdAjPiBm79kyRaNREQgEtuQTL7RwOMz3bD+VSp13OBxChZxOp6jX65crlcoLrvCmruuRVR99M2JvMsgicDsYDArVkoxtAq+pXN1cuI8sVwmM8rhSLZfLxRIjUJ+fjSolGbpV/GcRaPDUVy3JMAj8yhGjWoPBYHauE3jEsaJaGFksRwS+bTabyoGS8Y7AQ8MwaipXyd5kMIJYZQbZ5aRWJdl7l7Fj/lrsYY9LnNSbVq1W4/07JuNsPIE8YUEsGHJobkrsVSwWh/j4UDLO5iGhJ8ggO4wFjAfrah4xMO132HtZiLqNqLHPSb1miBpyAYC9XyUmXkJ5iRP+SjweNxMTj+U2npgJwk8RhMMrBuE6Lj/75yD8B3AKvsvZCYd/ifp1GfUP4E+LQHP9FGAASZs2iAPYsbgAAAAASUVORK5CYII=") no-repeat;
                        background-size: contain;
                    }
                    .change{
                        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlFRjVGMTRGM0VFRTExRTg5NkRBQUYwNDY1QkE0OUVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlFRjVGMTUwM0VFRTExRTg5NkRBQUYwNDY1QkE0OUVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUVGNUYxNEQzRUVFMTFFODk2REFBRjA0NjVCQTQ5RUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUVGNUYxNEUzRUVFMTFFODk2REFBRjA0NjVCQTQ5RUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6nmvlkAAAB7UlEQVR42rSWTUsCURSGxzEsohKhPyBZrtql0pe0yAIjqE0QFAX9idy0Cuo3BEZQyxZ9KtUuIyMQWtqHm9aBBC5CUHsPnInbMHdmnBlfeGByrufJO/fOPb7XxKhiER+YBgtgEkRAiO9VwQd4BFegAFqmxUyEKtgEGZbYCcn3wBFoyooaJQyeQLYNmcJjs/zdsF3hDHgGMcV5YlwjaSWcAzdgUHEfqnEH5mXCKDgFAcW7BLhmVC/0g2PQr3ifPq7tF4UbLp+ZmG9hpbaEZ0orXunifZbxSPYFUuCF/+4Gq3y9DQ5VXkmRDsi0XytumSQJ0x2SzWrTKCRNwgmDAhfgAPy4kJ2DHt3YcXqGw7oPz8AyX5+AHK+0dmW9BuNHVOFFrOVTuC7wlNdsylImMkrI6NVG8x63kMpkZyayv41f1X02AG5NpI5l5CLhu8GNoInUqYzyRsKi5KZM6lRGKZLw2mSAkdSpjJIj4T2f1FbShEsZOQoqv2D3LQYH+WzbAbsWS18WcjS1nsbPbcGY0pmUeIYa2j5sgHXJBncbqrnGjn8nfhmsgLqHsjrXLMt6mjxY8uiX1rhW3qpry/MJXXL5zGJ6mVlfWua9twUqbYgq/J24OI12O2/xn5oCi3x2Dula/Qq3+pfgQdZxa/kVYAA4o39afXu1twAAAABJRU5ErkJggg==") no-repeat;
                        background-size: contain;
                    }
                }

                .rightBtn{
                    float: right;
                    div{
                        float: left;
                        margin-left:10px ;
                    }
                    .editIcon{
                        display: inline-block;
                        vertical-align: middle;
                        width: 14px;
                        height: 14px;
                        margin-top: -2px;
                        margin-right: 3px;
                        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEzOUQyOEZEM0VFRTExRThCQkJDQ0Y4NjE0ODQ2RUFEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEzOUQyOEZFM0VFRTExRThCQkJDQ0Y4NjE0ODQ2RUFEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTM5RDI4RkIzRUVFMTFFOEJCQkNDRjg2MTQ4NDZFQUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTM5RDI4RkMzRUVFMTFFOEJCQkNDRjg2MTQ4NDZFQUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7YC1yzAAAB/0lEQVR42sSXyysFURzH5x7PyLsslPIvIOQRCXlmgY2y8SolSSRJ7pUkSfJKKY8ilDySCHvFCgsLlsqCsqc8vj/9bv0S7lwzZ+6pT835dX4zn86ZOb85LrfbbQSohYNkcKdEYArcgw8LVJoUiAdn4BaMBXNwFjQ7NANx4BSkcr+eJMJAA3gDOeBCo0AsC6Rxn57ZS8uRyCIPmgViwAlIFwKNYJMkXBz80CxwDDKEQAtYpY5y4B0ggSOQxf130ApWvAN0S0SDQ5AtZpsEluUgnRJRLJDzTWDp+0BdEpEskCsE2sDiT4N1SESwQJ4QaAcLvyUoTQL5QqADzP+VpGwWOAAFQqATzPlKVDYK7INCIdAFZswkK5sE9kCRiHVzQTSckKDquwNKRKwHTPpzEysSVG92QamI9YIJH3lJXKdGrEqEskCZiPWBcRO5tHckiE3sXxJegXIR66efE5P5IXyPh/9KUPI2qBCxQTBq5cVSfgpsgSoR84Bhq5+X8kNgA1SL2BBjOCFBa7gOakRsmGfBcEIiiAVqRWyE3wPDKYl6UCf69AUM2F12fUlcg1e+Hue9wPYWbEKCzgcpXKKNQEhQu2G0NSV+9V2BOJB6PJ4viUdedyosmZqfSZ97MV8/yeV4AWugCZw7NAGvP5076Ed0GjxrfjgdfK545730Bj8FGADxVmvP/XQrDAAAAABJRU5ErkJggg==") no-repeat;
                        background-size: contain;
                    }
                    .delIcon{
                        display: inline-block;
                        vertical-align: middle;
                        width: 14px;
                        height: 14px;
                        margin-top: -2px;
                        margin-right: 3px;
                        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAjCAYAAACD1LrRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDREQ5NTczM0VFRTExRThCMzVCQUJDODYxNkNBMDhCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDREQ5NTc0M0VFRTExRThCMzVCQUJDODYxNkNBMDhCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUNERDk1NzEzRUVFMTFFOEIzNUJBQkM4NjE2Q0EwOEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUNERDk1NzIzRUVFMTFFOEIzNUJBQkM4NjE2Q0EwOEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7XnDv3AAABh0lEQVR42mKsr69nIACigLgKiDWAmJmA2r9AfAOI24B4GT6FLAQMigfiBQzEA5DDtIF4KRCzAvFCci1ugtJ/gHgREL8moF4UiOOg5jaRazEvEMtB2cVAPIlIX18E4olQvSAzPmNTxITHAGS5WyQE9y1izAf5mBOIzaBxggy4kdgzgLgAiB8TsFQWiCcg8R2A+Cuamt9AfApk8T4gtiBgoDwQr2cgHWzAIX4SFBRcDPQHnCAf2wGxCRAz0snS/0B8BmTxRyDeS28vo6e6pVAXXaKBL0G4nZjsRFcfD1qLE4G4Hos+HiDuBWIPYg1iIcFSSSCeC039J4B4J5JcBhAXQSsVEWr7WAQpywmjyQnjEB/6cTxq8ajFoxaPWkyWxU+B+AeUfR9N7i4OcapUEu+A2AmIxYH4OJrcfCD+BWo90sJiBiwWIveZFo0mrsFk8W9ccfwNqddXTgOLH+OyeD8QpwCxBBB3UNlSUBd3Ha6gXg7EtUB8D5pSKQX/oL4E9ZMtgfgtTAIgwAC/a0LAB0di1gAAAABJRU5ErkJggg==") no-repeat;
                        background-size: contain;
                    }
                }
            }
        }
    }
    .addBtn{
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
        background:#d9372d ;
    }

</style>
