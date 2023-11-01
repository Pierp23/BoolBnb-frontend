<script >
import { store } from "../store";
import axios from "axios";
export default {
    data() {
        return {
            data: {
                name: '',
                object: '',
                content: '',
                email: '',
                apartmentId: '',
            },
            messageSent: false,
            failedMessage: false
        }
    },
    methods: {
        sendMessage() {
            this.data.apartmentId = this.$route.params.id,
                axios.post('http://127.0.0.1:8000/api/message',
                    this.data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    if (res.data.result) {
                        this.messageSent = true
                    }

                }).catch((err) => {
                    console.log(err);
                    if (err) {
                        this.failedMessage = true
                    }
                });
        }
    },
    created() {
    },
};
</script>

<template>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">


                <template v-if="!messageSent && !failedMessage">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Invia un messaggio all'host</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post">
                            <div class="form-group mb-4">
                                <label for="exampleFormControlInput1">Nome <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nome"
                                    v-model="data.name" required>
                            </div>
                            <div class="form-group mb-4">
                                <label for="exampleFormControlInput1">Oggetto</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Oggetto"
                                    v-model="data.object">
                            </div>

                            <div class="form-group mb-4">
                                <label for="exampleFormControlInput1">Contenuto <span class="text-danger">*</span></label>
                                <textarea class="form-control" id="exampleFormControlInput1" placeholder="Contenuto"
                                    v-model="data.content" rows="5" required></textarea>
                            </div>

                            <div class="form-group mb-4">
                                <label for="exampleFormControlInput1">Email address <span
                                        class="text-danger">*</span></label>
                                <input type="email" class="form-control" id="exampleFormControlInput1"
                                    placeholder="name@example.com" v-model="data.email" required>
                            </div>

                            <div class="modal-footer">
                                <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
                                <button type="button" @click="sendMessage" class="btn-contact">Invia messaggio</button>
                            </div>

                        </form>
                    </div>
                </template>

                <template v-if="messageSent">
                    <div class="messageSent">
                        <div class="check-div">
                            <img src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png" alt="">
                        </div>
                        <h2>
                            Messaggio inviato correttamente
                        </h2>
                    </div>

                </template>

                <template v-if="failedMessage">
                    <div class="messageSent">
                        <div class="check-div">
                            <img src="https://cdn-icons-png.flaticon.com/512/5974/5974771.png" alt="">
                        </div>
                        <h2>
                            Errore: messaggio NON inviato
                        </h2>
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main";

h1 {
    color: #3461AB;
    font-weight: bold;
}

label {
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
