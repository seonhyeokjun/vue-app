<template>
  <v-container>
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">번호</th>
          <th class="text-left">제목</th>
          <th class="text-left">작성자</th>
          <th class="text-left">날짜</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in posting" :key="item.number">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.createdDate }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$http.get("/api/v1/posts/list").then((response) => {
      this.posting = response.data;
    })
  },
  data(){
    return{
      posting: [],
    };
  },
};
</script>

<style scoped>

</style>