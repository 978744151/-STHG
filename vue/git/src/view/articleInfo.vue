<template>
   <div class="articleInfo">
   		<div class="gotoindex" @click="goto()"></div>
   		<div class="title" v-if="type==3">{{infos.title}}</div>
   		<div class="head" v-if="type==3">
   			<div class="left">
   				<img :src="infos.up_img">
   				<span>{{infos.up_name}}</span>
   			</div>
   			<div>{{createtime}} 浏览 {{infos.browse_count}}</div>
   		</div>
   		<div style="width: 100%" v-if="type==1">
   		<video-player  class="video-player-box"
                   ref="videoPlayer"
                   :options="playerOptions"
                   :playsinline="true"
                   customEventName="customstatechangedeventname"

                   @play="onPlayerPlay($event)"
                   @pause="onPlayerPause($event)"
                   @statechanged="playerStateChanged($event)"
                   @ready="playerReadied">
    	</video-player v-if="type==1">
    	</div>
   		<!-- <video-player  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" v-if="type==1">
      	</video-player> -->
   		<!-- <video :src="infos.videourl" v-if="type==1" id="myvideo" :muted="muteStatus" :autoplay="playStatus"></video> -->
   		<div class="imgsAll" v-if="type==2">
   			<img :src="item" v-for="item in infos.thumb" v-preview="item" preview-title-enable="true" preview-nav-enable="true"  v-lazy="item">
   		</div>
   		<div v-if="type==2" style="padding:0 10px;font-size: 14px">
   			{{infos.title}}<span style="font-size: 12px;color: #a7a7a7;margin-left: 5px;">({{infos.browse_count}}浏览)</span>
   		</div>
   		<div v-html="content" style="font-size: 14px;padding: 15px;padding-bottom: 0;"></div>
   		<div class="videoFooter">
          <div class="flex">
			  <img :src="infos.up_img" class="headImg" v-if="type==1||type==2">
              <span v-if="type==1||type==2">{{infos.up_name}}</span>
          </div>
          <div class="flex">
              <div class="pl">
                <p></p>
                <span>{{infos.comment_count}}</span>
              </div>
              <div class="dz">
                <!-- active -->
                <!-- @click.stop="like(infos.id,infos.is_like)" -->
                <p :class="infos.is_like?'':''" ></p>
                <span>{{infos.like_count}}</span>
              </div>
          </div>
        </div>
        <div style="height: 10px;background-color: #F4F4F4"></div>
        <!-- pl -->
        <div class="commitAll">
        	<div class="commit"><p></p></div>
        	<div class="commitItem" v-for="item in commitInfo">
        		<div class="commitHead">
        			<img :src="item.avatar">
        		</div>
        		<div class="commitCon">
        			<span>{{item.nickname}}</span>
        			<p>{{item.content}}</p>
        		</div>
        	</div>

        	<div class="nocommitItem" v-if="commitInfo==''">暂时还没有评论 快来抢沙发吧</div>
        	<div class="commit" v-if="commitInfo!=''"><p class="end"></p></div>
        </div>
        <div style="height: 60px;"></div>
        <div class="footer">
        	<div class="footerLeft">
        		<p class="bj"></p>
        		<!-- <form action="#"> -->
        			<!-- @keydown="submit($event)" -->
   					<input type="search" name="" placeholder="写写你的看法吧" ref="input1"  @keyup.enter="submit()"  v-model="text" style="font-size: 14px">
   				<!-- </form> -->
        		<!-- <input type="" name="" placeholder="写写你的看法吧" ref="input1" @keydown="submit($event)" v-model="text"> -->
        	</div>
        	<div class="footerRight">
        		<div class="flex" @click.stop="pl">
        			<p class="icon1"></p>
        			<!-- <div class="nums" v-if="infos.comment_count!=0">{{infos.comment_count}}</div> -->
        		</div>
        		<div class="flex">
        			<!-- active -->
        			<p :class="infos.is_like?'icon2 active':'icon2'" @click.stop="like(infos.id,infos.is_like)"></p>
        		</div>
        		<div class="flex">
        			<p class="icon3" @click="showshare()"></p>
        		</div>

        	</div>
        </div>
        <div class="share-mask" v-if="showShare" @click="showshare()"></div>
        <div class="share-logo" v-if="showShare" @click="showshare()"></div>
   </div>
