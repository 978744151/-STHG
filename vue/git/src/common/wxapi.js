import wx from 'weixin-js-sdk'
import api from '../network/request'
import { Toast } from 'vant'
const wxApi = {
 /**
 * [isweixin 判断是否微信浏览器]
 */
 // isweixin () {
 //  const ua = window.navigator.userAgent.toLowerCase()
 //  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
 //   return true
 //  } else {
 //   this.$router.push({path: '/wxkj/isnotWechat'})
 //   return false
 //  }
 // }
	wxRegister (url,callback) {
		// alert(url);
		// return;
		var _this=this;
  //       let paths = window.location.href.split('#');
  //           paths[1] = paths[1] || '/'
  //       if (paths[0].charAt(paths[0].length - 1) !== '?') {
  //           paths[0] = `${paths[0]}?`
  //       }
  //       if (paths[1].charAt(0) === '!') {
  //           paths[1] = paths[1].substr(1)
  //       }
  //       let url = `${paths[0]}#${paths[1]}`
  //       if (window.location.href !== url) {
  //           // window.location.href = url
  //       }
  //       console.log(url);
  //       // var urls=window.location.href.split('#')[0];
  //       var urls=url;
        localStorage.setItem('url',url);
        const params={url:url};
        api.post('shop/get_js_config',params,res=>{
            console.log(res);
            if(res.status==0){
                _this.wxJson=res.data;
                wx.config({
                  debug: false,
                  appId: res.data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
                  timestamp:res.data.timestamp, // 必填，生成签名的时间戳
                  nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                  signature: res.data.signature,// 必填，签名，见附录1
                  //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
                  jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','translateVoice','scanQRCode']
                });
            }
        })
		wx.ready((res) => {
		// 如果需要定制ready回调方法
		if (callback) {
				callback()
			}
		})
	},
	//分享到朋友圈
	ShareTimeline (opstion) { 
		
		wx.onMenuShareTimeline({
			debug:true,
			title: opstion.title, // 分享标题
			link: opstion.link, // 分享链接
			imgUrl: opstion.imgUrl, // 分享图标
			success () {
			// 用户成功分享后执行的回调函数
				Toast.success("分享成功") 
				// opstion.success()

			},
			cancel () {
				Toast.fail("取消分享")
			// 用户取消分享后执行的回调函数
				// opstion.error()

			}
		})
	},
	//发送给朋友
	onMenuShareAppMessage:function(opstion){
		console.log(opstion);
		wx.onMenuShareAppMessage({ 
			debug:true, 
	        title: opstion.title, // 分享标题  
	        desc: opstion.desc, // 分享描述  
	        link: opstion.link, // 分享链接！这里是关键 因为微信会把我们分享的链接截取掉 我在这里手动拼接上  
	        imgUrl: opstion.imgUrl, // 分享图标  
	        type: '', // 分享类型,music、video或link，不填默认为link  
	        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空  
	        success: function (res) { 
	        	// opstion.success()
	            Toast.success("分享成功") 
	        // window.alert('已分享给好友');  
	        },  
	        cancel: function () {  
	            Toast.fail("取消分享")
	        // 用户取消分享后执行的回调函数  
	        },  
	        complete:function(){
	        },
	        fail: function (res) { 
	        	alert(JSON.stringify(res));
	        // window.alert(JSON.stringify(res));  
	        }  
	    }); 
	    wx.error(function(res){
            console.log("错误信息 === ");
            console.log(res);
        });

	},
	// scan:function(){
	// 	wx.scanQRCode({
 //            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
 //            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
 //            success: function (res) {
 //                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
 //                // alert("扫描结果："+result);
 //                // window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
 //            }
 //        })
	// }
	 




}
export default wxApi