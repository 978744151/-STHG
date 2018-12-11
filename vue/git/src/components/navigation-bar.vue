<template>
    <div class="navBar">
        <div class="nav-item" v-bind:class="{active:nav===0}">
            <router-link to="/">
                <img v-if="nav!==0" src="../assets/navBar/1.png" alt="">
                <img v-if="nav===0" src="../assets/navBar/1active.png" alt="">
                
                <p>首页</p>
            </router-link>
        </div>
        <div class="nav-item" v-bind:class="{active:nav===1}">
            <router-link to="/nearBy">
                <img v-if="nav!==1" src="../assets/navBar/2.png" alt="">
                <img v-if="nav===1" src="../assets/navBar/2active.png" alt="">
               
                <p>附近商家</p>
            </router-link>
        </div>
        <div class="nav-item" v-bind:class="{active:nav===2}">
            <router-link to="/find">
                <img  v-if="nav!==2" src="../assets/navBar/3.png" alt="">
                <img  v-if="nav===2" src="../assets/navBar/3active.png"  alt="">
                <p>发现</p>
            </router-link>
        </div>
        <!-- <div class="nav-item" v-bind:class="{active:nav===3}">
            <router-link to="/shopingCart">
                <img  v-if="nav!==3" src="../assets/navBar/4.png" alt="">
                <img  v-if="nav===3" src="../assets/navBar/4active.png"  alt="">
                <p>购物车</p>
            </router-link>
        </div> -->
        <div class="nav-item" v-bind:class="{active:nav===3}">
                <div @click="shopingCart()" class="change">
            <!-- <router-link to="/mine"> -->
                    <img  v-if="nav!==3" src="../assets/navBar/4.png" alt="">
                    <img  v-if="nav===3" src="../assets/navBar/4active.png"  alt="">
                    <p>购物车</p>
                </div>
            <!-- </router-link> -->
        </div>
        <div class="nav-item" v-bind:class="{active:nav===4}">
                <div @click="mine()" class="change">
            <!-- <router-link to="/mine"> -->
                    <img  v-if="nav!==4" src="../assets/navBar/5.png" alt="">
                    <img  v-if="nav===4" src="../assets/navBar/5active.png"  alt="">
                    <p>我的</p>
                </div>
            <!-- </router-link> -->
        </div>
    </div>
</template>
<!-- CB22F262-9A49-EE35-D678-21CD33A6CD0D -->
<script>
    export default {
        name: "navBar",
        data() {
            return {

            }
        },
        props: ['nav'],
        methods:{
            mine:function(){
                // alert(localStorage.getItem('access_token'));
                var access_token=localStorage.getItem('access_token')||'';
                if(access_token==''){
                    this.$router.push({name: 'login', params: {}})
                }else{
                    this.$router.push({name: 'mine', params: {}})
                }
            },
            shopingCart:function(){
                var access_token=localStorage.getItem('access_token')||'';
                if(access_token==''){
                    this.$router.push({name: 'login', params: {}})
                }else{
                    this.$router.push({name: 'shopingCart', params: {shopcartStatus:0}})
                }
            }
        }
    }
</script>

<style scoped>
    /*navBar*/
    .change{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
    }
    .navBar{
        width: 100%;
        height: 50px;
        border-top: 1px solid #eaeaea;
        background: #fff;
        /*padding: 6px 0 4px 0;*/
        display: flex;
        display: -webkit-flex;
        position: fixed;
        left: 0;right: 0;bottom: 0;
        z-index: 5;
        align-items: center;
        /*margin-top: 50px;*/

    }
    .navBar .nav-item a{
        display: inline-flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .navBar .nav-item{
        width: 33.333%;
        height: 100%;
        text-align: center;
        font-size: 0;
    }
    .navBar .nav-item img{
        width: 31px;
        height: auto;
    }
    .navBar .nav-item p{
        font-size: 12px;
        line-height: 1;
        color: #000;
    }
    .navBar .active p{
        color: #052b6e;
    }
</style>
