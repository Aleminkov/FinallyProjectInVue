<template>
  <h3>{{ msg }}</h3>
  <form @submit.prevent>
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
      } else if (this.stars === "") {
        this.msg = "Вы не поставили звезду!";

        return false;
      }

      return true;
    },
    createNewReview() {
        
        if(!this.check()){
            return ;
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
        method: "GET",
        headers: head,
        body: JSON.stringify(data),
      });
    },
  },
};
</script>
