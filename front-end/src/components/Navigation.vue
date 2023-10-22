<template>
  <nav>
    <router-link
      :to="{ name: 'Home' }"
      style="text-decoration: none; color: black"
      >Домашняя страница</router-link
    >
    <router-link
      :to="{ name: 'Chat' }"
      style="text-decoration: none; color: black"
      >Чат</router-link
    >
    <router-link
      :to="{ name: 'Review' }"
      style="text-decoration: none; color: black"
      >Отзывы</router-link
    >
    <div v-if="!user">
      <router-link
        :to="{ name: 'LoginView' }"
        style="text-decoration: none; color: black"
        >Войти</router-link
      >
    </div>
    <div v-else @click="logout">Выйти</div>
  </nav>
</template>

<script>
export default {
  name: "NavigationView",
  data() {
    return {
      user:''
    };
  },
  computed(){
    this.user = localStorage.getItem('user')
  },
  methods: {
    logout(){
      localStorage.removeItem('user')
    }
  },
};
</script>

<style scoped>
nav {
  display: flex;
  color: black;
  justify-content: space-around;
  width: 1200px;
  margin: auto;
  margin-top: 20px;
}
</style>
