<template>
  <div>
    <v-breadcrumbs :items="itemBVs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-data-table
      :headers="headerBVs"
      :items="baiviets"
      :search="search"
      :sort-by="['baiviet', 'thoigian', 'tacgia', 'chude', 'taikhoan']"
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
            @click="changeBV()"
          >
            Thêm
          </v-btn>

          <v-dialog v-model="dialogBV" max-width="80%" @click:outside="closeBV">
            <v-card>
              <v-card-title class="justify-center">
                <span class="text-h5">{{ formTitleBV }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <h4 class="font-weight-bold">
                    <v-icon small>mdi-book</v-icon>Hình ảnh bài viết
                  </h4>
                  <div class="d-flex">
                    <v-img
                      lazy-src="img-1.jpg"
                      max-height="120"
                      max-width="120"
                      :src="src"
                    ></v-img>
                    <div class="d-flex align-end ms-3">
                      <v-btn color="primary" dark @click="changeAvatar">
                        Thêm ảnh
                      </v-btn>
                      <input
                        type="file"
                        accept=""
                        style="display: none"
                        ref="loadedFile"
                        label="Upload file"
                        @change="checkJSON"
                      />
                    </div>
                  </div>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItemBV.baiviet"
                        label="* Tên bài viết"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItemBV.tacgia"
                        label="* Tên tác giả"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="editedItemBV.chude"
                        :items="chonchude"
                        label="* Tên chủ đề"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <h4 class="font-weight-bold">
                    <v-icon small>mdi-book</v-icon>Nội dung bài viết
                  </h4>
                  <p>Nội dung ngắn:</p>
                  <v-col cols="12" md="12">
                    <v-textarea solo name="input-7-4" label=""></v-textarea>
                  </v-col>
                  <p>Nội dung bài viết:</p>
                  <v-col cols="12" md="12">
                    <v-textarea solo name="input-7-4" label=""></v-textarea>
                  </v-col>
                </v-container>
              </v-card-text>

              <div class="d-flex justify-center pb-10">
                <v-btn color="primary me-5" dark @click="saveBV"> Lưu </v-btn>
                <v-btn color="red" dark @click="closeBV"> Hủy </v-btn>
              </div>
            </v-card>
          </v-dialog>
          <!-- Thao tác xóa khóa học -->
          <v-dialog v-model="dialogBVDelete" max-width="500px">
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
                <v-btn color="red me-5 " dark @click="closedeleteBV()"
                  >Cancel</v-btn
                >
                <v-btn color="blue" dark @click="delete_itemBV_confirm()"
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
          @click="edit_itemBV(item)"
          color="green"
          outline
        >
          mdi-pencil
        </v-icon>
        <v-icon small @click="delete_itemBV(item)" color="red">
          mdi-delete
        </v-icon>
      </template>

      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="khoitaoBV"> Làm mới </v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      search: "",
      src: "img-1.jpg",
      baiviets: [],
      editedIndexBV: -1,
      editedItemBV: {
        baiviet: "",
        thoigian: "",
        tacgia: "",
        chude: "",
        taikhoan: "",
      },
      dialogBV: false,
      dialogBVDelete: false,
      headerBVs: [
        { text: "Tên bài viết", value: "baiviet" },
        { text: "Thời gian tạo", value: "thoigian" },
        { text: "Tên tác giả", value: "tacgia" },
        { text: "Chủ đề", value: "chude" },
        { text: "Tài khoản đăng", value: "taikhoan" },
        { text: "Thao tác", value: "thaotac", sortable: false },
      ],
      chonchude: ["Chờ duyệt", "Đang học", "Học xong", "Chưa hoàn thành"],

      defaultItemBV: {
        baiviet: "",
        thoigian: "",
        tacgia: "",
        chude: "",
        taikhoan: "",
      },
    };
  },
  computed: {
    ...mapGetters(["itemBVs"]),
    formTitleBV() {
      return this.editedIndex === -1 ? "Cập nhật bài viết" : "Sửa bài viết";
    },
  },
  watch: {
    dialogBV(val) {
      val || this.closeBV();
    },
    dialogBVDelete(val) {
      val || this.closedeleteBV();
    },
  },

  created() {
    this.getBaiviets();
  },

  methods: {
    async getBaiviets() {
      try {
        const response = await axios.get(`http://localhost:3000/baiviets`);
        this.baiviets = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    changeBV() {
      this.dialogBV = !this.dialogBV;
    },
    edit_itemBV(item) {
      this.editedIndexBV = this.baiviets.indexOf(item);
      this.editedItemBV = Object.assign({}, item);
      this.dialogBV = true;
    },
    delete_itemBV(item) {
      this.editedIndexBV = this.baiviets.indexOf(item);
      this.editedItemBV = Object.assign({}, item);
      this.dialogBVDelete = true;
    },
    async delete_itemBV_confirm() {
      console.log(this.editedItemBV);
      try {
        await axios.delete(
          `http://localhost:3000/baiviets/${this.editedItemBV.id}`
        );
        this.baiviets.splice(this.editedIndexBV, 1);
      } catch (error) {
        console.log(error);
      }
      this.closedeleteBV();
    },
    async saveBV() {
      if (this.editedIndexBV > -1) {
        try {
          let rs = await axios.put(
            `http://localhost:3000/baiviets/${this.editedItemBV.id}`,
            this.editedItemBV
          );

          console.log("rs.data:", rs.data);
          if (rs.data) {
            Object.assign(this.baiviets[this.editedIndexBV], this.editedItemBV);
          }
          this.closeBV();
          return rs.data;
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          this.editedItemBV.id = uuidv4();
          console.log(this.editedItemBV.id);
          let rs_add = await axios.post(
            `http://localhost:3000/baiviets`,
            this.editedItemBV
          );
          this.baiviets.push(this.editedItemBV);
          this.closeBV();
          return rs_add;
        } catch (error) {
          console.log(error);
        }
      }
    },
    closeBV() {
      this.dialogBV = false;
      this.editedIndexBV = -1;
      this.editedItemBV = Object.assign({}, this.defaultItemBV);
    },
    closedeleteBV() {
      this.dialogBVDelete = false;
      this.editedIndexBV = -1;
      this.editedItemBV = Object.assign({}, this.defaultItemBV);
    },
    changeAvatar() {
      this.$refs.loadedFile.click();
    },
    checkJSON: function (e) {
      this.src = e.name;
      console.log(typeof e.name);
      console.log(this.src, e);
    },
  },
};
</script>
