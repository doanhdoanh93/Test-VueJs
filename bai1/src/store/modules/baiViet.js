const baiViet = {
  state: {
    itemBVs: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Quản lý bài viết",
        disabled: false,
        href: "/QuanLyBv",
      },
    ],
  },
  getters: {
    itemBVs: (state) => state.itemBVs,
  },
};

export default baiViet;
