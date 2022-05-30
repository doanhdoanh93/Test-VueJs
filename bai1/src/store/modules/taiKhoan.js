import axios from "axios";
const taiKhoan = {
  state: {
    dialogTK: false,
    dialogTKDelete: false,
    itemTKs: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Quản lý tài khoản",
        disabled: false,
        href: "/QuanLyTk",
      },
    ],
    headerTKs: [
      { text: "Tên người dùng", value: "ten" },
      { text: "Tài khoản", value: "taikhoan" },
      { text: "Quyền", value: "quyen" },
      { text: "Thao tác", value: "thaotac", sortable: false },
    ],
    chonquyen: ["Admin", "Quản lý học viên", "Cộng tác viên"],
    taikhoans: [],
    editedIndexTK: -1,
    editedItemTK: {
      ten: "",
      taikhoan: "",
      quyen: "",
    },
    defaultItemTK: {
      ten: "",
      taikhoan: "",
      quyen: "",
    },
  },
  getters: {
    chonquyen: (state) => state.chonquyen,
    taikhoans: (state) => state.taikhoans,
    dialogTK: (state) => state.dialogTK,
    dialogTKDelete: (state) => state.dialogTKDelete,
    itemTKs: (state) => state.itemTKs,
    headerTKs: (state) => state.headerTKs,
    editedIndexTK: (state) => state.editedIndexTK,
    editedItemTK: (state) => state.editedItemTK,
    defaultItemTK: (state) => state.defaultItemTK,
    formTitleTK: (state) =>
      state.editedIndexTK === -1 ? "Đăng ký tài khoản" : "Sửa tài khoản",
  },
  mutations: {
    EDIT_ITEMTK(state, id) {
      state.editedIndexTK = state.taikhoans.indexOf(id);
      state.editedItemTK = Object.assign({}, id);
      state.dialogTK = true;
    },
    DELETE_ITEMTK(state, id) {
      state.editedIndexTK = state.taikhoans.indexOf(id);
      state.editedItemTK = Object.assign({}, id);
      state.dialogTKDelete = true;
    },
    DELELE_ITEMTK_CONFIRM(state) {
      state.taikhoans.splice(state.editedIndexTK, 1);
      state.dialogTK = false;
      state.dialogTKDelete = false;
    },
    CLOSETK(state) {
      state.dialogTK = false;
      state.editedIndexTK = -1;
      state.editedItemTK = Object.assign({}, state.defaultItemTK);
      // state.$nextTick(() => {
      //   state.editedItemTK = Object.assign({}, state.defaultItemTK);
      //   state.editedIndexTK = -1;
      // });
    },
    SAVETK(state) {
      if (state.editedIndexTK > -1) {
        Object.assign(state.taikhoans[state.editedIndexTK], state.editedItemTK);
      } else {
        state.taikhoans.push(state.editedItemTK);
      }
      state.dialogTK = false;
      state.editedIndexTK = -1;
    },
    CLOSEDELETETK(state) {
      state.dialogTKDelete = false;
      state.editedIndexTK = -1;
      state.editedItemTK = Object.assign({}, state.defaultItemTK);
      // state.$nextTick(() => {
      //   state.editedItemTK = Object.assign({}, state.defaultItemTK);
      //   state.editedIndexTK = -1;
      // });
    },
    CHANGETK(state) {
      state.dialogTK = !state.dialogTK;
    },
    SET_TAIKHOANS(state, taikhoans) {
      state.taikhoans = taikhoans;
    },
  },
  actions: {
    async getTaikhoans({ commit }) {
      try {
        const response = await axios.get(`http://localhost:3000/taikhoans`);
        commit("SET_TAIKHOANS", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    changeTK({ commit }) {
      commit("CHANGETK");
    },
    closedeleteTK({ commit }) {
      commit("CLOSEDELETETK");
    },
    saveTK({ commit }) {
      commit("SAVETK");
    },
    closeTK({ commit }) {
      commit("CLOSETK");
    },
    delete_itemTK_confirm({ commit }) {
      commit("DELELE_ITEMTK_CONFIRM");
    },
    delete_itemTK({ commit }, id) {
      commit("DELETE_ITEMTK", id);
    },
    edit_itemTK({ commit }, id) {
      commit("EDIT_ITEMTK", id);
    },
    khoitaoTK({ commit }) {
      commit("KHOI_TAOTK");
    },
  },
};

export default taiKhoan;
