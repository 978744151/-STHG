<template>
   <div class="particulars">
        <!-- <loading v-if="showloading"></loading> -->
        <div  v-if="!showloading">
            <!-- <div class="head">
                <p v-for="(item,index) in head" :class="sel==index?'active':''" @click="changeHead(index)">{{item.title}}</p>
            </div> -->
            <!-- banner -->
            <div style="position: relative;">
                <swiper :options="swiperOption" id="swiper">
                    <swiper-slide v-for="item,index in shopinfo.info.thumb_url" :key="index">
                        <img :src="item">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <div class="gotoindex" @click="goto()"></div>
            </div>
            <!-- shopInfo -->
            <div class="shopInfo">
                <p>{{shopinfo.info.title}}</p>
                <p class="price">￥{{shopinfo.info.marketprice}}<span>￥{{shopinfo.info.productprice}}</span></p>
                <div class="info">
                    <!-- <p>快递：{{shopinfo.info.express}}</p> -->
                    <p>库存量 {{shopinfo.info.total}}</p>
                    <p>月销量 {{shopinfo.info.monthly_sales}}</p>
                </div>
                <img src="https://pic.repaiapp.com/static/png/20180411/16/1523434024629685654.png" @click="showshare()">
            </div>
            <!-- 规格 -->
            <div class="options" @click="chooseoptions(0)" v-if="shopinfo.info.option.length!=0">
                <span v-if="chooseOption">请选择产品规格数量</span>
                <span v-if="!chooseOption">已选：{{optionTitle}}</span>
                <img src="https://pic.repaiapp.com/static/png/20180411/16/1523434227274853102.png">
            </div>
            <!-- 评价 -->
            <div class="pj" :style="shopinfo.info.option.length==0?'margin-top:10px':''" v-if="shopinfo.comment.length!=0">
                <p>评价({{comment_count}})</p>
                <div @click="lookmore(shopinfo.info.id)">
                    <p>好评<span>{{praise_rate*100}}%</span></p>
                    <img src="https://pic.repaiapp.com/static/png/20180411/16/1523434227274853102.png">
                </div>
            </div>
            <div class="pjItem" v-for="(item,index) in shopinfo.comment" :style="index==1?'border:0':''" v-if="shopinfo.comment.length!=0">
                <div class="itemInfo">
                    <div class="InfoLeft">
                        <p>
                            <img :src="item.headimgurl">
                            <span>{{item.nickname}}</span>
                        </p>
                        <span class="time">{{item.createtime}}</span>
                    </div>
                    <div class="star">
                        <div class="starBg"></div>
                        <!-- :style="width:{{item.level}}%;" -->
                        <div class="starLight" :style="'width:'+item.level*20+'%'" :data-level='item.level'>
                            <img src="https://pic.repaiapp.com/static/png/20180411/16/1523435822461174856.png">
                        </div>
                    </div>
                </div>
                <div class="itemCon">{{item.content}}</div>
                <div class="imgAll" >
                    <img :src="j" v-for="j,index in item.images" v-preview="j" preview-title-enable="true" preview-nav-enable="true">
                    <!-- <img v-for="j,index in item.images" v-preview="j" :src="j" :key="index" preview-title-enable="true" preview-nav-enable="true"> -->
                </div>
            </div>
            <!-- 查看更多 -->
            <div class="lookmore" v-if="comment_count>2">
                <p @click="lookmore(shopinfo.info.id)">查看更多</p>
            </div>

            <!-- 同店推荐 -->
            <div class="remmond">同店推荐</div>
            <div class="popularCon">
                <div class="list" v-for="item in recommand" v-if="recommand!=''" @click="particulars(item.id)">
                    <img :src="item.thumb">
                    <div style="padding: 0 5px">
                        <p class="listTitle">{{item.title}}</p>
                        <p class="nums">{{item.sales}}人已购买</p>
                        <p class="price1">￥{{item.marketprice}}</p>
                        <div class="shopCart"></div>
                    </div>
                </div>
            </div>
            <div class="info1">
                 <div class="footershopinfo"><p>图文详情</p></div>
            </div>
            <div v-html="shopinfo.info.content_html" class="fontsize14"></div>
            <!-- footer -->
            <div class="height50"></div>
            <div class="footer">
                <div class="footerLeft">
                    <div>
                        <p :class="hascollect==1?'footerimg1 footerimg1Active':'footerimg1'" @click="collecting(hascollect)"></p>
                        <span>收藏</span>
                    </div>
                    <div @click="server()">
                        <img src="https://pic.repaiapp.com/static/png/20180411/17/1523438378701855100.png" class="footerimg2">
                        <span>客服</span>
                    </div>
                    <div @click="gotoCart()">
                        <img src="https://pic.repaiapp.com/static/png/20180411/17/1523438395906945752.png" class="footerimg3">
                        <span>购物车</span>
                        <p class="cartNum" v-if="cart_count!=0">{{cart_count}}</p>
                    </div>
                </div>
                <div class="footerRight">
                    <div class="joinCart" @click="chooseoptions(1)">加入购物车</div>
                    <div class="buy" @click="chooseoptions(2)">立即购买</div>
                </div>
            </div>

            <!-- options -->
            <div class="mask" v-if="show" @click="close()"></div>
            <div :class="!show?'standards':'standards bottom'">
                <div class="standardsTitle">
                    <img :src="optionImg" class="shopImg">
                    <!-- <img src="https://pic.repaiapp.com/static/png/20180411/15/1523432586271110053.png" class="shopImg"> -->
                    <div class="shopName">
                        <p>￥{{optionMark}}<span>￥{{optionPro}}</span></p>
                        <p class="stocks">库存量{{optionStock}}</p>
                    </div>
                    <img src="https://pic.repaiapp.com/static/png/20180411/18/1523440976488410155.png" class="close" @click="close()">
                </div>

                <div class="standardsCon" v-for="item,index in shopinfo.info.spec">
                    <p>{{item.title}}</p>
                    <div class="standardsAll">
                        <div v-for="j,index in item.items" :data-id="j.id" :data-opids="j.opids" :data-parentid="item.parentid" :data-index="index" :class="j.status==1?'standardsAct':''" :data-status="j.status" @click="changeoptions(j.opids,item.parentid,index)" >{{j.title}}</div>
                        <!-- <div v-for="j,index in item.items" v-if="j.stock==0" class="nostocks">{{j.title}}</div> -->
                        <!-- <div class="standardsAct">560g</div>
                        <div class="nostocks">330g</div> -->
                    </div>
                </div>

                <div class="standardsNum">
                    <span>数量</span>
                    <div class="btn">
                        <button class="subtract" @click="changeNum(0)"></button>
                        <p class="num">{{optionNum}}</p>
                        <button class="add outAdd" @click="changeNum(1)"></button>
                    </div>
                </div>
                <div class="standardsFooter">
                    <div class="standardsFooter1" v-if="optionStock!=0&&showComfirm==1" @click="joinCart()" style="width: 100%;background: linear-gradient(to right, #e03a3a , #c01d1d);">
                        确定
                    </div>
                    <div class="standardsFooter1" v-if="optionStock==0&&showComfirm==1" @click="joinCart()" style="width: 100%;background: linear-gradient(to right, #999999 , #999999);">
                        确定
                    </div>
                    <div class="standardsFooter1" v-if="optionStock!=0&&showComfirm==2" @click="buy()" style="width: 100%;background: linear-gradient(to right, #e03a3a , #c01d1d);">
                        确定
                    </div>
                    <div class="standardsFooter1" v-if="optionStock==0&&showComfirm==2" @click="buy()" style="width: 100%;background: linear-gradient(to right, #999999 , #999999);">
                        确定
                    </div>
                    <div class="standardsFooter1" @click="joinCart()" v-if="optionStock!=0&&showComfirm==0">加入购物车</div>
                    <div class="standardsFooter2" @click="buy()" v-if="optionStock!=0&&showComfirm==0">立即购买</div>
                    <div class="standardsFooter1"  v-if="optionStock==0&&showComfirm==0" style="background: linear-gradient(to right, #999999 , #999999)" @click="noStock">加入购物车</div>
                    <div style="width: 1px;height: 100%;background-color: #fff" v-if="optionStock==0" ></div>
                    <div class="standardsFooter2"  v-if="optionStock==0&&showComfirm==0" style="background: linear-gradient(to right, #999999 , #999999)" @click="noStock">立即购买</div>
                </div>
            </div>
        </div>
        <div class="sj-hint"></div>
        <!-- 分享 -->
        <div class="share-mask" v-if="showShare" @click="showshare()"></div>
        <div class="share-logo" v-if="showShare" @click="showshare()"></div>
        <!-- <image-view :imgArr="imgArr" :showImageView="true" :imageIndex="imageIndex" v-if="bigImg"></image-view> -->
   </div>

