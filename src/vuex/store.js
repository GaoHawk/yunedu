/*
* @Author: Administrator
* @Date:   2017-02-24 10:05:31
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-03-30 11:13:02
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
    prevPath:'',
    path:'',
    currentData:'',
    showHome:true,
    files:[]
  },
  actions: {
    setNewTitle ({commit}, msg) {
      commit('NEW_TITLE', msg)
    },
    setPrePath({commit},path){
      commit('SET_PREPATH',path)
    },
    setRouter({commit},path){
       commit('ROUT_PATH',path)
    },
    route_back({commit}){
       commit('GO_BACK')
    },
    setCurrentData({commit},obj){
       commit('SET_DATA',obj)
    },
    setHomeState({commit},bl){
      commit('SET_HOME',bl)
    },
    setFiles({commit},fileName){
      commit('SET_FILES',fileName)
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
    SET_PREPATH(state,path){
      state.prevPath=path
    },
    GO_BACK(state){
       router.go(-1);
       const change = state.path;
       state.path = state.prevPath;
       state.prevPath = change;
    },
    GET_CURRENTROUTER(state,path){
       state.path = path;
    },
    SET_DATA(state,obj){
       state.currentData = obj;
    },
    SET_HOME(state,bl){
      state.showHome = bl;
    },
    SET_FILES(state,file){
      state.files.push(file);
    }
  },

  strict: debug

})
