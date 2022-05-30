<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <img
        class="mr-2"
        width="60"
        src="https://insight.lotusacademy.edu.vn/assets/images/logo.svg"
        alt="Logo"
      />
      <v-toolbar-title>
        <span style="font-size: 21px; font-weight: 600; color: #04a6e1">
          Lotus Academy aaaa
        </span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group :value="true" prepend-icon="mdi-apps">
          <template v-slot:activator>
            <v-list-item-title>Quản lý chung</v-list-item-title>
          </template>
          <v-list-item v-for="child in items_ql" :key="child.title">
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-5">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Trang chủ", icon: "mdi-home-circle", to: "/" },
        { title: "Quản lý tài khoản", icon: "mdi-account", to: "/QuanLyTk" },
        {
          title: "Quản lý học viên",
          icon: "mdi-human-capacity-decrease",
          to: "/QuanLyHv",
        },
        {
          title: "Quản lý khóa học",
          icon: "mdi-book-open-variant",
          to: "/QuanLyKh",
        },

        { title: "Quản lý bài viết", icon: "mdi-lead-pencil", to: "/QuanLyBv" },
      ],
      items_ql: [
        { title: "Loại bài viết" },
        { title: "Chủ đề" },
        { title: "Loại khóa học" },
        { title: "Tình trạng học" },
        { to: "/QuanLyTk" },
      ],
      right: null,
    };
  },
};
</script>
