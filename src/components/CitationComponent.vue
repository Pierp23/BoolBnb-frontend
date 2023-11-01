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
    <div class="container">
        <div class="row align-items-center justify-content-center p-4 citation-container my-5">
            <div class="col-12 col-sm-6 fly-house">
                <div class="div-img">
                    <img src="../assets/img/fly-house.png" alt="">
                </div>

            </div>
            <div class="col-12 col-sm-6 citation d-flex flex-column text-center mt-5">
                <h2>
                    “Le persone non fanno i viaggi,
                    <br>
                    sono i viaggi che fanno
                    le persone”
                </h2>
                <h5 class="name-citation fs-4">
                    John Steinbeck
                </h5>
            </div>
            <div class="circle-img-back d-none d-md-block">
                <img src="../assets/img/graphic_circle.png" alt="">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main";

.citation-container {
    position: relative;

    .fly-house {
        .div-img {
            max-width: 500px;

            img {
                width: 100%;
                height: 100%;
            }
        }


    }

    .citation {
        h2 {
            font-weight: bolder;
            color: #3461AB;
        }

        h5 {
            font-weight: bolder;
            color: #15B4F0
        }
    }

    .circle-img-back {
        img {
            position: absolute;
            top: 83px;
            right: 49px;
            width: 541px;
            z-index: -1;
        }
    }

}
</style>