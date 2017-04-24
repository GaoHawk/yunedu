/*
* @Author: Administrator
* @Date:   2017-02-24 10:05:31
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-04-24 11:18:27
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
    homework_data:'',
    homeworks:[],
    notices:[],
    showHome:true,
    files:[],
    stoName:'',
    index_state:'全部',
    loadingCount:1,
    noticeCount:1,
    homeworkEnd:false,
    noticeEnd:false,
    //预览图片数据
    previewPic:[]
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
    setHomeworkData({commit},obj){
       commit('SET_HOMEWORK_DATA',obj)
    },
    setHomeState({commit},bl){
      commit('SET_HOME',bl)
    },
    setFiles({commit},fileName){
      commit('SET_FILES',fileName)
    },
    clearFiles({commit}){
      commit('CLEAR_FIELS');
    },
    setSTO_Name({commit},name){
      commit('SET_STO_NAME',name);
    },
    setIndex_State({commit},val){
      commit('SET_INDEX_STA',val)
    },
    submitHomeworks({commit},val){
      commit('SUBMIT_HOMEWOKR',val)
    },
    setHWKData({commit},val){
      commit('SET_HWK_DATA',val);
    },
    submitNotices({commit},val){
      commit('SUBMIT_NOTICES',val)
    },
    setNoticeData({commit},val){
      commit('SET_NOTICE_DATA',val);
    },
    setLoadingCount({commit},num){
      commit('SET_LOAD_COUNT',num);
    },
    setNoticeCount({commit},num){
      commit('SET_NOTICE_COUNT',num);
    },
    setHomeworkEnd({commit},val){
      commit('SET_HOMEWORK_END',val)
    },
    setNoticeEnd({commit},val){
      commit('SET_NOTICE_END',val);
    },
    setPreviewPic({commit},arr){
      commit('SET_PREVIEW_PIC',arr);
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
    },
    CLEAR_FIELS(state){
      state.files = [];
    },
    SET_STO_NAME(state,name){
       state.stoName = name
    },
    SET_INDEX_STA(state,val){
       state.index_state = val;
    },
    SET_HOMEWORK_DATA(state,obj){
       state.homework_data = obj;
    },
    SUBMIT_HOMEWOKR(state,obj){
       state.homeworks.unshift(obj);
    },
    SET_HWK_DATA(state,obj){
       state.homeworks.push(obj);
    },
    SUBMIT_NOTICES(state,obj){
       state.notices.unshift(obj);
    },
    SET_NOTICE_DATA(state,obj){
      state.notices.push(obj);
    },
    SET_LOAD_COUNT(state,num){
      state.loadingCount = num;
    },
    SET_NOTICE_COUNT(state,num){
      state.noticeCount = num;
    },
    SET_HOMEWORK_END(state,val){
      state.homeworkEnd = val;
    },
    SET_NOTICE_END(state,val){
      state.noticeEnd = val;
    },
    // 设置预览图片数据
    SET_PREVIEW_PIC(state,arr){
      state.previewPic = arr;
    }
  },

  strict: debug

})



// WEBPACK FOOTER //
// ./src/vuex/store.js