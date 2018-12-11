<template>
    <ul :class="picType">
        <li class="picItem" v-for="(item,index) in imgs">
            <div v-if="!onlyRead" class="del" @click="delItem(index)" :data-index="index"></div>
            <img :src="item">
        </li>
        <li class="default" v-if="imgs.length<3" style="position: relative;">
            <input class="file" name="file" type="file" accept="" @change="onFileChange"/>
            <img src="./defaultPic.png">
            <p>添加图片</p>
            <p>({{imgs.length}}/3张)</p>
        </li>
    </ul>
</template>

<script>
    import api from '../../network/request'
    import { Toast } from 'vant'

    export default{
        props: {
            size: {
                type: String,
                default: 'small'
            },
            onlyRead: {
                type: Boolean,
                default: false
            },
            imgArr:{
                type: Array
            },
            max:{
                type:Number,
                default:3
            }
        },
        data(){
            return {
                imgs:[]
            }
        },
        computed: {
            picType() {
                return 'pic-' + this.size
            },
            // imgs() {
            //     // let imgs = [];
            //     // if( this.imgArr.length>this.max ){
            //     //     imgs = this.imgArr.slice(0,3)
            //     // } else {
            //     //     imgs = this.imgArr
            //     // }
            //     // return imgs
            // }
        },
        methods:{
            delItem(index) {
                this.imgs.splice(index,1);
                this.$emit('imgs',this.imgs)
            },
            // update(e){
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;
                reader.onload = (e) => {
                vm.image = e.target.result;
                vm.up(e.target.result);
                };
                var a= reader.readAsDataURL(file);
            },
            up:function(img){
                Toast.loading({ duration: 0,message: '正在上传...'});
                var _this=this;
                const params={img:img};
                api.post('img/push',params,res=>{
                console.log(res);
                    if(res.status==0){
                        _this.imgs.push(res.data.url)
                        _this.$emit('imgs',_this.imgs);
                        Toast.success("上传成功")
                        // _this.goods=res.data.goods
                    }
                    if(res.status==600){
                      this.$router.push({name: 'login', params: {}})
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .file{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        left: 0;
        top: 0;
    }
    .pic-big{
        overflow:hidden;
        padding-top:10px;
        li{
            float: left;
            box-sizing: border-box;
            width: 100px;
            height: 100px;
            padding:0;
            margin: 0 8px;
            font-size:0;
            list-style:none;
            text-align: center;
            &:first-child{
                margin-left: 0;
            }
            &:last-child{
                margin-right: 0;
            }
        }
        .picItem{
            position: relative;
            border: 1px solid #a6a5a5;
            img{
                width: 100%;
                height: 100%;
            }
            .del{
                position: absolute;
                width: 22px;
                height: 22px;
                top:-10px;
                right:-10px;
                background: url("delBtn.png");
                background-size: contain;
            }
        }
        .default{
            border: 1px dotted #a6a5a5;
            font-size: 14px;
            color:#a6a5a5;
            background: #f6f6f6;
            img{
                width: 39px;
                margin-top: 17px;
            }
        }
    }
    .pic-mid{
        overflow:hidden;
        padding-top:10px;
        li{
            float: left;
            box-sizing: border-box;
            width: 85px;
            height: 85px;
            padding:0;
            margin: 0 5px;
            font-size:0;
            list-style:none;
            text-align: center;
            &:first-child{
                 margin-left: 0;
             }
            &:last-child{
                 margin-right: 0;
             }
        }
        .picItem{
            position: relative;
            border: 1px solid #a6a5a5;
            img{
                width: 100%;
                height: 100%;
            }
            .del{
                position: absolute;
                width: 18px;
                height: 18px;
                top:-7px;
                right:-7px;
                background: url("delBtn.png");
                background-size: contain;
            }
        }
        .default{
            border: 1px dotted #a6a5a5;
            font-size: 14px;
            color:#a6a5a5;
            background: #f6f6f6;
            img{
                width: 30px;
                margin-top: 12px;
            }
        }
    }
    .pic-small{
        overflow:hidden;
        padding-top:10px;
        li{
            float: left;
            box-sizing: border-box;
            width: 70px;
            height: 70px;
            padding:0;
            margin: 0 7px;
            font-size:0;
            list-style:none;
            text-align: center;
            &:first-child{
                 margin-left: 0;
             }
            &:last-child{
                 margin-right: 0;
             }
        }
        .picItem{
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .del{
                position: absolute;
                width: 16px;
                height: 16px;
                top:-6px;
                right:-6px;
                background: url("delBtn.png");
                background-size: contain;
            }
        }
        .default{
            border: 1px dotted #a6a5a5;
            font-size: 10px;
            color:#a6a5a5;
            background: #f6f6f6;
            background-size:contain;
            img{
                width: 23px;
                margin-top: 5px;
            }
        }
    }
</style>