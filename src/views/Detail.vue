<template>
  <div id="Detail">
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
        color="success"
        @click="update()"
      >
        수정
      </v-btn>

      <v-btn
          color="error"
          @click="remove()"
      >
        삭제
      </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Detail",
  created() {
    this.$http.get('/api/board/' + this.$route.params.data).then((res) => {
      this.title = res.data.title;
      this.author = res.data.author;
      this.content = res.data.content;
    })
  },
  data(){
    return{
      title: this.title,
      author: this.author,
      content: this.content
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
    }
  }
}
</script>

<style scoped>

</style>