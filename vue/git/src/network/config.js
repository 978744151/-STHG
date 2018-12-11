// //本地跨域
var url='app_v1/';
if (app.extURI){
  var url='app_v1/';
}
//打包需要
// var url='/xiangtianxia/app_v1/';
// if (app.extURI){
//   var url='/xiangtianxia/app_v1/';
// }
module.exports.config = {
  request:{
    app_id:'xiangtianxia_app',
    secret:'74fcf658b607aa88gg7v47f69004ce49',
    version:'2.0',
    url: url,
    pro: 'tanyu',
    ver: 'v1',
    socket_url: "ws://api.xiaodian.in",
    socket_port: '9502',
    method:'POST',
    format:'json',
    content_type:'application/x-www-form-urlencoded'
  }
}