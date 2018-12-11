import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import nearBy from '@/view/nearBy'
import shopingCart from '@/view/shopingCart'
import mine from '@/view/mine'
import find from '@/view/find'
import particulars from '@/view/particulars'
import myOrder from '@/view/myOrder'
import myOrder0 from '@/view/myOrder0'
import myOrder1 from '@/view/myOrder1'
import myOrder2 from '@/view/myOrder2'
import myOrder3 from '@/view/myOrder3'
import myOrder4 from '@/view/myOrder4'
import Allcomment from '@/view/Allcomment'
import myTeam from '@/view/myTeam'
import applyF from '@/view/applyF'
import equity from '@/view/equity'
import share from '@/view/share'
import bonus from '@/view/bonus'
import aboutUs from '@/view/aboutUs'
import recharge from '@/view/recharge'
import rechargeBill from '@/view/rechargeBill'
import rechargeRecord from '@/view/rechargeRecord'
import login from '@/view/login'
import withdrawBill from '@/view/withdrawBill'
import withdrawWay from '@/view/withdrawWay'
import alipay from '@/view/alipay'
import bankCard from '@/view/bankCard'
import memberCenter from '@/view/memberCenter'
import merchant from '@/view/merchant'
import shareFriends from '@/view/shareFriends'
import shareMoney from '@/view/shareMoney'
import coupon from '@/view/coupon'
import useCoupon from '@/view/useCoupon'
import inviteCode from '@/view/inviteCode'
import orderDetail from '@/view/orderDetail'
import footmark from '@/view/footmark'

import favorite from '@/view/favorite'
import setting from '@/view/setting'
import address from '@/view/address'
import orderPay from '@/view/orderPay'
import shopReview from '@/view/shopReview'
import goodReview from '@/view/goodReview'
import allReview from '@/view/allReview'
import reviewList from '@/view/reviewList'
import refund from '@/view/refund'
import refundDetail from '@/view/refundDetail'
import photos from '@/view/photos'
import orderCheck from '@/view/orderCheck'
import addAddress from '@/view/addAddress'
import setInfo from '@/view/setInfo'

import changePsd from '@/view/changePsd'
import Binding from '@/view/Binding'
import demo from '@/view/demo'
import chooseCity from '@/view/chooseCity'
import chooseCityy from '@/view/chooseCityy'
import articleInfo from '@/view/articleInfo'
import changeBir from '@/view/changeBir'
import search from '@/view/search'
import reviewDetail from '@/view/reviewDetail'
import opinion from '@/view/opinion'
import msg from '@/view/msg'
import msg1 from '@/view/msg1'
import moreNotice from '@/view/moreNotice'
import noticeDetail from '@/view/noticeDetail'
import integral from '@/view/integral'
import ordercoupon from '@/view/ordercoupon'
import reward from '@/view/reward'
import withdrawDetail from '@/view/withdrawDetail'
import Logistics from '@/view/Logistics'
import embodySuccess from '@/view/embodySuccess'
import searchArticle from '@/view/searchArticle'




// function shareUrl(){
//     console.log("1")

// }

