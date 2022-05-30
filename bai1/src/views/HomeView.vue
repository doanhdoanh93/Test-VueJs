<template>
  <div
    class="d-flex justify-center mt-10 mb-10"
    style="width: 100% background-color: #fff"
  >
    <!-- <v-breadcrumbs :items="items" class="ps-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs> -->
    <!-- <h3>Home</h3>
    <v-img
      lazy-src="img-1.jpg"
      max-height="100%"
      max-width="100%"
      src="img-1.jpg"
    ></v-img> -->
    <div style="width: 40%; background-color: #fff">
      <h2 class="font-weight-bold text-center mt-10">Đăng nhập</h2>
      <v-divider class="mb-15"></v-divider>
      <v-card-text>
        <h4>Tên đăng nhập</h4>
        <v-text-field label="Tên đăng nhập" outlined></v-text-field>

        <h4>Mật khẩu</h4>
        <v-text-field
          outlined
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
          label="Mật khẩu"
        ></v-text-field>
        <v-btn block color="primary mb-5 mt-2" elevation="2" @click="changeHV()"
          >Đăng ký</v-btn
        >
        <v-btn block color="primary mb-10" elevation="2">Đăng nhập</v-btn>
      </v-card-text>
    </div>
    <v-dialog v-model="dialogHV" max-width="80%">
      <v-card>
        <v-card-title class="justify-center">
          <span class="text-h5">{{ formTitleHV }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <h4 class="font-weight-bold">
              <v-icon small>mdi-account</v-icon>Thông tin cá nhân
            </h4>
            <div class="d-flex">
              <v-img
                lazy-src="img-1.jpg"
                max-height="120"
                max-width="120"
                src="img-1.jpg"
              ></v-img>
              <div class="d-flex align-end ms-3">
                <v-btn color="primary" dark> Thêm ảnh</v-btn>
              </div>
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedItemHV.hoten"
                  label="* Họ tên"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="* Email" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedItemHV.ngaysinh"
                  label="* Ngày sinh"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedItemHV.dienthoai"
                  label="* Số điện thoại"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            <h4 class="font-weight-bold">
              <v-icon small>mdi-map-marker-radius</v-icon>Địa chỉ
            </h4>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="diachi_tinh"
                  label="Tỉnh / Thành phố:"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="diachi_huyen"
                  label="Quận / Huyện:"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select :items="diachi_xa" label="Phường / Xã:"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Số nhà:"></v-text-field>
              </v-col>
            </v-row>
            <h4 class="font-weight-bold">
              <v-icon small>mdi-book</v-icon>Khóa học
            </h4>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="chonkhoahoc"
                  v-model="editedItemHV.khoahoc"
                  label="Chọn khóa học"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <div class="d-flex justify-center pb-10">
          <v-btn color="blue" dark @click="closeHV"> Gửi thông tin </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      show1: false,
      show2: false,
      password: "",
      passwordAgain: "",
    };
  },

  computed: {
    ...mapState(["items"]),
    ...mapGetters([
      "formTitleHV",
      "itemHVs",
      "dialogHV",
      "dialogHVDelete",
      "headerHVs",
      "hocviens",
      "editedIndexHV",
      "editedItemHV",
      "defaultItemHV",
      "diachi_tinh",
      "diachi_huyen",
      "diachi_xa",
      "chonkhoahoc",
      "tinhtranghoc",
    ]),
  },

  watch: {
    dialogHV(val) {
      val || this.$store.dispatch("closeHV");
    },
  },

  methods: {
    ...mapActions([
      "changeHV",
      "edit_itemHV",
      "delete_itemHV",
      "delete_itemHV_confirm",
      "closeHV",
      "closedeleteHV",
      "saveHV",
      "khoitaoHV",
      "getcolorTinhtrang",
    ]),
  },
  getColor(val) {
    if (val === "Chờ duyệt") return "grey";
    else if (val === "Đang học") return "green";
    else if (val === "Học xong") return "blue";
    else return "red";
  },
};
</script>
