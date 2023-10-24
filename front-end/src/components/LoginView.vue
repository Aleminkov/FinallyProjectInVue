<template>
  <div v-if="!user" style="text-align: center">
    <form @submit.prevent>
      <h3>{{ msg }}</h3>

      <label for="">Email:</label>
      <input type="email" placeholder="Введите email" v-model="email" />

      <label for="">Пароль:</label>
      <input type="password" placeholder="Введите пароль" v-model="password" />

      <button @click="login">Войти</button>
    </form>

    <router-link
      :to="{ name: 'RegistrationView' }"
      style="
        text-decoration: none;
        color: blue;
        text-align: center;
        margin-top: 100px;
      "
      >Зарегестрироваться</router-link
    >
  </div>

  <div v-else>
    <h1>Вы уже вошли</h1>
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
          console.log(res);

          if (res.result === false) {
            return (this.msg = res.message);
          }
          localStorage.setItem("user", res.name);

          this.password = "";
          this.email = "";

          location.reload();
        });
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  width: 1000px;
  height: 200px
}
input {
  width: 400px;
  margin: auto;
  margin-top: 10px;
  background-color: bisque;
  border: 0px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
button {
  width: 200px;
  margin: auto;
  margin-top: 10px;
  border: 0px;
  background-color: bisque;
  border-top-right-radius: 80px;
  border-bottom-left-radius: 80px;
  border-top-left-radius: 80px;
  border-bottom-right-radius: 80px;
}
</style>
