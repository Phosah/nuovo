import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Category from "../views/Category.vue";
import singleProduct from "../views/singleProduct.vue";
import Checkout from "../views/Checkout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/category/:category",
      name: "Category",
      component: Category,
    },
    // {
    //   path: "/product",
    //   name: "Product",
    //   component: Product,
    // },
    {
      path: "/products/:id",
      component: () => import("@/views/singleProduct.vue"),
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: Checkout,
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