</template>
<script>
    //对接美洽
    // (function(m, ei, q, i, a, j, s) {
    //     m[i] = m[i] || function() {
    //         (m[i].a = m[i].a || []).push(arguments)
    //     };
    //     j = ei.createElement(q),
    //         s = ei.getElementsByTagName(q)[0];
    //     j.async = true;
    //     j.charset = 'UTF-8';
    //     j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
    //     s.parentNode.insertBefore(j, s);
    // })(window, document, 'script', '_MEIQIA');
    // _MEIQIA('entId', 105365);
    // import imageView from 'vue-imageview'
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import loading from '../components/loading'
    import api from '../network/request'
    import qs from 'qs'
    import toast from '../components/toast'
    import { Toast } from 'vant'
    import { Loadmore } from 'mint-ui'
    import wx from 'weixin-js-sdk'
    import { ImagePreview } from 'vant'
    import wxapi from '../common/wxapi.js'
    // Vue.component(Loadmore.name, Loadmore);
    export default {
        name: "particulars",
        components: {
           swiper,
           swiperSlide,
           loading,
           // 'image-view': imageView
        },

        data() {
            return {
                share_title:'',
                imageIndex:0,
                shareImg:'',
                shareTitle:'',
                shareId:'',
                //规格图片
                showShare:false,
                optionImg:'',
                //原价
                optionPro:'',
                // 现价
                optionMark:'',
                //规格
                optionStock:'',
                optionNum:1,
                comment_count:'',
                praise_rate:'',
                head:[{
                    title:"商品"
                },{
                    title:"评价"
                },{
                    title:"详情"
                }],
                details:[{
                    title:"图文详情"
                },{
                    title:"规格参数"
                },{
                    title:"包装售后"
                }],
                sel:0,
                sels:0,
                show:false,
                showloading:true,
                shopinfo:'',
                optionTitle:'',
                showtoast:false,
                toastOption: {text: '验证码错误'},
                chooseOption:true,
                access_token:'',
                goods_id:'',
                hascollect:'',
                cart_count:0,
                shareUrl:'',
                swiperOption: {
                    autoplay: true,//可选选项，自动滑动
                    speed: 500,
                    delay: 5000,
                    loop: true,
                    // 如果需要分页器
                    // pagination: {
                    //     el: '.swiper-pagination',
                    // }
                },
                wxJson:'',
                showComfirm:'',
                imgs:['http://pic.repaiapp.com/pic/15/26/52/152652713617600.png'],
                mq_url:''
                
                
            }
        },
        methods: {
            // https://static.meiqia.com/dist/standalone.html?_=t&eid=16965
            //点击评论图片
            bigImg:function(imgs){
                // console.log(imgs);
                ImagePreview(imgs);
                
                // ImagePreview(['http://pic.repaiapp.com/pic/15/28/53/152853795966811.jpg']);
                // var a=[];
                // a.push(imgs);
                // console.log(a);
                // ImagePreview(a);
            },
            big(){
                ImagePreview(this.imgs)
            },
            noStock:function(){
                Toast("当前存库不足")
            },
            //美洽
            server:function(){
                
                var url = this.mq_url
                var subStr=new RegExp('=');
                var result=url.replace(subStr,"%3D");
                var data={
                    "comment":result,
                    "name":localStorage.getItem('nickname')||''
                }
                var usrcode = 'XTX'+localStorage.getItem('apply_phone')||'';
                window.location.href="https://static.meiqia.com/dist/standalone.html?_=t&eid=105365&clientid="+usrcode+"&metadata="+data
            },
            showBig:function(){
                // this.bigImg=true;
            },
            goto:function(){
                this.$router.replace({name: 'index', params:{}})
            },
            token:function(){
                var params={access_token:localStorage.getItem('access_token')||''};
                api.post('open/mpLogin',params,res=>{
                    console.log(res)
                    if(res.status==0){
                        if(res.data.is_reg){
                            localStorage.setItem('access_token',res.data.access_token);
                        }else{
                            localStorage.setItem('access_token','');
                        }
                        // var user_info = JSON.stringify(res.data.user_info);
                        // localStorage.setItem("user_info",user_info);
                        // localStorage.setItem('user_info',res.data.user_info)
                    }   
                })
            },
            showshare:function(){
                var that=this;
                var Sharetoken=localStorage.getItem('access_token')||'';
                if(Sharetoken==''){
                    Toast.fail("请先登录");
                    setTimeout(function(){
                        //  that.$router.replace({name: 'login', params:{}})
                    },1000)
                   
                }else{
                    this.showShare=!this.showShare;
                }
            },
            pushHistory(){
                let state = {
                    title: 'myCenter',
                    url: '__SELF__'
                }
              window.history.pushState(state, state.title, state.url)
            },
            //跳转商品详情页
            particulars:function(id){
                console.log(id)
                localStorage.setItem('indexShopid',id);
                Toast.loading({
                  duration: 0,       // 持续展示 toast
                  forbidClick: true, // 禁用背景点击
                  message: '正在加载中...'
                });
                var goods_id=localStorage.getItem('indexShopid')
                var access_token=localStorage.getItem('access_token');
                localStorage.setItem('couponId','');
                localStorage.setItem('couponMoney','');
                this.token();
                this.goods_id=goods_id;
                this.access_token=access_token;
                this.detail();
                // document.documentElement.animate({scrollTop: 0},'slow');
                // document.documentElement.scrollTop=0;
                $('html , body').animate({scrollTop: 0},'slow');
                if(localStorage.getItem('access_token')!=''){
                     this.collect();
                }
                // this.created();
                // this.$router.push({name: 'particulars', params: {"id":id}})
            },
            //弹出规格
            chooseoptions:function(status){
                var _this=this;
                _this.showComfirm=status
                //status==0 点击规格 ==1点击加入购物车 ==2点击立即购买 
                _this.show=true;
            },
            //关闭规格弹层
            close:function(){
                var _this=this;
                _this.show=false;
                _this.chooseOption=false;
                _this.optionTitle=_this.optionTitle;
                console.log(_this.optionTitle)
            },
            //购物车
            gotoCart:function(){
                this.$router.push({name: 'shopingCart', params:{shopcartStatus:1}})
            },
            //查看更多评论
            lookmore:function(id){
                this.$router.push({name: 'Allcomment', query:{id:id}})
            },
            //图文详情切换
            changeDetails:function(index){
                this.sels=index;
            },
            //商品详情页
            detail:function(){
                var _this=this;
                var optionTitle='';
                var optionid=''
                var optionName=[];
                // const params={goods_id:_this.$route.params.id};
                // const params={goods_id:localStorage.getItem('indexShopid'),access_token:_this.access_token};
                const params={goods_id:localStorage.getItem('indexShopid'),access_token:_this.access_token};

                // test
                // const params={goods_id:'280'};   
                api.post('shop/info',params,res=>{
                console.log("detail=>",res);
                    if(res.status==0){
                        // if()

                        Toast.clear();
                        _this.showloading=false;
                        _this.shareImg=res.data.info.thumb;
                        _this.shareTitle=res.data.info.title;
                        _this.shareId=res.data.info.id;

                        _this.getUrl(function(cb){
                            // alert(_this.share_title)
                            _this.$shareUrl.shareUrl("particulars",res.data.info.id,_this.share_title,res.data.info.thumb);
                            //分享给朋友
                            // that.onMenuShareAppMessage();
                            // //分发到朋友圈
                            // that.ShareTimeline();
                        });
                        // this.$shareUrl.shareUrl("particulars",res.data.info.id,res.data.info.title,res.data.info.thumb);
                        console.log(_this.shareImg);
                        // wxapi.wxRegister(_this.wxRegCallback)
                        _this.recommand=res.data.recommand;
                        _this.comment_count=res.data.comment_count;
                        
                        _this.praise_rate=res.data.praise_rate;
                        //判断是否有规格
                        if(res.data.info.option.length==0){
                            _this.shopinfo=res.data;
                            _this.optionImg=res.data.info.thumb;
                            _this.optionPro=_this.shopinfo.info.productprice;
                            _this.optionMark=_this.shopinfo.info.marketprice;
                            _this.optionStock=_this.shopinfo.info.total;
                        }else{
                            for(var i in res.data.info.spec){
                                for(var j in res.data.info.spec[i].items){
                                    res.data.info.spec[i].items[j].status=0;
                                    res.data.info.spec[i].items[j].opids=0; 
                                    //默认选中第一项
                                    if(j==0){
                                        res.data.info.spec[i].items[j].status=1;
                                        res.data.info.spec[i].optionsid = res.data.info.spec[i].items[j].id;
                                    }
                                        
                                    
                                    
                                }
                                res.data.info.spec[i].name='';
                                // res.data.info.spec[i].optionsid = ""
                                res.data.info.spec[i].parentid = i;
                            }
                            _this.shopinfo=res.data
                        }
                        for(var i in _this.shopinfo.info.spec){
                            optionName.push(_this.shopinfo.info.spec[i].optionsid)
                        }
                        // 倒叙
                        optionName=optionName.reverse();
                        // 分割
                        optionName=optionName.join("_");
                        for(var i in _this.shopinfo.info.option){
                            // console.log(optionName)
                            if(optionName==_this.shopinfo.info.option[i].specs){
                                optionTitle=_this.shopinfo.info.option[i].title;
                                optionid=_this.shopinfo.info.option[i].id;
                                _this.optionPro=_this.shopinfo.info.option[i].productprice;
                                _this.optionMark=_this.shopinfo.info.option[i].marketprice;
                                _this.optionStock=_this.shopinfo.info.option[i].stock;
                                if(_this.shopinfo.info.option[i].thumb==''){
                                    //默认图片
                                    _this.optionImg=_this.shopinfo.info.thumb;
                                    // _this.optionImg="https://pic.repaiapp.com/static/png/20180514/16/1526286750112139853.png"
                                }else{
                                     _this.optionImg=_this.shopinfo.info.option[i].thumb
                                }
                            }
                        }
                        
                        _this.optionTitle=optionTitle;
                        _this.optionid=optionid
                        console.log("newdetail=>",res.data);
                    }else{   
                    }
                })
            },
            //规格选择
            changeoptions:function(opids,parentid,index){
                var _this=this;
                var optionName=[];
                var optionTitle=[];
                var optionid=''
                for(var i in _this.shopinfo.info.spec){
                    for(var j in _this.shopinfo.info.spec[i].items){
                        if(_this.shopinfo.info.spec[i].items[j].status==1){
                            _this.shopinfo.info.spec[i].optionsid=_this.shopinfo.info.spec[i].items[j].id;
                        }
                    }
                }
                for(var i in _this.shopinfo.info.spec){
                    optionName.push(_this.shopinfo.info.spec[i].optionsid)
                }
                console.log(optionName)
                if(opids==0){
                    for(var i in _this.shopinfo.info.spec){
                        if(_this.shopinfo.info.spec[i].parentid==parentid){
                            for(var j in _this.shopinfo.info.spec[i].items){
                                _this.shopinfo.info.spec[i].items[j].status = 0;
                                _this.shopinfo.info.spec[i].name = '';
                                _this.shopinfo.info.spec[i].propId = ''
                            }
                             _this.shopinfo.info.spec[parentid].items[index].status = 1;
                             _this.shopinfo.info.spec[parentid].name =  _this.shopinfo.info.spec[parentid].items[index].title;
                             _this.shopinfo.info.spec[parentid].propId =  _this.shopinfo.info.spec[parentid].items[index].id;
                             _this.shopinfo.info.spec[parentid].optionsid =  _this.shopinfo.info.spec[parentid].items[index].id;
                        }
                    }
                }
                optionName[parentid]=_this.shopinfo.info.spec[parentid].optionsid;
                // 倒叙
                optionName=optionName.reverse();
                // 分割
                optionName=optionName.join("_");
                for(var i in _this.shopinfo.info.option){
                    if(optionName==_this.shopinfo.info.option[i].specs){
                        optionTitle=_this.shopinfo.info.option[i].title;
                        optionid=_this.shopinfo.info.option[i].id;
                        _this.optionPro=_this.shopinfo.info.option[i].productprice;
                        _this.optionMark=_this.shopinfo.info.option[i].marketprice;
                        _this.optionStock=_this.shopinfo.info.option[i].stock;
                        if(_this.shopinfo.info.option[i].thumb==''){
                            _this.optionImg=_this.shopinfo.info.thumb;
                            // _this.optionImg="https://pic.repaiapp.com/static/png/20180514/16/1526286750112139853.png"
                        }else{
                             _this.optionImg=_this.shopinfo.info.option[i].thumb
                        }
                    }
                }
                // console.log(optionName.reverse())
                // for(var i in _this.shopinfo.info.option){}
                //获取库存进行判断
                // for (var i = 0; i < _this.shopinfo.info.spec.length-1; i++) {
                //     if (i == _this.shopinfo.info.spec.length - 2) {
                //         optionName += _this.shopinfo.info.spec[i].optionsid
                //     } else {
                //         optionName += _this.shopinfo.info.spec[i].optionsid + '_'
                //     }
                // }

                // for(var i in _this.shopinfo.info.spec){
                //     optionName.push(_this.shopinfo.info.spec[i].optionsid)
                // }
                // for(var i in optionName){
                //     if(optionName[i]==''||typeof(optionName[i]) == "undefined"){
                //         optionName.splice(i,1);
                //         i= i-1;
                //     }
                // }
                //如果optionName.length！=_this.shopinfo.info.spec.length 则表示没有全部选中 
                // console.log(optionTitle)
                // console.log(optionTitle);
                _this.optionTitle=optionTitle;
                _this.optionid=optionid;
                _this.shopinfo=_this.shopinfo;
            },
            //选择数量
            changeNum:function(status){
                //status==0 减数量 反之加数量
                var _this=this;
                if(status==0){
                    if(_this.optionNum==1){
                        $(".sj-hint").html("超出最小数量").fadeIn().delay(1500).fadeOut();
                        return;
                    }
                    _this.optionNum--;
                }else{
                    _this.optionNum++;
                }
            },
            //加入购物车
            joinCart:function(){
                var _this=this;
                // const params={phone:_this.phone,code:_this.$refs.input2.value};
                const params={total:_this.optionNum,goods_id:_this.goods_id,optionid:_this.optionid,access_token:_this.access_token};
                api.post('user/add_cart',params,res=>{
                    console.log(res);
                    if(res.status==600){
                        // this.$router.push({name: 'login', params: {}})
                    }
                    if(res.status==0){
                         Toast.success('加入成功')
                        // $(".sj-hint").html("加入成功").fadeIn().delay(1500).fadeOut();
                        _this.close();
                        _this.collect();
                        return;

                    }

                })
            },
            //购车数量以及 是否被收藏
            collect:function(){
                var _this=this;
                // const params={goods_id:_this.goods_id,access_token:_this.access_token};
                const params={goods_id:localStorage.getItem('indexShopid'),access_token:_this.access_token};
                api.post('user/goodsInfo',params,res=>{
                    console.log(res);
                    if(res.status==600){
                        // this.$router.push({name: 'login', params: {}})
                    }
                    if(res.status==0){
                        _this.cart_count=res.data.cart_count;
                        console.log(_this.cart_count);
                        if(res.data.is_favorite){
                            _this.hascollect=1;
                            // Toast.success('收藏成功');
                        }else{
                            _this.hascollect=0;
                            // Toast.success('取消成功');
                        }
                    }
                })
            },
            //收藏
            collecting:function(status){
                // status==1 收藏 ==0 取消收藏

                var _this=this;
                var  params={};
                if(status==0){
                    params={goods_ids:_this.goods_id,access_token:_this.access_token,type:1};
                }else{
                    params={goods_ids:_this.goods_id,access_token:_this.access_token,type:-1};
                }
                api.post('user/favorite',params,res=>{
                    console.log(res);
                    if(_this.hascollect==0){
                        Toast.success('收藏成功')
                    }else{
                        Toast.success('取消成功')
                    }
                    if(res.status==600){
                        // this.$router.push({name: 'login', params: {}})
                    }
                    if(res.status==0){
                        _this.collect();
                        // _this.cart_count=res.data.cart_count;
                        // _this.is_favorite=res.data.is_favorite
                        // console.log(res)
                    }

                })
            },
            getPhone(){
                const params={access_token:localStorage.getItem('access_token')||''};
                api.post('user/info',params,res=>{
                console.log(res);
                    if(res.status==0){
                        Toast.clear();
                        localStorage.setItem('apply_phone',res.data.tel)
                    }
                    if(res.status==600){
                        // this.$router.push({name: 'login', params: {}})
                    }
                    if(res.status!=0){
                        Toast.fail(res.msg)
                    }
                }) 
            },
            //立即购买
            buy:function(){
                var _this=this;
                // const params={goods_id:_this.goods_id,access_token:_this.access_token,total:_this.optionNum,optionid:_this.optionid,type:0};
                localStorage.setItem('goods_id',_this.goods_id);
                localStorage.setItem('total',_this.optionNum);
                localStorage.setItem('optionid',_this.optionid);
                localStorage.setItem('type','0');
                this.$router.push({name: 'orderCheck', params: {}})

                // var _this=this;
                // const params={goods_id:_this.goods_id,access_token:_this.access_token,total:_this.optionNum,optionid:_this.optionid};
                // api.post('order/confirm',params,res=>{
                //     console.log(res);
                //     if(res.status==600){
                //         this.$router.push({name: 'login', params: {}})
                //     }
                //     if(res.status==0){
                //         this.$router.push({name: 'orderCheck', params: {data:res.data}})
                //     }

                // })
            },
            wxRegCallback () {
                var that=this;
                this.getUrl(function(cb){
                    //分享给朋友
                    that.onMenuShareAppMessage();
                    //分发到朋友圈
                    that.ShareTimeline();
                });
                
            },
            // 获取分享url
            getUrl:function(cb){
                const params={access_token:this.access_token,goods_id:this.goods_id};
                api.post('shop/share_goods',params,res=>{
                    console.log(res);
                    if(res.status==0){
                        this.shareUrl=res.data.url;
                        this.mq_url=res.data.mq_url;
                        this.share_title=res.data.share_title;
                        cb&&cb();
                    }
                    
                })
            },
            onMenuShareAppMessage () {
                let opstion = {
                    title: '分享我喜欢的这件商品给你', // 分享标题
                    desc:this.shareTitle,
                    link:this.shareUrl,
                    imgUrl: this.shareImg,// 分享图标
                    success: function () {
                        this.showShare=!this.showShare
                        // Toast.('分享成功')
                    },
                    error: function () {
                        this.showShare=!this.showShare
                        // Toast.('分享失败')
                    }
                }
                // 将配置注入通用方法
                wxapi.onMenuShareAppMessage(opstion)
            },
            ShareTimeline:function(){
                let opstion = {
                    title: '分享我喜欢的这件商品给你', // 分享标题
                    link: this.shareUrl,
                    imgUrl: this.shareImg,// 分享图标
                    success: function () {
                        this.showShare=!this.showShare
                        // Toast.('分享成功')
                    },
                    error: function () {
                        this.showShare=!this.showshare
                        // Toast.('分享失败')
                    }
                }
                // 将配置注入通用方法
                wxapi.ShareTimeline(opstion)
            }

           
        },
        // common:[wxapi],
        mounted(){
        },
        //onload 执行
        created() {
            Toast.loading({ duration: 0,forbidClick: true, message: '正在加载中...'});
            var goods_id=localStorage.getItem('indexShopid');
            var access_token=localStorage.getItem('access_token')||'';

            var name,value;
            var str=location.hash;
            var num=str.indexOf("?")
            str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
            var arr=str.split("&"); //各个参数放到数组里
            var id=[];
            for(var i=0;i < arr.length;i++){
                num=arr[i].indexOf("=");
                if(num>0){
                    name=arr[i].substring(0,num);
                    value=arr[i].substr(num+1);
                    id[i]=value;
                }
            }
            // console.log(id);
            // if(id.length)
            if(id.length==1){
                var goods_id=id[0];
            }else{
                var goods_id=id[0];
                sessionStorage.setItem('code',id[1]);
            }
            
            var sharecode=api.getQueryString("code")||'';
            if(sharecode!=''){
                sessionStorage.setItem('code', api.getQueryString("code"));
            }
            localStorage.setItem('couponId','');
            localStorage.setItem('couponMoney','');
            localStorage.setItem('indexShopid',goods_id);
            // this.token();
            this.goods_id=goods_id;
            this.access_token=access_token;
            this.detail();
            if(this.access_token!=''){
                this.collect();
                this.getPhone();
            }else{
                this.token();
            }
            // this.getUrl();

        },
        ready () {
            
            // pushHistory()
            // window.addEventListener('popstate', function (e) {
            //   window.WeixinJSBridge.call('closeWindow')
            // }, false)
          },
    }
