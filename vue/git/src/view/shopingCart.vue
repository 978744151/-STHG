<template>
    <div class="shopingCart">
    	<!-- <loading v-if="showloading"></loading> -->
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
        	<div v-if="showloading">
    	    	<!-- <div class="head">
    	    		购物车
    	    		<p class="stauts">完成</p>
    	    		<p class="stauts">编辑商品</p>
    	    	</div> -->
    	    	<!-- <div style="height: 45px;"></div> -->
    	    	<!-- address -->
    	    	<!-- <div class="address">
    	    		<div class="line"></div>
    	    		<p>
    	    			<img src="https://pic.repaiapp.com/static/png/20180410/17/1523354115530565150.png">
    	    			<span>请添加收货地址</span>
    	    		</p>
    	    		<img src="https://pic.repaiapp.com/static/png/20180410/17/1523354398101809848.png" class="right">
    	    	</div> -->
    	    	<!-- shopname -->
                
                <div v-if="shoplist.length!=0">
        	    	<div class="shopname" style="justify-content: space-between;">
                        <div style="display: flex;align-items: center;">
            				<img src="https://pic.repaiapp.com/static/png/20180410/18/1523354768884904899.png">
            	    		<span>香天下官方直营</span>
                        </div>
                        <span @click="changeTop(0)" v-if="topStatus==0">编辑商品</span>
                        <span @click="changeTop(1)" v-if="topStatus==1">完成</span>
                        <!-- <p>编辑商品</p> -->
        	    	</div>
        	    	<div class="shopingCartCon">
                        <div class="list-item" v-for="(item,index) in shoplist" data-type="0">
                            <div @touchstart.capture="touchStart" @touchend.capture="touchEnd"  class="item">
                            <div :class="item.status==0?'nochecked':'checked'" @click="choose(item.status,item.id)"></div>
                            <img :src="item.thumb" class="shopImg">
                            <div class="itemDetail">
                                <p>{{item.title}}</p>
                                <span class="gf">{{item.optiontitle}}</span>
                                <div class="price">
                                    <div class="priceLeft">
                                        <span class="nowPrice">¥{{item.marketprice}}</span>
                                        <div class="oldprice">￥{{item.productprice}}</div>
                                    </div>

                                    <div class="btn">
                                        <button class="subtract" @click="add(0,item.id)"></button>
                                        <p class="num">{{item.total}}</p>
                                        <button class="add outAdd" @click="add(1,item.id)"></button>
                                    </div>
                                </div>  
                            </div>
                            </div>
                            <div class="del" @click="del(item.id)">删除</div>
                        </div>
        	    	</div>
                </div>
                
                <div v-if="shoplist.length==0" class="empty">
                    <img src="https://pic.repaiapp.com/static/png/20180424/18/1524565867889389753.png">
                    <p>您还没添加任何商品哦～</p>
                </div>
    	    	<!-- POPUlAR  GOODS -->
    	    	<div class="popular">
    	    		<img src="https://pic.repaiapp.com/static/png/20180411/09/1523411196249899102.png">
    	    	</div>	
    	    	<div class="popularCon">
    	            <div class="list" v-for="item in recommand" @click="particulars(item.id)">
    	                <img :src="item.thumb">
    	                <div style="padding: 0 5px">
    	                    <p class="listTitle">{{item.title}}</p>
    	                    <p class="nums">{{item.sales}}人已购买</p>
    	                    <p class="price1">￥{{item.marketprice}}</p>
    	                    <div class="shopCart"></div>
    	                </div>
    	            </div>
    	        </div>
    	        <div style="height: 50px;" v-if="shoplist.length!=0"></div>
    	    	<!--footer  -->
    	    	<div class="footer" v-if="shoplist.length!=0" :style="showTar?'':'bottom:0'">
    	    		<div class="footerLeft" @click="checkAlls(allChecked)">
    		    		<div :class="allChecked?'checked':'nochecked'"></div>
    		    		<span class="checkAll">全选</span>
    	    		</div>
    	    		<div class="footerRight" v-if="topStatus==0">
    	    			<div class="totalPrice">
    	    				<p>总价：<span>¥{{totals}}</span></p>
    	    				<span class="express">不含运费</span>
    	    			</div>
    	    			<div class="gotoPay" @click="gotoPay()">结算</div>
    	    		</div>
                    <div class="footerRight" v-if="topStatus==1">
                        <p class="footer-col" @click='collect()'>移至收藏</p>
                        <p class="footer-del" @click="footerdel()">删除</p>
                    </div>
    	    	</div>
    	    	<navBar :nav=3 v-if="showTar"></navBar>
    	    	<div class="height50" v-if="showTar"></div>
        	</div>
        <!-- </van-pull-refresh>  -->
    	<div class="sj-hint"></div>
    </div>
