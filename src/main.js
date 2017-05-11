import Vue from 'vue'
import App from './App.vue'
import MintUi from 'mint-ui'
import VueRouter from 'vue-router'
import Foo from './component/foo.vue'
import Bar from './component/bar.vue'
import btn from './component/button.vue'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notice from './component/notice.vue'
import homework from './component/homework.vue'
import c_notice from './component/createNotice.vue'
import firstTab from './component/tabbar.vue'
import pictureView from './component/picture.vue'
import pageNav from './component/pageNav.vue'
import yearIndex from './component/yearIndex.vue'
import comments from './component/comments.vue'
import myDrag from './component/dragEvent.vue'

Vue.prototype.$http = axios;

Vue.directive(myDrag.name,myDrag);

Vue.use(VueAxios,axios)
Vue.use(MintUi)
Vue.use(VueRouter)
var routes = [{ path: '/foo', component: Foo }, { path: '/bar', component: Bar },{ path: '/toast',component:Toast },
      { path: '/notice', component:Notice },
      { path: '/homework',component:homework },
      { path: '/c_notice',component:c_notice },
      { path: '/comments', component:comments },
      { path: '/home',component:firstTab,
        children:[
          {
            path:'/home/pageNav',
            component: pageNav
          },
          {
            path:'/home/yearIndex',
            component: yearIndex
          }
        ] 
      },
      { path: '/pic', component:pictureView } ,
      { path: '/', redirect:'/home/yearIndex'}
];



var router = new VueRouter({
  routes: routes
});
sync(store,router);
// console.log(btn.$template);
Vue.component('Button',btn)
var app = new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store:store
})
export { app, router,store }
