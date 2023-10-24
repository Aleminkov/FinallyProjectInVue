<template>
  <div style="text-align:center;">
    <div v-if="!loadingReview">Загрузка...</div>
    <div v-else>
      <div v-for="el in arrReviews" :key="el.id" class="container">
        <div class="mainReview">
          <div class="nameUser">{{ el.id }}. Пользователь: {{ el.name }}</div>
          <div class="parentStar">
            <div v-if="el.stars === 5" class="star">★★★★★</div>
            <div v-if="el.stars === 4" class="star">★★★★</div>
            <div v-if="el.stars === 3" class="star">★★★</div>
            <div v-if="el.stars === 2" class="star">★★</div>
            <div v-if="el.stars === 1" class="star">★</div>
          </div>
        </div>
        <div class="desc">
          <strong>{{ el.text }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersReview",
  data() {
    return {
      loadingReview: false,
      arrReviews: [],
    };
  },
  beforeCreate() {
    const url = "http://localhost:4000/api/review";
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
        this.loadingReview = true;
        console.log(res);
        this.arrReviews = res;
      })

      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.star {
  color: bisque;
  text-shadow: 1px 1px black;
  font-size: 32px;
}

.container {
  position: relative;
  height: 140px;
  width: 1000px;
  margin: auto;
  margin-top: 10px;

}

.parentStar {
  height: 40px;
  margin: auto;
}

.desc {
  position: relative;
}
</style>
