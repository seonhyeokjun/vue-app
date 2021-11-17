<template>
  <v-container>
    <form>
      <v-text-field
          v-model="title"
          :error-messages="titleErrors"
          :counter="10"
          label="제목"
          required
          @input="$v.title.$touch()"
          @blur="$v.title.$touch()"
      ></v-text-field>
      <v-text-field
          v-model="author"
          :error-messages="authorErrors"
          label="작성자"
          required
          @input="$v.author.$touch()"
          @blur="$v.author.$touch()"
      ></v-text-field>
      <v-textarea
          v-model="content"
          :error-messages="contentErrors"
          label="내용"
          required
          filled
          auto-grow
          @input="$v.content.$touch()"
          @blur="$v.content.$touch()"
      ></v-textarea>
      <v-btn
          class="mr-4"
          color="primary"
          @click="submit()"
      >
        {{ '작성' }}
      </v-btn>
      <v-btn @click="clear">
        초기화
      </v-btn>
    </form>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: "Create",
  mixins: [validationMixin],
  validations: {
    title: { required, maxLength: maxLength(10) },
    author: { required },
    content: { required }
  },
  data() {
    return {
      title: '',
      author: '',
      content: '',
    }
  },
  computed: {
    titleErrors(){
      const errors = [];
      if(!this.$v.title.$dirty) return errors;
      !this.$v.title.maxLength && errors.push('10글자가 초과하였습니다.');
      !this.$v.title.required && errors.push('제목을 입력해 주세요.');
      return errors;
    },
    authorErrors(){
      const errors = [];
      if(!this.$v.author.$dirty) return errors;
      !this.$v.author.required && errors.push('작성자를 입력해 주세요.');
      return errors;
    },
    contentErrors(){
      const errors = [];
      if(!this.$v.content.$dirty) return errors;
      !this.$v.content.required && errors.push('내용을 입력해 주세요.');
      return errors;
    },
  },
  methods: {
    submit(){
      this.$v.$touch();
      if (!this.$v.$invalid){
        this.$http.post("/api/board", {
          title: this.title,
          author: this.author,
          content: this.content
        })
        .then((res) => {
          console.log(res.data);
          this.$router.push({
            path: '/'
          });
        }, function () {
          console.log('실패');
        })
      }
    },
    clear(){
      this.$v.$reset();
      this.title = '';
      this.author = '';
      this.content = '';
    }
  }
}
</script>