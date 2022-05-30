import axios from "axios";
const hocVien = {
  state: {
    dialogHV: false,
    dialogHVDelete: false,
    itemHVs: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Quản lý học viên",
        disabled: false,
        href: "/QuanLyHV",
      },
    ],
    headerHVs: [
      { text: "Họ và tên", value: "hoten" },
      { text: "Ngày sinh", value: "ngaysinh" },
      { text: "Ngày đăng ký", value: "ngaydangky" },
      { text: "Số điện thoại", value: "dienthoai" },
      { text: "Tên khóa học", value: "khoahoc" },
      { text: "Tình trạng học", value: "tinhtrang" },
      { text: "Thao tác", value: "thaotac", sortable: false },
    ],
    diachi_tinh: ["Hà Nội"],
    diachi_huyen: ["Thanh Xuân"],
    diachi_xa: ["Khương Đình"],
    tinhtranghoc: ["Chờ duyệt", "Đang học", "Học xong", "Chưa hoàn thành"],
    hocviens: [],
    chonkhoahoc: ["Toán", "Lý", "Hóa"],
    editedIndexHV: -1,
    editedItemHV: {
      hoten: "",
      ngaysinh: "",
      ngaydangky: "",
      dienthoai: "",
      khoahoc: "",
      tinhtrang: "",
    },
    defaultItemHV: {
      hoten: "",
      ngaysinh: "",
      ngaydangky: "",
      dienthoai: "",
      khoahoc: "",
      tinhtrang: "",
    },
  },
  getters: {
    tinhtranghoc: (state) => state.tinhtranghoc,
    diachi_tinh: (state) => state.diachi_tinh,
    diachi_huyen: (state) => state.diachi_huyen,
    diachi_xa: (state) => state.diachi_xa,
    chonkhoahoc: (state) => state.chonkhoahoc,
    hocviens: (state) => state.hocviens,
    dialogHV: (state) => state.dialogHV,
    dialogHVDelete: (state) => state.dialogHVDelete,
    itemHVs: (state) => state.itemHVs,
    headerHVs: (state) => state.headerHVs,
    editedIndexHV: (state) => state.editedIndexHV,
    editedItemHV: (state) => state.editedItemHV,
    defaultItemHV: (state) => state.defaultItemHV,
    formTitleHV: (state) =>
      state.editedIndexHV === -1 ? "Cập nhật học viên" : "Sửa học viên",
  },
  mutations: {
    EDIT_ITEMHV(state, id) {
      state.editedIndexHV = state.hocviens.indexOf(id);
      state.editedItemHV = Object.assign({}, id);
      state.dialogHV = true;
    },
    DELETE_ITEMHV(state, id) {
      state.editedIndexHV = state.hocviens.indexOf(id);
      state.editedItemHV = Object.assign({}, id);
      state.dialogHVDelete = true;
    },
    DELELE_ITEMHV_CONFIRM(state) {
      state.hocviens.splice(state.editedIndexHV, 1);
      state.dialogHV = false;
      state.dialogHVDelete = false;
    },
    CLOSEHV(state) {
      state.dialogHV = false;
      state.editedIndexHV = -1;
      state.editedItemHV = Object.assign({}, state.defaultItemHV);
      // state.$nextTick(() => {
      //   state.editedItemHV = Object.assign({}, state.defaultItemHV);
      //   state.editedIndexHV = -1;
      // });
    },
    SAVEHV(state) {
      if (state.editedIndexHV > -1) {
        Object.assign(state.hocviens[state.editedIndexHV], state.editedItemHV);
      } else {
        state.hocviens.push(state.editedItemHV);
      }
      state.dialogHV = false;
      state.editedIndexHV = -1;
    },
    CLOSEDELETEHV(state) {
      state.dialogHVDelete = false;
      state.editedIndexHV = -1;
      state.editedItemHV = Object.assign({}, state.defaultItemHV);
      // state.$nextTick(() => {
      //   state.editedItemHV = Object.assign({}, state.defaultItemHV);
      //   state.editedIndexHV = -1;
      // });
    },
    CHANGEHV(state) {
      state.dialogHV = !state.dialogHV;
    },
    GETCOLOR(state, id) {
      console.log(state, id, state.hocviens);
      if (state.tinhtranghoc === "Chờ duyệt") return "grey";
      else if (state.tinhtranghoc === "Đang học") return "green";
      else if (state.tinhtranghoc === "Học xong") return "blue";
      else return "red";
    },
    SET_HOCVIENS(state, hocviens) {
      state.hocviens = hocviens;
    },
  },
  actions: {
    async getHocviens({ commit }) {
      try {
        const response = await axios.get(`http://localhost:3000/hocviens`);
        commit("SET_HOCVIENS", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    getColor({ commit }) {
      commit("GETCOLOR");
    },
    changeHV({ commit }) {
      commit("CHANGEHV");
      console.log(commit);
    },
    closedeleteHV({ commit }) {
      commit("CLOSEDELETEHV");
    },
    saveHV({ commit }) {
      commit("SAVEHV");
    },
    closeHV({ commit }) {
      commit("CLOSEHV");
    },
    delete_itemHV_confirm({ commit }) {
      commit("DELELE_ITEMHV_CONFIRM");
    },
    delete_itemHV({ commit }, id) {
      commit("DELETE_ITEMHV", id);
    },
    edit_itemHV({ commit }, id) {
      commit("EDIT_ITEMHV", id);
    },
    khoitaoHV({ commit }) {
      commit("KHOI_TAOHV");
    },
  },
};

export default hocVien;
