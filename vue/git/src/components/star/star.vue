<template>
    <ul :style="{textAlign:position}" class="star" :class="starType">
        <li v-for="(itemClass,index) in itemClasses">
            <div :class="itemClass" class="star-item" @click="selectItem(index+1)"></div>
            <p v-show="showTip">{{itemTexts[index]}}</p>
        </li>
    </ul>
</template>

<script>
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_OFF = 'off';

    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            },
            showTip: {
                type: Boolean,
                default:false
            },
            position: {
                type: String,
                default:'center'
            }
        },
        data() {
            return {
                itemTexts:["超差","不满","一般","满意","超赞"]
            }
        },
        computed: {
            starType() {
                
                return 'star-' + this.size;
            },
            itemClasses() {
                let result = [];
                for (let i = 0; i < this.score; i++) {
                    result.push(CLS_ON);
                }
                while (result.length < LENGTH) {
                    result.push(CLS_OFF);
                }
                return result;
            }
        },
        methods: {
            selectItem(index) {
                this.$emit('select',index)
            }
        }
    };
</script>

<style scoped lang="scss">
    .star{
        li{
            display: inline-block;
            .star-item {
                margin: auto;
                background-repeat: no-repeat;
                background-size: contain;
            }
        }
        &.star-48 {
            li{
                margin-right: 14px;
                font-size:13px;
                &:last-child {
                     margin-right: 0;
                 };
                .star-item {
                    width: 24px;
                    height: 24px;
                    margin-bottom: 5px;
                    &.on{
                         background-image: url("star48_on.png");
                     };
                    &.off{
                         background-image: url("star48_off.png");
                     };
                }
            }

        }
        &.star-28 {
            li{
                margin-right: 5px;
                font-size:6px;
                &:last-child {
                     margin-right: 0;
                 };
                .star-item {
                    width: 14px;
                    height: 14px;
                    margin-bottom: 2px;
                    &.on{
                         background-image: url("star28_on.png");
                    };
                    &.off{
                         background-image: url("star28_off.png");
                    };
                }
            }
        }
    }

</style>