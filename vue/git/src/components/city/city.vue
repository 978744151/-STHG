<template>
    <section ref="city" class="select-city fadeInDown" v-if="showCityList">
        <header class="city-header mint-1px-b pr">
            <span class="fb">选择城市</span>
            <span class="close-city" @click="cancelCityList">×</span>
        </header>
        <div ref="city"  @click="selectCity">
            <mt-index-list>
                <mt-index-section :index="city.sort" v-for="(city,index) in cityList" :key="index">
                    <mt-cell :title="item.regionName" v-for="item in city.data" :key="item.id" @click="selectItem(item.regionName)"></mt-cell>
                </mt-index-section>
            </mt-index-list>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
import cityLists from './cityInfo.json'

export default {
    name: "city",
    props: {
        showCityList:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            "cityList":[]
        }
    },
    methods: {
        selectItem(city){
            console.log(city)
            this.$emit('select',city)
        },
        selectCity (event) {
            let ele = event.target
            let className = ele.className
            let name = ''
            if (className === "mint-indexsection-index" || className ==="mint-indexlist-nav" || className === "mint-indexlist-navitem") {
                name = ''
            } else if (className === 'mint-cell-wrapper') {
                name = ele.children[0].children[0].innerHTML
            } else if (className === "mint-cell-title") {
                name = ele.children[0].innerHTML
            } else {
                name = ele.innerHTML
            }
            if (name) {
                this.changeCityData(name)
            } else {
                return false
            }
        },
        cancelCityList () {
            this.changeCityData("")
        },
        changeCityData (city) {
            this.$refs.city.className = "fadeOutTop"
            setTimeout(
                () => {
                    this.$emit('select',city)
                } ,200
            )
        }
    },
    mounted() {
        let cityObj = cityLists.cityInfo
        let citySort = Object.keys(cityLists.cityInfo);
        console.log(this.citySort)
        citySort.forEach((item) => {
            this.cityList.push({
                sort: item,
                data: cityObj[item]
            })
        })
    },
    created() {

    }
}
</script>

<style>
    .mint-indicator-wrapper {
        z-index: 1000
    }

    .select-city {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999999;
        background-color: #fff;
    }
    .showList {
        display: block;
    }
    .city-header {
        height: 46px;
        line-height: 46px;
        text-align: center;
        color: #000;
        font-size: 16px;
        background-color: #fff;
    }
    .close-city {
        position: absolute;
        font-size: 28px;
        color: #666;
        display: inline-block;
        height: 46px;
        width: 50px;
        line-height: 38px;
        text-align: center;
        right: 0px;
    }
    @-webkit-keyframes fadeInDown {
        0% {
            opacity: .7;
            -webkit-transform: translateY(-50px);
            transform: translateY(-50px)
        }
        100% {
            opacity: 1;
            -webkit-transform: translateY(0);
            transform: translateY(0)
        }
    }
    @keyframes fadeInDown {
        0% {
            opacity: .7;
            -webkit-transform: translateY(-50px);
            -ms-transform: translateY(-50px);
            transform: translateY(-50px)
        }
        100% {
            opacity: 1;
            -webkit-transform: translateY(0);
            -ms-transform: translateY(0);
            transform: translateY(0)
        }
    }
    .fadeInDown {
        -webkit-animation: fadeInDown .3s;
        animation: fadeInDown .3s;
    }
    @-webkit-keyframes fadeOutTop {
        0% {
            opacity: 1;
            -webkit-transform: translateY(0);
            transform: translateY(0)
        }
        100% {
            opacity: 0;
            -webkit-transform: translateY(-50px);
            transform: translateY(-50px)
        }
    }
    @keyframes fadeOutTop {
        0% {
            opacity: 1;
            -webkit-transform: translateY(0);
            -ms-transform: translateY(0);
            transform: translateY(0)
        }
        100% {
            opacity: 0;
            -webkit-transform: translateY(-50px);
            -ms-transform: translateY(-50px);
            transform: translateY(-50px)
        }
    }
    .fadeOutTop {
        -webkit-animation: fadeOutTop .35s;
        animation: fadeOutTop .35s;
    }
</style>