<template>
  <div>
    <v-breadcrumbs :items="itemTKs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-data-table
      :headers="headerTKs"
      :items="taikhoans"
      :search="search"
      :sort-by="['ten', 'taikhoan', 'quyen']"
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
          <!-- Thao tác thêm vs sửa bài viết -->
          <v-btn
            color="green darken-4"
            dark
            class="mb-2 ms-2"
            @click="changeTK()"
          >
            Tạo tài khoản
          </v-btn>

          <v-dialog v-model="dialogTK" max-width="80%">
            <v-card>
              <v-card-title class="justify-center">
                <span class="text-h5">{{ formTitleTK }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <h4 class="font-weight-bold">
                    <v-icon small>mdi-account</v-icon>Thông tin tài khoản
                  </h4>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItemTK.ten"
                        label="* Tên người dùng"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItemTK.taikhoan"
                        label="* Tài khoản"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        label="* Mật khẩu"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="passwordAgain"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show2 ? 'text' : 'password'"
                        @click:append="show2 = !show2"
                        label="* Nhập lại mật khẩu"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="editedItemTK.quyen"
                        :items="chonquyen"
                        label="* Quyền hạn"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <div class="d-flex justify-center pb-10">
                <v-btn color="primary me-5" dark @click="saveTK"> Lưu </v-btn>
                <v-btn color="red" dark @click="closeTK"> Hủy </v-btn>
              </div>
            </v-card>
          </v-dialog>
          <!-- Thao tác xóa khóa học -->
          <v-dialog v-model="dialogTKDelete" max-width="500px">
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
                <v-btn color="red me-5 " dark @click="closedeleteTK()"
                  >Cancel</v-btn
                >
                <v-btn color="blue" dark @click="delete_itemTK_confirm()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.thaotac`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="edit_itemTK(item)"
          color="green"
          outline
        >
          mdi-pencil
        </v-icon>
        <v-icon small @click="delete_itemTK(item)" color="red">
          mdi-delete
        </v-icon>
      </template>

      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="khoitaoTK"> Làm mới </v-btn>
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
      show1: false,
      show2: false,
      password: "",
      passwordAgain: "",
      // rules: {
      //   required: (value) => !!value || "Required.",
      //   min: (v) => v.length >= 8 || "Min 8 characters",
      //   emailMatch: () => `The email and password you entered don't match`,
      // },
    };
  },
  computed: mapGetters([
    "formTitleTK",
    "itemTKs",
    "dialogTK",
    "dialogTKDelete",
    "headerTKs",
    "taikhoans",
    "editedIndexTK",
    "editedItemTK",
    "defaultItemTK",
    "chonquyen",
  ]),

  watch: {
    dialogTK(val) {
      val || this.$store.dispatch("closeTK");
    },
    dialogTKDelete(val) {
      val || this.$store.dispatch("closedeleteTK");
    },
  },

  created() {
    // this.$store.dispatch("khoitaoTK");
    this.getTaikhoans();
  },

  methods: {
    ...mapActions([
      "changeTK",
      "edit_itemTK",
      "delete_itemTK",
      "delete_itemTK_confirm",
      "closeTK",
      "closedeleteTK",
      "saveTK",
      "khoitaoTK",
      "getTaikhoans",
    ]),
  },
};
</script>
