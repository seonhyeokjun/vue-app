<template>
  <div id="SignUp">
    <v-container
        class="fill-height"
        fluid
    >
      <v-row
          align="center"
          justify="center"
      >
        <v-col
            cols="12"
            sm="8"
            md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
                color="primary"
                dark
                flat
            >
              <v-toolbar-title>SignUp form</v-toolbar-title>
              <v-spacer></v-spacer>

            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="email"
                    :error-messages="emailErrors"
                    @input="$v.author.$touch()"
                    @blur="$v.author.$touch()"
                ></v-text-field>

                <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="name"
                ></v-text-field>

                <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                ></v-text-field>

                <v-text-field
                    id="confirm"
                    label="Confirm Password"
                    name="confirm"
                    prepend-icon="mdi-alert-circle-check"
                    type="password"
                    v-model="confirm"
                ></v-text-field>

                <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                >
                  <v-select
                      v-model="selected"
                      :items="items"
                      label="선택"
                      item-text="text"
                      item-value="value"
                  ></v-select>
                </v-col>

              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary" @click="$router.push('/')">Login</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signup">SignUp</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: "SignUp",
  data: () => ({
    email : '',
    name : '',
    password : '',
    confirm : '',
    items: [{
      value: 'USER',
      text : '사용자'
    }, {
      value: 'TRAINER',
      text : '트레이너'
    }, {
      value: 'GYM',
      text: '헬스장'
    }],
    selected : 'USER'
  }),
  computed: {
    emailErrors(){
      const errors = [];
      if(!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('이메일을 입력해 주세요.');
      return errors;
    },
    nameErrors(){
      const errors = [];
      if(!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('이름을 입력해 주세요.');
      return errors;
    },
    contentErrors(){
      const errors = [];
      if(!this.$v.content.$dirty) return errors;
      !this.$v.content.required && errors.push('내용을 입력해 주세요.');
      return errors;
    }
  },
  methods: {
    signup(){
      let data = {
        email : this.email,
        name : this.name,
        password : this.password,
        role : this.selected
      };
      this.$http.post("/api/signup", data).then((res) => {
        console.log(res.data);
      }, () => {
        console.log("실패");
      });
    }
  }
}
</script>