import Vue from 'vue'
import App from './App.vue'
import MintUi from 'mint-ui'
import VueRouter from 'vue-router'
import Foo from './component/foo.vue'
import Bar from './component/bar.vue'
import Toast from './component/toast.vue'
import btn from './component/button.vue'


Vue.use(MintUi)
Vue.use(VueRouter)
var routes = [{ path: '/foo', component: Foo }, { path: '/bar', component: Bar },{ path: '/toast',component:Toast }
];



var router = new VueRouter({
  routes: routes
});
// console.log(btn.$template);
Vue.component('Button',btn)
var app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
