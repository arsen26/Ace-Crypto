// router.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DetailsCrypto from "@/views/DetailsCrypto.vue";

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/cryptocurrency-details/:id",
    name: "DetailsCrypto",
    component: DetailsCrypto,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
