import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/HomeView";
import ChatView from "./components/ChatView";
import ReviewView from "./components/ReviewView";
import AuthView from "./components/AuthView";
import LoginView from "./components/LoginView";
import RegistrationView from "./components/RegistrationView";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/chat",
    name: "Chat",
    component: ChatView,
  },
  {
    path: "/review",
    name: "Review",
    component: ReviewView,
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthView,
    children: [
      {
        path: "/login",
        name: "LoginView",
        component: LoginView,
      },
      {
        path: "/registration",
        name: "RegistrationView",
        component: RegistrationView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
