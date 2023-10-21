<template>
  <NavigationView></NavigationView>
  <router-view></router-view>
</template>

<script>
import NavigationView from './components/Navigation.vue';

export default {
    name: "App",
    components: { NavigationView }
};
</script>

<style></style>
