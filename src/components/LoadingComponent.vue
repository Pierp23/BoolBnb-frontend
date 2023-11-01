<script >
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<template>
    <div class="loading-div">
        <div class="img-loading-div">
            <img src="../assets/img/anima.gif" alt="">
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main";

.loading-div {
    // display: flex;
    // align-items: center;
    margin: 50px 0;

    .img-loading-div {
        display: inline-block;
        // width: 100px;

        // height: 100px;
        // animation-name: rotation;
        // animation-duration: 1500ms;
        // animation-timing-function: linear;
        // animation-iteration-count: infinite;

        img {
            width: 500px;
            // height: 100%;


        }

        // @keyframes rotation {
        //     from {
        //         transform: rotate(0deg);
        //     }

        //     to {
        //         transform: rotate(360deg);
        //     }
        // }

    }
}

span {
    margin-left: 50px;
}
</style>