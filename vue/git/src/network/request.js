//导入基础配置文件
// import Vue from 'vue'
// import  VueResource  from 'vue-resource';
import config from './config.js';


//导入MD5加密文件
import md5 from './md5.js';
import axios from 'axios';
import qs from 'qs';
// import md5 from 'js-md5';
//获得Request请求类相关配置
var conf = config.config.request;
console.log(conf)
//获得标准时间戳格式（INT）
var time = new Date().getTime();



export default {
  //封装POST基础请求方法
  post: function (api = '', params = null , success = null, fail = null, complete = null)
  {
    // console.log(params);
    //公共转a

    api = api.substring(0,1).toLowerCase() + api.substr(1);
    let sign = this.__generationSign(api,params);
    
    axios.post(conf.url  + api, qs.stringify(params), {
        headers: {
          Version: conf.version, 'Sign': sign, 'App': conf.app_id, 'Content-type': conf.content_type, 'Timestamp': time
        }
    }).then(function(res) {
       if (typeof success == 'function') return success (res.data); 
    }, function(res) {});
  },

  //对传递参数进行加密并生成签名
  __generationSign:function(api , params)
  {
    console.log(params)
    let str = conf.secret + api + time;

    if(typeof params  == 'object')
    {
       let sortArray = [];
       let sortParams = {};

       for (var i in params) {
          sortArray.push(i);
       }

       sortArray.sort();

       for (var a of sortArray) {
          let sortKey = a;
          sortParams[sortKey] = params[sortKey];
       }
       str += this.__dealParams(sortParams);
    }
    // console.log('request_url',str)
    // console.log('request_url2', md5.hexMD5(decodeURI(str)))
    console.log(str);
    console.log(md5.hexMD5(str));
    // return this.$md5(str) 
    return md5.hexMD5(str);  

  },

  //处理传递参数并格式化
  __dealParams:function(params = {})
  {
    let str = '';
    for(var i in params)
    {
      str += '&'+i+'='+params[i];
    }
    str = str.substr(1);

    return str;
  },


  //hash路由获取url中的匀元素
 getQueryString:function(name) {
  /* eslint-disable */
    return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[, ''])[1].replace(/\+/g, '%20')) || null
  /* eslint-enable */
  }
}