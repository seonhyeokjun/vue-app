<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>제목</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-for="item in nav"
          :key="item.icon"
          :href="item.href"
          :title="item.title"
          text
        >{{ item.text }}</v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
            >
              메뉴
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in login"
              :key="index"
              link
              :href="item.href"
              v-if="!$store.state.userInfo"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              link
              @click="$store.dispatch('logout')"
              v-if="$store.state.userInfo"
            >
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  data(){
    return{
      nav: [
        {
          icon: 'home',
          text: 'Home',
          title: 'Back to Home page',
          active: true,
        },
        {
          icon: 'info',
          text: '게시판',
          title: 'About this demo',
          active: false,
          href: '/'
        },
        {
          icon: 'assignment_turned_in',
          text: 'Todos',
          title: 'Some stuff that needs doing',
          active: false
        },
        {
          icon: 'email',
          text: 'Contact',
          title: 'Our Contact info',
          active: false
        }
      ],
      login: [
        {
          title: '구글 로그인',
          href: "http://localhost:8080/oauth2/authorization/google"
        },
        {
          title: '네이버 로그인',
          href: "http://localhost:8080/oauth2/authorization/naver"
        }
      ]
    }
  },
  methods:{
  }
}
</script>