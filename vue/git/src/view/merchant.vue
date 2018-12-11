<template>
   <div class="merchant">
   		<div class="head">
   			<div class="headTop">
   				<div class='merchantImg' @click="showImg()">
   					<img :src="shopInfo.thumb">
   					<div class="nums">{{thumb_url.length}}张</div>
   				</div>
   				<div class="merchantInfo">
                    <!-- overflow: hidden;text-overflow:ellipsis;white-space: nowrap; -->
   					<p style="font-size: 15px;    display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{shopInfo.name}}</p>
   					<div class="price">
						<!-- <star :size="28" :score="Number(shopInfo.star)"></star> -->
   						<div class="star">
		        			<div class="starBg"></div>
		        			<div class="starLight" :style="'width:'+shopInfo.star*20+'%'">
		        				<img src="https://pic.repaiapp.com/static/png/20180411/16/1523435822461174856.png">
		        			</div>
        				</div>
        				<span>¥{{shopInfo.spend}}元／人</span>
   					</div>
   				</div>
				<a :href="'tel:'+shopInfo.telephone">
					<div class="rightPhone">
						<img src="https://pic.repaiapp.com/static/png/20180417/10/1523931480978249101.png">
						<p>电话</p>
						<div class="line" style="top: 40%"></div>
					</div>
				</a>
   			</div>
   			<div class="headBottom">
   				<div class="address"></div>
   				<div class="addressInfo">
   					<p>{{shopInfo.province+shopInfo.scity+shopInfo.area+shopInfo.city}}</p>
   					<span >(距您{{shopInfo.distance}}km)</span>
                    <!-- v-if="!!(shopInfo.distance)" -->
   				</div>
   				<div class="goadd" @click="add()">
   					<img src="https://pic.repaiapp.com/static/png/20180417/10/1523932843524125349.png">
   					<p>导航</p>
   					<div class="line"></div>
   				</div>
   			</div>
   		</div>
   		<!-- 优惠活动 -->
   		<div class="acivity">优惠活动</div>
   		<div class="acivityDetail" >
   			<img :src="shopInfo.business_photo" class="zhe" v-if="shopInfo.business_main!=''">
   			<div v-if="shopInfo.business_main!=''">
   				<p>{{shopInfo.business_main}}</p>
   				<span>{{shopInfo.business_sec}}</span>
   			</div>
            <p v-if="shopInfo.business_main==''" style="width: 100%;display: flex;align-items: center;justify-content: center;color: #999">暂无优惠活动</p>
            <!-- <div>暂无优惠活动</div> -->
   			<!-- <div class="right"><img src="https://pic.repaiapp.com/static/png/20180417/11/1523934578061689749.png" class="rightImg"></div> -->
   		</div>
   		<!-- 用户评价 -->
   		<div class="user">
   			<p>用户评价<span>({{count}})</span></p>
   			<img src="https://pic.repaiapp.com/static/png/20180417/11/1523934578061689749.png" class="rightImg">
   		</div>
   		<div v-if="comment!=''">
   			<div class="userItem" v-for="item,index in comment" v-if="index<2">
   				<div class="ItemTop">
   					<div class="userImg">
   						<img :src="item.memberlevel">
   					</div>
   					<div class="rightAll">
	   					<div class="usrInfo">
	   						<p>{{item.nickname}}</p>
	   						<div class="starTime">
	   							<!-- <star :size="28" :score="item.commit_level"></star> -->
                                <div class="star">
                                    <div class="starBg"></div>
                                    <div class="starLight" :style="'width:'+item.commit_level*20+'%'">
                                        <img src="https://pic.repaiapp.com/static/png/20180411/16/1523435822461174856.png">
                                    </div>
                                </div>
	        					<p class="time">{{item.commit_time}}</p>
	   						</div>
	   					</div>
	   					<p class="userInput">{{item.content}}</p>

	   					<div class="pjImg" v-if="item.comment_photo!=''">
	   						<img :src="pic" v-for="pic in item.comment_photo" v-preview="pic" preview-title-enable="true" preview-nav-enable="true">
	   					</div>
   					</div>
   				</div>
   			</div>
   		</div>
        <div v-if="comment==''" style="font-size: 14px;color: #999;height: 170px;display: flex;align-items: center;justify-content: center;background-color: #fff">暂时还没有评论，快来抢沙发吧～</div>

   		<!-- lookmore -->
   		<div class="look" v-if="count!=0">
   			<div class="lookmore" @click="all">查看全部评价({{count}})</div>
   		</div>
   		<div style="height: 60px;"></div>
   		<div class="footer">
   			<div class="goto" @click="gotoreview()">去评价</div>
   		</div>
   </div>
</template>

