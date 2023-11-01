<script>
import axios from "axios";
import LoadingComponent from '../components/LoadingComponent.vue';


export default {
    data() {
        return {
            singleApt: null,
            loading: false,
            count: 0
        }
    },
    mounted() {

    },
    methods: {
        getSingleApt() {
            this.loading = true,
                axios.get(`http://127.0.0.1:8000/api/apartment/${this.$route.params.id}`)
                    .then(res => {
                        console.log(res.data)
                        this.singleApt = res.data.results
                        this.loading = false


                    })
                    .catch(err => {
                        console.log(err.response)
                    })
        },
        nextImg() {
            console.log(this.count)
            if (this.count < this.singleApt.image.length - 1) {
                this.count++;
            }
            else if (this.count == this.singleApt.image.length - 1) {
                this.count = 0;
            }
        },
        prevImg() {
            console.log(this.count)
            if (this.count > 0) {
                this.count--;
            }
            else if (this.count == 0) {
                this.count = this.singleApt.image.length - 1;
            }
        }
    },
    created() {
        this.getSingleApt();
    },
    components: {
        LoadingComponent

    }
}
</script>


<template>
    <template v-if="loading">

    </template>

    <template v-if="!loading">
        <!-- Modal -->
        <div class="modal fade" id="modalImages" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content">

                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <!-- <img class="d-block w-100" v-if="singleApt.image[count].src"
                                    v-bind:src="singleApt.image[count].src" alt="First slide"> -->
                                <img class="d-block w-100" 
                                    v-bind:src="'http://127.0.0.1:8000/storage/' + singleApt.image[count].path"
                                    alt="First slide">
                            </div>

                        </div>
                        <a v-if="singleApt.image.length > 1" class="carousel-control-prev" href="#carouselExampleControls"
                            role="button" data-slide="prev" @click="prevImg">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a v-if="singleApt.image.length > 1" class="carousel-control-next" href="#carouselExampleControls"
                            role="button" data-slide="next" @click="nextImg">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>
<style lang="scss" scoped>
@use "../assets/scss/main";

h1 {
    color: #3461AB;
    font-weight: bold;
}

.messageSent {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px 0;

    .check-div {

        max-width: 80px;
        max-height: 80px;
        margin-bottom: 30px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}

.btn-contact {
    padding: 10px;
    font-size: 13px;
    background-color: #00ABE8;
    color: white;
    font-weight: bold;
    border-radius: 10px !important;
    border: none !important;
}

.btn-contact:hover {
    background-color: #3461AB;
    color: white;
    font-weight: bold;
}
</style>
