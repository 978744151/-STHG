// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './App'
import router from './router'
import  VueResource  from 'vue-resource'
// import { DatetimePicker } from 'vant';

// Vue.use(DatetimePicker);
// 接口请求
import axios from 'axios'
	
import qs from 'qs'

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import vuePicturePreview from 'vue-picture-preview'
import fancyBox from 'vue-fancybox'
import Calendar from 'vue2-datepick'
Vue.use(Calendar);
Vue.use(vuePicturePreview)
Vue.use(Vant);
Vue.use(VueResource);
Vue.use(MintUI);
import  shareUrl  from './common/share'
//视频
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.prototype.$shareUrl=shareUrl;
// Vue.component(Loadmore.name, Loadmore);
// Vue.prototype.$http = axios;
// import axios from 'axios'
// import {post,fetch,patch,put} from './utils/http'
// //定义全局变量
// Vue.prototype.$post=post;
// Vue.prototype.$fetch=fetch;
// Vue.prototype.$patch=patch;
// Vue.prototype.$put=put;
// Vue.use(VueResource) 
// Vue.use(MintUI);
Vue.config.productionTip = false
/* eslint-disable no-new */	
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
