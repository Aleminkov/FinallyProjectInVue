<template>
  <div v-if="user" >
    <AddReviewView></AddReviewView>
  </div>
  <div v-else style="text-align:center;"><h2>Чтобы написать отзыв надо войти!</h2></div>
  <UsersReview></UsersReview>
</template>

<script>
import AddReviewView from './Review/AddReviewView.vue';
import UsersReview from "./Review/UsersReview.vue";

export default {
  name: "ReviewView",
  components: {
    AddReviewView,
    UsersReview,
  },
  data() {
    return {
      user: localStorage.getItem('user'),
    };
  },
};
</script>
