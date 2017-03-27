/*
* @Author: Administrator
* @Date:   2017-02-24 10:05:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-24 17:02:49
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
    path:'',
    currentData:''
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
    },
    setCurrentData({commit},obj){
       commit('SET_DATA',obj)
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
    },
    SET_DATA(state,obj){
       state.currentData = obj;
    }
  },

  strict: debug

})
