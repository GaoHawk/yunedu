<template>
  <div id="app">
  <Button v-show="showHome"></Button>
<!--     <section class="page-demo" v-show="showHome">
      <div v-for="group in navs">
        <mt-cell
           v-html="group.name" @click.native="goRoute(group)">

        </mt-cell>
      </div>
    </section> -->
    <router-view :title="title"></router-view>

    <Tabbar v-show="showHome"></Tabbar>
<!--     <ul>
      <li is="Notice" v-for="(todo,index) in todos" v-bind:title="todo" v-bind:index="index"></li>
    </ul> -->
    <!-- <Notice></Notice> -->

  </div>
</template>

<script>
import Tabbar from './component/tabbar.vue'
// import Notice from './component/notice.vue'
// import Bus from './common/bus.js'

export default {
  name: 'app',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      navs:[{name:'Foo',path:'/foo'},{name:'Bar',path:'/bar'},{name:'Toast',path:'/toast'}],
      showHome:true,
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
          this.showHome = !this.showHome;
          sessionStorage.showHome = this.showHome;
          this.$router.push({ path: item.path });
      }
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
