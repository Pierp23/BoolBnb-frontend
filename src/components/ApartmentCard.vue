<script>
import axios from "axios";

export default {
    data() {
        return {
            apartments: null
        }
    },
    methods: {

    },
    created() {

    },
    props: {
        name: String,
        address: String,
        path: String,
        price: String,
        id: Number,
        square_meter: Number,
        arr: Array
    }
}
</script>

<template>
    <div class="card border rounded-4 card-Apt-grande w-100">
        <span v-if="arr.length > 0" class="badge-spons">
            <img src="../assets/img/coppa_grigia.png" alt="">
        </span>
        <div class="img-fluid">
            
            <img v-if="path.startsWith('uploads')"
                :src="'http://127.0.0.1:8000/storage/' + path" alt="" class="h-100 w-100 img-fluid">
            <img v-else
                :src="'http://127.0.0.1:8000' + path" alt=""
                class="h-100 w-100 img-fluid">
        </div>
        <div class="info-apt m-3 d-flex flex-column align-items-center align-items-md-start justify-content-between">
            <h4 class="space">
                {{ name }}
            </h4>
            <div class="space">
                <span class="info-small-apt">
                    Indirizzo:
                </span>
                {{ address }}
            </div>
            <div>
                <span class="info-small-apt">
                    Prezzo:
                </span>
                {{ price }} &euro;/notte
            </div>
            <div>
                <span class="info-small-apt">
                    Metratura:
                </span>
                {{ square_meter }}mq
            </div>
            <div class="div-btn-view">
                <router-link :to="{ name: 'singleApt', params: { id: id } }" class="btn-contact">
                    Visualizza
                </router-link>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>

.space {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}
.card {
    height: 500px;

    .img-fluid {
        height: 60%;
        min-height: 60%;

    }

    .info-apt {
        height: 40%;
    }

    img {
        object-fit: cover;
    }
}

.card-Apt-grande {
    position: relative;

    .badge-spons {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 25px;


        img {
            width: 100%;
            height: 100%;
        }
    }

}

.div-btn-view {
    margin: 10px 0;
}

.btn-contact {
    padding: 5px 7px;
    font-size: 13px;
    background-color: #00ABE8;
    color: white;
    font-weight: bold;
    border-radius: 10px !important;
    border: none !important;
    text-decoration: none;
}

.btn-contact:hover {
    background-color: #3461AB;
    color: white;
    font-weight: bold;
}

img {
    border-start-end-radius: 10px;
    border-start-start-radius: 10px;
}

.info-apt {
    h4 {
        font-weight: bold;
        color: #3461AB;
    }
}

.info-small-apt {
    font-size: 15px;
    font-weight: bold;
    color: #888A8C;
}
</style>