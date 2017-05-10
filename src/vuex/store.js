/*
* @Author: Administrator
* @Date:   2017-02-24 10:05:31
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-05-09 17:12:50
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
    index_state:'',
    loadingCount:1,
    noticeCount:1,
    homeworkEnd:false,
    noticeEnd:false,
    //预览图片数据
    previewPic:[],
    // 查询年份
    year:'',
    yIsActive:true,
    // 评论作业id
    comments_hid:'',
    userId:'236942',
    comments_name:'',
    // 评论作业翻页
    comment_page:'',
    commentEnd:false,
    // 评论内容
    comments:[],
    // 教师班级
    hand_classes:[],
    // 用户登陆session
    u_session:'',
    // 设置评论开始条目id
    
    // 当页面超出手机屏幕时，让页面滚动
    dragable:false,

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
    // 发布作业以后清空当前作业数据重新刷新
    clearoutHomework({commit}){
      commit('CLEAR_OUT_HOMEWORK');
    },
    setNoticeEnd({commit},val){
      commit('SET_NOTICE_END',val);
    },
    // 发布新的通知以后清楚通知数据，重新刷新
    cleartoutNotice({commit}){
      commit('CLEAR_OUT_NOTICE');
    },
    setPreviewPic({commit},arr){
      commit('SET_PREVIEW_PIC',arr);
    },
    //查询 的年份
    setYear({commit},num){
      commit('SET_YEAR',num);
    },
    //判断 查询年份是否激活
    setYearActive({commit},bl){
      commit('SET_YEAR_ACTIVE',bl);
    },
    // 设置作业评论id
    setComments_Hid({commit},id){
      commit('SET_COMMENTS_HID',id);
    },
    setComments_uid({commit},uid){
      commit('SET_COMMENTS_UID',uid);
    },
    setComments_name({commit},name){
      commit('SET_COMMENTS_NAME',name);
    },
    // 评论翻页
    setCommentsEnd({commit},bl){
      commit('SET_COMMENT_END',bl);
    },
    // 添加新评论滚动
    pushCommentList({commit},obj){
      commit('PUSH_COMMENT_LIST',obj);
    },
    setCommentPage({commit},num){
      commit('SET_COMMENT_PAGE',num);
    },
    // 评论内容
    setCommentContent({commit},data){
      commit('SET_COMMENT_CONTENT',data);
    },
    // 清除评论内容
    clearoutComment({commit}){
      commit('CLEAR_OUT_CONTENT');
    },
    // 获得当前教师所掌管班级
    setHandClass({commit},obj){
      commit('SET_HAND_CLASS',obj);
    },
    // 获取用户登陆session
    setUsession({commit},session){
      commit('SET_U_SESSION',session);
    },
    //  设置页面可以滚动
    setDragAble({commit},bl){
      commit('SET_DRAG_ABLE',bl);
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
    },
    // 查询年份
    SET_YEAR(state,num){
      state.year = num;
      console.log(state);
    },
    // 查看年份是否激活
    SET_YEAR_ACTIVE(state,bl){
      state.yIsActive=bl;
    },
    
    // 评论作业id
    SET_COMMENTS_HID(state,id){
      state.comments_hid = id;
    },
    SET_COMMENTS_UID(state,uid){
      state.userId = uid;
    },
    SET_COMMENTS_NAME(state,name){
      state.comments_name = name;
    },

    // 评论翻页
    SET_COMMENT_END(state,bl){
      state.commentEnd = bl;
    },
    SET_COMMENT_PAGE(state,num){
      state.comment_page = num;
    },

    // 评论内容
    SET_COMMENT_CONTENT(state,data){
      state.comments.unshift(data);
    },
    // 清除评论内容
    CLEAR_OUT_CONTENT(state){
      state.comments = [];
    },
    // 获得当前教师所掌管的班级
    SET_HAND_CLASS(state,obj){
      state.hand_classes.push(obj);
      console.log(state.hand_classes);
    },
    // 清楚作业数据
    CLEAR_OUT_HOMEWORK(state){
      state.homeworks=[];
    },
    // 清楚通知数据
    CLEAR_OUT_NOTICE(state){
      state.notices = [];
    },
    // 添加评论列表
    PUSH_COMMENT_LIST(state,obj){
      state.comments.push(obj);
    },
    // 获得用户登陆session
    SET_U_SESSION(state,session){
      state.u_session = session;
      console.log(state.u_session);
    },
    // 设置拖拽可能
    SET_DRAG_ABLE(state,bl){
      state.dragable = bl;
    }
    
    
  },

  strict: debug

})



// WEBPACK FOOTER //
// ./src/vuex/store.js