<template>
   <div class="useCoupon">
   		<div class="top">
   			<p>{{couponname}}</p>
   			<span>{{deduct}}</span>
   		</div>
   		<div class="bottom">
   			<span>{{sn}}</span>
   			<img :src="sn_img">
   		</div>
   </div>

</template>

<script>
    export default {
        name: "useCoupon",
        components: {
        },

        data() {
            return {
            	sn:"",
            	sn_img:'',
            	deduct:'',
            	couponname:''
                
            }
        },
        methods: {
           
        },
        created() {
        	this.sn=this.$route.params.sn;
        	this.sn_img=this.$route.params.sn_img;
        	this.deduct=this.$route.params.deduct;
        	this.couponname=this.$route.params.couponname;

        }
    }
</script>

<style scoped>
	.useCoupon{
		position: relative;
		width: 360px;
		height: 271px;
		background-image: url('https://pic.repaiapp.com/static/png/20180417/18/1523960395353310157.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-top: 18px;
		display: flex;
		flex-flow: column;
	}
	.top{
		position: relative;
		width: 100%;
		box-sizing: border-box;
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #666666;
		flex-flow: column;
	}
	.top span{
		font-size: 24px;
		color: #333333;
		margin-top: 10px;
	}
	.bottom{
		position: relative;
		flex:1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30px;
		color: #a99d57;
		flex-flow: column;
	}
	.bottom img{
		width: 162px;
		height: 67px;
	}
</style>
