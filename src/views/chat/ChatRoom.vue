<template>
  <div id="ChatRoom">
    <main-header></main-header>
    <v-container>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Title"
          v-model="title"
          :rules="titleRules"
          :counter="10"
          required
        ></v-text-field>
        <v-btn
          @click="submit"
          :disabled="!valid"
        >
          submit
        </v-btn>
      </v-form>
      <v-card>
        <v-data-table
            :headers="headers"
            :items="rooms"
            hide-default-footer
        ></v-data-table>
      </v-card>
    </v-container>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from "../layout/MainHeader";
import MainFooter from "../layout/MainFooter";

export default {
  name: "ChatRoom",
  components:{
    'main-header' : MainHeader,
    'main-footer' : MainFooter
  },
  created() {
    this.$http.get('/chat/rooms').then((res) => {
      console.log(res.data);
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
          value: 'roomName'
        }
      ],
      rooms: [],
      title: '',
      titleRules: [
        //v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      valid: true,
    }
  },
  methods:{
    submit(){
      const data = {
        roomName: this.title
      };
      this.$http.post('/chat/room', JSON.stringify(data), {
        headers:{
          "Content-Type": 'application/json'
        }
      }).then((res) => {
        location.reload();
      });
    },
    enterRoom(roomId){
      const sender = prompt('대화명을 입력해 주세요.');
      if (sender !== ''){
        localStorage.setItem('wschat.sender', sender);
        localStorage.setItem('wschat.roomId', roomId);
        location.href='/chat/room/enter/' + roomId;
      }
    }
  }
}
</script>