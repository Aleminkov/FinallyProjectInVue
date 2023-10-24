<template>
  <div class="container">
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

      <router-link
        :to="{ name: 'LoginView' }"
        style="text-decoration: none; color: black"
        v-if="!user"
        >Войти</router-link
      >

      <button @click="logout" v-else>Выйти</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavigationView",
  data() {
    return {
      user: localStorage.getItem("user"),
    };
  },
  updated() {
    this.user = localStorage.getItem("user");
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      location.reload();
    },
  },
};
</script>

<style scoped>
.container{
  background-color: bisque;
  height: 70px;
  display: flex;
  justify-content: center;
  width: 100%;
}

nav {
  display: flex;
  color: black;
  justify-content: space-around;
  width: 100%;
  margin: auto;
  margin-top: 20px;
  background-color: bisque;
}

button {
  background-color: bisque;
  border: none;
}
</style>
