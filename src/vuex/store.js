/*
* @Author: Administrator
* @Date:   2017-02-24 10:05:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-24 17:13:57
*/

import Vue from 'vue'
import Vuex from 'vuex'
import { router } from '../main'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
Vue.config.debug = debug

export default new Vuex.Store({

  state: {
    title: '',
    path:''
  },
  actions: {
    setNewTitle ({commit}, msg) {
      commit('NEW_TITLE', msg)
    },
    setRouter({commit},path){
       commit('ROUT_PATH',path)
    },
    route_back({commit}){
       commit('GO_BACK')
    }
  },
  mutations: {
    NEW_TITLE (state, msg) {
      state.title = msg
    },
    ROUT_PATH(state,path){
       router.push(path)
       state.path = path;
    },
    GO_BACK(state){
       router.go(-1);
    },
    GET_CURRENTROUTER(state,path){
       state.path = path;
    }
  },

  strict: debug

})
