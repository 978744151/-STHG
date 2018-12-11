<template>
   <div class="msg">
        <div class="item" @click="msgs(item.type,item.name)" v-for="item in msgInfo">
            <div class="left">
                <img :src="item.img80">
                <div class="tips" v-if="item.count!=0">{{item.count}}</div>
            </div>
            <div class="right">
                <p>
                   {{item.name}}
                   <span>{{item.time}}</span> 
                </p>
                <div v-if="item.msg!=''">{{item.msg}}</div>
                <div v-if="item.msg==''">无最新消息</div>
            </div>
        </div>


        <!-- <div class="item" @click="msgs(2)">
            <div class="left">
                <img src="https://pic.repaiapp.com/static/png/20180428/15/1524899946264910051.png">
            </div>
            <div class="right">
                <p>
                   通知消息
                   <span>昨天</span> 
                </p>
                <div>香天下手提火锅新口味已上新，欢迎购买品尝，新香天下手提火锅新口味已上新，欢迎购买品尝，新</div>
            </div>
        </div> 


        <div class="item" @click="msgs(3)">
            <div class="left">
                <img src="https://pic.repaiapp.com/static/png/20180428/15/1524899964205410151.png">
            </div>
            <div class="right">
                <p>
                   客服消息
                   <span>18/02/16</span> 
                </p>
                <div>【系统消息】您好，由于很久没有收到您的消息我【系统消息】您好，由于很久没有收到您的消息我</div>
            </div>
        </div> 

        <div class="item" @click="msgs(4)">
            <div class="left">
                <img src="https://pic.repaiapp.com/static/png/20180428/15/1524899980759300100.png">
            </div>
            <div class="right">
                <p>
                   售后消息
                   <span>18/02/16</span> 
                </p>
                <div>点击查看退货，退款及换货</div>
            </div>
        </div> 

        <div class="item" @click="msgs(5)">
            <div class="left">
                <img src="https://pic.repaiapp.com/static/png/20180428/15/1524899998315753100.png">
            </div>
            <div class="right">
                <p>
                   提醒消息
                   <span>昨天</span> 
                </p>
                <div>您已成功预约今日特价【香天下手提火锅麻辣味您已成功预约今日特价【香天下手提火锅麻辣味</div>
            </div>
        </div>  -->

   </div>
</template>

<script>
    import api from '../network/request'

    export default {
        name: "msg",
        components: {
        },

        data() {
            return {
                msgInfo:'' 
            }
        },
        methods: {
            info:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('message/lists',params,res=>{
                  if(res.status==0){
                     console.log(res)
                     _this.msgInfo=res.data
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                })   
            },
            msgs:function(type,name){
                if(name=="客服消息"){
                    // return;
                    window.location.href="https://static.meiqia.com/dist/standalone.html?_=t&eid=16965"
                }else{
                    this.$router.push({name: 'msg1', params: {type:type}})
                } 
            }
        },
        created() {
            this.info();
        }
    }
</script>

<style scoped>
    .item{
        position: relative;
        height: 75px;
        background-color: #fff;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 15px;
        padding-right: 11px;
    }
    .left{
        position: relative;
        height: 40px;
        width: 40px; 
        margin-right: 15px;
    }
    .left img{
        width: 40px;
        height: 40px;
    }
    .right{
        position: relative;
        flex:1;
        display:flex;
        flex-flow: column;
    }
    .right p{
        font-size: 16px;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
    }
    .right p span{
        font-size: 12px;
        color: #979797;
    }
    .right div{
        font-size: 13px;
        color: #808080;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .tips{
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #ef3503;
        color: #fff;
        right: -5px;
        top: 0;
        font-size: 11px;
        text-align: center;
        line-height: 15px;
    }
</style>
