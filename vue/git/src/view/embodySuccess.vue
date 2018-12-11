<template>
	<div class="embodySuccess">
		<div>
			<div class="head">
				<div>
				<img src="https://pic.repaiapp.com/static/png/20180413/10/1523587190968245056.png">
				<p>本次申请提现金额(元)</p>
				<span>{{mymoney}}</span>
				</div>
			</div>
			<div class="content">
				<p>明细如下：</p>
				<div>
					<span>提现支付宝账户</span>
					<span>¥{{mymoney}}</span>
				</div>
				<p class="time">（预计3个工作日到账，可在我的奖金-提现记录查看到账情况）</p>
			</div>
			<div class="btn" @click="back()">返回我的奖金</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "embodySuccess",
        components: {
        },

        data() {
            return {
                mymoney:''
                
            }
        },
        methods: {
            back(){
                this.$router.replace({name: 'bonus', params: {}})
            }
        },
        created() {
            this.mymoney=localStorage.getItem('mymoney');

        }
    }
</script>

<style scoped>
	.embodySuccess{
		position: fixed;
        width: 100%;
        height: 100%;
        background-color: #fff;
	}
	.head{
        position: relative;
        height: 230px;
        padding: 0 20px;
    }
    .head div{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-bottom: 1px #ddd dashed;
        display: flex;
        flex-flow: column;
        /*justify-content: center;*/
        align-items: center;
        padding-top: 40px;
        box-sizing: border-box;
    }
    .head div img{
        width: 60px;
        height: 60px;
    }
    .head div p{
        font-size: 14px;
        color: #777777;
        margin-top: 35px;
        margin-bottom: 20px;
    }
    .head div span{
        font-size: 25px;
        color: #dd3232
    }
    .content{
        position: relative;
        padding: 20px;
        font-size: 15px;
        color: #000000;
    }
    .content div{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .time{
        font-size: 12px;
        color: #777777;
    }
    .btn{
        position: relative;
        width: 95%;
        height: 40px;
        background-color: #dd3232;
        border-radius: 2.5px;
        margin: 0 auto;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        /*margin-top: 20px;*/
    }
</style>
