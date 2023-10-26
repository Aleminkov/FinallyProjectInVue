<template>
  <div v-if="!user" class="container">
    <form @submit.prevent>
      <h2>{{ msg }}</h2>
      <label for="">Логин:</label>
      <input type="text" v-model="login" placeholder="Введите имя" />
      <label for="">Пароль:</label>
      <input type="password" v-model="password" placeholder="Введите пароль" />
      <label for="">Email:</label>
      <input type="email" v-model="email" placeholder="Введите email" />
      <button @click="registration">Зарегестрироваться</button>
    </form>
    <p></p>
    <h4 style="text-align: center">
      Уже зарегестрировались?
      <router-link
        :to="{ name: 'LoginView' }"
        style="text-decoration: none; color: blue"
        >Войти</router-link
      >
    </h4>
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
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
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
            return (this.msg = res.message);
          }
          localStorage.setItem("user", this.login);
          this.login = "";
          this.password = "";
          this.email = "";

          location.reload();
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
      } else if (!this.validEmail(this.email)) {
        this.msg = "Уберите лишние символы с email";
        return false;
      }

      return true;
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
}

input {
  width: 400px;
  margin: auto;
  margin-top: 20px;
  background-color: bisque;
  border: 0px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 25px;
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