<script>
	import api from '../network/request';
	import star from 'components/star/star';
    import { ImagePreview } from 'vant';
     // import BMap from 'BMap'
	export default {
        name: "merchant",
        components: {
        },

        data() {
            return {
				shopInfo:{},
				comment:[],
				thumb_url:[],
				lng:0,
				lat:0,
				count:0,
                score:0,
                shoplat:'',
                shoplng:'',
                sw:false,
                imgs:[]
            }
        },
        methods: {
            bigImg:function(imgs){
                console.log(imgs);
                ImagePreview(imgs);
            },
            showImg:function(){
                console.log(this.imgs);
                const instance = ImagePreview(this.imgs);
            },
			getShopInfoData() {
                console.log(localStorage.getItem('orderid'));
                // return;
				let params={
					// id:204,
					id:localStorage.getItem('orderid'),
					lng:sessionStorage.getItem('lng'),
					lat:sessionStorage.getItem('lat')
				};
				var _this = this;
				api.post('store/info', params, res => {
					if (res.status == 0) {
						this.count = res.data.count
						this.shopInfo = res.data.info
						this.thumb_url = res.data.info.thumb_url
						this.comment = res.data.comment
                        this.shoplat=res.data.info.lat
                        this.shoplng=res.data.info.lng,
                        this.imgs=res.data.info.thumb_url
					}
				})
			},

            all:function(){
                this.$router.push({name: 'allReview', params: {id:this.$route.params.id}})

            },
            gotoreview:function(){
                this.$router.push({name: 'shopReview', params: {id:this.$route.params.id}})
            },
            add:function(){
                var _this=this;
                var map = new BMap.Map("allmap");    
                var point = new BMap.Point(116.709684,39.89778);  
                map.centerAndZoom(point, 16);    
                map.enableScrollWheelZoom();   
              
                var myIcon = new BMap.Icon("myicon.png",new BMap.Size(30,30),{  
                    anchor: new BMap.Size(10,10)      
                });  
              
                var marker=new BMap.Marker(point,{icon: myIcon});    
                map.addOverlay(marker);    
              
                var geolocation = new BMap.Geolocation();  
                geolocation.getCurrentPosition(function(r){  
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){  
                        var mk = new BMap.Marker(r.point);  
                        map.addOverlay(mk);  
                        //map.panTo(r.point);//地图中心点移到当前位置  
                        var latCurrent = r.point.lat;  
                        var lngCurrent = r.point.lng;  
                        //alert('我的位置：'+ latCurrent + ',' + lngCurrent);  
                        // alert(_this.shoplat);
                        // return;／
                        location.href="http://api.map.baidu.com/direction?origin="+latCurrent+","+lngCurrent+"&destination="+_this.shoplat+","+_this.shoplng+"&mode=driving&region=北京&output=html";  
              
                    }  
                    else {  
                        alert('failed'+this.getStatus());  
                    }          
                },{enableHighAccuracy: true})  
              
              
                map.addOverlay(marker);    
                var licontent="<b>健龙森羽毛球馆</b><br>";    
                    licontent+="<span><strong>地址：</strong>北京市通州区滨河中路108号</span><br>";    
                    licontent+="<span><strong>电话：</strong>(010)81556565 / 6969</span><br>";            
                var opts = {   
                    width : 200,  
                    height: 80,  
                };           
                var  infoWindow = new BMap.InfoWindow(licontent, opts);    
                marker.openInfoWindow(infoWindow);    
                marker.addEventListener('click',function(){  
                    marker.openInfoWindow(infoWindow);  
                });
            }

        },
        created() {

			// 初始化拿到当前地址
			// let geo = JSON.parse(window.sessionStorage.getItem("geographicInfo"))
			// this.lng=geo.businessAreas[0].location.lng
			// this.lat=geo.businessAreas[0].location.lat

			this.getShopInfoData()
		},
		components:{
			star
		}
    }
</script>

