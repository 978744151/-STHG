<template>
   <div class="aboutUs">
        <div class="top">
            <img src="https://pic.repaiapp.com/static/png/20180518/16/1526631506950956102.png">
            <p>版本号2.1.0</p>
        </div>
        <div class="item" @click="go">
            <span >使用条款和隐私政策</span>
            <p></p>
        </div>
   </div>
</template>

<script>
    export default {
        name: "aboutUs",
        components: {
        },

        data() {
            return {
                
            }
        },
        methods: {
            go(){
                window.location.href="https://dc.xiaodian.in/addons/ewei_shopv2/static/html/page2.html"
            }
           
        },
        created() {
        }
    }
</script>

<style scoped>
    .aboutUs{
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #f6f6f6;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        /*flex-flow: column;*/
        font-size: 14px;
        color: #999;
        /*padding-top: 55px;*/
    }
    .top{
        position: relative;
        widows: 100%;
        height: 230px;
        display: flex;
        align-items: center;
        flex-flow: column;
        justify-content: center;

        /*background-color: */
    }
    .top img{
        height: 99px;
        width: 99px;
        margin-bottom: 10px;
    }
    .item{
        position: relative;
        height: 50px;
        display: flex;
        background-color: #fff;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #262626;
        padding: 0 10px;
        border-bottom: 1px #DADADA solid;
    }
    .item p{
        width:7px;
        height: 12px;
        background-image: url('https://pic.repaiapp.com/static/png/20180522/14/1526970282000653101.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
</style>
