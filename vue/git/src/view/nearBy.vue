<template>
   <div class="nearBy">
        <div class="head">
           <div class="map"></div> 
           <span @click="chooseCity()">{{city}}</span>
           <div class="up"></div>
           <div class="input">
               <input type="text" name="" placeholder="输入门店或门店拼音查询" ref="input1" v-on:input="useinput1">
               <div class="serarch" @click="search()"></div>
           </div>
        </div>
        <div class="height44"></div>
        <div class="fenl">
            <div @click="change(0,city)" :style="dis?'color:#dd3232':''">
                {{name1}}
                <p :class="dis?'sj ro':'sj'"></p>
            </div>
            <div @click="change(1,city)" :style="dis1?'color:#dd3232':''">
                {{name2}}
                <p :class="dis1?'sj ro':'sj'"></p>
            </div>
            <p class="line"></p>
        </div>
        <div class="height40"></div>
        <div class="local" v-if="!dis&&!dis1">
            <p>当前位置：{{citys}}{{districts}}</p>
            <img src="https://pic.repaiapp.com/static/png/20180521/14/1526883464783897102.png" @click="refresh()" :class="xz?'ros':'ros'">
        </div>
        <div class="height44" v-if="!dis&&!dis1"></div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div v-if="shopList!=''">
                <div class="item" v-for="(item,index) in shopList" @click="selectShopItem(item.id)">
                    <div class="itemLeft">
                        <img :src="item.logo">
                    </div> 
                    <div class="itemRight">
                        <p class="shopname">{{item.name}}
                            <span>{{item.distance}}km</span>
                        </p>
                        <div style="overflow: hidden;display: flex;align-items: center;">
                            <div class="star">
                                <div class="starBg"></div>
                                <!-- :style="width:{{item.level}}%;" -->
                                <div class="starLight">
                                    <img src="https://pic.repaiapp.com/static/png/20180411/16/1523435822461174856.png">
                                </div>
                            </div>



                            <p class="price">人均{{item.spend}}元</p>
                        </div>
                        <p class="address">
                            <span style="display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 1;overflow: hidden;width: 90%;">{{item.province+item.scity+item.area+item.city}}</span>
                            <img src="https://pic.repaiapp.com/static/png/20180410/16/1523347999462105054.png">
                        </p>
                        <p class="coupon">
                            <img :src="item.business_photo">
                            <span>{{item.business_sec}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
        <div v-if="shopList==''" class="empty">
            <img src="https://pic.repaiapp.com/static/png/20180517/17/1526550915612775452.png">
              暂无店铺        
        </div>

        <!-- mask -->
        <div class="mask" v-show="dis||dis1" ></div>
        <!-- 分类 -->
        <div class="dialog" v-show="dis">
            <div class="dialogLeft">
                <!-- <p>全部行业</p> -->
                <p :class="sel==index?'actives':''" v-for="(item,index) in shopType" @click="changeName1(item.id,index)">{{item.catename}}</p>
            </div>
            <div class="dialogRight">
                <!-- <p>全部行业</p> -->
            </div>
        </div>
        <!-- 区域 -->
        <div class="newarea" v-show="dis1">
            <p v-for="item,index in currentArea" @click="changeName2(item,index)" :class="sels==index?'actives':''">{{item}}</p>
        </div>

        <navBar :nav=1></navBar>
        <div class="height50"></div>
   </div>
</template>

<script>
    import navBar from '../components/navigation-bar'
    import api from '../network/request'
    import areaInfo from '@/areaInfo.json'
    import { Toast } from 'vant'
    import { PullRefresh } from 'vant'
    import { Dialog } from 'vant';
    // import BMap from 'BMap'
    export default {
        name: "nearBy",
        components: {
           navBar,
        },
        props: ['cityName', 'shouldChangeCity'],

        data() {
            return {
                 shopList:[],
                 keyword:'',
                 dis:false,
                 dis1:false,
                 sel:0,
                 sels:0,
                 shopType:'',
                 cityNames:"",
                 city:'',
                 currentArea:[],
                 province:'',
                 city:'',
                 district:'',
                 lat:'',
                 lng:'',
                 name1:'分类',
                 name2:'区域',
                 categoryid:'',
                 districts:'',
                 citys:'',
                 isLoading: false,
                 refreshStatus:0,
                 xz:false,
                 // cityName:''
                
            }
        },
        mounted() {
            this.$nextTick(() => {
                    this.city=this.$parent.cityName;
                    var flag=0;
                    for(var i=0;i<sessionStorage.length;i++){
                        if(sessionStorage.key(i)=="city"){
                            flag=1;
                        }
                    }
                    if(flag==0){
                        this.baiduLocation(); 
                    }else{
                        if(this.city=="正在定位"){
                            this.city=sessionStorage.getItem('city');
                        }else{
                            // this.city=this.city;
                        }
                        this.districts=sessionStorage.getItem('district');
                        this.citys=sessionStorage.getItem('city');
                        // this.district=sessionStorage.getItem('district');
                        this.district='';

                        this.lat=sessionStorage.getItem('lat');
                        this.lng=sessionStorage.getItem('lng');
                        this.shop();
                    }
                    // this.baiduLocation();
                    
                // this.shop();
                 // console.log(this.$parent.cityName)
            });
            // this.shop();

        },
        methods: {
            onRefresh:function(){
                 setTimeout(() => {
                    this.isLoading = false;
                    this.shop();
                }, 500);
            },
            refresh:function(){
                this.city=this.city;
                this.district=this.districts;
                Toast.loading({duration: 0,forbidClick: true});
                this.refreshStatus=1;
                this.xz=true;
                // console.log(this.citys);
                // console.log(this.city);
                if(this.citys!=this.city){
                    Dialog.confirm({
                      title: '提示',
                      message: '您定位到'+this.citys+',确定切换城市吗？'
                    }).then(() => {
                      // on confirm
                      this.city=this.citys;
                      this.$parent.cityName=sessionStorage.getItem('city');
                      this.shop();
                      this.name1="分类";
                      this.name2="区域";
                    }).catch(() => {
                      // on cancel
                    });
                }else{
                    this.shop();
                    this.name1="分类";
                    this.name2="区域";
                }
                

            },
            //禁止页面滚动
            stop(){
                var mo=function(e){e.preventDefault();};
                document.body.style.overflow='hidden';
                document.addEventListener("touchmove",mo,false);//禁止页面滑动
            },
              /***取消滑动限制***/
            move(){
                var mo=function(e){e.preventDefault();};
                document.body.style.overflow='';//出现滚动条
                document.removeEventListener("touchmove",mo,false);
            },
            search:function(){
                if(this.$refs.input1.value==''){
                    Toast("搜索内容不能为空");
                    return;
                }
                this.keyword=this.$refs.input1.value;
                this.shop();
            },
            useinput1:function(){
                if(this.$refs.input1.value==''){
                    this.keyword=this.$refs.input1.value;
                    this.shop();
                }
            },
            selectShopItem(id){
                console.log(id)
                localStorage.setItem('orderid',id);
                this.$router.push({name: 'merchant', params: {id:id}})
            },
            changeName1:function(id,index){
                // console.log(id);
                var _this=this;
                _this.sel=index;
                for(var i in this.shopType){
                    if(id==this.shopType[i].id){
                        _this.name1=this.shopType[i].catename;
                    }
                }
                 this.dis=!this.dis;
                 this.categoryid=id;
                 this.shop();
            },
            changeName2:function(id,index){
                var _this=this;
                _this.sels=index;
                _this.name2=id;
                this.dis1=!this.dis1;
                this.district=id;
                this.shop();
                // this.district=this.id;
                // console.log(id);

            },
             baiduLocation() {
                this.$parent.shouldChangeCity = true;
                let _that = this;
                /*eslint-disable*/
                // 百度地图定位
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(116.331398, 39.897445);
                map.centerAndZoom(point, 12);
                var geoc = new BMap.Geocoder();
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() === BMAP_STATUS_SUCCESS) {
                        console.log('定位成功');
                        console.log(r.point);
                        _that.lat=r.point.lat;
                        _that.lng=r.point.lng;
                        sessionStorage.setItem('lat',r.point.lat);
                        sessionStorage.setItem('lng',r.point.lng);

                        _that.shop();
                        geoc.getLocation(r.point, function (rs) {
                            var addComp = rs.addressComponents;

                            console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                            // localStorage.setItem('city',addComp.city);
                            // localStorage.setItem('district',addComp.district);
                            sessionStorage.setItem('city',addComp.city);
                            sessionStorage.setItem('district',addComp.district);
                            if(_that.$parent.cityName=='正在定位'){
                                _that.city= addComp.city;
                                _that.citys= addComp.city;
                                _that.district='';
                                _that.districts=addComp.district

                            }

                            _that.shop();
                            if (_that.shouldChangeCity) {
                                _that.city= addComp.city
                                _that.districts=addComp.district;
                                _that.citys=addComp.city;
                                _that.$parent.cityName = addComp.city.replace('市', '');
                                _that.$parent.districts = addComp.district;
                                
                                console.log(_that.$parent.cityName)
                            }
                            
                        });
                        

                    }

                    else {
                        console.log('failed' + this.getStatus());
                    }
                }, {enableHighAccuracy: true});
                /*eslint-disable*/
            },
            change:function(status,city){
                var _this=this;
                if(status==0){
                    this.dis=!this.dis;
                    console.log(this.dis);
                    if(this.dis){
                        this.stop();
                    }else{
                        this.move();
                    }
                    if(this.dis1){
                        this.dis1=!this.dis;
                    }
                }else{
                    this.dis1=!this.dis1;
                    if(this.dis){
                         this.dis=!this.dis1;
                    }
                    if(this.dis1){
                        this.stop();
                    }else{
                        this.move();
                    }
                    areaInfo.forEach((items) => {
                    items.city.forEach((item) => {
                        // console.log(city)
                        // console.log(item.name)
                        if(item.name == city){
                            // console.log(item.area)
                            _this.currentArea=item.area
                            // console.log(_this.currentArea)
                        }
                    })
                })
                   
                }
                
            },
            chooseCity:function(){
                this.$router.push({name: 'chooseCity', params: {}})
            },
            shop:function(){
                
               let params={
                        lat:this.lat,
                        lng:this.lng,
                        province:this.province,
                        city:this.city,
                        area:this.district,
                        // categoryid:"13",
                        categoryid:this.categoryid,
                        keyword:this.keyword
                    };
                api.post('store/lists', params, res => {
                    console.log(res)
                    if (res.status == 0) {
                        if(this.refreshStatus==1){
                            // Toast.success("加载")
                            setTimeout(function(){
                                Toast.clear();
                            },1000)
                            // this.xz=false;
                        }
                        this.shopList = res.data;
                    }
                }) 
            },

            category:function(){
                let params={};
                var _this = this;
                api.post('store/type', params, res => {
                    console.log(res)
                        if (res.status == 0) {
                        _this.shopType = res.data;
                    }
                })
            }
           
        },
        created() {
            Toast.clear();
            // this.city=localStorage.getItem('city');
            this.category();
            
            // this.cityNames=this.$parent.cityName;
            console.log(this.$parent.cityName);
            this.city=this.$parent.cityName+'市';
            this.$shareUrl.shareUrl("nearBy");
            // this.districts=
            // this.districts=this.$parent.districts;
            // console.log(this.$parent.cityName)
            // this.shop();
        }
    }
