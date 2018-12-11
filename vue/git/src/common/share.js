import api from '../network/request'
import wxapi from './wxapi.js'
function token(cb){
    var _this=this;
    api.post('open/mpLogin','',res=>{
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
function shareUrl(type,id,title,shopimg,arttype){
	// console.log(type);
    // alert(id);
    var sharecode=getQueryString("code")||'';
    if(sharecode!=''){
        localStorage.setItem('code',sharecode);
    }
    var id=id||'';
    var title=title||'';
    var access_token=localStorage.getItem('access_token')||'';
    var shopImg=shopimg||'';
    var arttype=arttype||''
    //如果有id 则需要传入借口
    if(id==''){
        var params={access_token:access_token,module:type};
    }else if(arttype==''){
        var params={access_token:access_token,module:type,id:id};
    }else{
         var params={access_token:access_token,module:type,id:id,type:arttype};
    }
	var _this=this;
	api.post('shop/share',params,res=>{
        console.log(res);
        // var code=localStorage.getItem('code')||'';
        // var access_token=localStorage.getItem('access_token')||'';
        if(res.data.code!=''){
        	//本地缓存code
        	// console.log(GetQueryString(res.data.url,"code"));
        	localStorage.setItem('code',res.data.code);

        }
            wxapi.wxRegister(res.data.url,wxRegCallback(res.data.url,title,shopimg));
        })
}
//hash路由获取url中的匀元素
function getQueryString (name) {
  /* eslint-disable */
  return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[, ''])[1].replace(/\+/g, '%20')) || null
  /* eslint-enable */
}
function wxRegCallback(url,title,shopimg) {
    // alert(url);
    var that=this;
    //分享给朋友
	onMenuShareAppMessage(url,title,shopimg);
	//分发到朋友圈
	ShareTimeline(url,title,shopimg);
                
}
function onMenuShareAppMessage(url,title,shopimg){
    var title=title||'你的好友向你推荐了手提火锅';
    console.log(title);
	let opstion = {
	    title: title, // 分享标题
	    desc:'',
	    link:url,
	    imgUrl:shopimg||'https://pic.repaiapp.com/static/png/20180417/16/1523952477820325556.png',// 分享图标
	    success: function () {
	        // Toast.('分享成功')
	    },
	    error: function () {
	        // Toast.('分享失败')
	    }
	}
	// 将配置注入通用方法
	wxapi.onMenuShareAppMessage(opstion)
}
function ShareTimeline(url,title,shopimg){
    var title=title||'你的好友向你推荐了手提火锅';
	let opstion = {
        title: title, // 分享标题
        link: url,
        imgUrl:shopimg||'https://pic.repaiapp.com/static/png/20180417/16/1523952477820325556.png',// 分享图标
        success: function () {
            // Toast.('分享成功')
        },
        error: function () {
            // Toast.('分享失败')
        }
    }
    // 将配置注入通用方法
    wxapi.ShareTimeline(opstion)
}
// function onMenuShareAppMessage(){

// }
export default{
	shareUrl,token
}