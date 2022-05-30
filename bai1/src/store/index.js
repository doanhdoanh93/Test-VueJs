import Vue from "vue";
import Vuex from "vuex";
import khoaHoc from "./modules/khoaHoc";
import hocVien from "./modules/hocVien";
import baiViet from "./modules/baiViet";
import taiKhoan from "./modules/taiKhoan";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
    ],
  },
  getters: {},
  actions: {},
  modules: {
    khoaHoc,
    hocVien,
    baiViet,
    taiKhoan,
  },
});