</script>

<style scoped>
    .height50{
        height: 50px;
    }
    body {
        overflow: hidden !important;
    }
    .ros{
        transform: rotate(360deg);
        transition: transform 1s;
    }
    .local{
        position: fixed;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 11px;
        font-size: 14px;
        color: #3D3D3D;
        background-color: #fff;
        margin-bottom: 5px;
        top: 84px;
        left: 0;
        z-index: 2;
    }
    .local img{
        width: 13px;
        height: 15px;
    }
    .empty img{
      width: 60px;
      height: 57.5px;
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
    .newarea{
        position: fixed;
        width: 100%;
        height: 300px;
        background-color: #fff;
        z-index: 1;
        left: 0;
        top: 84px;
        /*display: flex;*/
        overflow-y: scroll;
        transition: all 0.5s ease;
    }
    .newarea p{
        height: 45px;
        background-color: #fff;
        border-bottom: 1px solid #e6e6e6;
        font-size: 15px;
        color: #3d3d3d;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .ro{
        transform:rotate(180deg);
        transition: all 0.2s ease;
        background-image: url('https://pic.repaiapp.com/static/png/20180518/15/1526627226788875451.png') !important; 
    }

    .dialogLeft{
        /*height: 45px;
        background-color: #fff;
        border-bottom: 1px solid #e6e6e6;
        font-size: 15px;
        color: #3d3d3d;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;*/
    }

    .mask{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: rgba(0,0,0,0.5);
    }
    .dialog{
        position: fixed;
        width: 100%;
        height: 300px;
        background-color: #fff;
        z-index: 1;
        left: 0;
        top: 84px;
        display: flex;
        overflow-y: scroll;
        transition: all 0.5s ease;
    }
    .dialog div{
        width: 50%;
        height: 100%;
    }
    .dialogLeft p{
        height: 45px;
        background-color: #fff;
        border-bottom: 1px solid #e6e6e6;
        font-size: 15px;
        color: #3d3d3d;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .actives{
        color:#dd3232 !important;
    }
    .dialogRight{
        background-color: #f4f4f4
    }
    .dialogRight p{
        height: 45px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 15px;
        color: #3d3d3d;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .sj{
        position: relative;
        width: 8.5px;
        height: 4.5px;
        margin-left: 10px;
        background-image: url('https://pic.repaiapp.com/static/png/20180410/15/1523346086860410054.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .star{
        position: relative;
        font-size: 0;
        margin-right: 20px;
    }
    .starBg{
        position: relative;
        width: 65px;
        height: 10px;
        background-image: url('https://pic.repaiapp.com/static/png/20180411/16/1523435726983605151.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .starLight{
        position: absolute;
        overflow:hidden;
        height:10px;
        width: 100%;
        top:0;
        left: 0;
    }
    .starLight img{
        width: 65px;
        height: 10px;
    }
    .head{
        position: fixed;
        height: 44px;
        background-color: #fff;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding-left: 10px;
        padding-right: 7.5px;
        font-size: 15px;
        z-index: 2;
        top:0;
        left: 0;
    }
    .height44{
        height: 44px;
    }
    .map{
        position: relative;
        width: 15px;
        height: 16.5px;
        background-image: url('https://pic.repaiapp.com/static/png/20180518/15/1526628805750829799.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .head span{
        margin: 0 7.5px;
    }
    .up{
        position: relative;
        width: 10.5px;
        height: 6px;
        background-image: url('https://pic.repaiapp.com/static/png/20180410/15/1523345371485410153.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-right: 7.5px;
        transform: rotate(-180deg);
    }
    .input{
        flex:1;
        background-color: #f6f6f6;
        height: 30px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        padding:0 10px;
        box-sizing: border-box;
        z-index: 2
    }
    .input input{
        position: relative;
        outline: none;
        border-radius: 0;
        background-color: #f6f6f6;
        height: 30px;
        border: 0;
        flex:1;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
    }
    .serarch{
        width: 14px;
        height: 14px;
        background-image: url('https://pic.repaiapp.com/static/png/20180410/15/1523345711057810252.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .fenl{
        position: fixed;
        height: 40px;
        background-color: #fff;
        display: flex;
        border-bottom: 1px #dddddd solid;
        z-index: 2;
        width: 100%;
        box-sizing: border-box;
        top: 44px;
        left: 0px;
    }
    .height40{
        height: 40px;
    }
    .fenl .colorRed{
        color:#dd3232
    }
    .fenl div{
        width: 50%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        color: #3d3d3d
    }
    .fenl img{
        
    }
    .type-dialog{
        position: absolute;
        width: 100%;
        top:84px;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        z-index:20;
    }

    .type-dialog ul{
        min-height: 300px;
        background: #fff;
    }
    .type-dialog ul li{
        padding: 8px;
        border-bottom:1px solid #ddd ;
        font-size:15px;
    }
    .line{
        width: 1px;
        height:15px;
        background-color: #d7d7d7;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .add{
        position: relative;
        height: 40px;
        justify-content: space-between;
        display: flex;
        align-items: center;
        padding: 0 10px;
        font-size: 15px;
        color: #3d3d3d;
        background-color: #fff;
        margin-bottom: 5px;
    }
    .addIcon{
        position: relative;
        width: 13px;
        height: 15px;
        background-image: url('https://pic.repaiapp.com/static/png/20180410/15/1523346479433855102.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        /*transform:rotate(-360deg);*/
        /*transition: all 2s;*/
    }
    .go{
        transform:rotate(360deg);
        transition: all 2s; 
    }
    .item{
        position: relative;
        background-color: #fff;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        padding-bottom: 0;
    }
    .itemLeft{
        position: relative;
        width: 70px;
        height: 70px;
        border: 1px #e8e8e8 solid;
    }
    .itemLeft img{
        width: 100%;
        height: 100%;
    }
    .itemRight{
        position: relative;
        flex:1;
        display: flex;
        flex-flow: column;
        font-size: 16px;
        color: #000000;
        margin-left: 10px;
    }
    .shopname{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .shopname span{
        font-size: 12px;
        color: #969696
    }
    .price{
        float: left;
        font-size: 13px;
        color: #969696;
        margin: 0px 7px;
    }
    .address{
        position: relative;
        font-size: 13px;
        color: #969696; 
        padding-bottom: 5px;
        border-bottom: 1px solid #dcdcdc;
        display: flex;
        justify-content: space-between;
    }
    .address img{
        width: 6.5px;
        height: 12px;
    }
    .coupon{
        position: relative;
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #3d3d3d;
        padding: 10px 0;
    }
    .coupon img{
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }
    /*.mask{
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        top: 0;
        left: 0;
        z-index: 1;
    }*/
    .choosefenl{
        position: fixed;
        height: 300px;
        background-color: #fff;
        top: 84px;
        left: 0;
        overflow-y: scroll;
        z-index: 2;
        width: 100%;
        box-sizing: border-box;
        display: flex;
    }
    .choosefenl div{
        width: 50%;
        height: 300px;
        overflow-y: scroll;
    }
    .classifyLeftItem{
        height: 45px;
        width: 100%;
        box-sizing: border-box;
        font-size: 15px;
        color: #3d3d3d;
        display:flex;
        align-items: center;
        padding-left: 10px;
        border-bottom: 1px #e6e6e6 solid;
    }
    .active{
        color: #dd3232;
    }
    .classifyRight{
        background-color: #f4f4f4;
    }
    /*.area{
        position: fixed;
        width:100%;
        height: 300px;
        overflow-y: scroll;
        background-color: #fff;
        top: 84px;
        left: 0;
        z-index: 2;
    }*/
    .areaItem{
        height: 45px;
        border-bottom: 1px #e6e6e6 solid; 
        padding-left: 10px;    
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #3d3d3d;
    }
</style>

