<template>
    <div class="photos">
        <div class="head">
            <div class="backBtn"></div>
            <div class="title">香天下创意图集</div>
            <div class="status"></div>
        </div>
        <div class="content">
            <ul class="photosContent">
                <li class="photoItem" v-for="(item,index) in picArr">
                    <img :src="item">
                </li>
            </ul>
            <div class="overview">
                <div class="title">香天下创意图集<span>(505人浏览)</span></div>
                <div class="assess">
                    <div class="assessLeft"><span class="iconShop"></span>香天下手提火锅</div>
                    <div class="assessRight">
                        <div><span class="iconInfo"></span>0</div>
                        <div><span class="iconGood"></span>58</div>
                    </div>
                </div>
            </div>
            <div class="reviewDisplay">
                <div class="title"></div>
                <p class="tips">暂时还没有评论  快来抢沙发吧</p>
            </div>
        </div>
        <div class="footer">
            <div class="input">
                <span class="iconInput"></span>
                <input type="text" placeholder="写写你的看法吧">
            </div>
            <div class="icon">
                <span class="iconInfo"></span>
                <span class="iconGood"></span>
                <span class="iconShare"></span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        name: "photos",
        data(){
            return {
                "picArr":[
                    "https://pic.repaiapp.com/static/png/20180417/11/1523935740194810257.png",
                    "https://pic.repaiapp.com/static/jpg/20180413/11/1523589580121399101.jpg",
                    "https://pic.repaiapp.com/static/png/20180412/16/1523520607370764956.png",
                    "https://pic.repaiapp.com/static/png/20180417/11/1523935740194810257.png",
                    "https://pic.repaiapp.com/static/jpg/20180413/11/1523589580121399101.jpg",
                    "https://pic.repaiapp.com/static/png/20180412/16/1523520607370764956.png",
                    "https://pic.repaiapp.com/static/png/20180417/11/1523935740194810257.png",
                    "https://pic.repaiapp.com/static/jpg/20180413/11/1523589580121399101.jpg",
                    "https://pic.repaiapp.com/static/png/20180412/16/1523520607370764956.png"
                ]
            }
        },
        methods: {

        },
        created() {

        },
        components:{
        }
    }
</script>

