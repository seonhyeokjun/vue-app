<template>
  <div id="Chat">
    <main-header></main-header>
    <v-container>
      <h2>{{ room.roomName }}</h2>
    </v-container>
    <main-footer></main-footer>
  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJs from "sockjs-client"
import MainHeader from "../layout/MainHeader";
import MainFooter from "../layout/MainFooter";

let sock = new SockJs("/ws");
let ws = Stomp.over(sock);
let reconnect = 0;

export default {
  name: "Chat",
  components:{
    'main-header' : MainHeader,
    'main-footer' : MainFooter
  },
  data() {
    return {
      roomId: '',
      room: {},
      sender: '',
      message: '',
      messages: []
    }
  },
  created() {
    this.roomId = localStorage.getItem('wschat.roomId');
    this.sender = localStorage.getItem('wschat.sender');
    this.findRoom();
  },
  methods: {
    findRoom(){
      this.$http.get('/chat/room/' + this.roomId).then((res) => {
        console.log(res.data);
        this.room = res.data;
      })
    },
    sendMessage(){
      ws.send('/pub/chat/message',
          {},
          JSON.stringify({type:'TALK', roomId:this.roomId, sender:this.sender, message:this.message}));
      this.message = '';
    },
    recvMessage(recv){
      this.message.unshift(
          {"type":recv.type,"sender":recv.type=='ENTER'?'[알림]':recv.sender,"message":recv.message}
      );
    }
  }
}

function connect(){
  ws.connect({}, function (frame) {
    ws.subscribe("/sub/chat/room" + this.$data.roomId, function (message){
      const recv = JSON.parse(message.body);
      this.recvMessage(recv);
    });
    ws.send("/pub/chat/message",
        {}, JSON.stringify({type : 'ENTER', roomId : this.$data.roomId, sender: this.$data.sender}))
  }, function (error) {
    if (reconnect++ <= 5){
      setTimeout(function () {
        console.log("connetion reconnect");
        sock = new SockJs(sock);
        ws = Stomp.over(sock);
        connect();
      }, 10*1000);
    }
  });
}

connect();
</script>