</template>

<script>
	import navBar from '../components/navigation-bar'
    import api from '../network/request'
    import loading from '../components/loading'
    import { Toast } from 'vant'
    import { Dialog } from 'vant'
    import { PullRefresh } from 'vant'

    export default {
        name: "shopingCart",
        components: {
           navBar,
           loading
        },

        data() {
            return {
            	shoplist:'',
            	recommand:'',
            	showloading:true,
            	allChecked:false,
            	totals:0,
                falgtotals:0,
                startX : 0 ,
                endX : 0 ,
                showTar:'',
                topStatus:0,
                isLoading: false
                
            }
        },
        methods: {
            onRefresh() {
              setTimeout(() => {
                this.shopCart();
                this.isLoading = false;
              }, 500);
            },
            collect:function(){
                var ids=[];
                var _this=this
                for(var i in _this.shoplist){
                    if(_this.shoplist[i].status==1){
                        ids.push(_this.shoplist[i].goodsid)
                    }
                }
                if(ids==''){
                    Toast.fail("请选择商品")
                   return;
                }else{
                    ids=ids.join(",");
                    
                }
                var params={goods_ids:ids,access_token:localStorage.getItem('access_token'),type:1};
                api.post('user/favorite',params,res=>{
                    console.log(res);
                    Toast.success('收藏成功');
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                })
            },
            footerdel:function(){
                var ids=[];
                var _this=this
                for(var i in _this.shoplist){
                    if(_this.shoplist[i].status==1){
                        ids.push(_this.shoplist[i].id)
                    }
                }
                if(ids==''){
                    Toast.fail("请选择商品")
                   return;
                }else{
                    ids=ids.join(",");
                    
                }
                const params={access_token:localStorage.getItem('access_token'),ids:ids};
                api.post('user/del_cart',params,res=>{
                console.log(res);
                    if(res.status==0){
                        Toast.success("删除成功");

                         setTimeout(function(){
                            _this.shopCart();
                            _this.topStatus=0;
                            // _this.totalP('');
                        },800)
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                })
            },
            changeTop:function(status){
                if(status==0){
                    this.topStatus=1;
                }else{
                    this.topStatus=0;
                }
            },
        	//购物车列表
        	shopCart:function(){
        		var _this=this;
        		const params={access_token:localStorage.getItem('access_token')};
        		//测试环境
        		// const params={access_token:''};

                api.post('user/cartList',params,res=>{
                console.log(res);
                    if(res.status==0){
                        Toast.clear();
                    	// _this.showloading=false;
                    	for(var i in res.data.cart[0].lists){
                            if(res.data.cart[0].lists[i].selected==1){
                                res.data.cart[0].lists[i].status=1;
                            }else{
                                res.data.cart[0].lists[i].status=0;
                            }
                    		
                    	}

                       _this.shoplist=res.data.cart[0].lists;
                       _this.recommand=res.data.recommand;
                       for(var i in _this.shoplist){
                            if(_this.shoplist[i].status==0){
                                _this.allChecked=false;
                                break;
                            }else{
                                _this.allChecked=true;
                            }
                        }
                       _this.totalP('');
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                })
        	},
        	//商品选中
        	choose:function(status,id){
        		var _this=this;
        		for(var i in _this.shoplist){
        			if(id==_this.shoplist[i].id){
        				if(_this.shoplist[i].status==0){
        					_this.shoplist[i].status=1
        				}else{
        					_this.shoplist[i].status=0;
        				}
        			}
        		}
        		//判断是否有全选
        		var  flag=0;
        		for(var i in _this.shoplist){
        			flag+=_this.shoplist[i].status;
        		}
        		if(flag==_this.shoplist.length){
        			_this.allChecked=true;
        		}else{
        			_this.allChecked=false;
        		}
        		_this.shoplist=_this.shoplist;
                console.log(_this.shoplist);
                _this.totals=0;
        		_this.totalP(id)
        	},
        	// 全选 反选
        	checkAlls:function(status){
        		var _this=this;

        		if(status){
        			for(var i in _this.shoplist){
        				_this.shoplist[i].status=0;
        			}
        			_this.shoplist=_this.shoplist;
        			_this.allChecked=false;
        			_this.totals=0;
        		}else{
                    _this.totals=0;
        			for(var i in _this.shoplist){
        				_this.shoplist[i].status=1;
        				_this.totals=parseFloat((_this.totals+=(_this.shoplist[i].marketprice*_this.shoplist[i].total)).toFixed(2));
        			}
        			_this.shoplist=_this.shoplist;
        			_this.allChecked=true;
        		}
        	},
        	// 数量增加
        	add:function(status,id){
        		var _this=this;
        		if(status==1){
        			//增加数量
        			// _this.totalP(id)
        			for (var i in _this.shoplist){
        				if(id==_this.shoplist[i].id){
        					++_this.shoplist[i].total;
        					_this.updateCart(id,_this.shoplist[i].total)
        					if(_this.shoplist[i].status==1){
        						_this.totals=0;
        						_this.totalP(id);
        					}
        				}
        			}
        			_this.shoplist=_this.shoplist;
        		}else{
        			for (var i in _this.shoplist){
        				if(id==_this.shoplist[i].id){
        					if(_this.shoplist[i].total>1){
        						--_this.shoplist[i].total;
        						_this.updateCart(id,_this.shoplist[i].total)
        						if(_this.shoplist[i].status==1){
	        						_this.totals=0;
	        						_this.totalP(id)
        						}
        					}
        					
        				}
        				
        			}
        			_this.shoplist=_this.shoplist;
        		}	
        	},
        	//添加数量之后 提交更新购物车
        	updateCart:function(id,total){
        		const params={access_token:localStorage.getItem('access_token'),id:id,total:total};
                api.post('user/save_cart',params,res=>{
                // console.log(res);
                    if(res.status==0){
                    	console.log(res)
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                })
        		
        	},
        	//计算总价格
        	totalP:function(id){
                //      if(id==''){
               //          for(var i in _this.shoplist){
               //              if(_this.shoplist[i].status==1){
               //                  _this.totals=parseFloat((_this.totals+=(_this.shoplist[i].marketprice*_this.shoplist[i].total)).toFixed(2));
               //              }
               //          }
               //      }else{
               //          // _this.falgtotals=_this.totals
               //          // console.log(_this.totals);
               //       for(var i in _this.shoplist){
               //           if(id== _this.shoplist[i].id){
               //               if(_this.shoplist[i].status==1){
                                    // _this.totals=parseFloat(((_this.shoplist[i].marketprice*_this.shoplist[i].total)).toFixed(2));
                                    // // console.log(typeof(_this.totals))
               //               }else{
                                    // // console.log(typeof("1"+_this.totals))
                                    // _this.totals=parseFloat((_this.totals-=(_this.shoplist[i].marketprice*_this.shoplist[i].total)).toFixed(2));
               //               }
               //           }
               //       }
               //      }
        		var _this=this;
                var flag=0;
                console.log(_this.shoplist)
                for(var i in _this.shoplist){
                    if(_this.shoplist[i].status==1){
                        flag=1;
                        _this.totals=parseFloat((_this.totals+=(_this.shoplist[i].marketprice*_this.shoplist[i].total)).toFixed(2));
                    }
                }
                if(flag==0){
                    _this.totals=0;
                }
        		_this.totals=_this.totals;
        	},
        	//商品详情页
        	particulars:function(id){
                console.log(id)
                localStorage.setItem('indexShopid',id);
                this.$router.push({name: 'particulars', query: {'id':id}})
                // this.$router.push({name: 'particulars', params: { 'id':id}})
            },
            //结算
            gotoPay:function(){
            	var ids=[];
            	var _this=this
            	for(var i in _this.shoplist){
            		if(_this.shoplist[i].status==1){
            			ids.push(_this.shoplist[i].id)
            		}
            	}
            	if(ids==''){
                    Toast.fail("请选择商品")
                   return;
            	}else{
            		ids=ids.join(",")
            	}
            	const params={access_token:localStorage.getItem('access_token'),ids:ids};
                api.post('user/submit_cart',params,res=>{
                    if(res.status==0){
                    	console.log(res)
                    	// const params={goods_id:'',access_token:localStorage.getItem('access_token'),total:'',optionid:'',type:1};
                		// this.$router.push({name: 'orderCheck', params: params})
                        localStorage.setItem('goods_id','');
                        localStorage.setItem('total','');
                        localStorage.setItem('optionid','');
                        localStorage.setItem('type','1');
                        this.$router.push({name: 'orderCheck', params:{}})
                    }
                    if(res.status==600){
                        this.$router.push({name: 'login', params: {}})
                    }
                })
            },
            //右滑删除
            //滑动开始
            touchStart(e){
                // 记录初始位置
                this.startX = e.touches[0].clientX;
            },
            //滑动结束
            touchEnd(e){
                // 当前滑动的父级元素
                let parentElement = e.currentTarget.parentElement;
                // console.log(parentElement);return;
                // 记录结束位置
                this.endX = e.changedTouches[0].clientX;
                // 左滑
                if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
                    this.restSlide();
                    parentElement.dataset.type = 1;
                }
                // 右滑
                if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
                    this.restSlide();
                    parentElement.dataset.type = 0;
                }
                this.startX = 0;
                this.endX = 0;
            },
            //判断当前是否有滑块处于滑动状态
            checkSlide(){
                let listItems = document.querySelectorAll('.list-item');
                for( let i = 0 ; i < listItems.length ; i++){
                    if( listItems[i].dataset.type == 1 ) {
                        return true;
                    }
                }
                return false;
            },
            //复位滑动状态
            restSlide(){
                let listItems = document.querySelectorAll('.list-item');
                // 复位
                for( let i = 0 ; i < listItems.length ; i++){
                    listItems[i].dataset.type = 0;
                }
            },
            //购物车删除
            del:function(id){
                Dialog.confirm({
                  title: '提示',
                  message: '确定要从购物车删除吗？'
                }).then(() => {
                    var _this=this;
                    const params={access_token:localStorage.getItem('access_token'),ids:id};
                    api.post('user/del_cart',params,res=>{
                    console.log(res);
                        if(res.status==0){
                            _this.shopCart();
                            _this.restSlide();
                            Toast.success("删除成功")
                        }
                        if(res.status==600){
                            this.$router.push({name: 'login', params: {}})
                        }
                    })

                }).catch(() => {
                    this.restSlide();
                  // on cancel
                });
                
            }

            
        },
        created() {
            Toast.loading({
              duration: 0,       // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              message: '正在加载中...'
            });
            this.$shareUrl.shareUrl("shopingCart");
        	this.shopCart();
            if(this.$route.params.shopcartStatus==1){
                this.showTar=false
            }else{
                this.showTar=true
            }
            
        }
    }
</script>

<style scoped>
    .height50{
        height: 50px;
    }
    .footer-col{
        position: relative;
        width: 80px;
        height: 30px;
        border: 1px #DD3232 solid;
        border-radius: 3px;
        font-size: 14px;
        color: #DD3232;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footer-del{
        position: relative;
        width: 80px;
        height: 30px;
        border-radius: 3px;
        font-size: 14px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to right, #FF0000, #D80303);
        margin:0 10px; 
    }
    .shopingCart{
        overflow-x: hidden;
    }
    .list-item{
      position: relative;
        height: 114px;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
      background-color: #fff;
    }
    .list-item[data-type="0"]{
      transform: translate3d(0,0,0);
    }
    .list-item[data-type="1"]{
      transform: translate3d(-2rem,0,0);
    }
    .list-item:after{
      content: " ";
      position: absolute;
      left: 0.2rem;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #ccc;
      color: #ccc;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    .del{
        position: absolute;
        height: 100%;
        width: 80px;
        background-color: #d42d26;
        right: -80px;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #fff;
    }
	.head{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		height: 45px;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		color: #000000;
		border-bottom: 1px #dadada solid;
		z-index: 2;
	}
	.stauts{
		position: absolute;
		color: #dd3232;
		font-size: 15px;
		right: 10px;
		bottom: 10px;
	}
	.address{
		position: relative;
		height: 65px;
		background-color: #fdf5f5;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 0 10px;
		font-size: 15px;
		color: #3d3d3d;
		justify-content: space-between;

	}
	.line{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background-image: url('https://pic.repaiapp.com/static/png/20180410/17/1523354003255425153.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.address p{
		display: flex;
		align-items: center;
	}
	.address p img{
		width: 15.5px;
		height: 17px;
		margin-right: 9px;
	}
	.right{
		width: 7.5px;
		height: 12px;
	}
	.shopname img{
		width: 15.5px;
		height: 14.5px;
		margin-right: 6px;
	}
	.shopname{
		width: 100%;
		height: 40px;
		background-color: #f4f4f4;
		font-size: 14px;
		color: #000;
		display: flex;
		align-items: center;
        padding: 0 10px;
		/*padding-left: 10px;*/
		box-sizing: border-box;
	}
	.shopingCartCon{
		position: relative;
		background-color: #fff;
	}
	.item{
		position: absolute;
		/*height: 114px;*/
		padding: 0 10px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #dadada;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
	.checked{
		width:20px;
		height: 20px;
		border-radius: 50%;
		background-image: url('https://pic.repaiapp.com/static/png/20180410/18/1523355367532350101.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.nochecked{
		width:20px;
		height: 20px;
		border-radius: 50%;
		background-image: url('https://pic.repaiapp.com/static/png/20180411/09/1523410710814819757.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.shopImg{
		position: relative;
		border: 1px #bec2c9 solid;
		width: 78px;
		height: 78px;
		margin-left: 12px;
		margin-right: 10px;
	}
	.itemDetail{
		position: relative;
		flex-flow: column;
		font-size: 14px;
		color: #000000;
		flex:1;
	}
	.itemDetail p{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.gf{
		color: #fcb039;
		font-size: 12px;
		margin-bottom: 5px;
	}
	.price{
		font-size: 16px;
		color: #ea4c3c;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.oldprice{
		color: #96989a;
		font-size: 11px;
		text-decoration: line-through;
		margin-left: 10px;
	}
	.subtract{
		width: 22px;
		height: 22px;
		background-image: url('https://pic.repaiapp.com/static/png/20180410/18/1523356442613805699.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.add{
		width: 22px;
		height: 22px;
		background-image: url('https://pic.repaiapp.com/static/png/20180410/18/1523356658796345549.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.priceLeft{
		position: relative;
		display: flex;
		align-items: flex-end;
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
	.btn{
		display: flex;
	}
	.popular{
		position: relative;
		height: 50px;
		background-color: #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.popular img{
		width: 188px;
		height: 28px;
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
    .footer{
    	position: fixed;
    	background-color: #fff;
    	width: 100%;
    	height: 50px;
    	left: 0;
    	bottom: 50px;
    	box-shadow: 0px -1px 15px 0px rgba(0,0,0,0.2);
    	display: flex;
    	align-items: center;
    	padding: 0 10px;
    	font-size: 15px;
    	color: #000000;
    	justify-content: space-between;
    	padding-right: 0;
    }
    .checkAll{
    	position: relative;
    	margin-left:9px;
    }
    .footerLeft{
    	position: relative;
    	display: flex;
    	align-items: center;
    	font-size: 14px
    }
    .footerRight{
    	position: relative;
    	display: flex;
    	align-items: center;
    	height: 100%;
    	font-size: 14px;
    }
    .totalPrice{
    	/*position: fixed;*/
    	flex-flow: column;
    	margin-right: 15px;
    }
    .gotoPay{
    	position: relative;
    	height: 100%;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	width: 100px;
    	background-color: #d42d26;
    	color: #fff;
    	font-size: 14px;
    }
    .express{
    	font-size: 10px;
    	color: #9a9a9a;
    }
    .totalPrice p span{
    	color: #d42d26;
    }
    .empty{
        position: relative;
        width: 100%;
        height: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        font-size: 15px;
        color: #969696;
        background-color: #fff;
    }
    .empty img{
        width: 85px;
        height: 65px;
        margin-bottom: 15px;
    }
</style>