<style scoped>
	.head{
		position: relative;
		background-color: #fff;
		display: flex;
		flex-flow:column;
		padding: 10px;
        padding-bottom: 0;
		box-sizing: border-box;
	}
	.headTop{
		/*height: 75px;*/
		display: flex;
		width: 100%;
		box-sizing: border-box;
		align-items: flex-end;
		/*justify-content: space-between;*/
	}
	.merchantImg{
		position: relative;
		width: 75px;
		height: 64px;
		border: 1px #ddd solid;
		margin-right: 10px;
	}
	.merchantImg img{
		width: 100%;
		height: 100%;
	}
	.nums{
		position: absolute;
		width: 100%;
		height: 15px;
		color: #fff;
		background-color: rgba(0,0,0,0.6);
		font-size: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 0;
		left: 0;
	}
	.merchantInfo{
		position: relative;
		font-size: 19px;
		color: #000;
		display: flex;
		flex-flow: column;
		flex:1;
		border-bottom: 1px #ddd solid
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
    .price{
    	display: flex;
    	align-items: center;
    	margin-top: 8px;
    	padding-bottom: 5px;
    }
    .price span{
    	font-size: 14px;
    	margin-left: 10px;
    }
    .rightPhone{
    	position: relative;
    	width: 64px;
    	height: 100%;
    	/*background-color: red;*/
    	display: flex;
    	align-items: center;
    	justify-content: flex-end;
    	flex-flow: column;
    	font-size: 12px;
    	color: #000;
    	border-bottom: 1px #ddd solid
    }
    .rightPhone img{
    	width: 14px;
    	height: 20px;
    	margin-bottom: 5px;
    }
    .rightPhone p{
    	margin-bottom: 10px;
    }
    .line{
    	position: absolute;
    	width: 1px; 
    	height: 23px;
    	background-color: #f0f0f0;
    	left: 0;
        top: 50%;
        transform: translateY(-50%);
    	/*bottom: 20px;*/
    }
    .headBottom{
    	position: relative;
    	display: flex;
    	align-items: center;
        padding: 10px 0;
    	/*padding-left: 10px;*/
    	/*height: 58.5px;*/
    }
    .address{
    	position: relative;
        width: 15px;
        height: 16.5px;
        background-image: url('https://pic.repaiapp.com/static/png/20180518/15/1526628805750829799.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .addressInfo{
    	position: relative;
    	flex:1;
    	display: flex;
    	/*align-items: center;*/
    	flex-flow: column;
    	font-size: 14px;
    	color: #020202;
    	margin-left: 8px;
    }
    .addressInfo p{
    	display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
    }
    .addressInfo span{
    	color: #a7a7a7;
    }
    .goadd{
    	position: relative;
    	width: 64px;
    	height: 100%;
    	/*background-color: red;*/
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	flex-flow: column;
    	font-size: 12px;
    	color: #000;
        margin-left: 10px;
    	/*border-bottom: 1px #ddd solid;*/
    }
    .goadd img{
    	width: 16.5px;
    	height: 16.5px;
    	margin-bottom: 5px;

    }
    .acivity{
    	padding: 0 10px;
    	background-color: #fff;
    	height: 45px;
    	border-bottom: 1px #ddd solid;
    	display: flex;
    	align-items: center;
    	font-size: 14px;
    	color: #000000;
    	margin-top: 10px;
    }
    .acivityDetail{
    	position: relative;
   		padding:10px;
   		background-color: #fff;
   		/*height: 57px;*/
   		color: #3d3d3d;
   		font-size: 14px;
   		/*padding-top: 10px;*/
   		display: flex;
    }
    .zhe{
    	width: 15px;
    	height: 15px;
    	margin-top: 3px;
    	margin-right: 5px;
    }
    .acivityDetail div{
    	display: flex;
    	flex-flow: column;
    }
    .acivityDetail span{
    	font-size: 12px;
    	color: #a7a7a7;
    }
    .right{
    	position: absolute;
    	right: 0;
    	top: 0;
    	width: 20px;
    	height: 100%;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	/*background-color: red;*/
    }
    .rightImg{
    	width: 6.5px;
    	height: 12px;
    }
    .user{
    	position: relative;
    	display:flex;
    	align-items: center;
    	justify-content: space-between;
    	font-size:14px;
    	color: #000000;
    	background-color: #fff;
    	padding: 0 10px;
    	height: 44px;
    	margin-top: 10px;
    	border-bottom: 1px #ddd solid;
    }
    .user span{
    	color: #939393;
    	font-size: 12px;
    }
    .userItem{
    	position: relative;
    	background-color: #fff;
    	padding:10px;
    	padding-top: 18px;
    	border-bottom: 1px #ddd solid;
    }
    .ItemTop{
    	position: relative;
    	display: flex;
    	/*align-items: center;*/
    	/*justify-content: */
    }
    .userImg{
    	position: relative;
    	width: 35px;
    	height: 35px;
    	border-radius: 50%;
    	border-bottom: 1px #ddd solid;
    }
    .userImg img{
    	width: 100%;
    	height: 100%;
    	border-radius: 50%;
    }
    .usrInfo{
    	position: relative;
    	flex:1;
    	font-size: 14px;
    	color: #181818;
    	display: flex;
    	flex-flow: column;
    }
    .starTime{
    	position: relative;
    	display: flex;
		height:40px;
    	align-items: center;
    	justify-content: space-between;
    }
    .time{
    	color: #9f9f9f;
    	font-size: 12px;
    }
    .rightAll{
    	position: relative;
    	display: flex;
    	flex-flow: column;
    	flex: 1;
    	margin-left: 8px;
    }
    .userInput{
    	flex:1;
    	font-size: 14px;
    	color: #181818;
    	margin-top: 5px;
    	display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
    }
    .pjImg{
    	display: flex;
    	margin-top: 10px;

    }
    .pjImg img{
    	width: 85px;
    	height: 85px;
    	margin-right: 15px;
    }
    .lookmore{
    	position: relative;
    	width: 140px;
    	height: 35px;
    	border:1px #dd3232 solid;
    	font-size: 14px;
    	color: #dd3232;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	margin: 0 auto;
    	border-radius: 2.5px;
    }
    .look{
    	background-color: #fff;
    	padding:15px 0;
    }
    .footer{
    	position: fixed;
    	width: 100%;
    	height: 60px;
    	background-color: #fff;
    	left: 0;
    	bottom: 0;
    	box-shadow: 0 -0.5px 8px rgba(0,0,0,0.1);
    	display: flex;
    	align-items: center;
    	justify-content: center;
    }
    .goto{
    	position: relative;
    	width: 355px;
    	height: 44px;
    	background-color: #f30606;
    	color: #fff;
    	font-size: 15px;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	border-radius: 2.5px;
    }
</style>