Vue.use(Router)
// mode: 'history',
const router = new Router({
    // mode: 'history',
    routes: [
        {
            path:'/',
            name:'index',
            component:index,
            meta:{
                title:'首页'
            }
        },{
            path:'/nearBy',
            name:'nearBy',
            component:nearBy,
            meta:{
                title:'附近商家'
            }
        },{
            path:'/shopingCart',
            name:'shopingCart',
            component:shopingCart,
            meta:{
                title:'购物车'
            }
        },{
            path:'/mine',
            name:'mine',
            component:mine,
            meta:{
                title:'我的'
            }
        },{
            path:'/find',
            name:'find',
            component:find,
            meta:{
                title:'发现'
            }
        },{
            path:'/particulars',
            name:'particulars',
            component:particulars,
            meta:{
                title:'商品详情'
            }
        },{
            path:'/myOrder',
            name:'myOrder',
            component:myOrder,
            meta:{
                title:'我的订单'
            }
        },{
            path:'/myOrder0',
            name:'myOrder0',
            component:myOrder0,
            meta:{
                title:'我的订单'
            }
        },{
            path:'/myOrder1',
            name:'myOrder1',
            component:myOrder1,
            meta:{
                title:'我的订单'
            }
        },{
            path:'/myOrder2',
            name:'myOrder2',
            component:myOrder2,
            meta:{
                title:'我的订单'
            }
        },{
            path:'/myOrder3',
            name:'myOrder3',
            component:myOrder3,
            meta:{
                title:'我的订单'
            }
        },{
            path:'/myOrder4',
            name:'myOrder4',
            component:myOrder4,
            meta:{
                title:'我的订单'
            }
        },{
            path:'/Allcomment',
            name:'Allcomment',
            component:Allcomment,
            meta:{
                title:'全部评论'
            }
        },{
            path:'/myTeam',
            name:'myTeam',
            component:myTeam,
            meta:{
                title:'我的团队'
            }
        },{
            path:'/applyF',
            name:'applyF',
            component:applyF,
            meta:{
                title:'加盟商申请'
            }
        },{
            path:'/equity',
            name:'equity',
            component:equity,
            meta:{
                title:'全部权益'
            }
        },{
            path:'/share',
            name:'share',
            component:share,
            meta:{
                title:'我的邀请码'
            }
        },{
            path:'/bonus',
            name:'bonus',
            component:bonus,
            meta:{
                title:'我的奖金'
            }
        },{
            path:'/aboutUs',
            name:'aboutUs',
            component:aboutUs,
            meta:{
                title:'关于我们'
            }
        },{
            path:'/recharge',
            name:'recharge',
            component:recharge,
            meta:{
                title:'账户充值'
            }
        },{
            path:'/rechargeBill',
            name:'rechargeBill',
            component:rechargeBill,
            meta:{
                title:'余额记录'
            }
        },{
            path:'/rechargeRecord',
            name:'rechargeRecord',
            component:rechargeRecord,
            meta:{
                title:'余额记录'
            }
        },{
            path:'/login',
            name:'login',
            component:login,
            meta:{
                title:'登陆'
            }
        },{
            path:'/withdrawBill',
            name:'withdrawBill',
            component:withdrawBill,
            meta:{
                title:'提现记录'
            }
        },{
            path:'/withdrawWay',
            name:'withdrawWay',
            component:withdrawWay,
            meta:{
                title:'提现记录'
            }
        },{
            path:'/alipay',
            name:'alipay',
            component:alipay,
            meta:{
                title:'提现到支付宝账号'
            }
        },{
            path:'/bankCard',
            name:'bankCard',
            component:bankCard,
            meta:{
                title:'提现到银行卡'
            }
        },{
            path:'/memberCenter',
            name:'memberCenter',
            component:memberCenter,
            meta:{
                title:'会员中心'
            }
        },{
            path:'/merchant',
            name:'merchant',
            component:merchant,
            meta:{
                title:'商家详情'
            }
        },{
            path:'/shareFriends',
            name:'shareFriends',
            component:shareFriends,
            meta:{
                title:'分享好友'
            }
        },{
            path:'/shareMoney',
            name:'shareMoney',
            component:shareMoney,
            meta:{
                title:'分享赚钱'
            }
        },{
            path:'/coupon',
            name:'coupon',
            component:coupon,
            meta:{
                title:'优惠券'
            }
        },{
            path:'/useCoupon',
            name:'useCoupon',
            component:useCoupon,
            meta:{
                title:'核销券码'
            }
        },{
            path:'/inviteCode',
            name:'inviteCode',
            component:inviteCode,
            meta:{
                title:'填写邀请码'
            }
        }, {
            path:'/setting',
            name:'setting',
            component:setting,
            meta:{
                title:'设置'
            }
        },
        {
            path:'/address',
            name:'address',
            component:address,
            meta:{
                title:'收货地址'
            }
        },
        {
            // /redpacket?/:redpacketid
            path:'/orderPay',
            name:'orderPay',
            component:orderPay,
            meta:{
                title:'支付订单'
            }
        },
        {
            path:'/shopReview',
            name:'shopReview',
            component:shopReview,
            meta:{
                title:'评价'
            }
        },
        {
            path:'/goodReview',
            name:'goodReview',
            component:goodReview,
            meta:{
                title:'评价'
            }
        },
        {
            path:'/reviewList',
            name:'reviewList',
            component:reviewList,
            meta:{
                title:'评价列表'
            }
        },
        {
            path:'/allReview',
            name:'allReview',
            component:allReview,
            meta:{
                title:'全部评价'
            }
        },
        {
            path:'/refund',
            name:'refund',
            component:refund,
            meta:{
                title:'申请退款'
            }
        },
        {
            path:'/refundDetail',
            name:'refundDetail',
            component:refundDetail,
            meta:{
                title:'退款详情'
            }
        },
        {
            path:'/photos',
            name:'photos',
            component:photos,
            meta:{
                title:'图片详情'
            }
        },
        {
            path:'/favorite',
            name:'favorite',
            component:favorite,
            meta:{
                title:'收藏夹'
            }
        },
        {
            path:'/orderCheck',
            name:'orderCheck',
            component:orderCheck,
            meta:{
                title:'确认订单'
            }
        },
        {
            path:'/addAddress',
            name:'addAddress',
            component:addAddress,
            meta:{
                title:'新增地址'
            }
        },
        {
            path:'/orderDetail',
            name:'orderDetail',
            component:orderDetail,
            meta:{
                title:'订单详情'
            }
        },
        {
            path:'/footmark',
            name:'footmark',
            component:footmark,
            meta:{
                title:'我的足迹'
            }
        },
        {
            path:'/setInfo',
            name:'setInfo',
            component:setInfo,
            meta:{
                title:'我的账户'
            }
        },
        {
            path:'/changePsd',
            name:'changePsd',
            component:changePsd,
            meta:{
                title:'修改密码'
            }
        },
        {
            path:'/Binding',
            name:'Binding',
            component:Binding,
            meta:{
                title:'绑定手机号'
            }
        },
        {
            path:'/demo',
            name:'demo',
            component:demo,
            meta:{
                title:'绑定手机号'
            }
        },
        {
            path:'/chooseCity',
            name:'chooseCity',
            component:chooseCity,
            meta:{
                title:'选择城市'
            }
        },
        {
            path:'/chooseCityy',
            name:'chooseCityy',
            component:chooseCityy,
            meta:{
                title:'选择城市1'
            }
        },
        {
            path:'/articleInfo',
            name:'articleInfo',
            component:articleInfo,
            meta:{
                title:'文章详情'
            }
        },
        {
            path:'/changeBir',
            name:'changeBir',
            component:changeBir,
            meta:{
                title:'生日'
            }
        },
        {
            path:'/search',
            name:'search',
            component:search,
            meta:{
                title:'商品搜索'
            }
        },
        {
            path:'/reviewDetail',
            name:'reviewDetail',
            component:reviewDetail,
            meta:{
                title:'评论详情'
            }
        },
        {
            path:'/opinion',
            name:'opinion',
            component:opinion,
            meta:{
                title:'意见反馈'
            }
        },
        {
            path:'/msg',
            name:'msg',
            component:msg,
            meta:{
                title:'消息中心'
            }
        },
        {
            path:'/msg1',
            name:'msg1',
            component:msg1,
            meta:{
                title:'消息中心'
            }
        },
        {
            path:'/moreNotice',
            name:'moreNotice',
            component:moreNotice,
            meta:{
                title:'香天下快报'
            }
        },
        {
            path:'/noticeDetail',
            name:'noticeDetail',
            component:noticeDetail,
            meta:{
                title:'香天下快报'
            }
        },
        {
            path:'/integral',
            name:'integral',
            component:integral,
            meta:{
                title:'积分明细'
            }
        },
        {
            path:'/ordercoupon',
            name:'ordercoupon',
            component:ordercoupon,
            meta:{
                title:'使用优惠券'
            }
        },
        {
            path:'/reward',
            name:'reward',
            component:reward,
            meta:{
                title:'奖励记录'
            }
        },
        {
            path:'/withdrawDetail',
            name:'withdrawDetail',
            component:withdrawDetail,
            meta:{
                title:'体现记录'
            }
        },
        {
            path:'/Logistics',
            name:'Logistics',
            component:Logistics,
            meta:{
                title:'查看物流'
            }
        },
        {
            path:'/embodySuccess',
            name:'embodySuccess',
            component:embodySuccess,
            meta:{
                title:'体现成功'
            }
        },
        {
            path:'/searchArticle',
            name:'searchArticle',
            component:searchArticle,
            meta:{
                title:'文章搜索'
            }
        }
    ]
})


router.beforeEach((to, from, next) => {
    console.log(to)
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
// const shareUrl="1"
export default router

// export default{
    
// }
