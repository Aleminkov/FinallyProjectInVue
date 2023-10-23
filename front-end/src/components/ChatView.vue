<template>
  <div>
    <div v-if="isLoading">
        <strong>Загрузка...</strong>
    </div>
    <div v-else>
      <div v-for="message in messages" :key="message.id">
        {{ message.name }}: {{ message.messages }}
      </div>
    </div>

    <div v-if="user">
      <h5>{{ err }}</h5>
      <div>
        <input type="text" v-model="textMessage" />
        <button @click="postNewMessage">Отправить сообщение</button>
      </div>
    </div>

    <div v-else>
      <h3>Вы не вошли!</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: "",
      textMessage: "",
      err: "",
      user: "",
      isLoading: true,
    };
  },
  created() {
    this.user = localStorage.getItem("user");

    const url = "http://localhost:4000/api/chat/getMessage";
    const head = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(url, {
      method: "GET",
      headers: head,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result === false) {
          return;
        }

        this.messages = res.messages;

        this.isLoading = false;

      });
  },
  methods: {
    check() {
      if (this.textMessage === "") {
        this.err = "Поле с сообщением не должно быть пустым!";

        return false;
      }

      return true;
    },
    postNewMessage() {
      if (this.check() === false) {
        return;
      }
      const url = "http://localhost:4000/api/chat/addMessage";

      const data = {
        name: localStorage.getItem("user"),
        message: this.textMessage,
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
          if (res.result === false) {
            return;
          }
          console.log(res);

          this.messages.push({
            id: new Date().getItem,
            name: this.user,
            messages: this.textMessage,
          });

          this.textMessage = "";
        });
    },
  },
};
</script>
