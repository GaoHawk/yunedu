<template>
  <div id="app">
   <keep-alive>
    <router-view :title="title"></router-view>
   </keep-alive>
   <!-- <Tabbar v-show="showHome"></Tabbar> -->
<!--     <ul>
      <li is="Notice" v-for="(todo,index) in todos" v-bind:title="todo" v-bind:index="index"></li>
    </ul> -->
    <!-- <Notice></Notice> -->
  </div>
</template>

<script>
import Tabbar from './component/tabbar.vue'
import { mapState } from 'vuex'
// import Notice from './component/notice.vue'
// import Bus from './common/bus.js'

export default {
  beforeCreate(){
     console.log(typeof sessionStorage.showHome)
     var bl = eval(sessionStorage.showHome)
     console.log(bl);
     this.$store.commit('SET_HOME',bl===undefined?true:bl)
     console.log(this.$store)

  },
  name: 'app',
  computed:{
    ...mapState({
       showHome:state => state.showHome,
       userId: state => state.userId,
       session: state => state.u_session
    })
  },
  
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      navs:[{name:'Foo',path:'/foo'},{name:'Bar',path:'/bar'},{name:'Toast',path:'/toast'}],
      todos: [
        'Do the dishes',
        'Take out the trash',
        'Mow the lawn'
      ],
      title:''
    }
  },
  components:{Tabbar},
  methods:{
      goRoute:function(item){
          console.log(item);
          // this.showHome = !this.showHome;
          // sessionStorage.showHome = this.showHome;
          this.$router.push({ path: item.path });
      }
  },
  mounted(){
      window.addEventListener("popstate", function(e) { 
          // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能 
          // console.log(window.location.href);
      }, false);

 
      this.$http.get('/login',{
          params: {
             user_id: this.userId,
             role:1,
             password:`123456`,
          }
      }).then(response => {
          console.log(response.data.data);
          this.$store.commit('SET_U_SESSION',response.data.data.session);
    
          this.$http.get('/users/' + this.userId +'/classrooms?embed_members=1',{
              headers:{"X-Session":this.session},
              params: {
                user_id: this.userId,
              }
          }).then(response => {
              console.log(response.data.data);
              var classData = response.data.data;
              for(let i=0;i<classData.length;i++){
                let classObj = {
                    classID:classData[i].id,
                    className:classData[i].grade + classData[i].name
                }
                this.$store.commit('SET_HAND_CLASS',classObj);
              }
        
          }, response => {

              console.log(response)
          })
      }, response => {

          console.log(response)
      })
  }
}
</script>

<style>
*{
   box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  /* margin-top: 60px; */
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
