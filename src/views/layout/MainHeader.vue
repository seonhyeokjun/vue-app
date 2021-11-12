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
            to="#"
            :title="item.title"
            text
        >{{ item.text }}</v-btn>
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
          active: true
        },
        {
          icon: 'info',
          text: 'About',
          title: 'About this demo',
          active: false
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
      ]
    }
  }
}
</script>

<style scoped>

</style>