<template>
  <div>
    <v-breadcrumbs :items="itemHVs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-data-table
      :headers="headerHVs"
      :items="hocviens"
      :search="search"
      :sort-by="[
        'hoten',
        'ngaysinh',
        'ngaydangky',
        'dienthoai',
        'khoahoc',
        'tinhtrang',
      ]"
      class="elevation-1 mb-5"
    >
      <template v-slot:top>
        <v-toolbar flat class="flex-end mt-5">
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            class="me-3 mt-5"
            solo
            label="Tìm kiếm"
          ></v-text-field>
          <!-- Thao tác thêm vs sửa khóa học -->
          <v-btn
            color="green darken-4"
            dark
            class="mb-2 ms-2"
            @click="changeHV()"
          >
            Thêm
          </v-btn>

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
                      <v-select
                        :items="diachi_xa"
                        label="Phường / Xã:"
                      ></v-select>
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
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItemHV.ngaydangky"
                        label="Ngày đăng ký"
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Ngày bắt đầu"
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Ngày kết thúc"
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="tinhtranghoc"
                        v-model="editedItemHV.tinhtrang"
                        label="Tình trạng học"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <div class="d-flex justify-center pb-10">
                <v-btn color="primary me-5" dark @click="saveHV"> Lưu </v-btn>
                <v-btn color="red" dark @click="closeHV"> Hủy </v-btn>
              </div>
            </v-card>
          </v-dialog>
          <!-- Thao tác xóa khóa học -->
          <v-dialog v-model="dialogHVDelete" max-width="500px">
            <v-card>
              <v-card-title class="d-flex justify-center">
                <h5 class="text-h5">
                  <v-icon color="red">mdi-alert-circle-outline</v-icon>
                  Bạn có chắc chắn muốn xóa?
                </h5>
                <p class="font-italic text-sm">(Hãy cân nhắc trước khi xóa)</p>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red me-5 " dark @click="closedeleteHV()"
                  >Cancel</v-btn
                >
                <v-btn color="blue" dark @click="delete_itemHV_confirm()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.tinhtrang`]="{ item }">
        <div>
          <p :class="getColor1(item.tinhtrang)">
            <v-icon :class="getColor1(item.tinhtrang)"
              >mdi-circle-medium</v-icon
            >
            {{ item.tinhtrang }}
          </p>
        </div>
      </template>

      <template v-slot:[`item.thaotac`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="edit_itemHV(item)"
          color="green"
          outline
        >
          mdi-pencil
        </v-icon>
        <v-icon small @click="delete_itemHV(item)" color="red">
          mdi-delete
        </v-icon>
      </template>

      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="khoitaoHV"> Làm mới </v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: mapGetters([
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

  watch: {
    dialogHV(val) {
      val || this.$store.dispatch("closeHV");
    },
    dialogHVDelete(val) {
      val || this.$store.dispatch("closedeleteHV");
    },
  },

  created() {
    // this.$store.dispatch("khoitaoHV");
    this.getHocviens();
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
      "get",
      "getColor",
      "getHocviens",
    ]),
    getColor1(val) {
      if (val === "Chờ duyệt") return "grey1";
      else if (val === "Đang học") return "green1";
      else if (val === "Học xong") return "blue1";
      else return "coral1";
    },
  },
};
</script>
<style scoped>
.blue1 {
  color: blue;
}
.coral1 {
  color: coral;
}
.green1 {
  color: green;
}
.grey1 {
  color: grey;
}
</style>
