<template>
  <div class="find">
   <!--  <div class="head"><img src="https://pic.repaiapp.com/static/png/20180427/16/1524817273400385653.png"></div> -->
   <!--  <div class="height44"></div> -->
    <div class="title">
      <div v-for="(item,index) in head" @click="change(index)">
        <p>
            <img :src="item.title" v-if="index!=sel">
            <img :src="item.title1" v-if="index==sel">
        </p>
        <span class="line" v-if="index==sel"></span>
      </div>
    </div>
    <div class="Hei"></div>
    <!-- content -->
    <div class="search" >
      <div @click='search'>
        <p class="searchIcon"></p>
        <span>搜索文章</span>
        <!-- <input type="" name="" placeholder="搜索文章"> -->
      </div>
    </div>
    <van-list v-model="loading" :finished="finished" @load="onLoad" >
      <div class="content" v-if="sel==0" v-for="item,index in orderlits" @click="articleInfo(item.id,item.type)">
        <!-- 视频 -->
        <div v-if="orderlits!=''">
          <div class="item video" v-if="item.type==1">
            <div class="videoTitle">{{item.title}}</div>
            <div class="videoCon">
              <img :src="item.thumb[0]" class="videoCon">
              <img src="https://pic.repaiapp.com/static/png/20180503/18/1525343128132535698.png" class="bf">
            </div>
            <div class="videoFooter">
              <div class="flex">
                  <img :src="item.up_img" class="headImg">
                  <span>{{item.up_name}}</span>
              </div>
              <div class="flex">
                  <div class="pl">
                    <p></p>
                    <span>{{item.comment_count}}</span>
                  </div>
                  <div class="dz">
                    <!-- active -->
                    <p :class="item.is_like?'active':''" @click.stop="like(item.id,item.is_like)"></p>
                    <span>{{item.like_count}}</span>
                  </div>
              </div>
            </div>
          </div>
          <!-- 文章 -->
          <div class="item article" v-if="item.type==3">
              <div class="articleCon">
                <div class="articleConLeft">
                  <div class="articleTitle">{{item.title}}</div>
                  <div class="articleword">{{item.synopsis}}</div> 
                </div>
                <div class="img" :style="{'background-image': 'url(' + item.thumb[0] + ')'}"></div>
                <!-- <img :src="item.thumb[0]"> -->
              </div>
              <div class="articleFooter">
                <div class="flex">
                  <img :src="item.up_img" class="headImg">
                  <span>{{item.up_name}}</span>
                  <div class="cir"></div>
                  <span>{{item.browse_count}}人浏览</span>
                </div>
              </div>
          </div>
          <!-- 图片 -->
          <div class="item picture" v-if="item.type==2">
            <div class="videoTitle">{{item.title}}</div>
            <div class="pictureAll">
                <div v-for="(j,index) in item.thumb" v-if="index<3">
                    <img :src="j" >
                    <p class="mask" v-if="index==2" :data-index="j.type">
                      <span :data-len="j.type">+{{item.len}}</span>
                      <span>查看更多</span>
                    </p>
                </div>
            </div>
            <div class="articleFooter pictureFooter">
                <div class="flex">
                  <img :src="item.up_img" class="headImg">
                  <span>{{item.up_name}}</span>
                  <div class="cir"></div>
                  <span>{{item.browse_count}}人浏览</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="empty" v-if="orderlits==''">
          <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
          小编罢工了 暂无内容
        </div>

      <!-- 视频 -->
      <div class="content" v-if="sel==1" v-for="item,index in orderlits" @click="articleInfo(item.id,item.type)">
        <div v-if="orderlits!=''">
         <div class="item video" v-if="item.type==1">
          <div class="videoTitle">{{item.title}}</div>
          <div class="videoCon">
            <img :src="item.thumb[0]" class="videoCon">
            <img src="https://pic.repaiapp.com/static/png/20180503/18/1525343128132535698.png" class="bf">
          </div>
          <div class="videoFooter">
            <div class="flex">
                <img :src="item.up_img" class="headImg">
                <span>{{item.up_name}}</span>
            </div>
            <div class="flex">
                <div class="pl">
                  <p></p>
                  <span>{{item.comment_count}}</span>
                </div>
                <div class="dz">
                  <!-- active -->
                  <p :class="item.is_like?'active':''" @click.stop="like(item.id,item.is_like)"></p>
                  <span>{{item.like_count}}</span>
                </div>
            </div>
          </div>
        </div>
        </div>
        <div class="empty" v-if="orderlits==''">
          <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
          小编罢工了 暂无内容
        </div>
      </div>

      <!-- 图片 -->
      <div class="content" v-if="sel==2" v-for="item,index in orderlits" @click="articleInfo(item.id,item.type)">
          <div v-if="orderlits!=''"></div>
          <div class="item picture" v-if="item.type==2">
            <div class="videoTitle">{{item.title}}</div>
            <div class="pictureAll">
                <div v-for="(j,index) in item.thumb" v-show="index<3">

                    <!-- <img :src="j" > -->
                    <div class="img" :style="{'background-image': 'url(' + j+ ')'}"></div>
                    <p class="mask" v-if="index==2" :data-index="j.type">
                      <span :data-len="j.type">+{{item.len}}</span>
                      <span>查看更多</span>
                    </p>
                </div>
            </div>
            <div class="articleFooter pictureFooter">
              <div class="flex">
                    <img :src="item.up_img" class="headImg">
                    <span>{{item.up_name}}</span>
                    <div class="cir"></div>
                    <span>{{item.browse_count}}人浏览</span>
              </div>
            </div>
          </div>
          <div class="empty" v-if="orderlits==''">
            <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
            小编罢工了 暂无内容
          </div>
      </div>

      <!-- 文章 -->
      <div class="content" v-if="sel==3" v-for="item,index in orderlits" @click="articleInfo(item.id,item.type)">
        <div v-if="orderlits!=''">
          <div class="item article" v-if="item.type==3">
              <div class="articleCon">
                <div class="articleConLeft">
                  <div class="articleTitle">{{item.title}}</div>
                  <div class="articleword">{{item.synopsis}}</div> 
                </div>
                <!-- <img :src="item.thumb[0]"> -->
                 <div class="img" :style="{'background-image': 'url(' + item.thumb[0] + ')'}"></div>
              </div>
              <div class="articleFooter">
                <div class="flex">
                  <img :src="item.up_img" class="headImg">
                  <span>{{item.up_name}}</span>
                  <div class="cir"></div>
                  <span>{{item.browse_count}}人浏览</span>
                </div>
              </div>
          </div>
        </div>
        <div class="empty" v-if="orderlits==''">
          <img src="https://pic.repaiapp.com/static/png/20180515/16/1526372528379379953.png">
          小编罢工了 暂无内容
        </div>
      </div>
    </van-list>

    <navBar :nav=2></navBar>
    <div class="height50"></div>
  </div>
