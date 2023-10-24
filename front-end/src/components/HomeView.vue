<template>
  <div class="container">
    <div>
      <div>
        <h1>Aleminkov(Алексей)</h1>
        <h2>Я изучаю Javascript и знаю немного Python. :)</h2>
      </div>
    </div>

    <div>
      <h1>GitHub</h1>
      <div>
        <img
          src="../img/ava.jpg"
          alt=""
          style="width: 150px; height: 150px; border-radius: 100px"
        />

        <div class="containerRepositAndFollowers">
          <div>
            <h3>Репозитории</h3>
            <h3>{{ reposit }}</h3>
          </div>
          <div>
            <h3>Фоловеры</h3>

            <h3>{{ follower }}</h3>
          </div>
        </div>

        <a href="https://github.com/Aleminkov"
          ><h4><strong>Узнать больше о GitHub</strong></h4></a
        >

        <div style="margin-top: 40px;">
          <h3>Связь со мной:</h3>

          <nav class="iconsContainer">
            <a href="https://vk.com/aleminkov" style="width: 100px">
              <img
                src="../img/VK_Compact_Logo_(2021-present).svg.png"
                alt=""
                style="width: 100px"
            /></a>
            <a href="https://t.me/Aleminkov_06" style="width: 100px">
              <img
                src="../img/Telegram_2019_Logo.svg.webp"
                alt=""
                style="width: 100px"
            /></a>
            <a
              href="https://steamcommunity.com/id/Aleminkov/"
              style="width: 100px"
            >
              <img
                src="../img/Steam_icon_logo.svg.png"
                alt=""
                style="width: 100px"
              />
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reposit: "",
      follower: "",
    };
  },
  mounted() {
    const url = "https://api.github.com/users/Aleminkov";

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
        this.reposit = res.public_repos;
        this.follower = res.followers;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.iconsContainer {
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}

a {
  text-decoration: none;
  color: black;
}
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.containerRepositAndFollowers{
  display: flex;
  text-align: center;
  justify-content: space-evenly;
}
</style>
