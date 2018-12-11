<template>
   <div class="opinion">
       <div class="content">
           <textarea placeholder="请输入反馈意见" ref="input1"></textarea>
           
       </div> 
       <div class="btn" @click="comfirm()">提交</div>
   </div>
</template>

<script>
    import { Toast } from 'vant';
    import api from '../network/request'
    export default {
        name: "opinion",
        components: {
        },

        data() {
            return {
                
            }
        },
        methods: {
            comfirm:function(){
                if(this.$refs.input1.value==''){
                    Toast('请输入反馈意见');
                    return;
                }
                var _this=this;
                const params={access_token:localStorage.getItem('access_token'),content:this.$refs.input1.value};
                api.post('user/feedback',params,res=>{
                console.log(res);
                    if(res.status==0){
                        Toast.success("提交成功");
                        this.goback();
                    }
                    if(res.status==600){
                          this.$router.push({name: 'login', params: {}})
                    }
                }) 
            },
            goback:function(){
                var _this=this;
                setTimeout(function(){
                    _this.$router.go(-1);
                    Toast.clear();
                 },2000)
                
            },
            
           
        },
        created() {
        }
    }
</script>

<style scoped>
    .content{
        position: relative;
        width: 100%;
        height: 170px;
        box-sizing: border-box;
        background-color: #fff;
        padding: 10px;
    }
    .content textarea{
        width: 100%;
        height: 100%;
        font-size: 14px;
        outline: none;
        border: 0;
    }
    .btn{
        position: relative;
        width: 345px;
        height: 45px;
        color: #fff;
        background-color: #d9372d;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
        border-radius: 5px;
        margin: 60px auto;
    }
</style>
