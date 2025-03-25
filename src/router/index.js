// router.js
import { createRouter, createWebHistory } from "vue-router";

const DetailsCrypto = () => import("@/views/DetailsCrypto.vue");
const HomeView = () => import("@/views/HomeView.vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/Home",
      component: HomeView,
      name: "Home",
    },   
    {
      path: "/cryptocurrency-details/form",
      component: DetailsCrypto,
      name: "DetailsCrypto",
    }
    
  ],
});

export default router;
