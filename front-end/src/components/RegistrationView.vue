<template>
  <div v-if="!user">
    <form @submit.prevent>
      <h2>{{ msg }}</h2>
      <input type="text" v-model="login" placeholder="Введите имя" />
      <input type="password" v-model="password" placeholder="Введите пароль" />
      <input type="email" v-model="email" placeholder="Введите email" />
      <button @click="registration">Зарегестрироваться</button>
    </form>
    <p></p>
    <h5>
      Уже зарегестрировались?
      <router-link :to="{ name: 'LoginView' }">Войти</router-link>
    </h5>
  </div>

  <div v-else>
    <h1>Вы уже вошли</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
      email: "",
      msg: "",
      user: "",
    };
  },
  computed() {
    this.user = localStorage.getItem("user");
  },
  methods: {
    registration() {
      const checkInput = this.check();
      if (!checkInput) {
        return;
      }
      const url = "http://localhost:4000/api/user/registration";

      const data = {
        name: this.login,
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
          if (!res.result) {
            console.log(res);
            return (this.msg = res.message);
          }
          localStorage.setItem("user", this.login);
          this.login = "";
          this.password = "";
          this.email = "";

          this.$router.push({ name: "Home" });
        });
    },
    check() {
      if (this.email === "" && this.password === "" && this.login === "") {
        this.msg = "Поле с именем, email и паролем не должно быть пустым!";

        return false;
      } else if (this.login === "") {
        this.msg = "Поле с именем не должно быть пустым!";

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
  },
};
</script>
