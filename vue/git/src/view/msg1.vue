<template>
   <div class="msg1">
        <div v-if="type=='order'">
            <div v-if="newArr!=''">
             <div class="item" v-for="item in newArr">
                 <div class="time">{{item.createtime}}</div>
                 <div class="itemCon">
                     <div class="con-title">{{item.title}}</div>
                     <div class="con-con">{{item.content}}</div>
                 </div>
             </div>
             </div>
            <div class="empty" v-if="newArr==''">
              <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
              暂无消息
            </div>
        </div>

        <div v-if="type=='service'">
            <div class="item">
               <div class="time">09:50</div>
               <div class="itemCon">
                   <div class="con-title">服务公告</div>
                   <div class="con-con">
                       <p>温馨提醒:</p>
                       <p>1、2月8日-18日签收的订单，7天自助退换货操作延长至20天，您可在网站或移动APP订单中自助操作退货申请，收到退货包裹后会办理退款;</p>
                   </div>
               </div>
           </div>
        </div>
         <div v-if="type==3">
            
        </div>

        <div v-if="type=='notice'">
            <div v-if="newArr!=''">
              <div class="item" v-for="item in newArr">
                 <div class="time">{{item.createtime}}</div>
                 <div class="itemCon">
                     <div class="con-title">{{item.title}}</div>
                     <div class="con-con">
                         <p>{{item.content}}</p>
                     </div>
                 </div>
              </div>
            </div>
            <div class="empty" v-if="newArr==''">
              <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
              暂无消息
            </div>
        </div>

        <div v-if="type=='sale'">
            <div v-if="newArr!=''">
              <div class="item" v-for="item in newArr">
                 <div class="time">{{item.createtime}}</div>
                 <div class="itemCon">
                     <div class="con-title">{{item.title}}</div>
                     <div class="con-con">
                         <p>{{item.content}}</p>
                     </div>
                 </div>
              </div>
            </div>
            <div class="empty" v-if="newArr==''">
              <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
              暂无消息
            </div>
        </div>
   </div>
</template>

<script>
    import api from '../network/request'

    export default {
        name: "msg1",
        components: {
        },

        data() {
            return {
                type:'',
                page:0,
                newArr:''
                
            }
        },
        methods: {
        	 info:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token'),type:this.type,page:this.page};
                api.post('message/news',params,res=>{
                  if(res.status==0){
                     console.log(res)
                     _this.newArr=res.data
                     // _this.msgInfo=res.data
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                })   
            },
           
        },
        created() {
            this.type=this.$route.params.type;
            this.info();

        }
    }
</script>

<style scoped>
    .empty img{
      width: 50px;
      height: 60px;
      margin-bottom: 10px;

    }
    .empty{
      padding-top: 100px;
      font-size: 14px;
      display: flex;
      align-items: center;
      flex-flow: column;
      color: #999;
    }
    .item{
        position: relative;
    }
    .time{
        position: relative;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 12px;
        color: #979797;
    }
    .itemCon{
        width: 325px;
        margin: 0 auto;
        padding: 12px;
        background-color: #fff;
    }
    .con-title{
        padding-bottom: 14px;
        font-size: 16px;
        color: #000;
        border-bottom: 1px #EEEEEE solid;
    }
    .con-con{
        padding-top: 14px;
        font-size: 14px;
        color: #6C6C6E;
    }
</style>
