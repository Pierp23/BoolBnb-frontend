<script>
import tt from '@tomtom-international/web-sdk-maps';
import { store } from '../store';

export default {
    name: 'MapSingle',

    data() {
        return {
            store,
        };
    },
    watch: {
        'store.lon': 'updateMap',
        'store.lat': 'updateMap',
        'store.apartments': 'updateMap',
        },
    methods: {
        getSignleMap() {
            let map = null;

            map = tt.map({
                key: 'KEiNGuhsySt5PgvkmCw7C9Sb5vGdacR6',
                container: 'map',
                center: [this.store.lon, this.store.lat],
                zoom: 15,
                radius: 20000,
            });

            new tt.Marker().setLngLat([this.store.lon, this.store.lat]).addTo(map);
            for (let index = 0; index < this.store.apartments.length; index++) {
                new tt.Marker().setLngLat([this.store.apartments[index].lon, this.store.apartments[index].lat]).addTo(map);
            }

            
            map.addControl(new tt.NavigationControl());

            return map;
        },
        updateMap() {
            if (this.map) {
            this.map.remove();
            }

            this.map = this.getSignleMap();
  },
    },

    mounted() {
        this.getSignleMap();
        console.log('CICCIOOOOOO');
    },
}
</script>

<template>
    <div class="container mb-5 ">
        <div class="div-img-fly">
            <img src="../assets/img/fly.png" alt="">
        </div>
        <div class="row justify-content-center">
            <div class="col-10">
                <div id="map" class="map shadow-lg p-3 mb-5 bg-white"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    position: relative;
}

.map {
    width: 100%;
    height: 500px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-top: 20px;
    z-index: 10;
}

.div-img-fly {
    img {
        z-index: 0;
        position: absolute;
        width: 110%;
        top: 40px;
        left: -78px;
        object-fit: cover;
    }
}
</style>