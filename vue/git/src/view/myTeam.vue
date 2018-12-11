<template>
   <div class="myTeam">
       <div class="head">
         <div v-for="(item,index) in head">
           <p :class="index==sel?'active':''" @click="changeHead(index)">{{item.title}}</p>
         </div>
       </div>
       <van-list v-model="loading" :finished="finished" @load="onLoad" >
         <div class="Con">
            <!-- 加盟商 -->
             
              <div class="franchisee">
                <div class="franchiseeItem" v-for="item in orderlits" v-if="orderlits!=null||orderlits!=''">
                  <div class="franchiseeItemLeft">
                    <img :src="item.avatar">
                    <div class="meng" v-if="sel==0"></div>
                  </div>
                  <div class="franchiseeItemRIght">
                      <div>
                       <!--  {{item.nickname}} -->
                        <p>
                          <span v-if="item.newnickname!=''" style="font-size: 13px;color: #333">{{item.newnickname}}</span>
                          <span v-if="item.newnickname==''">--</span>
                          <span>创建于{{item.agenttime}}</span>
                        </p>
                        <p style="font-size: 12px;color: #999">{{item.mobile}}/{{item.inviter_code}}</p>
                        
                        
                      </div>
                      <div>{{item.level}}</div>
                  </div>
                </div>
              
              <div class="empty" v-if="orderlits==null||orderlits==''">
                <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
                暂无数据
              </div>
           </div>
         </div>
       </van-list>
   </div>
</template>

<script>
    import api from '../network/request'
    import { List } from 'vant';
    export default {
        name: "myTeam",
        components: {
        },

        data() {
            return {
              sel:0,
              head:[{title:'加盟商'},{title:'会员'}],
              memberArr:'',
              orderlits:[],
              sw:false,
              page:0,
              loading: false,
              finished: false,
            }
        },
        methods: {
           changeHead:function(index){
              var _this=this;
              _this.sel=index;
              this.sw=false;
              this.loading=false;
              this.finished=false;
              this.page=0;
              this.orderlits=[];
              setTimeout(function(){
                _this.onLoad();
              },800)
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
              var _this=this;
              if(_this.sel==0){
                var type=1
              }else{
                var type=0
              }
              const params={access_token:localStorage.getItem('access_token'),page:this.page,type:type};
              api.post('commission/get_member_commission_people',params,res=>{
              console.log(res);
                if(res.data==''){
                  _this.sw=true;
                }else{
                  _this.orderlits=_this.orderlits.concat(res.data);
              }
                  // if(res.status==0){
                  //   _this.memberArr=res.data
                      
                  // }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
              })
           }
        },
        created() {
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
  .head{
    position: relative;
    background-color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .head div{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .head div p{
    height: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #333333;
  }
  .head div p.active{
    border-bottom: 1px #c91616 solid;
    color: #c91616;
  }
  .Con{
    position: relative;
    margin-top: 10px;
  }
  .franchiseeItem{
    position: relative;
    background-color: #fff;
    border-bottom: 1px #ddd solid;
    padding: 0 10px;
    height: 80px;
    display: flex;
    align-items: center;
  }
  .franchiseeItemLeft{
    position: relative;
    width: 50px;
    height: 50px;
    border: 1px solid #d44040;
    border-radius: 50%;
    margin-right: 12.5px;
  }
  .franchiseeItemLeft img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .meng{
    position: absolute;
    width:17.5px;
    height: 15px;
    background-image: url('https://pic.repaiapp.com/static/png/20180412/15/1523516787359705155.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    bottom: 0;
    right: -6px;
  }
  .franchiseeItemRIght{
    position: relative;
    flex: 1
  }
  .franchiseeItemRIght p{
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    color: #333;
    font-size: 16px;
  }
  .franchiseeItemRIght p span{
    color: #999999;
    font-size: 12px;
  }
  .franchiseeItemRIght div{
    color: #999999;
    font-size: 12px;
  }
</style>