</script>
<!-- <script type='text/javascript'>
    
</script> -->

<style scoped>
    .fontsize14{
        font-size: 14px;
    }
    .height50{
        height: 50px;
    }
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
    .share-logo{
        position: fixed;
        width: 240px;
        height: 221.5px;
        background-image: url('https://pic.repaiapp.com/static/png/20180515/10/1526352996486285299.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        z-index: 1005;
        top: -38px;
        right: -15px;
    }
    .share-mask{
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        top: 0;
        left: 0;
        z-index: 1005;
    }
    #swiper {
        width: 100%;
        height: 350px;
    }

    #swiper img {
        width: 100%;
        height: 100%;
    }

    #swiper .swiper-slide {
        background-color: #fff;
    }
    .swiper-pagination-bullet-active{
        background-color: #fff;
    }
    .head{
        position: relative;
        height: 40px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #222222;
    }
    .head p{
        height: 100%;
        line-height: 40px;
    }
    .head p:nth-of-type(2){
        margin: 0 25px;
    }
    .active{
        color: #d9372d;
        border-bottom: 1px solid #d9372d;
    }
    .shopInfo{
        position: relative;
        padding: 13px;
        background-color: #fff;
        font-size: 15px;
        color: #1c1c1c;
    }
    .price{
        color: #f33b3b;
        font-size: 18px;
        margin: 8px 0;
    }
    .price span{
        color: #999999;
        font-size: 12px;
        text-decoration: line-through;
    }
    .info{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #999999;
        font-size: 12px;
    }
    .shopInfo img{
        position: absolute;
        width: 52px;
        height: 37px;
        top: 10px;
        right: 10px;
    }
    .options{
        position: relative;
        margin: 9px 0;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45px;
        padding: 0 13px;
        font-size: 15px;
        color: #333333
    }
    .options img{
        width: 7px;
        height: 11px;
    }
    .pj{
        position: relative;
        height: 45px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 13px;
        font-size: 14px;
        color: #999999;
        border-bottom: 1px #dddddd solid;
    }
    .pj div{
        position: relative;
        display: flex;
        align-items: center;
    }
    .pj span{
        color: #d9372d;
    }
    .pj img{
        width: 7px;
        height: 11px;
        margin-left: 8px;
    }
    .pjItem{
        position: relative;
        padding: 13px;
        background-color: #fff;
        border-bottom: 1px #dddddd solid;
        display: flex;
        box-sizing: border-box;
        flex-flow: column;
    }
    .itemInfo{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
    }
    .InfoLeft{
        position: relative;
        display: flex;
        flex-flow: column;
        font-size: 14px;
        color: #0d0d0e;
    }
    .InfoLeft img{
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
    .time{
        font-size: 12px;
        color: #999999;
        margin-top: 8px;
    }
    .InfoLeft p{
        display: flex;
        align-items: center;
    }
    .star{
        position: relative;
        font-size: 0;
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
    .itemCon{
        position: relative;
        font-size: 15px;
        color: #333333;
        padding: 10px 0;
    }
    .imgAll{
        position: relative;
        display: flex;
        flex-wrap: wrap;
        /*justify-content: space-between;*/
    }
    .imgAll img{
        width: 105px;
        height: 105px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .lookmore{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        padding:15px 0  ;
    }
    .lookmore p{
        width: 96px;
        height: 29px;
        border-radius: 25px;
        border: 1px #999999 solid;
        font-size: 14px;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .remmond{
        position: relative;
        background-color: #fff;
        height: 44px;
        padding: 0 13px;
        margin-top: 6px;
        display: flex;
        align-items: center;
        color: #999999;
        font-size: 14px;
        border-bottom: 1px #dddddd solid;
    }
    .popularCon{
        position: relative;
        padding: 0 12.5px;
        justify-content: space-between;
        flex-wrap: wrap;
        display: flex;
        background-color: #fff;
        padding-top: 12.5px;
    }
    .list{
        position: relative;
        display: flex;
        width: 169px;
        border:1px solid #e5e5e5;
        /*height: 100px;*/
        margin-bottom: 10px;
        flex-flow: column;
        /*padding: 0 5px;*/
    }
    .list img{
        width: 100%;
        height: 170px;
    }
    .listTitle{
        position: relative;
        width: 100%;
        font-size: 14px;
        color: #333333;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-top: 10px;
    }
    .nums{
        position: relative;
        font-size: 11px;
        color: #9a9a9a;
        margin: 5px 0;
        /*margin-top: 5px;*/
        /*margin-bottom: 7px;*/
    }
    .list .price1{
        font-size: 14px;
        color: #e73131;
        margin-bottom: 9px;
    }
    .shopCart{
        position: absolute;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background-image: url('https://pic.repaiapp.com/static/png/20180410/15/1523343896096155199.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        right: 10px;
        bottom: 10px;
    }
    .details{
        position: relative;
        background-color: #fff;
        margin-top: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666666;
        padding: 15px 0;
    }
    .details p:nth-of-type(2){
        padding: 0 14px;
        margin: 0 14px;
        border-left: 1px #dddddd solid;
        border-right: 1px #dddddd solid;
    }
    .actives{
        color: #d9372d;
    }
    .footer{
        position: fixed;
        height: 50px;
        background-color: #fff;
        left: 0;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
        display: flex;
    }
    .footerLeft{
        width: 40%;
        /*background-color: red;*/
        font-size: 12px;
        color: #999999;
        display: flex;
    }
    .footerLeft div{
        width: 33%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        position: relative;
    }
    .footerRight{
        flex: 1;
        display: flex;
        /*background-color: green;*/
    }
    .footerRight div{
        width: 50%;
        font-size: 16px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footerLeft div img{
        margin-bottom: 5px;
    }
    .joinCart{
        background-color: #1e1e1e
    }
    .buy{
        background-color: #d83333;
    }
    .footerimg1{
        position: relative;
        width: 21.5px;
        height: 19px;
        background-image: url('https://pic.repaiapp.com/static/png/20180411/17/1523438361410725154.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .footerimg1Active{
        background-image: url('https://pic.repaiapp.com/static/png/20180411/17/1523438554218535349.png');
    }   
    .footerimg2{
        position: relative;
        width: 22.5px;
        height: 19px;
    }
    .footerimg3{
        position: relative;
        width: 24px;
        height: 19px;
    }
    .cartNum{
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: #df3434;
        border-radius: 50%;
        color: #fff;
        font-weight: 10px;
        top: 1px;
        right: 7px;
        text-align: center;
        line-height: 12px;
    }
    .mask{
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        top: 0;
        left: 0;
        z-index: 1;

    }
    .standards{
        position: fixed;
        left: 0;
        bottom: -100%;
        background-color: #fff;
        width: 100%;
        box-sizing: border-box;
        z-index: 2;
        transition:all 0.5s ease;
    }
    .standardsTitle{
        position: relative;
        padding: 0 18px;
        height: 77px;
        background-color: #fff;
        border-bottom: 1px #dddddd solid;
        display: flex;
    }
    .shopImg{
        position: relative;
        width: 90px;
        height: 90px;
        border-radius: 5px;
        bottom: 30px;
    }
    .shopName{
        position: relative;
        display: flex;
        flex-flow: column;
        font-size: 18px;
        color: #e23737;
        padding-top: 12.5px;
        padding-left: 12.5px;
        box-sizing: border-box; 
    }
    .shopName span{
        font-size: 14px;
        color: #999999;
        text-decoration: line-through;
    }
    .stocks{
        font-size: 12px;
        color: #666666;
    }
    .close{
        position: absolute;
        width: 15px;
        height: 15px;
        right: 18px;
        top: 18px;
    }
    .standardsCon{
        position: relative;
        background-color: #fff;
        padding:18px;
        border-bottom: 1px #dddddd solid;
        padding-bottom: 0;
    }
    .standardsCon p{
        color: #999999;
        font-size: 12px;
    }
    .standardsAll{
        position: relative;
        display: flex;
        margin-top: 15px;
        flex-flow: wrap;
    }
    .standardsAll div{
        /*width: 50px;
        height: 25px;*/
        background-color: #ece4e4;
        border-radius: 5px;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        margin-right: 15px;
        margin-bottom: 15px;
        padding: 2px 10px;
    }
    .standardsAll div.standardsAct{
        background: linear-gradient(to right, #e04242 , #c21f1f);
        color: #fff;
    }
    .standardsAll div.nostocks{
        color: #999999;
    }
    .standardsNum{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px;
        color: #999999;
        font-size: 12px;
    }
    .btn{
        display: flex;
    }
    .subtract{
        width: 22px;
        height: 22px;
        background-image: url('https://pic.repaiapp.com/static/png/20180410/18/1523356442613805699.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .subtract[disabled] {
        /*background-color: red;*/
        
        /*background-image: url('https://pic.repaiapp.com/static/png/20180420/13/1524202679904999102.png');*/
    }
    .add{
        width: 22px;
        height: 22px;
        background-image: url('https://pic.repaiapp.com/static/png/20180410/18/1523356658796345549.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .num{
        padding: 0 12px;
        font-size: 14px;
        height:22px;
        background-color: #f7f7f7;
        margin: 0 2px;
        color: #818181;
        line-height: 22px;
    }
    .standardsFooter{
        position: relative;
        height: 50px;
        display: flex;
        width: 100%;
    }
    .standardsFooter div{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #ffffff;
        width:50%;
    }
    .standardsFooter1{
        background: linear-gradient(to right, #323131 , #060606);
    }
    .standardsFooter2{
        background: linear-gradient(to right, #e03a3a , #c01d1d);
    }
    .bottom{
        bottom: 0;
    }
    .footershopinfo{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 193px;
        margin: 0 auto;
        height:1px ;
        background-color: #dddddd;
        font-size: 12px;
        color: #999999;
        /*padding: 15px 0;*/
    }
    .info1{
        background-color: #fff;
        padding: 15px 0;
    }
    .footershopinfo p{
        width: 50%;
        text-align: center;
        background-color: #fff;
    }
    .info1 img{
        width: 100%;
        height: auto;
    }
    .info2{
        padding: 
    }
    .optionDetail{
        position: relative;
        width: 100%;
    }
</style>
