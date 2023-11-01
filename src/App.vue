<script >
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import MainComponent from './components/MainComponent.vue';


export default {
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent,
  }
}
</script>

<template>
  <HeaderComponent />

  <MainComponent />

  <FooterComponent />
</template>

<style lang="scss" scoped>
@use "assets/scss/main";
</style>
