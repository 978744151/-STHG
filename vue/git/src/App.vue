<template>
    <div id="app">
        <div id="allmap"></div>
        <router-view></router-view>
        <lg-preview></lg-preview>
        <!-- <div class="gotoindex" @click="goto()" ></div> -->
        <!-- <keep-alive>
            <router-view :shouldChangeCity="shouldChangeCity" :cityName="cityName" :curCompany="curCompany" class="app-router"></router-view>
        </keep-alive> -->
    </div>
</template>

<script>
    // import wxapi from '../common/wxapi.js'
    import 'lib-flexible/flexible'
    import MintUI from 'mint-ui'
    import 'mint-ui/lib/style.css'
    import api from './network/request'
    // import BMap from 'BMap'
    export default {
        name: 'App',
        data() {
            return {
                cityName: '正在定位',
                shouldChangeCity: true,
                curCompany: {},
            }
        },
        methods:{
             token:function(cb){
                var _this=this;
                var params={access_token:localStorage.getItem('access_token')||''};
                api.post('open/mpLogin',params,res=>{
                    console.log(res);
                    // localStorage.setItem('access_token','');
                    // cb && cb();
                    if(res.status==0){
                        if(res.data.is_reg){
                            localStorage.setItem('access_token',res.data.access_token);
                        }else{
                            localStorage.setItem('access_token','');
                        }
                        cb && cb();
                    }else{
                        // localStorage.setItem('access_token','');
                        cb && cb();
                    }
                    if(res.status==10001){
                        api.post('open/againLogin','',res=>{
                            if(res.status==0){
                                location.reload();
                                // _this.created();
                            }
                        })
                    }
                })
            }
        },
        created() {
           // this.token();
           // var sharecode=api.getQueryString("code")||'';
           //  if(sharecode!=''){
           //      sessionStorage.setItem('code', api.getQueryString("code"));
           //  }
            // alert(1);
            // alert(window.location.hash)
        }
       
    }
</script>

<style>
    .gotoindex{
        position: fixed;
        width: 57px;
        height: 57px;
        background-image: url('https://pic.repaiapp.com/static/png/20180528/16/1527497342006264955.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        right: 10px;
        top: 10px;
        z-index: 1002;
    }
    html{
        background-color: #f3f3f3;
        font-size: 14px;
        /*font-size: 14px;*/
    }
    input{font-size: 14px;}
    *{margin: 0;padding: 0}
    div,input,img,ul,li,span,p,tr,td,table{box-sizing: border-box}
    a{text-decoration: none}
    a:active{
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    *{-webkit-tap-highlight-color:rgba(255,255,255,0);}
    *{-webkit-tap-highlight-color:transparent;}
    button{border: none;outline: none}
    .whiteBtn{
        width: 79px;
        height: 31px;
        background: #fff;
        color: #123676;
        font-size: 14px;
        border-radius: 2px;
        border: 1px solid #123676;
    }
    .blueBtn{
        width: 79px;
        height: 31px;
        font-size: 14px;
        border-radius: 2px;
        background-color: #113676;
        color: #fff;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #000;
    }
    .clear::after{
        content: '';
        display: block;
        clear: both;
    }
    .sj-hint{
        position: fixed;
        left: 50%;
        top: 60%;
        transform: translate(-50%, -50%);
        /*width: 3.35rem;*/
        /*height: 1rem;*/
        background: #000;
        opacity: 0.8;
        /*line-height: 1rem;*/
        text-align: center;
        border-radius: .05rem;
        font-size: .28rem;
        color: #fff;
        z-index: 23;
        display: none;
        padding:0.3rem;
  }
li {
    list-style: none;
}
  /*@font-face {font-family: "mintui";
      src: url('iconfont.ttf?t=1464927413')
    }

    .mintui {
      font-family:"mintui" !important;
      font-size:16px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
    .mintui-search:before { content: "\e604"; }
    .mintui-more:before { content: "\e601"; }
    .mintui-back:before { content: "\e600"; }
    .mintui-field-error:before { content: "\e605"; }
    .mintui-field-warning:before { content: "\e608"; }
    .mintui-success:before { content: "\e602"; }
    .mintui-field-success:before { content: "\e609"; }*/
    
/*@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1525228363504'); 
  src: url('iconfont.eot?t=1525228363504#iefix') format('embedded-opentype'), 
  url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAVAAAsAAAAAB6AAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW7kh2Y21hcAAAAYAAAABeAAABhptoBr5nbHlmAAAB4AAAAXMAAAGIN18kXmhlYWQAAANUAAAALwAAADYRPcxQaGhlYQAAA4QAAAAcAAAAJAfeA4RobXR4AAADoAAAAAwAAAAMC+kAAGxvY2EAAAOsAAAACAAAAAgAdgDEbWF4cAAAA7QAAAAfAAAAIAESAF1uYW1lAAAD1AAAAUUAAAJtPlT+fXBvc3QAAAUcAAAAJAAAADWmthhyeJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sE4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDzrYW7438AQw9zA0AAUZgTJAQAtwAz4eJzFkMENgDAMAy9t6QMxCA8G4sUcHaJzdo1iQnkwQS05VhxLiQIsQBQPMYFdGA9OueZ+ZHU/eSZLjUBptXf1nyqiWXYNKplpsHmr/9i87qPTVyiDOrHVl4Qbt+4NvwAAeJwljz1Lw1AUhu+516Qf5iZtkiZN+pEm0UZRI6axDpIK4mIqIoiDnerSTrq6aOgiKEjrpIuTCE5161bQX+Eu+jtaUzy88CzvC+dBDELTbzImeSShJbSB9tARQsCugMXjEpiO7+IVyJlMTpV54tiOmbAtlwSgWqyseHW/qrIJVgAeylAzvbrjYgc2/QbeBk8pAWgF/VhcLIrkAdJ5p3wzCfEL5Ay7KDTWJvurO7JXkZKXnChqonifZBkmifGcwMO5qqSYVJqdvDKCnhsby9gATnP0g1NaKYhnt/5FaVFNAfR6IBUq/NtOVs/GudIVSdQSGZrM69RekOHydz4vcaXqD4qPxK535Iv4KINMVIs9vTKWeWy5OP5YjY3lMvYaOHaWPEUWgLXWoerXPQO26hi1h1EYRsPPf7QP+90g6Paf/7Gb1bgRtWmLagtc8EiJH0bvH+/XzeZ1jCg8mVUHnSDoDGaLKdJsOuK4FrU1Lniif4z/S+QAeJxjYGRgYADiiWs4SuP5bb4ycLMwgMB1fhdvBP2/k4WB2QTI5WBgAokCAPRpCCIAeJxjYGRgYG7438AQw8IAAkCSkQEVMAMARwkCbAQAAAAD6QAABAAAAAAAAAAAdgDEeJxjYGRgYGBmCGRgZQABJiDmAkIGhv9gPgMAEPcBcAB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICZkYmRmZGFgbGCvTQvM9XAxJSBAQAX8wLm') format('woff'),
  url('iconfont.ttf?t=1525228363504') format('truetype'), 
  url('iconfont.svg?t=1525228363504#iconfont') format('svg'); 
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-unie045:before { content: "\e68c"; }*/




</style>
