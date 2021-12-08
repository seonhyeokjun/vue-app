<template>
  <div id="Create">
    <main-header></main-header>
    <v-container>
      <v-form>
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
          disabled
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
        <v-file-input
            v-model="files"
            color="deep-purple accent-4"
            counter
            label="File input"
            multiple
            placeholder="Select your files"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip
              v-if="index < 2"
              color="deep-purple accent-4"
              dark
              label
              small
            >
              {{ text }}
            </v-chip>

            <span
              v-else-if="index === 2"
              class="text-overline grey--text text--darken-3 mx-2"
            >
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input>
        <v-btn
          class="mr-4"
          color="primary"
          @click="submit()"
        >
          작성
        </v-btn>
        <v-btn
          class="mr-4"
          color="error"
          href="/"
        >
          취소
        </v-btn>
        <v-btn
          @click="clear"
        >
          초기화
        </v-btn>
      </v-form>
    </v-container>
    <main-footer></main-footer>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import MainHeader from "./layout/MainHeader";
import MainFooter from "./layout/MainFooter";

export default {
  name: "Create",
  mixins: [validationMixin],
  validations: {
    title: { required, maxLength: maxLength(10) },
    author: { required },
    content: { required }
  },
  components:{
    'main-header' : MainHeader,
    'main-footer' : MainFooter
  },
  created() {
    this.$http.get('/auth/client').then((res) => {
      console.log(res.data);
      this.author = res.data.userName;
    });
  },
  data() {
    return {
      title: '',
      author: '',
      content: '',
      files: [],
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
        let data = {
          title: this.title,
          author: this.author,
          content: this.content,
          hit: 0,
        };
        let formData = new FormData();
        formData.append("key", new Blob([JSON.stringify(data)], {type: "application/json"}));
        for (let i = 0; i < this.files.length; i++){
          formData.append("files", this.files[i]);
        }
        this.$http.post("/api/board", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
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
      this.content = '';
    }
  }
}
</script>