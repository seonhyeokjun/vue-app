<template>
  <div id="Detail">
    <main-header></main-header>
    <v-container>
      <v-text-field
        label="제목"
        v-model="title"
        disabled
      ></v-text-field>
      <v-text-field
        label="작성자"
        v-model="author"
        disabled
      ></v-text-field>
      <v-textarea
        background-color="grey lighten-2"
        color="cyan"
        label="내용"
        v-model="content"
        disabled
      ></v-textarea>
      <v-btn
          v-for="item in files"
          :key="item.id"
          :href="`http://localhost:8080/api/download/` + item.id"
          color="blue-grey"
          class="ma-2 white--text"
      >
        {{ item.realFilename }}
        <v-icon
            right
            dark
        >
          mdi-cloud-download
        </v-icon>
      </v-btn>
      <v-btn
        class="mr-4"
        color="success"
        @click="update()"
      >
        수정
      </v-btn>
      <v-btn
        class="mr-4"
        color="error"
        @click="remove()"
      >
        삭제
      </v-btn>
      <v-btn
        color="error"
        href="/"
      >
        목록
      </v-btn>
      <v-col
          cols="12"
          sm="3"
      >
        <v-btn
            v-model="like"
            icon
            color="pink"
            v-if="like === 1"
            @click="likes()"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn
            v-model="like"
            icon
            v-if="like === 0"
            @click="likes()"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-col>
      <Disqus shortname='seonhyeokjun' />
    </v-container>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from "./layout/MainHeader";
import MainFooter from "./layout/MainFooter";
import { Disqus } from "vue-disqus";

export default {
  name: "Detail",
  components:{
    MainHeader,
    MainFooter,
    Disqus
  },
  created() {
    this.$http.get('/api/board/' + this.$route.params.data).then((res) => {
      this.title = res.data.title;
      this.author = res.data.author;
      this.content = res.data.content;
    });

    this.$http.get('/api/file/' + this.$route.params.data).then((res) => {
      this.files = res.data;
    });

    this.$http.get('/api/like/' + this.$route.params.data).then((res) => {
      this.like = res.data;
    })
  },
  data(){
    return{
      title: this.title,
      author: this.author,
      content: this.content,
      like: this.like,
      files: {}
    }
  },
  methods: {
    update() {
      this.$http.put("/api/board/" + this.$route.params.data, {
        title: this.title,
        author: this.author,
        content: this.content,
      }).then((res) => {
        console.log(res.data);
        this.$router.push({
          path: '/'
        });
      },() => {
        console.log('실패');
      })
    },
    remove(){
      this.$http.delete("/api/board/" + this.$route.params.data).then(() => {
        this.$router.push({
          path: '/'
        });
      }, () => {
        console.log('실패');
      })
    },
    likes(){
      this.$http.put("/api/like/" + this.$route.params.data).then((res) => {
        this.like = res.data;
      });
    }
  }
}
</script>

<style scoped>

</style>