<style scoped lang="scss">
    .photos{
        .head{
            height: 45px;
            line-height: 45px;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #000000;
            border-bottom: 1px #dadada solid;
            .backBtn{
                flex-basis: 45px;
                box-sizing: border-box;
                width: 10px;
                height: 16px;
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAfCAYAAADnTu3OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVEMTMzQjIxM0VDMjExRThBMTlCQUFGOTgzNkIzRDk4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVEMTMzQjIyM0VDMjExRThBMTlCQUFGOTgzNkIzRDk4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUQxMzNCMUYzRUMyMTFFOEExOUJBQUY5ODM2QjNEOTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUQxMzNCMjAzRUMyMTFFOEExOUJBQUY5ODM2QjNEOTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz591WfFAAABz0lEQVR42qSWSyjEURTG7xiJPGqGjUfSmAVFNsoGi5EyybAxWSplwV6WLCh2QsnCQkrNQh4xkpQlSUmyIathpeSRUh7f0Xfr+mfG/3999VucO/XNueeec2Z8oVBI/VNZ4JN8B/9RNlgG88CnD2yVCxKgyzgbtjUsBOsgYpzJlX02Vw6CfYfZpGQHPrxmWAr2QJ2R1SiYNovqVlXMrJrxOxgCi85XcqNampUxfgP9YPW3Z/9LjSAJShi/gl6wna6PMqkVbIEixo8gBg4zdXk6dYJdw+wetGUyy2TYB9ZAHuNb0AJO3MyhU4NgBeQwvgbN4NLtYJsaAQvAz/iCmd142RRaE2BKDzl0zEe587otxGCOTap1AHrAk80uExU4zpM2ZiJ/IBBQ7LUGUMPzdtbtzDZDmcs4r6pYhiXQbWuo51MMjnT2XKARW0PRMyfknLH04gZosjXUIxYFV8aDySKotzUUpWiaYlwMdkDY1lAxwygzFlWwncptDRVrKTV9YRymadDWUPHVY+wCxVrK9fNtDfUoxtmviq++aWwkz4aK7TOg/3KwPxPGZvoxem4lo/gAOhjLqFbyyzxnqDUDxo3f5VObn1GnxkCArTVrfvAlwACTDlZXtH61qQAAAABJRU5ErkJggg==") no-repeat;
                background-size: contain;
                background-position:10px;
            }
            .title{
                flex: 1;
                text-align: center;
            }
            .status{
                flex-basis: 45px;
                color: #dd3232;
                font-size: 15px;
            }
        }
        .content {
            .photosContent{
                overflow: hidden;
                padding:6px;
                background:#fff;
                .photoItem{
                    list-style: none;
                    float: left;
                    width: 31.3%;
                    height: 118px;
                    margin: 1%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .overview{
                padding:9px;
                background:#fff;
                .title{
                    margin-bottom: 5px;
                    font-size: 15px;
                    color: #000;
                    span{
                        font-size: 12px;
                        color: #a7a7a7;
                    }
                }
                .assess{
                    overflow: hidden;
                    font-size:12px;
                    color:#a7a7a7;
                    height:22px;
                    line-height:22px;
                    .assessLeft{
                        float: left;
                        .iconShop{
                            display: inline-block;
                            vertical-align: middle;
                            width: 22px;
                            height: 22px;
                            margin-right:8px;
                            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhCNEMyMUFFNDM3RDExRThCODc0OTA0Mzg3Q0VCMjZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhCNEMyMUFGNDM3RDExRThCODc0OTA0Mzg3Q0VCMjZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEI0QzIxQUM0MzdEMTFFOEI4NzQ5MDQzODdDRUIyNkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEI0QzIxQUQ0MzdEMTFFOEI4NzQ5MDQzODdDRUIyNkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4u37WuAAANHUlEQVR42sRZCXRU1Rn+Zt8zkz2TDUhIgBASEjZBClpZFIsbesQWPIVjRcSDePRYRW2piEt7LLigoEWrtD14WlqlLsiOhEjYAyZAkoHs22SSzL7P638vkyHbCCLYm3Pz5r13373f/ff/vyJBEHC1zWQyaegylfp06nnUc6knU9eGhziot1Gvol5J/RvqB7Kzs51Xu6bohwImkCK6zKa+SCQSzVUoFCpqoCtkMhmkUinoOR/L5g4EAvD7/fB6vXC73ezqpuf/pdcfUv+awAvXDTCBvYcuv5PL5YUxMTHQ6XQQi8U/aMOhUAh2ux02mw0+n6+cHq0i0J9eU8AENJsu7xLQmXFxcdBoNLgWzel0orOzkwHfSbdLCbjpRwMmsPcTi98joDEGgwHXurH1rVYrA26j30sI9JarAhyW1dUkl88lJydzGb2ejaiM1tZWJu9r6PaFaLI9KOAw2LcI5DKj0QiJRIKfogWDQbS0tDDF3BgWkQHgomnMywxsamrqTwaWNbYWW5PWXsIwRJWh3r2mpmZ+XV2dQOZI+H81tjbDQFge6I+vj0gwa0AKdjwtLS3mesvs5Rqz201NTXbCV9Tbekj7jXuXWYP+YB1VJnTv2A1H2WH4fSIoM1KgysqEZnwhDBMnQnSFIOwVZ+A01UKkUkJmiIGUrI40Ph5ynQZScjq9G8NAWHQWi+Vdup01QCSI/PfU19f3YU3rti+E47fcJuyBTNgPnfCNLkloeON94dTs+cxVCXshFsryJwi1b77zvSy27NovVDy0QjC98meh9csdgr2qug/7v68xTAxbD84esCLqJ8mQ80F+l184df9CYQcHBQIMofzOBwSvw83fn1uxkj//FnG0EfBxZUU3CNbycwMWrFy4TDg6/Q6hc19pn+fWE+WC+etdkXuPvXtQwAwTYStnGBnWHisxi7lbtVoNT3sXDhcUo/WTzdAhAUokcZZLUpMRcrvQvoOgGjRQx+eA9gw5UhEDIxwnDuHY2EJ07CyJcK985n2QxMch/9PNsJ05hWMTZuJo7nicnDgHJ4om4fTsGSiffjfKJ/8CRzPG4MQtt6Jzd2kf0WCYCFtBOH65qHSkbFsSExPvZy73SO4EOM+fILAZCMEPF1qhnzANccseg6FoNOx7S+HzuxBqbEHbG+sgA/N+IvqTwosG2oIUxZVn0fbeR7iwbjXy3vkAXosdTevehmC5QGMDHIgMsfSNjL5pD98r4YYHzATcUN8IbUZaBDSLO8xm8yekfPOZKGjIMnQMHTpUWfXrJ1G/eR30RLUQfATXieGf/RPq7BFo2/AhjI8shPXQMTjKK2H721aEusy0qKKXUZfSV80ISmKhzh0N7c+noHn9K8QFCfUUmtND45UsBBrc7dIMPopGlUOLIM2OgzI5GyM+eoMmFqO2ttZDxE1gIjGVNFLpqDiHJgKrI7hCxITo4D1Zjcrb50Bis0M7KhddX+2GTC5HsMvCqdrbBwXRDWnKGIjIY4kDdqSsXA7DlLnMh9GcwfDmQtHjCnqnJM66ao+gcffXaP7HO/B1dvOIkGFkWBng6SyebXxxbXhZHf+UTS4hQHW/fwL2umrIcrL4knEPzkP3F7uI+h10J++1XAAipQHy4RlQKGNgqz6Oro2bkfnmSxDJ42hGH5/3svaXRFA3aiqKNtG3zxN3DHr+nGFkWBmJ8iUkx92fbafdyTklwpErn15JCiUn0ej4YAvMe/dCsNugIgUM1mYi5HFxOeRxAFFXnX8zRGRP/Z5GqEhZW158GY6Sw5AG1AS3kUYmXIbKIr5xd3s9jIsXwNvcih4jH/YN+Qxwjve7c/D6G2iRxEEnCZDqadNTkbj4PqiS0xGQSVB1xwLA444AZgoqG5KGgKk+QnlZbAqcJPNiqQDDrAfR+fnHBFfPuXiJMD2rSGmdDprFD01mBpyV5xCTNyLyXnbRseQwkUj0n68LM0syqGSJREp4Rd1QJKRDM2U8vHXNSHj0QVoyGGZziJZLgMyYjEC7mQCpOMUVI0ZAf88cOEJdJM+PIYfY7IGVvvBE5r4kUGx8PhIXLkHikqVkQj0DAiOGlQHWCVZHVOnyoAWJ9y5CztuvIxT0IWC1EeAaOLbvJmByThvK3MjNEuA4A4KWLnoiob8YdB/6EoJahfGnjiBh7BikEZsT715E5quDz+sheWWUZdbBCzuUxkxkv/8WpBoFNMMy+4aVF1MxHf8vksuixgMyWth+9AAs/9oO7bRJ6NxzEN2Hj6PjZAkBdfLFGIXFKgWkOi2EUCgs06SElPclzpgG/ag8eq/kzzOeewIsZTYuXoGM375EwtbAFZIRTDIiCyqFDBkL7qXNxw6Kh61ml2YYB7AowgqSOteFU5AlJcG251tUL/0NUu6eh3EHD0FVPB5Bme8iwC4rxARYYtDzjXiIxWN37UPSfXP7zKcdnYOsh1ZgxKa1yH71OegmTaaRZozZV4qRG/44eGBPRGDBPcPKAJvVxQXcY1E+O4jWghivR8drG1Fx5yz47J2oevRhiNxBZG/aBPGwVKKmD16yDCKNCqrRudw/qjWZ6CwphaOyqi8BlErkvX/RhIYIhO7GORi++jUkTZ8clcsessXBAAdsZoCrxRTq6Sb9jOTI1S8JEbhQBAiQreEI1FmjMbnsNArLSnB8xo04d9NciEwW7mD8jK2kKNpbpsJGXw0lmZfSvAFLZ/SU3+tD0OMg5zIVtX9aDx/Jf//maifLQT0Q5C69mqH7jgXLqc8+GvbyvshgP/l5WUEuxrXXYbLPifGm7yDPG4LGp//AjVnQaobAWSWmezFsJOcxt8/gW/bVnEf6ovkw/OyGqIClpJB5619F2+fb4bPaIY+PhWnNWlQ/vToyxnqS1tTreEDPsEqWL1/O1l5gnFCM7v8cgL2tgqQ2lisSUyjBTRsQ+RBqd8J5pgqlxYXwmM4QTYf2if8l5GK6TYeQ9vgKKEnSKt5eg7S7HoA8JeGy3i1p9s0IKdUw7/gC4pAccmMi9OMKYDlYxqkbP3kCr19Q7Pxyn+DHfaEBZcNHEgwPgc7gIiFwg2OGVpKO3H1bYdu3H45dB2Ddv4/GaSJyzhyIC/VkEaZh1NHtKI0hJySIcGPdeSjTE6OLRSAA07KVMG/5K0VlZrLgOkwXbHA3NqP29Q3IWfUUV+ZI8MMKc/TjM4fDAU32EBTu3E2iALKVDRHDpiJKayeOha++CbKEJBhfXMmjOYS9FbO7forSmEjpZkyFilg94UAJPCEHDmako6vkSHTAwRC69h3ktlwvi0VMYREa/74VNRRHZC5ZCKk+BgwbYdzGi4jhjOPW3ulR54GjQkl6Fs8kSqAQvqHrmXkPUZZwmmcfB+UpwiGkU08VSqEXdvGsRC7Ur/+wT7bQteeQsJOeb6P3Z5c+LriaWr83Hap8frWwN3WkUD5vseA4U9U/TbotkjWHCycnjUZjAYvwucI5vDC98DzMGz+C1W1GxpTbkfHWGpwcNzZi8IJciuWIu+tODHtpDXRkYwdUdMxWnHvkEdT/ewuX+MTimxA351Zo8kdBrFEj0NlFulEB2+nT8Lp8SJg1HdnPPHXJSrhcrLhyin6OZYWVSJrPKpOUimxNT0+PlEv5B63t6Nj2OSlaHQJtZriPHyNbqoeMMmf1xAK+uH5M/mUVy3b6LFrf+wssn3wKj7khHK6rISZvqMhKg2HmzRjy5AookhP6JMiNjY2sjHUvgd06oJBCZN/R1dUVlWVBr/eaFEp8Po/gaW0VPG1tQkAIRh3HsBCmnb0x9i9VLSXzYQ/bvIF+XC6/JkUSmUxBlEyGgty9JEq1jGFgWBimqLU1VmGhXTzc1tbW47sHBpuhgcF3MLxBIdo3V1EUZBjC5deaK6levkIR/jOsMNdTYfc0t8FyrBy6wjzYSsoIuAD18GGQxhoQ8PvhqTJBPSQDmtwsWI+dIm7IeCDkZzkZ/RZoU74WMyWnw7hLNowrhPX4aThr62EoHgMtzdVToW9ubmYUfpXAPnul1cuV9MF69mEPpQXy5SwL6Ny2E0GHm4eLzRs+RqCxCbH5I+E5WwOv1crdbcDcAdNLazkgf1MLpGIRunfsRwfF0I4L9QBFdmBnHzQuSLFG556SCGXDYFm5deWgFc5Vq1YNeMiOBUjgv6IJpE6nc5qSIiyZVougEEKg24bkO8gyjB1NYV8Qsvg4nhOzDTAzpc1Mo9RIz38nzZwGFQXiTrI06uyh9HsIVFlDEHS74HO6EPD5IaFxsROLIFCkx2rDZBFYQfvJqIc1/cuZg5Rff0kiYmUaG+qlwcS6S/Uxt+fiM59/UG0PhfpZmwDZBo8nMg+bm61Ba/3qcniu9FBmePhQZkZ8fDx6nMuPbcwpWCwWRtVd4Yp7zbU+9poXPvYq0Ov10JKYXM2xF4sN2EFM+NhrdcQpXOeDxcXhg0XlDzxY9IQPFj+47geLg4DXho9up7EiB6sbDHJ02x4+uq2gvp96CYF0XO2a/xNgABieuKQy3v/CAAAAAElFTkSuQmCC") no-repeat;
                            background-size: contain;
                        }
                    }
                    .assessRight{
                        float: right;
                        div{
                            display: inline-block;
                            vertical-align: middle;
                            margin: 0 10px;
                            font-size:13px;
                            span{
                                display: inline-block;
                                vertical-align: middle;
                                margin-top:-3px;
                                margin-right:5px;
                            }
                            .iconInfo{
                                width: 18px;
                                height: 16px;
                                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3OTQ4NjJENDM3RTExRThBNTM1OTM4MDlFNDc3MEMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3OTQ4NjJFNDM3RTExRThBNTM1OTM4MDlFNDc3MEMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTc5NDg2MkI0MzdFMTFFOEE1MzU5MzgwOUU0NzcwQzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTc5NDg2MkM0MzdFMTFFOEE1MzU5MzgwOUU0NzcwQzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4t8x92AAABfElEQVR42uyXsU7DMBBAL4Wd/AEZs9GREf6AMVvCF0A3tiZfUP6AdkpG/qD5hCJlL/mCli8wd+hcWRZRZMeqkfBJVi65y/npbJ/tSAgBTdOsAOAZ/MprlmWLizRNS3x5Af9y23VddInKE3/4Ikps7ZlB7nh0rrDlBBSzYY0pKz1kpsUpE3NikpliePc4XKe+Z/DHJAAFoP8LRLUCWzJgS0ZssVMgDEiV9IBtj/qbZqNiumdbqdnWbDtwDGcZWil6gcHnMmv4WCq2pcwG++QDMZzPoaMjH2ugR0WvcM/7JAWf1OlC9eNvwD7VQIxBieq6FqzfY5B2bGLLDk0Ww9g/6EM7/tZ4yExhbP4JhTEABaBzAj145Dj1TbeOHts1nfqxQAnDw/6HXmd4L7sxhJFXsZ4qdaltkCay4wp/VGCo4s4t41URX6UJquBMWUGxbgvTy3vhD5CN8FknV6BAgdlg8MImrjXQL1AwFWbysueON65gJmdIyxRMhSH5FmAA94yf/wbjn4QAAAAASUVORK5CYII=") no-repeat;
                                background-size: contain;
                            }
                            .iconGood{
                                width: 16px;
                                height: 16px;
                                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlBOTI5QTYxNDM3RTExRTg4Qzg1OUYyMDRGRDQwNDcwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlBOTI5QTYyNDM3RTExRTg4Qzg1OUYyMDRGRDQwNDcwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUE5MjlBNUY0MzdFMTFFODhDODU5RjIwNEZENDA0NzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUE5MjlBNjA0MzdFMTFFODhDODU5RjIwNEZENDA0NzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4uZ3PBAAACeUlEQVR42sSX3YtMcRjHZ8bGeg8XXloviXZDrZakRGi9pFb2RnPlUlmUSHsnf8C6sC1XxI1mFDYuEJLaJawou7hYyku7WytKbMO2u+Pz1Hf06zixM53fnF995ntefuc833nOM7/zTDKfzyeKHdlstgU55hy6Dy3pdPpWsfdKlRC8QcEt6B64BFuhnXM7vRoggEmjds/zja+j++AATIJW5iz0mYHZsFLb/faBiTHkInTCctjs08AMWKTtwcJBTPxE7ml3mU8Dc2Ee9MFQ4FyfNO/TwBTpCxgInBuTJn0aqJO+Iu3DgXPzpcNeDFDdVuWFn1lPyJSl0re+MrAW6uGDKt41V6W1IAfPijFQMc5vX4Oc0u450v8+MGUTLIFHdk8ZCqsFO5bj+s9/GeCiamS6imlEv/mZsAqOav+uLTb/SL/NvalAyZDgxiCxbBU9g5GPyUwmM4udE7DfqfKw0Q6HuKg/JEPrkKtQVUT230CDGWhj4yC8hAtyaaYOK0OX4TaBr/znMa1ANoyzrnbBbrhmBr7rm68mSLdzQ1tYHnJsbyLiwb3nIB1QbW6nwVd3YWHCAmQyfEn4GRbvnWWrkK5RBXSHLakTPRmw4ra35q9UKctnRAZqoSuViGcslnbHZWCH9HXZDVDgVmvb4Qc8iSMDU2EN9MLzOAzUqOg/scaMxmGg0DN2ldSWRzC2qWnpKLsBCrBCfYWtsE/jyECd3ju9PP9cHAa2SDvDWrKRMhiolT5wDdifisqAgQF1RkMRPn/rtjbqTfj4T5tEP3DDOhM4C3ecv2CtmtgWQfwJcBzWwxGe/2m3J2xWT9Ak3FEvohjf4KT1gu7B3wIMAOZ/qwNskBxXAAAAAElFTkSuQmCC") no-repeat;
                                background-size: contain;
                            }
                        }
                    }
                }
            }
            .reviewDisplay{
                text-align: center;
                margin-top: 10px;
                background:#fff;
                padding: 20px 10px;
                .title{
                    width: 55px;
                    height: 15px;
                    margin: auto;
                    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAdCAYAAABPGImpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFENzI2NjE3NDM4MjExRTg4QUM2QUE2N0VFNTM1NERCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFENzI2NjE4NDM4MjExRTg4QUM2QUE2N0VFNTM1NERCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUQ3MjY2MTU0MzgyMTFFODhBQzZBQTY3RUU1MzU0REIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUQ3MjY2MTY0MzgyMTFFODhBQzZBQTY3RUU1MzU0REIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75IUjNAAAGbklEQVR42uxa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") no-repeat;
                    background-size: contain;
                }
                .tips{
                    margin: 30px 0;
                    font-size: 14px;
                    color: #a7a7a7;
                }
            }
        }
        .footer{
            position: fixed;
            display: flex;
            z-index: 10;
            bottom: 0;
            width: 100%;
            padding: 10px;
            background-color: #fff;
            box-shadow: 0px 0px 44px 0px rgba(0, 0, 0, 0.23);
            div{
                flex:1;
                align-items: center;
            }
            .input{
                display: flex;
                padding:6px;
                border:1px solid #e5e5e5;
                border-radius: 15px;
                background:#f5f5f5;
                .iconInput{
                    width: 17px;
                    height: 17px;
                    margin: 0 7px;
                    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI5OTNBNDFENDM5NzExRThBREY0RDhEMUQ0ODU5NjQ4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI5OTNBNDFFNDM5NzExRThBREY0RDhEMUQ0ODU5NjQ4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Qjk5M0E0MUI0Mzk3MTFFOEFERjREOEQxRDQ4NTk2NDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Qjk5M0E0MUM0Mzk3MTFFOEFERjREOEQxRDQ4NTk2NDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6YQMbVAAABgklEQVR42syXjY2DMAyFC2IARmAERqAbVCwAt8GNcCP0JiBdgHaD6jYoE9wKvQnoc+VIUcVPUmw4S1YgROTTsxMnUd/3uzWtbdsKTQo/lWV5t/3RWiAAoMmv8Jy7bvC9hYk3gtjx85W/6SsyAuHaUxl1RVj6bmIIAR4SZTUaND+AqfFMXdXYWLXQMETNrx+AMegzAzAdvuXxChBkDfpqUoaWrQsBL1QUGYBwzVWGcqOwy1cUZAbiFSZV2dA8Icj+4JkLIbahBUB0QxAiIIEQxRDEYhApCLLkTQDats926S2FeAvEo3YEQwSHRgsiCEQTwhtEGyJEkU9NCC8QqJHjx18vxUoUYhbEhmSkcopB+Chy4BN3MwGzGMIHpJo5U4hATFZfTJqh+Z0o45Q3RwmIuZ11rIaQMndOYDGLPcNi7cSXoov08TIZCQslaebkwRF+kQpDSGioqn7DDSa/rXEbjNa+hItUX01LkA8FF7Qt7Xn3zf+BIDklq+GXdCMIWonmIcAAobXeXKQS/ycAAAAASUVORK5CYII=") no-repeat;
                    background-size: contain;
                }
                input{
                    flex:1;
                    border: none;
                    outline: 0;
                    resize: none;
                    background:#f5f5f5;
                }

            }
            .icon{
                flex:1;
                display: flex;
                span{
                    flex:1;
                    text-align: center;
                    width: 16px;
                    height: 16px;
                }
                .iconInfo{
                    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJFNUMzOUEyNDM5NzExRTg4NUI0Rjg4MTVCNjlEM0NEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJFNUMzOUEzNDM5NzExRTg4NUI0Rjg4MTVCNjlEM0NEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkU1QzM5QTA0Mzk3MTFFODg1QjRGODgxNUI2OUQzQ0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkU1QzM5QTE0Mzk3MTFFODg1QjRGODgxNUI2OUQzQ0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz49HkdZAAABfUlEQVR42uyXQU7DMBAAN4U7+QH5AT1yhB9wTS4JL4DeuDV5QfkB7SW3SPygeUK55lLygpYXmF20riyLKLJj1Uh4JSub7GY9WttrOxJCQJZlKwB4Br/yWtf14qLruhJfXsC/3DZNE12i8sQfvogSW3tmkDsenStsOQHFbFhjykoPmWlxysScmGSmGN49Dtep7xn8MQlAAej/AlGtwJYM2JIRW+wUCANSJT1g26P+ptmomO7ZVmq2NdsOHMNZhlaKXmDwucwaPpaKbSmzwT75QAznc+joyMca6FHRK9zzPknBJ3W6UP34G7BPNRBjUKI0TQXr9xikHZvYskOTxTD2D/rQjr81HjJTGJt/QmEMQAHonEAPHjlOfdOto8d2Tad+LFDC8LD/odcZ3stuDGHkVaynSl1qG6SJ7LjCHxUYqrhzy3hVxFdpgio4U1ZQrNvC9PJe+ANkI3zWyRUoUGA2GLywiWsN9AsUTIWZvOy5440rmMkZ0jIFU2FIvgUYALQRl5Irot8QAAAAAElFTkSuQmCC") no-repeat;
                    background-size: contain;
                    background-position: center;
                }
                .iconGood{
                    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMyMUIxQTZBNDM5NzExRTg4RUM2OTRGNDMxMzcyQjA5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMyMUIxQTZCNDM5NzExRTg4RUM2OTRGNDMxMzcyQjA5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzIxQjFBNjg0Mzk3MTFFODhFQzY5NEY0MzEzNzJCMDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzIxQjFBNjk0Mzk3MTFFODhFQzY5NEY0MzEzNzJCMDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5R4u33AAAB6UlEQVR42syY3U3DMBDHnYgBygbZgDBBzASUx/alYYMyAWECYIKmL3mlG+BukE5AugGZINxJZ3QYt6ny4fgky40T2T/f/X22GzRNI/rYcrlcQRVBKaHsi6L47tNf0BUIQGZQfUKJWTPCvAHUS1egsMdk1gYMGkJmALuZAmhF9QHKNZRHKEdqSwFq7gyIwhXR4w51AyUnj9XU/urSQzxUSv8gQef0GAF45Aro3EDqwu/GAQKvKONdr2XfN2RHMbB1BUqoLi3vZk6BQKiSDapaBF+68JBezjVbUdzudX7qso1cvHVQ7sEMrBPeOwy4Nr5BsX/p/ITbSEu3NfTxx4tXRoeoDWnRRGy0Y3bOWtLBnMGfm2gF1ROA7X49RDP7sOxNNtvjQLZwkBdRVzcdpPCAUNpDmxaYmkKQW/KOMDJ1TMK/xPC7Z6bNXbBYLHjct9BpymasaInjOUeKEQzGyBjUbWjEPRfujXt8ForpjUul8gFIshTgBVDCQzcpEAg6Nreh0CP9eAEkWQ4rfQBKWPYXkwLRdhWZuSj0ST9TA0nbuTz0QD+HoW6uQ4VMTQ5kHE+UDx6an7oIIFBl+QNhTO+s2Dh4zqr+HfLZQcy13ZknUB2y1FT7yFbTGVqdvQaR2OTIMKgZderO9iPAALA/rVOiPhcdAAAAAElFTkSuQmCC") no-repeat;
                    background-size: contain;
                    background-position: center;
                }
                .iconShare{
                    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM2MjU3QjUyNDM5NzExRTg4NEFBODFBNTA0MUI4MEMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM2MjU3QjUzNDM5NzExRTg4NEFBODFBNTA0MUI4MEMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzYyNTdCNTA0Mzk3MTFFODg0QUE4MUE1MDQxQjgwQzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzYyNTdCNTE0Mzk3MTFFODg0QUE4MUE1MDQxQjgwQzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6UYy5uAAACIUlEQVR42uyXvUscQRiHZ49Dg1qIEAIRtRC0sdAikBhERLBQREgh3IGIWChnyH8QkVgYSBARFAQriyssREHEQAiIVQIhFip+w5mYQkyCqHjo6eYZeBfW407cu3EhkBcefjs7s/Pb+Xpvz7JtW4XD4TalVARKwAJb3R7H0B6NRr+nqqS/ceQQaBLdStXGCoVCLegsBJW3qKDT7RSmxcgP161vMAcLsMczv5SYvRKdgUm5tm4x1PXn8DNNfRz64RnUQo0wAJu82Lx+ET3iDS4qoZG3+aQMBiYPkQ54A/muqomgaz3zDZsWIr3QmtT3Ncy7jS2Dpt3IayiTW5/hVM+q6JeA4VEWwJTsFW26DiGW8Ck6KM1WKR8GDZo+RqbhudzS6zrq7GKiWfSjyuAIpTMtcpn+gS4M51z1ubLLdXw1YqynF1mEJ3AATZiuJzUrk6Olj9qKqRG/F9MjqMd0N0WbPDiDNclo2RkzWr1Le6TYk8ZUySarggvaxE2MeEh0jA5n0jWi7gK5kdcDWYy2Tab4N7zz+nwgQ1OdbF5KcZoRxXwxJh5Auftceo1M1/gSOvVPIyx5mCk90BxIZGTM1CaQZcFL1MEI7BhLmXeMR1ANxQGfjeOiR34bZ3+O/xv/U8bOt5btg9+V4+s2PvPBOOGoTiD78l3dR0rLkTRqegmuxTQi5Zg2GYUGeCHcd5zAWyvpT1vpPa23s5x6dofJ9R/+CjAAdvKifOcTJPcAAAAASUVORK5CYII=") no-repeat;
                    background-size: contain;
                    background-position: center;
                }
            }
        }
    }
</style>
