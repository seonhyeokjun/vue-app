<template>
  <div id="Login">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="mdi-account" v-model="form.email" label="아이디 / 이메일" type="text"></v-text-field>
                <v-text-field prepend-icon="mdi-lock" v-model="form.password" label="비밀번호" type="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary" @click="$router.push('/signup')">회원가입</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signIn">로그인</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
  export default {
    name: 'Login',
    data () {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      // ...mapActions(["login"]),
      signIn() {
        // this.login(this.form);
        const axiosConfig = {
          headers:{
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
        let form = new FormData();
        form.append("email", this.form.email);
        form.append("password", this.form.password);

        this.$http.post('/login', form, axiosConfig).then((res) => {
          console.log(res.data);
        }, () => {
          console.log('실패');
        })
      }
    }
  }
</script>
