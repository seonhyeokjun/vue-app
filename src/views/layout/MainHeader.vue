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
                @click=""
                v-if="$store.state.userInfo"
            >
              <v-list-item-title>마이페이지</v-list-item-title>
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
          icon: 'login',
          text: '로그인',
          active: false,
          href: '/'
        },
        {
          icon: 'info',
          text: '게시판',
          active: false,
          href: '/board'
        },
        {
          icon: 'assignment_turned_in',
          text: '채팅',
          active: false,
          href: '/chatroom'
        },
        {
          icon: 'email',
          text: 'Contact',
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