</template>

<script>
    import navBar from '../components/navigation-bar'
    import api from '../network/request'
    import { List } from 'vant'
    export default {
        name: "find",
        components: {
           navBar
        },

        data() {
            return {
                head:[{
                  title:'https://pic.repaiapp.com/static/png/20180518/11/1526613992260674853.png',
                  title1:'https://pic.repaiapp.com/static/png/20180518/11/1526614376064200102.png'
                },{
                  title:'https://pic.repaiapp.com/static/png/20180518/11/1526614287174475450.png',
                  title1:'https://pic.repaiapp.com/static/png/20180518/11/1526614388300435351.png'
                },{
                  title:'https://pic.repaiapp.com/static/png/20180518/11/1526614323666110148.png',
                  title1:'https://pic.repaiapp.com/static/png/20180518/11/1526614400125885154.png'
                },{
                  title:'https://pic.repaiapp.com/static/png/20180518/11/1526614307344185297.png',
                  title1:'https://pic.repaiapp.com/static/png/20180518/11/1526614411920905156.png'
                }],
                sel:0,
                list:'',
                type:'',
                orderlits:[],
                sw:false,
                page:0,
                loading: false,
                finished: false,
            }
        },
        methods: {
          articleInfo:function(id,type){
            // console.log(type);
            this.$router.push({name: 'articleInfo', query: {id:id,type:type}})
          },
          search(){
            this.$router.push({name: 'searchArticle', query: {}})
          },
          change:function(index) {
            this.sel=index;
            this.type=index;
            this.orderlits=[];
            this.page=0;
            this.sw=false;
            this.finished=false;
            this.onLoad()
            // this.finds();
          },
          //点赞
          like:function(id,statuss){
            // console.log(status);
            if(!statuss){
              var is_status=1;
            }else{
              var is_status=0;
            }
              var _this=this;
              const params={access_token:localStorage.getItem('access_token'),id:id,status:is_status};
              api.post('user/article_like',params,res=>{
              
              if(res.status==0){
                 console.log(res)
                 this.type=0;
                 this.finds();
              }
              if(res.status==600){
                  this.$router.push({name: 'login', params: {}})
              }
            }) 
          },
          onLoad() {
            this.finds();
            setTimeout(() => {
                
                this.loading = false;
                this.page=this.page+1;
                if (this.sw) {
                  this.finished = true;
                }
              }, 500);
          },
          finds:function(){
              var _this=this;
              const params={page:_this.page,type:_this.type};
              api.post('article/lists',params,res=>{
              
              if(res.status==0){
                  for(var i in res.data){
                    if(res.data[i].type==2){
                        res.data[i].len=res.data[i].thumb.length
                    }
                  }
                  if(res.data.length==0){
                    _this.sw=true;
                  }else{
                    _this.orderlits=_this.orderlits.concat(res.data);
                  }
                  // console.log( _this.orderlits);
                  // _this.list=res.data;
              }
              if(res.status==600){
                  this.$router.push({name: 'login', params: {}})
              }
            }) 
          }  
        },
        created() {
          // this.finds();
          this.$shareUrl.shareUrl("find");
        }
        
    }
