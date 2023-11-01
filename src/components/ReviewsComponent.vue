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
    <div class="review-container text-center d-flex justify-content-center align-items-center">
        <div class="div-img">
            <img src="../assets/img/testimonial_shadow.png" alt="">
            <div class="circle-graph-1 d-none d-lg-block"></div>
            <div class="circle-graph-2 d-none d-lg-block"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main";

.review-container {
    margin-top: 80px;
    padding: 2.25rem;
    background-image: url(../assets/img/reviews-img.png);
    background-size: cover;
    background-repeat: no-repeat;
    height: 80%;
    width: 100%;
    position: relative;

    .div-img {
        margin-bottom: 20px;
        max-width: 500px;
        z-index: 3;
    }

    img {
        width: 100%;
        height: 100%;
    }

}

.circle-graph-1 {
    background-color: white;
    border-radius: 50%;
    height: 200px;
    width: 200px;
    position: absolute;
    top: -74px;
    right: 200px;
    z-index: -3;
}

.circle-graph-2 {
    background-color: white;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    position: absolute;
    top: 206px;
    right: 400px;
    z-index: -1;
}
</style>