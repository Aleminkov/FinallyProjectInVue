<template>
  <div>
    <div v-if="!loadingReview">Загрузка...</div>
    <div v-else>
      <div v-for="el in arrReviews" :key="el.id">
        <div>
          <div>{{ el.id }}. Пользователь: {{ el.name }}</div>
          <div>
            <div v-if="el.stars === 5">★★★★★</div>
            <div v-if="el.stars === 4">★★★★</div>
            <div v-if="el.stars === 3">★★★</div>
            <div v-if="el.stars === 2">★★</div>
            <div v-if="el.stars === 1">★</div>
          </div>
        </div>
        <div>
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
        this.loadingReview = true
        console.log(res);
        this.arrReviews = res
      })

      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
