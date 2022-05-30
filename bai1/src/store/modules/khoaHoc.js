import axios from "axios";
const khoaHoc = {
  state: {
    dialogKH: false,
    dialogKHDelete: false,
    editedIndexKH: -1,
    itemKHs: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Quản lý khóa học",
        disabled: false,
        href: "/QuanLyKh",
      },
    ],
    headerKHs: [
      { text: "Tên khóa học", value: "khoahoc" },
      { text: "Thời gian học", value: "thoigian" },
      { text: "Học phí", value: "hocphi" },
      { text: "Số học viên", value: "hocvien" },
      { text: "Số lượng môn", value: "soluong" },
      { text: "Loại khóa học", value: "loai" },
      { text: "Thao tác", value: "thaotac", sortable: false },
    ],
    khoahocs: [],
    editedItemKH: {
      khoahoc: "",
      thoigian: "",
      hocphi: "",
      hocvien: "",
      soluong: "",
      loai: "",
    },
    defaultItemKH: {
      khoahoc: "",
      thoigian: "",
      hocphi: "",
      hocvien: "",
      soluong: "",
      loai: "",
    },
  },
  getters: {
    dialogKH: (state) => state.dialogKH,
    dialogKHDelete: (state) => state.dialogKHDelete,
    editedIndexKH: (state) => state.editedIndexKH,
    khoahocs: (state) => state.khoahocs,
    itemKHs: (state) => state.itemKHs,
    headerKHs: (state) => state.headerKHs,
    editedItemKH: (state) => state.editedItemKH,
    defaultItemKH: (state) => state.defaultItemKH,
    formTitleKH: (state) =>
      state.editedIndexKH === -1 ? "Cập nhật khóa học" : "Sửa khóa học",
  },
  mutations: {
    // KHOI_TAOKH(state) {
    //   state.khoahocs = [];
    // },
    EDIT_ITEMKH(state, id) {
      state.editedIndexKH = state.khoahocs.indexOf(id);
      state.editedItemKH = Object.assign({}, id);
      state.dialogKH = true;
    },
    DELETE_ITEMKH(state, id) {
      state.editedIndexKH = state.khoahocs.indexOf(id);
      state.editedItemKH = Object.assign({}, id);
      state.dialogKHDelete = true;
    },
    DELELE_ITEMKH_CONFIRM(state) {
      state.khoahocs.splice(state.editedIndexKH, 1);
      state.dialogKH = false;
      state.dialogKHDelete = false;
    },
    CLOSEKH(state) {
      state.dialogKH = false;
      state.editedIndexKH = -1;
      state.editedItemKH = Object.assign({}, state.defaultItemKH);
      // state.$nextTick(() => {
      //   state.editedItemKH = Object.assign({}, state.defaultItemKH);
      //   state.editedIndexKH = -1;
      // });
    },
    SAVEKH(state) {
      if (state.editedIndexKH > -1) {
        Object.assign(state.khoahocs[state.editedIndexKH], state.editedItemKH);
      } else {
        state.khoahocs.push(state.editedItemKH);
      }
      state.dialogKH = false;
      state.editedIndexKH = -1;
    },
    CLOSEDELETEKH(state) {
      state.dialogKHDelete = false;
      state.editedIndexKH = -1;
      state.editedItemKH = Object.assign({}, state.defaultItemKH);
      // state.$nextTick(() => {
      //   state.editedItemKH = Object.assign({}, state.defaultItemKH);
      //   state.editedIndexKH = -1;
      // });
    },
    CHANGEKH(state) {
      state.dialogKH = !state.dialogKH;
    },
    SET_KHOAHOCS(state, khoahocs) {
      state.khoahocs = khoahocs;
    },
  },
  actions: {
    async getKhoahocs({ commit }) {
      try {
        const response = await axios.get(`http://localhost:3000/khoahocs`);
        commit("SET_KHOAHOCS", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    changeKH({ commit }) {
      commit("CHANGEKH");
    },
    closedeleteKH({ commit }) {
      commit("CLOSEDELETEKH");
    },
    saveKH({ commit }) {
      commit("SAVEKH");
    },
    closeKH({ commit }) {
      commit("CLOSEKH");
    },
    delete_itemKH_confirm({ commit }) {
      commit("DELELE_ITEMKH_CONFIRM");
    },
    delete_itemKH({ commit }, id) {
      commit("DELETE_ITEMKH", id);
    },
    edit_itemKH({ commit }, id) {
      commit("EDIT_ITEMKH", id);
    },
    // khoitaoKH({ commit }) {
    //   commit("KHOI_TAOKH");
    // },
  },
};

export default khoaHoc;
