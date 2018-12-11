<template>
    <div class="rp-loading">
        <div class="icon-load"></div>     
    </div>
</template>

<script>
    export default {
        name: "loading",
        data() {
            return {

            }
        },
    }
</script>

<style scoped>
    .rp-loading {
	    padding: 5px 0;
	    text-align: center;
	}

	.rp-loading .icon-load {
	    display: inline-block;
	    width: 37.5px;
	    height: 37.5px;
	    /* background: url('https://pic.repaiapp.com/pic/25/bf/c8/25bfc8ce41ae5757f001ceaab4dc92c7ebaf55c0.gif') center no-repeat; */
	    background: url('https://pic.repaiapp.com/pic/86/e6/3b/86e63b91e222dcd229dd3d96f5426577a522f124.gif') center no-repeat;
	    background-size: cover;
	}

</style>
