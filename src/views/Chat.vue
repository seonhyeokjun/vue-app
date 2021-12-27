<template>
  <div id="Chat">
    <main-header></main-header>
    <v-container>
      <v-card>
        <v-data-table
            :headers="headers"
            :items="desserts"
            hide-default-footer
        ></v-data-table>
      </v-card>
    </v-container>
    <main-footer></main-footer>
  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJs from "sockjs-client"
import MainHeader from "./layout/MainHeader";
import MainFooter from "./layout/MainFooter";

export default {
  name: "Chat",
  components:{
    'main-header' : MainHeader,
    'main-footer' : MainFooter
  },
  created() {
    this.$http.get('/chat/room').then((res) => {
      this.rooms = res.data;
    });
  },
  data(){
    return {
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'id'
        },
        {
          text: '채팅방 이름',
          align: 'center',
          sortable: false,
          value: ''
        }
      ],
      desserts: [],
      rooms: []
    }
  },
  methods:{
    createRoom(){
      this.$http.post('/chat/room').then(() => {

      });
    }
  }
}
</script>