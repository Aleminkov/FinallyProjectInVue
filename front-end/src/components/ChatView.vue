<template>
  <div class="container">
    <div v-if="isLoading">
      <strong>Загрузка...</strong>
    </div>
    <div v-else class="containerMessage">
      <div v-for="message in messages" :key="message.id">
        {{ message.name }}: {{ message.messages }}
        <img
          src="https://cdn-icons-png.flaticon.com/512/2101/2101345.png"
          alt=""
          style="width: 15px"
          v-show="user"
          @click="removeMessage(message.id)"
        />
      </div>
    </div>

    <div v-if="user" class="createMessage">
      <h5>{{ err }}</h5>
      <div>
        <input type="text" v-model="textMessage" placeholder="Введите сообщение"/>
        <button @click="postNewMessage">Отправить сообщение</button>
      </div>
    </div>

    <div v-else class="dontAuth" style="text-align: center;">
      <h3>Вы не вошли!</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
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
    removeMessage(id) {
      const url = "http://localhost:4000/api/chat/deleteMessage";
      const head = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const data = {
        id,
      };

      fetch(url, {
        method: "DELETE",
        headers: head,
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.result === false) {
            return;
          }
          this.messages = this.messages.filter((el) => el.id !== id);
        });
    },
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

          this.err = ''

          this.textMessage = "";
        });
    },
  },
};
</script>


<style scoped>
.container{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.containerMessage{
    background-color: blanchedalmond;
    width: 500px;
    height: 500px;
    margin: auto;
    border: 3px solid black;
    overflow:auto;
}

.createMessage{
    margin: auto;
}

button {
    margin: auto;
    margin-top: 10px;
    border: 0px;
    background-color: bisque;
    border-top-right-radius: 80px;
    border-bottom-left-radius: 80px;
    border-top-left-radius: 80px;
    border-bottom-right-radius: 80px;
  }

  input{
    margin: auto;
    margin-top: 10px;
    background-color: bisque;
    border: 0px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    border-bottom-right-radius: 20px;
    margin-right: 10px;
    width: 350px;
    height: 40px;
  }
</style>