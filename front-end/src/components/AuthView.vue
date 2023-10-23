<template>

  <router-view></router-view>

</template>

<script>
export default {
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    this.user = localStorage.getItem("user");
  },
  beforeCreate() {
    if (localStorage.getItem("user")) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