</template>

<script>
	import api from '../network/request'
    import wxapi from '../common/wxapi.js'
    import { Toast } from 'vant'
    import 'video.js/dist/video-js.css'
  	import { videoPlayer } from 'vue-video-player'
  	import { Lazyload } from 'vant';
    export default {
        name: "articleInfo",
        components: {
        	videoPlayer
        },

        data() {
            return {
                type:'',
                content:'',
                infos:'',
                createtime:'',
                articleid:'',
                page:0,
                commitInfo:'',
                text:'',
                _dom:"",
	            playStatus:true,
	            muteStatus:true,
	            isMute:true,
	            isPlay:false,
	            showShare:false,
	            is_like:'',
	            shareTitle:'',
	            shareUrl:'',
	            access_token:'',
			    playerOptions: {
		          // videojs options
		          fluid: true, 
		          muted: true,
		          autoplay:true,

		          language: 'zh-CN',
		          playbackRates: [0.7, 1.0, 1.5, 2.0],
		          sources: [{
		            type: "video/mp4",
		            src: ""
		          }],
		          // poster: "/static/images/author.jpg",
		        }
            }
        },
        computed: {
	      player() {
	        return this.$refs.videoPlayer.player
	      }
    	},
        methods: {
      //   	playClick(){
		    //     this._dom = document.getElementById('myvideo');
		    //     this.isPlay = !this.isPlay;
		    //     this._dom.play();
    		// },
		    		 // listen event
		      onPlayerPlay(player) {
		        // console.log('player play!', player)
		      },
		      onPlayerPause(player) {
		        // console.log('player pause!', player)
		      },
		      // ...player event

		      // or listen state event
		      playerStateChanged(playerCurrentState) {
		        // console.log('player current update state', playerCurrentState)
		      },

		      // player is ready
		      playerReadied(player) {
		        console.log('the player is readied', player)
		        // you can use it to do something...
		        // player.[methods]
		      },
    		pl(){
    			this.$nextTick(function(){
			  		var p = document.getElementById('app');
			  		console.log(p);
				  	console.log(p.scrollHeight);
				  	console.log(p.scrollTop)
			  		p.scrollTop = p.scrollHeight;
			  		document.body.scrollTop=p.scrollHeight;
			  		document.getElementById("app").scrollIntoView(true);
			  })
    		},
    		goto:function(){
                this.$router.replace({name: 'index', params:{}})
            },
    		wxRegCallback () {
                //分享给朋友
                this.onMenuShareAppMessage();
                //分发到朋友圈
                this.ShareTimeline();
            },
            onMenuShareAppMessage () {
                // console.log(this.shareImg,"11111111")
                let opstion = {
                    title: this.shareTitle, // 分享标题
                    desc:'',
                    link: this.shareUrl,
                    imgUrl: '',// 分享图标
                    success: function () {
                        // Toast.('分享成功')
                    },
                    error: function () {
                        // Toast.('分享失败')
                    }
                }
                // 将配置注入通用方法
                wxapi.onMenuShareAppMessage(opstion)
            },
            ShareTimeline:function(){
                let opstion = {
                    title: this.shareTitle, // 分享标题
                    link: this.shareUrl,
                    imgUrl: '',// 分享图标
                    success: function () {
                        // Toast.('分享成功')
                    },
                    error: function () {
                        // Toast.('分享失败')
                    }
                }
                // 将配置注入通用方法
                wxapi.ShareTimeline(opstion)
            },
    		showshare:function(){
                this.showShare=!this.showShare;
            },
           	info:function(){
				var _this=this;
				// var name,value;
	   //          var str=location.hash;
	   //          // alert(str);
	   //          var num=str.indexOf("?")
	   //          str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
	   //          var arr=str.split("&"); //各个参数放到数组里
	   //          var id=[];
	   //          for(var i=0;i < arr.length;i++){
	   //              num=arr[i].indexOf("=");
	   //              if(num>0){
	   //                  name=arr[i].substring(0,num);
	   //                  value=arr[i].substr(num+1);
	   //                  id[i]=value;
	   //              }
	   //          }
            var id=api.getQueryString('id')||'';
            var type=api.getQueryString('type')||'';
            this.type=type;
            // alert(document.getElementById('myvideo'))
            // alert(this.type);
          //   if(this.type==1){
          //   	_this._dom = document.getElementById('myvideo');
          //   	console.log(_this._dom);
	        	// // _this._dom.play();
          //   }
            var params={id:id,access_token:this.access_token};
			api.post('article/info',params,res=>{
				if(res.status==0){
					console.log(res);
					// console.log();
					if(res.data.type==1){
						this.playerOptions.sources[0].src=res.data.videourl
					}
					
					this.infos=res.data;
					this.content=res.data.content;
					this.createtime=this.formatDateTime(res.data.createtime);
					this.articleid=res.data.id;
					this.is_like=res.data.is_like
					console.log(this.formatDateTime(res.data.createtime));
					this.com();
					this.shareTitle=res.data.title;
					// alert(this.shareTitle)
					this.shareUrl=res.data.share_url;
					if(res.data.thumb!=''){
						var shareImg=res.data.thumb[0]
					}else{
						var shareImg='https://pic.repaiapp.com/static/png/20180711/17/1531300010626885399.png'
					}
					
					this.$shareUrl.shareUrl("articleInfo",res.data.id,res.data.title,shareImg,res.data.type);
					// wxapi.wxRegister(_this.wxRegCallback)
				}
				if(res.status==600){

					this.$router.push({name: 'login', params: {}})
					}
				}) 
			},
			com:function(){
				var _this=this;
				var articleid=this.articleid;
				console.log(articleid)
				// access_token:localStorage.getItem('access_token'),
				const params={id:articleid,page:this.page};
				api.post('article/comment',params,res=>{
				if(res.status==0){
					_this.commitInfo=res.data;
				}
				if(res.status==600){

					this.$router.push({name: 'login', params: {}})
					}
				}) 
			},
			like:function(id,statuss){
	            if(!statuss){
	              var is_status=1;
	            }else{
	              var is_status=0;
	            }
	              var _this=this;
	              const params={access_token:localStorage.getItem('access_token'),id:id,status:is_status};
	              api.post('user/article_like',params,res=>{
	              this.info();
	              if(res.status==0){
	                 console.log(res);
	                 if(is_status==1){
	                 	Toast.success("点赞成功")
	                 }else{
	                 	Toast.success("取消点赞")
	                 }
	                 this.info();
	              }
	              if(res.status==600){
	                  this.$router.push({name: 'login', params: {}})
	              }
	            }) 
          	},
          	//发表评论
          	submit(e){
		        // key.Code === 13表示回车键 
		        var con=this.$refs.input1.value;
		        console.log(con)
		        if(con==''){
		        	return;
		        }
		        var keyCode = window.event.keyCode;
		        console.log(keyCode);
		        // return;
		        if(keyCode === 13){
		          var _this=this;
	              const params={access_token:localStorage.getItem('access_token'),id:this.$route.query.id,content:con,source:'H5'};
	              api.post('user/article_com',params,res=>{
	              if(res.status==0){
	                 console.log(res);
	                 Toast.success("评论成功");
	                 this.text="";
	                 this.com();
	                 this.info();
	                 // this.type=0;
	                 // this.info();
	              }
	              if(res.status==600){
	                  this.$router.push({name: 'login', params: {}})
	              }
	            })
		        }
    		},
          	// this.$refs.input1.value;
			//时间戳转换
			formatDateTime:function(timeStamp) {   
			    var date = new Date();  
			    date.setTime(timeStamp * 1000);  
			    var y = date.getFullYear();      
			    var m = date.getMonth() + 1;      
			    m = m < 10 ? ('0' + m) : m;      
			    var d = date.getDate();      
			    d = d < 10 ? ('0' + d) : d;      
			    var h = date.getHours();    
			    h = h < 10 ? ('0' + h) : h;    
			    var minute = date.getMinutes();    
			    var second = date.getSeconds();    
			    minute = minute < 10 ? ('0' + minute) : minute;      
			    second = second < 10 ? ('0' + second) : second;     
			    // +' '+h+':'+minute+':'+second;
			    return y + '-' + m + '-' + d;      
			}    
        },
        created() {
        	var flag=0;
            for(var i=0;i<localStorage.length;i++){
                if(localStorage.key(i)=="access_token"){
                    flag=1;
                }
            }
            if(flag==0){
                // localStorage.setItem('access_token','');
                this.access_token=''
            }else{
            	this.access_token=localStorage.getItem('access_token');
            }
            var sharecode=api.getQueryString("code")||'';
            if(sharecode!=''){
                sessionStorage.setItem('code', api.getQueryString("code"));
            }
            this.info();

            // this.playerOptions.width=document.body.clientWidth;
            // this._dom = document.getElementById('myvideo');
            	// console.log(this._dom,"11111aslkjfalfjla");
            // var element = document.getElementById("app");
            // alert(element);
            // element.scrollIntoViewIfNeeded();
            // console.log(this.access_token)
        	
        	// this.type=this.$route.params.type;
        }
    }
