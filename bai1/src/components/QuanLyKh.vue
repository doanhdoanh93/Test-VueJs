<template>
  <div>
    <v-breadcrumbs :items="itemKHs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-data-table
      :headers="headerKHs"
      :items="khoahocs"
      :search="search"
      :sort-by="['khoahoc', 'thoigian', 'hocphi', 'hocvien', 'soluong', 'loai']"
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
            @click="changeKH()"
          >
            Thêm
          </v-btn>

          <v-dialog v-model="dialogKH" max-width="80%">
            <v-card>
              <v-card-title class="justify-center">
                <span class="text-h5">{{ formTitleKH }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <h4 class="font-weight-bold">
                    <v-icon small>mdi-book</v-icon>Thông tin khóa học
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
                        v-model="editedItemKH.khoahoc"
                        label="* Tên khóa học"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItemKH.thoigian"
                        label="* Thời gian học"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItemKH.hocphi"
                        label="* Học phí"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItemKH.soluong"
                        label="* Số lượng môn"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <h4 class="font-weight-bold">
                    <v-icon small>mdi-book</v-icon>Nội dung khóa học
                  </h4>
                  <p>Giới thiệu khóa học:</p>
                  <v-col cols="12" md="12">
                    <ckeditor> </ckeditor>
                  </v-col>
                  <p>Nội dung khóa học:</p>
                  <v-col cols="12" md="12">
                    <ckeditor> </ckeditor>
                  </v-col>
                </v-container>
              </v-card-text>

              <div class="d-flex justify-center pb-10">
                <v-btn color="primary me-5" dark @click="saveKH"> Lưu </v-btn>
                <v-btn color="red" dark @click="closeKH"> Hủy </v-btn>
              </div>
            </v-card>
          </v-dialog>
          <!-- Thao tác xóa khóa học -->
          <v-dialog v-model="dialogKHDelete" max-width="500px">
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
                <v-btn color="red me-5 " dark @click="closedeleteKH()"
                  >Cancel</v-btn
                >
                <v-btn color="blue" dark @click="delete_itemKH_confirm()"
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
          @click="edit_itemKH(item)"
          color="green"
          outline
        >
          mdi-pencil
        </v-icon>
        <v-icon small @click="delete_itemKH(item)" color="red">
          mdi-delete
        </v-icon>
      </template>

      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="khoitaoKH"> Làm mới </v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
// import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: mapGetters([
    "formTitleKH",
    "itemKHs",
    "dialogKH",
    "dialogKHDelete",
    "headerKHs",
    "khoahocs",
    "editedIndexKH",
    "editedItemKH",
    "defaultItemKH",
  ]),

  watch: {
    dialogKH(val) {
      val || this.$store.dispatch("closeKH");
    },
    dialogKHDelete(val) {
      val || this.$store.dispatch("closedeleteKH");
    },
  },

  created() {
    // this.$store.dispatch("khoitaoKH");
    this.getKhoahocs();
  },

  methods: {
    ...mapActions([
      "changeKH",
      "edit_itemKH",
      "delete_itemKH",
      "delete_itemKH_confirm",
      "closeKH",
      "closedeleteKH",
      "saveKH",
      "khoitaoKH",
      "getKhoahocs",
    ]),
  },
};
</script>
