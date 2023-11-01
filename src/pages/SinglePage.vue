<script>
import axios from "axios";
import ModalComponentMessage from "../components/ModalComponentMessage.vue";
import ModalComponentImages from "../components/ModalComponentImages.vue";
import LoadingComponent from '../components/LoadingComponent.vue';



export default {
    data() {
        return {
            singleApt: null,
            loading: false
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
        getIp() {
            axios.get('https://api.ipify.org?format=json')
                .then(res => {
                    let ip = res.data.ip
                    this.sendIp(ip)
                })
        },
        sendIp(ip) {
            let data = {
                ip: ip,
                id: this.$route.params.id
            }
            axios.post('http://127.0.0.1:8000/api/ip/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err.data)
                })
        }
    },
    created() {
        this.getSingleApt();
        this.getIp()
    },
    components: {
        ModalComponentMessage,
        LoadingComponent,
        ModalComponentImages
    }
}
</script>

<template>
    <template v-if="loading" class="loading-div">
        <LoadingComponent />
    </template>

    <template v-if="!loading">
        <ModalComponentMessage />
        <ModalComponentImages />

        <div class="container">

            <div class="card-body card-info-apt">
                <div class="row">
                    <div class="col-12 col-md d-flex align-items-center">
                        <h1 class="my-0 me-3 d-inline-block">
                            {{ singleApt.name }}
                        </h1>
                        <button type="button" class="btn-contact btn-contact-top d-inline-block" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                            Contatta l'host
                        </button>
                    </div>

                </div>
            </div>
            <section class="img-container my-3">
                <div class="row">
                    <div class="col-md-6 col-12 col-big-img">
                        <div class="card big-img">
                            <div class="card-body p-0">
                                <!-- <img class="img-fluid" v-bind:src="singleApt.cover_img" alt="">
                                <img src="../assets/img/icon_img.png" alt="" v-if="!singleApt.cover_img"
                                    class="h-100 img-fluid">
                                <img :src="path" alt="" v-else-if="!singleApt.cover_img.startsWith('uploads')"
                                    class="h-100 img-fluid"> -->
                                <img v-if="singleApt.cover_img.startsWith('uploads')"
                                    :src="'http://127.0.0.1:8000/storage/' + singleApt.cover_img" alt=""
                                    class="h-100 w-100 img-fluid">
                                <img v-else
                                :src="'http://127.0.0.1:8000' + singleApt.cover_img" alt=""
                                class="h-100 w-100 img-fluid">
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-12 d-none d-md-block col-img">
                        <div v-if="singleApt.image.length >= 4" class="row">
                            <div v-for=" singleImg  in  singleApt.image.slice(0, 4)" :key="index" class="col-6 extra-img">
                                <div class="card yes-img" data-bs-toggle="modal" data-bs-target="#modalImages">
                                    <div class="card-body">
                                        <img class="img-fluid" v-if="singleImg.src == null"
                                            v-bind:src="'http://127.0.0.1:8000/storage/' + singleImg.path" alt="">
                                        <img class="img-fluid" v-else v-bind:src="singleImg.src" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="singleApt.image.length == 2">
                            <div class="col-12 d-flex">
                                <div class="my-col extra-img">
                                    <div v-for=" singleImg  in  singleApt.image.slice(0, 4)" :key="index"
                                        class="card extra-img-card yes-img" data-bs-toggle="modal"
                                        data-bs-target="#modalImages">
                                        <div class="card-body">
                                            <img class="img-fluid" v-if="singleImg.src == null"
                                                v-bind:src="'http://127.0.0.1:8000/storage/' + singleImg.path" alt="">
                                            <img class="img-fluid" v-else v-bind:src="singleImg.src" alt="">

                                        </div>
                                    </div>
                                </div>

                                <div v-if="singleApt.image.length < 4" class="my-col extra-img">
                                    <div v-for="singleNotImg in (4 - singleApt.image.length)" class="card extra-img-card">
                                        <div class="card-body">
                                            <img class="img-fluid" src="../assets/img/icon_img.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="singleApt.image.length == 1">
                            <div class="col-12 d-flex">
                                <div class="my-col extra-img">
                                    <div class="card extra-img-card yes-img" data-bs-toggle="modal"
                                        data-bs-target="#modalImages">
                                        <div class="card-body">
                                            <img class="img-fluid" v-if="singleApt.image.src == null"
                                                v-bind:src="'http://127.0.0.1:8000/storage/' + singleApt.image[0].path"
                                                alt="">
                                            <img class="img-fluid" v-else v-bind:src="singleApt.image[0].src" alt="">
                                        </div>
                                    </div>
                                    <div class="card extra-img-card">
                                        <div class="card-body">
                                            <img class="img-fluid" src="../assets/img/icon_img.png" alt="">
                                        </div>
                                    </div>
                                </div>

                                <div v-if="singleApt.image.length < 4" class="my-col extra-img">
                                    <div v-for="singleNotImg in 2" class="card extra-img-card">
                                        <div class="card-body">
                                            <img class="img-fluid" src="../assets/img/icon_img.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="singleApt.image.length == 3">
                            <div class="col-12 d-flex flex-wrap">

                                <div class="col-6 card ">
                                    <div class="card-body">
                                        <img class="img-fluid" v-if="!singleApt.image[0].src"
                                            v-bind:src="'http://127.0.0.1:8000/storage/' + singleApt.image[0].path" alt="">
                                        <img class="img-fluid" v-else v-bind:src="singleApt.image[0].src" alt="">
                                    </div>
                                </div>
                                <div class="col-6 card ">
                                    <div class="card-body">
                                        <img class="img-fluid" v-if="!singleApt.image[1].src"
                                            v-bind:src="'http://127.0.0.1:8000/storage/' + singleApt.image[1].path" alt="">
                                        <img class="img-fluid" v-else v-bind:src="singleApt.image[1].src" alt="">
                                    </div>
                                </div>
                                <div class="col-6 card ">
                                    <div class="card-body">
                                        <img class="img-fluid" v-if="!singleApt.image[2].src"
                                            v-bind:src="'http://127.0.0.1:8000/storage/' + singleApt.image[2].path" alt="">
                                        <img class="img-fluid" v-else v-bind:src="singleApt.image[2].src" alt="">
                                    </div>
                                </div>
                                <div class="col-6 card ">
                                    <div class="card-body mt-3">
                                        <img class="img-fluid" src="../assets/img/icon_img.png" alt="">
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div v-if="singleApt.image.length == 0" class="row h-100">
                            <div v-for="singleNotImg in 4" class="col-6 extra-img">
                                <div class="card">
                                    <div class="card-body">
                                        <img class="img-fluid" src="../assets/img/icon_img.png" alt="">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section class="info-container mb-5">
                <div class="row mx-1">
                    <div class="col-12">
                        <div v-if="singleApt.image.length > 0" class="mb-5">
                            <button type="button" class="btn-contact" data-bs-toggle="modal" data-bs-target="#modalImages">
                                Visualizza tutte le immagini
                            </button>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12 descrizione-div">

                        <div class="me-4">
                            <h3>
                                Descrizione
                            </h3>
                            <p class="fs-5 text-justify">
                                {{ singleApt.description }}
                            </p>
                            <img src="../assets/img/astroboy2.png" alt="">
                        </div>
                    </div>
                    <div class="apt-card-dx col-md-6 col-sm-12 border rounded-4 px-4 align-self-start">

                        <div class="card-title mt-3">
                            <h3>
                                Dettagli appartamento
                            </h3>
                            <hr>
                        </div>
                        <div class="info d-flex flex-column justify-content-md-end">
                            <div class="card-body card-info-apt d-flex flex-wrap">
                                <div class="col-12">
                                    <div class="row align-items-center">
                                        <div class="col-12 col-sm-6 mb-3">
                                            <div class="icon-div">
                                                <img src="../assets/img/room_bianco.png" alt="">
                                            </div>
                                            <span class="span-info">N. stanze: </span>{{ singleApt.room }}
                                        </div>
                                        <div class="col-12 col-sm-6 mb-3">
                                            <div class="icon-div">
                                                <img src="../assets/img/bagni.png" alt="">
                                            </div>
                                            <span class="span-info">N. bagni: </span>{{ singleApt.bathroom }}
                                        </div>
                                        <div class="col-12 col-sm-6 mb-3">
                                            <div class="icon-div">
                                                <img src="../assets/img/letti_giusto.png" alt="">
                                            </div>
                                            <span class="span-info">N. letti: </span>{{ singleApt.bed }}
                                        </div>
                                        <div class="col-12 col-sm-6 mb-3">
                                            <div class="icon-div">
                                                <img src="../assets/img/condivisione.png" alt="">
                                            </div>
                                            <span class="span-info">Bagno condiviso: </span>
                                            <span class="span-info" v-if="singleApt.shared_bathroom">Sì</span>
                                            <span class="span-info" v-else>No</span>
                                        </div>
                                        <div class="col-12 col-sm-6 mb-3">
                                            <div class="icon-div">
                                                <img src="../assets/img/dollaro_bianco.png" alt="">
                                            </div>
                                            <span class="span-info">Prezzo/notte: </span>{{ singleApt.price }}&euro;
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="services">
                                <h3>
                                    Servizi inclusi
                                </h3>
                                <hr>
                                <ul>
                                    <li class="d-flex d-lg-inline mx-2" v-for=" singleService  in  singleApt.services "
                                        :key="index">
                                        {{ singleService.name }}
                                    </li>
                                </ul>
                            </div>

                            <div class="card-body card-info-apt">
                                <div class="row">
                                    <div class="col d-flex justify-content-center">
                                        <button type="button" class="btn-contact" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                            Contatta l'host
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="map col-12 my-5">
                        <h3>
                            Mappa
                        </h3>
                        <iframe
                            :src="'https://maps.google.com/maps?q=' + singleApt.lat + ',' + singleApt.lon + '&hl=es;z=14&amp;output=embed'"
                            width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>

                    <div class="host-card d-flex flex-column align-items-center d-md-block">
                        <h3 class="text-center">
                            Host
                        </h3>
                        <hr>
                        <div class="row ">
                            <div class="col-12 col-md-3 my-3">
                                <div class="d-flex justify-content-center justify-md-start">
                                    <div class="img-container user-icon">
                                        <!-- <img class="img-fluid"
                                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
                                            alt="" style="width: 100%; height: 100%;border-radius: 50%;"> -->
                                        <img src="../assets/img/user_icon.png" alt="">
                                    </div>
                                    <h5 class="align-self-center mx-3 host-name">
                                        {{ singleApt.user.name }}
                                        {{ singleApt.user.last_name }}
                                    </h5>
                                </div>
                            </div>

                            <div class="col-12 col-md-4 my-3 d-flex justify-content-center">
                                <div class="languages">
                                    <h4 class="text-center text-md-start host-info">
                                        Informazioni
                                    </h4>
                                    <ul class="fs-5 d-flex flex-column align-items-center d-md-inline">
                                        <li>
                                            <span class="span-info">Host dal: </span>{{
                                                singleApt.user.created_at.substr(0,
                                                    10) }}
                                        </li>
                                        <li>
                                            <span class="span-info">Identità: </span>verificata &check;
                                        </li>
                                        <li>
                                            <span class="span-info">Email: </span>{{ singleApt.user.email }}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-12 col-md-2 my-3 d-flex justify-content-center justify-md-start">
                                <div class="languages">
                                    <h4 class="host-info">
                                        Lingue
                                    </h4>
                                    <ul class="fs-5">
                                        <li>
                                            Italiano
                                        </li>
                                        <li>
                                            Inglese
                                        </li>
                                        <li>
                                            Cinese
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class=" col-12 col-md-3 my-3 d-flex flex-column align-items-center align-items-md-center">
                                <h4 class="host-info">
                                    Hai dubbi?
                                </h4>
                                <form action="">
                                    <div class=" col d-flex mb-3">
                                        <button type="button" class=" btn-contact" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                            Contatta l'host
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </template>
</template>

