<template>
  <div v-if="!user">
    <form @submit.prevent>
      <h3>{{ msg }}</h3>
      <input type="email" placeholder="Введите email" v-model="email" />

      <input type="password" placeholder="Введите пароль" v-model="password" />

      <button @click="login">Войти</button>
    </form>

    <router-link :to="{ name: 'RegistrationView' }"
      >Зарегестрироваться</router-link
    >
  </div>

  <div v-else>
    <h1>Вы вошли</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      msg: "",
      user: "",
    };
  },
  computed() {
    this.user = localStorage.getItem("user");
  },
  methods: {
    check() {
      if (this.email === "" && this.password === "") {
        this.msg = "Поле с email и паролем не должно быть пустым!";

        return false;
      } else if (this.email === "") {
        this.msg = "Поле с email не должно быть пустым!";

        return false;
      } else if (this.password === "") {
        this.msg = "Поле с паролем не должно быть пустым!";

        return false;
      } else if (
        this.email.indexOf("@") === -1 ||
        this.email.indexOf(".com") === -1
      ) {
        this.msg = "У вас введен не email!";
        return false;
      }

      return true;
    },
    login() {
      const noEmpty = this.check();
      if (noEmpty === false) {
        return;
      }

      const url = "http://localhost:4000/api/user/login";

      const data = {
        email: this.email,
        password: this.password,
      };
      const head = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            return (this.msg = res.message);
          }
        });
    },
  },
};
</script>
