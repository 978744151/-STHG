<template>
   <div class="withdrawBill">
      <div v-if="listArr!=''">
        <div v-for="(item,index) in listArr">
          <div class="item-head">
              <span>{{item.time}}</span>
              <p v-if="index==0">
                <span @click="choosetime()">筛选</span>
                <img src="https://pic.repaiapp.com/static/png/20180413/14/1523600681084156101.png">
              </p>
          </div>
         <div class="item"  @click="withdrawDetail(j.id,j.deductionmoney)" v-for="j in item.data" v-if="item.data!=''">
             <div class="left">
                 <p>
                     <span>奖金提现</span>
                     <span>{{j.commission}}元</span>
                 </p>
                <div class="server_money" v-if="j.deductionmoney!=0||j.deductionmoney!=0.00">
                  <div @click.stop="tips()" style="display: flex;align-items: center;">
                    ( 含<span>¥{{j.deductionmoney}}</span>手续费<img src="https://pic.repaiapp.com/static/png/20180606/14/1528265948420556101.png" > )
                  </div>
                </div>
                 <p>
                     <span>{{j.dealtime}}</span>
                     <span style="color: #dd3232">{{j.statusstr}}</span>
                 </p>
             </div>
             <div class="right"></div>
              <div class="mask1" v-if="tipsStatus"></div>
              <div class="tips_popout" v-if="tipsStatus">
                <div class="tips_content">提现需扣除<span>{{j.charge}}%</span>手续费，请知悉</div>
                <div class="tips_footer" @click.stop="tips()">知道了</div>
              </div>
         </div>
         <div class="empty" v-if="item.data==''">
           <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
           暂无数据
          </div>
       </div>
      </div>

       
        <van-datetime-picker v-model="currentDate" type="year-month" class="time" v-if="show" @confirm="confrimday" @cancel="changeday"/>
        <div class="mask" v-if="show"></div>

        
   </div>
</template>

<script>
    import api from '../network/request'

    export default {
        name: "withdrawBill",
        components: {
        },

        data() {
            return {
                listArr:'',
                currentDate: new Date(),
                show:false,
                dates:'',
                year:'',
                month:'',
                tipsStatus:false,
                charge:''
            }
        },
        methods: {
          //查看手续费
          tips(){
            this.tipsStatus=!this.tipsStatus;
          },
          choosetime:function(){
              this.show=true;
            },
            confrimday:function(value){
              var _this=this;
              var d = new Date(value);
              var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
              this.dates=datetime;
              this.year=d.getFullYear();
              this.month= (d.getMonth() + 1);
              console.log(this.year);
              console.log(this.month);
              var _this=this;
              const params={access_token:localStorage.getItem('access_token'),year:this.year,month:this.month};
              api.post('commission/get_pay_log',params,res=>{
                  if(res.status==0){
                     console.log(res);
                     _this.listArr=res.data.list;
                     this.show=false;
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
            },
            changeday:function(){
              this.show=false;
            },
          info:function(){
                var _this=this;
                const params={access_token:localStorage.getItem('access_token')};
                api.post('commission/get_pay_log',params,res=>{
                  if(res.status==0){
                     console.log(res);
                     _this.listArr=res.data.list
                     // _this.money=res.data
                     // _this.msgInfo=res.data
                  }
                  if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                  }
                }) 
            },
            withdrawDetail:function(id,deductionmoney){
              this.$router.push({name: 'withdrawDetail', query: {id:id,deductionmoney:deductionmoney}})

              
            }
           
        },
        created() {
          this.info();
        }
    }
</script>

<style scoped>
    .mask1{
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.2);
      top: 0;
      left: 0;
      z-index: 2;
    }
    .tips_footer{
    position: relative;
    left: 0;
    bottom: 0;
    height: 50px;
    display: flex;
    align-items:center;
    justify-content: center;
    font-size: 15px;
    color: #DD3232;
    border-top: 1px solid #DCDCDC;
    width: 100%;
    box-sizing: border-box;  
  }
  .tips_popout{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    width: 250px;
    height: 138px;
    border-radius: 8px;
    z-index: 2;
    display: flex;
    flex-flow: column;
  }
  .tips_content{
    position: relative;
    display:flex;
    align-items: center;
    justify-content: center;
    flex:1;
    font-size: 15px;
    color: #000000
  }
  .tips_content span{
    color: #dd3232
  }
    .server_money{
      position: relative;
      display: flex;
      align-items: center;
      font-size: 11px;
      color: #777777;
      justify-content: flex-end;

    }
    .server_money span{
      color: #dc2c2c;
    }
    .server_money img{
      width: 10px;
      height: 10px;
    }
    .time{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      font-size: 14px;
      z-index: 2000;
    }
    .item-head{
      position: relative;
      height: 34px;
      background-color:#E9E9E9;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      color: #2B2B2B;
      padding: 0 14px;
  }
    .item-head p{
      display: flex;
      align-items: center;
  }
  .item-head img{
      width: 6.5px;
      height: 4.5px;
      margin-left: 10px;
   }
  .mask{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    z-index: 2;
  }
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
        background-color: #fff;
        padding: 0 15px;
        height: 70px;
        display: flex;
        align-items: center;
        border-bottom: 1px #ddd solid;
        /*justify-content: space-between;*/
    }
    .left{
        position: relative;
        display: flex;
        flex-flow: column;
        /*align-items: center;*/
        justify-content: space-between;
        flex:1;
        font-size: 15px;
        color: #000;
    }
    .left p{
        display: flex;
        justify-content: space-between;
    }
    .left p:nth-of-type(2){
        /*margin-top: 10px;*/
        font-size: 12px;
        color: #8c8c8c
    }
    .right{
        width: 6.5px;
        height: 12px;
        background-image: url('https://pic.repaiapp.com/static/png/20180413/16/1523609061994298102.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-left: 15px;
    }
</style>
