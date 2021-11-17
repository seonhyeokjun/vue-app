<template>
  <div id="Board">
    <main-header></main-header>
    <v-container>
      <v-card>
        <v-card-title>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="검색"
              single-line
              @keyup.en.enter="boardSearch"
          ></v-text-field>
        </v-card-title>
        <v-data-table
            dark
            :headers = "headers"
            :items="board"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="totalPages = $event"
        >
          <template #item.title="{ item }">
            <router-link :to="{ name : 'Detail', params: {data : item.id} }">
              {{ item.title }}
            </router-link>
          </template>
        </v-data-table>
      </v-card>
      <v-btn
          tile
          color="success"
          :href="`/create`"
      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        Edit
      </v-btn>
      <div class="text-center">
        <v-pagination
            v-model="page"
            :length="totalPages > 5 ? 5 : totalPages"
        ></v-pagination>
      </div>
      <v-alert
        type="error"
        :value="alert"
      >
        검색결과가 없습니다.
      </v-alert>
    </v-container>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from "./layout/MainHeader";
import MainFooter from "./layout/MainFooter";

export default {
  name: "Board",
  components: {
    'main-header' : MainHeader,
    'main-footer' : MainFooter
  },
  created() {
    this.$http.get("/api/board/list").then((response) => {
      this.board = response.data.content;
      this.totalPages = response.data.totalPages;
    })
  },
  data(){
    return{
      headers: [
        {
          text : '번호',
          align : 'start',
          sortable : false,
          value : 'id'
        },
        {
          text : '제목',
          sortable : false,
          value : 'title',
        },
        {
          text : '작성자',
          sortable : false,
          value : 'author'
        },
        {
          text : '닐찌',
          sortable : false,
          value : 'createdDate'
        }
      ],
      board: [],
      search: '',
      alert: false,
      page: 1,
      totalPages: 0,
      itemsPerPage: 10,
    };
  },
  computed: {

  },
  methods:{
    boardSearch: function () {
      if(this.search !== ''){
        this.$http.get("/api/board/search?keyword=" + this.search).then((res) => {
          console.log(res.data === []);
          if(!this.isEmptyArr(res.data)){
            this.board = res.data;
            this.alert = false;
          } else {
            this.$http.get("/api/board/list").then((response) => {
              this.board = response.data.content;
              this.alert = true;
            })
          }
        }, () => {
          console.log('실패');
        })
      } else {
        this.$http.get("/api/board/list").then((response) => {
          this.board = response.data.content;
          this.alert = false;
        })
      }
    },
    isEmptyArr: function (arr) {
      return Array.isArray(arr) && arr.length === 0;
    }
  }
}
</script>