</script>

<style scoped>
  .search{
    height: 44px;
    background-color: #F6F6F6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: #969696;
  }
  .search div{
    width:355px;
    height:30px;
    background:rgba(255,255,255,1);
    border-radius:15px;
    display: flex;
    align-items: center;
    padding-left: 10px
  }
  .search div input{
    border:0;
    outline: none;
    background-color: transparent;
    flex:1;
  }
  .searchIcon{
    width: 14px;
    height: 14px;
    background: url(https://pic.repaiapp.com/static/png/20180920/10/1537412211288510057.png) no-repeat;
    background-size: 100% 100%;
    margin-right: 16px;
  }
  .height50{
    height: 50px;
  }
  .height44{
    height: 44px;
  }
  .line{
    position: absolute;
    width: 70px;
    height: 3px;
    background-image:url('https://pic.repaiapp.com/static/png/20180518/11/1526614609925499102.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    bottom: 0;
  }
  .Hei{
    height:33px;
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
  .head{
    position: fixed;
    height: 44px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1001;
  }
  .head img{
    width: 43px;
    height: 18.5px;
  }
  .title{
    position:fixed;
    height: 33px;
    background-color: #fff;
    display: flex;
    /*padding: 0 55px;*/
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    border-bottom: 1px #dcdcdc solid;
    z-index: 1001;
  }
  .title div{
    position: relative;
    width: 25%;
    font-size: 15px;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title div p{
    height: 100%;
    /*line-height: 33px;*/
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title div p img{
    width: 33px;
    height: 16px;
  }
  .active{
    /*color: #ee5561;*/
    /*border-bottom: 1px #ee5561 solid;*/
  }
  .item{
    position: relative;
    padding: 0 10px;
    background-color: #fff;
    margin-bottom: 10px;
  }
  .videoTitle{
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #000000;
  }
  .videoCon{
    position: relative;
    height: 185px;
    width: 100%;
  }
  .bf{
    position: absolute;
    width: 54px;
    height: 54px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .videoFooter{
    position: relative;
    display: flex;
    height: 42px;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #a7a7a7;
  }
  .headImg{
    position: relative;
    width: 22px;
    height: 22px;
    margin-right: 7px;
    border-radius: 50%;
  }
  .flex{
    display: flex;
    align-items: center;
    justify-content: center;
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
  .article{
    padding: 10px;
  }
  .articleCon{
    display: flex;
    justify-content: space-between;
  }
  .img{
    width:90px;
    height: 90px;
    background: url() no-repeat center center/cover;
  }
  /*.articleCon img{
    width: 90px;
    height: 90px;
    margin-left: 15px;
  }*/
  .articleConLeft{
    position: relative;
    flex:1;
    overflow-x:hidden;
  }
  .articleTitle{
    position: relative;
    font-size: 14px;
    color: #000000;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .articleword{
    position: relative;
    font-size: 13px;
    color: #939393;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-top: 2px;
  }
  .articleFooter{
    position: relative;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #a7a7a7;
  }
  .cir{
    position: relative;
    width: 3px;
    height: 3px;
    background-color: #a7a7a7;
    margin-left: 15px;
    margin-right: 8.5px;
    border-radius: 50%;
  }
  .pictureAll{
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .pictureAll div{
    width: 115px;
    height: 115px;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .pictureAll div img{
    width: 100%;
    height: 100%;
  }

  .pictureFooter{
    height: 42px;
  }
  .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    left: 0;
    top: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #ffffff;
  }
</style>
