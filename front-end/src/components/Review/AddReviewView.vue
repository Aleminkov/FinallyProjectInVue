<template>
  
  <form @submit.prevent class="container">
    <h3>{{ msg }}</h3>
    <textarea v-model="desc"> </textarea>

    <div class="rating-area">
      <input
        type="radio"
        id="star-5"
        name="rating"
        value="5"
        @click="setStar(5)"
      />

      <label for="star-5" title="Оценка «5»"></label>

      <input
        type="radio"
        id="star-4"
        name="rating"
        value="4"
        @click="setStar(4)"
      />

      <label for="star-4" title="Оценка «4»"></label>

      <input
        type="radio"
        id="star-3"
        name="rating"
        value="3"
        @click="setStar(3)"
      />

      <label for="star-3" title="Оценка «3»"></label>

      <input
        type="radio"
        id="star-2"
        name="rating"
        value="2"
        @click="setStar(2)"
      />

      <label for="star-2" title="Оценка «2»"></label>

      <input
        type="radio"
        id="star-1"
        name="rating"
        value="1"
        @click="setStar(1)"
      />

      <label for="star-1" title="Оценка «1»"></label>
    </div>

    <button className="buttonReview" @click="createNewReview">Добавить</button>
  </form>
</template>

<script>
export default {
  name: "AddReview",

  data() {
    return {
      stars: 0,
      desc: "",
      msg:'',
    };
  },
  methods: {
    setStar(number) {
      this.stars = number;
    },
    check() {
      if (this.stars === "" && this.desc === "") {
        this.msg = "Вы не поставили звезду и поле с описанием не должно быть пустым!";
        return false;
      } else if (this.desc === "") {
        this.msg = "Поле с описанием не должно быть пустым!";

        return false;
      } else if (this.stars === 0) {
        this.msg = "Вы не поставили звезду!";

        return false;
      }

      return true;
    },
    createNewReview() {
      if (!this.check()) {
        return;
      }
      const url = "http://localhost:4000/api/review";
      const head = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const data = {
        name: localStorage.getItem("user"),
        stars: this.stars,
        desc: this.desc,
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
          location.reload();
        });
    },
  },
};
</script>

<style scoped>
textarea{
  width: 500px;
  height: 100px;
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

.container{
  position: relative;
  width: 1000px;
	margin: auto;
  text-align: center;
}
.rating-area {
  overflow: hidden;

  width: 265px;

  margin: 0 auto;
}

.rating-area:not(:checked) > input {
  display: none;
}

.rating-area:not(:checked) > label {
  float: right;

  width: 42px;

  padding: 0;

  cursor: pointer;

  font-size: 32px;

  line-height: 32px;

  color: lightgrey;

  text-shadow: 1px 1px #bbb;
}

.rating-area:not(:checked) > label:before {
  content: "★";
}

.rating-area > input:checked ~ label {
  color: bisque;

  text-shadow: 1px 1px #c60;
}

.rating-area:not(:checked) > label:hover,
.rating-area:not(:checked) > label:hover ~ label {
  color: bisque;
}

.rating-area > input:checked + label:hover,
.rating-area > input:checked + label:hover ~ label,
.rating-area > input:checked ~ label:hover,
.rating-area > input:checked ~ label:hover ~ label,
.rating-area > label:hover ~ input:checked ~ label {
  color: bisque;

  text-shadow: 1px 1px goldenrod;
}

.rate-area > label:active {
  position: relative;
}
</style>
