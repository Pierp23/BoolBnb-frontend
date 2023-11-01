<script >
import { store } from "../store";
import axios from "axios";
export default {
    data() {
        return {
            store,
            data: {
                numberOfBeds: null,
                numberOfRooms: null,
                price: null,
                selectedServices: [],
                lat: store.lat,
                lon: store.lon,
                radius: store.range
            },
            services: [],
        }
    },
    methods: {
        getServices() {
            this.aptLoading = true;
            axios
                .get("http://127.0.0.1:8000/api/service")
                .then((res) => {
                    this.services = res.data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        searchWithFilters() {
            console.log(this.data);
            this.aptLoading = true
            axios.post('http://127.0.0.1:8000/api/filterApt', this.data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    this.store.apartments = res.data.results.data
                    this.store.totalApt = res.data.results.length
                    console.log('filter', res.data.results.data)
                    console.log(this.store, 'ciaooooooooooooooooooo')
                })
                .catch(err => {
                    console.log(err)
                })
        },

    },
    created() {
        this.getServices();
    },
};
</script>

<template>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Ricerca Avanzata</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="d-flex align-items-center">
                                <div class="mb-4 col-12">
                                    <label for="exampleInputEmail1" class="form-label">N. letti</label>
                                    <input type="number" class="form-control" id="name" min="0" aria-describedby="emailHelp"
                                        v-model="data.numberOfBeds">
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="mb-4 col-12">
                                    <label for="exampleInputEmail1" class="form-label">N. stanze</label>
                                    <input type="number" class="form-control" id="name" min="0" aria-describedby="emailHelp"
                                        v-model="data.numberOfRooms">
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="mb-4 col-12">
                                    <label for="exampleInputEmail1" class="form-label">Prezzo</label>
                                    <input type="number" class="form-control" min="0" id="name" aria-describedby="emailHelp"
                                        v-model="data.price">
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">Servizi</label>
                            <div class="d-flex flex-column flex-wrap">
                                <div class="check-box-services" v-for="(serv, i) in services" :key="i">
                                    <label :for="'service' + i" class="check-services me-2">{{ serv.name }}</label>
                                    <input class="me-4 mb-2 check-box-services-input" type="checkbox" :id="'service' + i"
                                        :value="serv.id" v-model="data.selectedServices">
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
                    <button type="button" @click="searchWithFilters" data-bs-dismiss="modal" class="btn-contact">
                        Cerca
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main";

label:not(.check-services) {
    color: #3461AB;
    font-weight: bold;
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
