import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/QuanLyTk",
    name: "QuanLyTk",
    component: () => import("../components/QuanLyTk.vue"),
  },
  {
    path: "/QuanLyHv",
    name: "QuanLyHv",
    component: () => import("../components/QuanLyHv.vue"),
  },
  {
    path: "/QuanLyKh",
    name: "QuanLyKh",
    component: () => import("../components/QuanLyKh.vue"),
  },
  {
    path: "/QuanLyBv",
    name: "QuanLyBv",
    component: () => import("../components/QuanLyBv.vue"),
  },
  {
    path: "/QuanLyc",
    name: "QuanLyc",
    component: () => import("../components/QuanLyc.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
