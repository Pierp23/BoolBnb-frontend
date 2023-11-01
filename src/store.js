import { reactive } from 'vue';

export const store = reactive({
    apartments: null,
    totalApt: 0,
    lat: null,
    lon: null,
    city: null,
    range: 20,
    inputSearchBar: '',
    mapFlag : false,
    filterApt: null
})