<style lang="scss" scoped>
.img-container {
    .row {
        max-height: 500px;

        .col-big-img {
            height: 500px;

            .card-body {
                height: 100%;
                margin: 0 2px;
            }
        }

        .col-img {
            height: 500px;

            .row {
                height: 100%;

                .col-6 {
                    height: calc(498px / 2 - 4px) !important;
                }
            }

            .card-body {
                height: 100% !important;
                margin: 0 2px;

                .img-fluid {
                    height: 100% !important;
                    width: 100% !important;
                    // object-position: center;
                }
            }



        }
    }


}

.descrizione-div {
    position: relative;

    img {
        position: absolute;
        width: 200px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        opacity: 0.6;
    }
}



.card {
    border: none !important;

    .card-body {
        img {
            border-radius: 10px;
            object-fit: cover;
        }
    }
}

.yes-img:hover {
    cursor: pointer;
    filter: brightness(85%)
}

.big-img:hover {
    filter: brightness(85%)
}

.loading-div {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.text-justify {
    text-align: justify;
}

h1 {
    color: #3461AB;
    font-weight: bold;
    ;
}

h3 {
    color: #3461AB;
    font-weight: bold;
}

ul {
    padding: 0;

    li {
        list-style: none;
    }

}

.card {
    height: 100%;
}

.my-col {
    width: calc(100% / 2);
}

.my-col:last-child {
    margin-left: 5px;
}


// .extra-img:nth-child(3),
// .extra-img:nth-child(4) {
//     margin-top: 8px;
// }


.extra-img-card {
    height: calc(100% / 2);
}

.extra-img-card:nth-child(1),
.extra-img-card:nth-child(2) {
    margin-right: 9px;
}

.extra-img-card:nth-child(3),
.extra-img-card:nth-child(4) {
    margin-left: 9px;
}

.extra-img-card:nth-child(2),
.extra-img-card:nth-child(4) {
    margin-top: 7px;
}

.extra-img-card:nth-child(1),
.extra-img-card:nth-child(3) {
    margin-bottom: 7px;
}

.card {
    background-color: transparent;

}

.apt-card-dx {
    .card.title {
        border-bottom: #00ABE8 !important;
    }

    background-color: #D2E6F8;

    .span-info {
        color: #888A8C;
        font-weight: bold;
    }

    li {
        font-size: 16px;
    }

    .card-info-apt {
        padding-top: 20px;
        padding-bottom: 10px;
    }

    .icon-div {
        display: inline-block;
        max-width: 40px;
        max-height: 40px;
        margin-right: 5px;

        img {
            width: 100%;
            height: 100%;
        }

    }

    // .services {
    //     h3 {
    //         border-bottom: 1px solid #00ABE8;
    //     }
    // }
}



.btn-contact {
    padding: 7px;
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

.btn-contact-top {
    font-size: 10px;
}

.host-card {
    border-radius: 10px;
    padding-top: 10px;
    background-color: #D2E6F8;

    .span-info {
        color: #888A8C;
        font-weight: bold;
    }

    h5 {
        margin-bottom: 0 !important;
    }
}

.host-info {
    color: #3461AB;
    font-weight: bold;
}

.host-name {
    font-weight: bold;
    color: #3461AB;
}

.user-icon {
    max-width: 50px;
    max-height: 50px;

    img {
        width: 100%;
        height: 100%;
    }
}


@media screen and (min-width: 375px) and (max-width: 600px) {
    .img-container .row .col-big-img {
        height: auto;
    }

}
</style>