</script>
<style scoped>
	.vjs-big-play-button{
		display: none !important;
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
        background-color: rgba(0,0,0,0.8);
        top: 0;
        left: 0;
        z-index: 1005;
    }
	::-webkit-search-cancel-button { display: none; }

	.imgsAll{
		position: relative;
		display: flex;
		flex-wrap: wrap;
		padding: 0 5px;
		padding-right: 0;
		/*justify-content: s*/

	}
	.imgsAll img{
		width: 118px;
		height: 118px;
		margin-right: 5px;
		margin-bottom: 5px;
	}
	.nocommitItem{
		font-size: 14px;
		color: #a7a7a7;
		text-align: center;
	}
	.headImg{
	    position: relative;
	    width: 22px;
	    height: 22px;
	    margin-right: 7px;
	    border-radius: 50%;
	 }
	video{
		position: relative;
		width: 100%;
		height: 200px;
	}
	.nums{
		position: absolute;
		width: 14px;
		height: 14px;
		background-color: #E60012;
		color: #fff;
		font-size: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		right: -7px;
		top: -7px;
		border-radius: 50%
	}
	.icon1{
		width: 19px;
	    height: 16px;
	    background-image: url('https://pic.repaiapp.com/static/png/20180504/11/1525404452264710148.png');
	    background-size: 100% 100%;
	}
	.icon2{
		width: 16px;
	    height: 16px;
	    background-image: url('https://pic.repaiapp.com/static/png/20180504/11/1525404467191695649.png');
	    background-size: 100% 100%;
	    margin: 0 30px;
	}
	.icon3{
		width: 15px;
	    height: 15px;
	    background-image: url('https://pic.repaiapp.com/static/png/20180504/11/1525404476853855299.png');
	    background-size: 100% 100%;

	}
	.footerRight{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.footer{
		position: fixed;
		width: 100%;
		height: 60px;
		background-color: #fff;
		left: 0;
		bottom: 0;
		box-shadow:0px 0px 22px rgba(0,0,0,0.23);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 18px;
	}
	.footerLeft{
		/*width: 182px;*/
		height: 33px;
		background-color: #F5F5F5;
		border-radius: 16.5px;
		border: 1px #E5E5E5 solid;
		display: flex;
		align-items: center;
		padding-left: 15px;
		box-sizing: border-box;
		/*justify-content: center;*/
	}
	.footerLeft input{
		display: flex;
		height: 100%;
		align-items: center;
		flex:1;
		border: 0;
		outline: none;
		/*font-size: 14px;*/
		color: #ACACAC;
		background-color: transparent; 
		/*margin-left: 15px;*/
	}
	.bj{
		width: 17px;
		height: 17px;
		background-image: url('https://pic.repaiapp.com/static/png/20180504/11/1525403726721985598.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-right: 5px;
	}
	.articleInfo{
		/*position: fixed;*/
		height: 100%;
		background-color: #fff;
	}
	.title{
		position: relative;
		padding: 15px;
		font-size:18px;
		color: #000000; 
	}
	.head{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		color: #A7A7A7;
		padding: 0 15px;
	}
	.left{
		display: flex;
		align-items: center;

	}
	.left img{
		width: 22px;
		height: 22px;
		border-radius: 50%;
		margin-right: 5px;
	}
	.videoFooter{
	    position: relative;
	    display: flex;
	    height: 42px;
	    justify-content: space-between;
	    align-items: center;
	    font-size: 12px;
	    color: #a7a7a7;
	    padding: 0 18px;
  	}
  	.flex{
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    position: relative;
	  }
	  .dz{
	    position: relative;
	    display: flex;
	    align-items: center;
	    margin-left: 33px;
	  }
	  .dz p{
	    width: 16px;
	    height: 16px;
	    background-image: url('https://pic.repaiapp.com/static/png/20180427/17/1524820106788975648.png');
	    background-size: 100% 100%;
	    margin-right: 8px;
	  }
	  .dz p.active{
	    background-image: url('https://pic.repaiapp.com/static/png/20180503/18/1525342218164556102.png');
	    border: 0 !important;
	  }
	  .active{
	    background-image: url('https://pic.repaiapp.com/static/png/20180503/18/1525342218164556102.png');
	    border: 0 !important;
	    

	  }
	  .pl{
	    position: relative;
	    display: flex;
	    align-items: center;
	  }
	  .pl p{
	    width: 19px;
	    height: 16px;
	    background-image: url('https://pic.repaiapp.com/static/png/20180427/17/1524820191554225057.png');
	    background-size: 100% 100%;
	    margin-right: 8px;
	  }	
	  .commit{
	  	position: relative;
	  	display: flex;
	  	align-items: center;
	  	justify-content: center;
	  	padding: 20px 0;
	  }
	  .commit p{
	  	width: 55px;
	  	height: 15px;
	  	background-image: url('https://pic.repaiapp.com/static/png/20180504/10/1525402033299310157.png');
	  	background-size: 100% 100%;
	  	background-repeat: no-repeat;
	  }
	  .commit p.end{
	  	width: 80px;
	  	height: 10px;
	  	background-image: url('https://pic.repaiapp.com/static/png/20180504/11/1525403355253305548.png');
	  	background-size: 100% 100%;
	  	background-repeat: no-repeat;
	  }
	  .commitItem{
	  	position: relative;
	  	display: flex;
	  	justify-content: space-between;
	  	padding: 18px;
	  	font-size: 14px;
	  	color: #000000;
	  	border-bottom: 1px #E5E5E5 solid;
	  }
	  .commitHead{
	  	position: relative;
	  	width: 35px;
	  	height: 35px;
	  }
	  .commitHead img{
	  	width: 100%;
	  	height: 100%;
	  	border-radius: 50%;
	  }
	  .commitCon{
	  	position: relative;
	  	flex: 1;
	  	display: flex;
	  	flex-flow: column;
	  	margin-left: 10px;
	  }
	  .commitCon span{
	  	font-size: 14px;
	  	color: #A7A7A7;
	  }
</style>
