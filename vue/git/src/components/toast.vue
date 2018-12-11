<template>
    <div class="toast">
        {{toast.text}}
    </div>
</template>

<script>
    export default {
        name: "toast",
        data() {
            return {

            }
        },
        props: ['toast']
    }
</script>

<style scoped>
    .toast{
        padding: 15px 20px;
        color: #fff;
        font-size: 14px;
        border-radius: 2px;
        background: rgba(0,0,0,0.75);
        position: fixed;
        top: 50%;left: 50%;
        transform: translate(-50%,-50%);
        z-index: 999;
    }
</style>
