<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <div class="page-title"></div>
      <div>
        <ol class="breadcrumb">
          <li class="normal"
              :class="{ active: isActive }"
              @click="jumpToHome">教师首页</li>
          <li class="normal"
              :class="{ active: !selected }"
              v-show=" !isActive"
              @click="jumpToIndex">{{value?value:'2017'}}</li>
          <li class="normal active"
              v-show="selected">{{ selected.length>2?'':selected }}</li>
        </ol>
      </div>
      <keep-alive>
      <router-view></router-view>
      </keep-alive>

      <mt-tab-container class="page-tabbar-container"
                        v-model="selected"
                        @touchmove.native="hidetab">
        <mt-tab-container-item id="全部">

          <AllList ref="alllist"></AllList>
        </mt-tab-container-item>
        <mt-tab-container-item id="作业"
                               class="custom-homework">

        <homelList ref="homelist"></homelList>
        </mt-tab-container-item>
        <mt-tab-container-item id="通知"
                               class="custom-notice">

        <noticeList ref="noticelist"></noticeList>
        </mt-tab-container-item>
  
      </mt-tab-container>
    </div>
    <button class="diaphaneity"
            @click="showTab"></button>
    <mt-tabbar v-model="selected"
               fixed>
      <mt-tab-item id="全部"
                   @click.native="testClick('全部')">
        <img slot="icon"
             src="../assets/person.png"> 全部
      </mt-tab-item>
      <mt-tab-item id="作业"
                   @click.native="testClick('作业')">
        <img slot="icon"
             src="../assets/find.png"> 作业
      </mt-tab-item>
      <mt-tab-item id="通知"
                   @click.native="testClick('通知')">
        <img slot="icon"
             src="../assets/search.png"> 通知
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import Btn from './button.vue'
import { mapState } from 'vuex'
import homelList from './homeList.vue'
import testScroll from './testScroll.vue'
import noticeList from './noticeList.vue'
import AllList from './AllList.vue'

export default {
  name: 'page-tabbar',
  created(){


  },
  computed: {
    list: function () {
      var arr = this.homework.concat(this.notice);
      return arr;
    },
    ...mapState({
      isActive: state => state.yIsActive,
      value: state => state.year,
      selected: state => state.index_state,
      prevPath:state => state.prevPath,
      homework: state => state.homeworks,
      notice: state => state.notices,
      loadCount: state => state.loadingCount,
      noticeCount: state => state.noticeCount,
      homwworkEnd: state => state.homeworkEnd,
      noticeEnd: state => state.noticeEnd,
      userId: state => state.userId,
      session: state => state.u_session
    })
  },
  components: { Btn, homelList, testScroll, noticeList, AllList },
  data() {
    return {
      picked: '',
      year: true,
      loading: false,
      loadingHome:false,
      allLoaded: false,
      wrapperHeight: 0,
      wrapper1Height:0,
    };
  },
  methods: {
    loadMore() {

    },
    doubleTap(){
      // this.$store.commit('SET_HOME', false);
      // sessionStorage.showHome = false;
      // this.$store.commit('SET_HOMEWORK_DATA', data)
      // this.$store.commit('NEW_TITLE', '作业');
      // this.$store.commit('ROUT_PATH', '/homework');
      // this.$store.commit('SET_PREPATH', '/');
      // console.log(1);
    },
    showTab() {
      if (this.isActive) { return; }
      var mintTab = document.querySelector('.mint-tabbar.is-fixed');
      mintTab.style.setProperty('top', 'auto');
    },
    hidetab() {
      var mintTab = document.querySelector('.mint-tabbar.is-fixed');
      mintTab.style.setProperty('top', '100%');
    },
    jumpToHome() {
      this.year = false;
      this.selected = '';
      var mintTab = document.querySelector('.mint-tabbar.is-fixed');
      mintTab.style.setProperty('top', '100%');
      this.$store.commit('SET_INDEX_STA', '');
      this.$store.commit('ROUT_PATH','/home/yearIndex');
      this.$store.commit('SET_PREPATH',this.prevPath);
      this.$store.commit('SET_YEAR_ACTIVE',true);
    },
    jumpToIndex() {
      var mintTab = document.querySelector('.mint-tabbar.is-fixed');
      mintTab.style.setProperty('top', 'auto');
      this.$store.commit('SET_INDEX_STA', '');
      this.selected = '';
      this.$store.commit('ROUT_PATH','/home/pageNav');
      this.$store.commit('SET_PREPATH',this.prevPath);
      // this.isActiveB = true;
    },
    tabTo(msg) {
      this.$store.commit('SET_INDEX_STA', msg);
    },
    clickR(ev) {
      console.log(this)
    },
    clickRadio(value) {
      console.log(value)
      var mintTab = document.querySelector('.mint-tabbar.is-fixed');
      mintTab.style.setProperty('top', 'auto');
      this.year = true;
      this.isActive = false;
      this.selected = '';
      // this.isActiveB = true;
    },
    testClick(value) {
      this.$store.commit('SET_INDEX_STA', value);
      this.$store.commit('ROUT_PATH','/home');
      this.$store.commit('SET_PREPATH',this.prevPath);
      switch(value)
      {
        case '全部':
        if(this.homework.length>15){

        }else{
          this.$refs.alllist.loadMore();
        }
        break;
        case '作业':
        if(this.homework.length>15){

        }else{
          this.$refs.homelist.loadMore();
        }
        
        break;
        case '通知':
        if(this.notice.length>15){

        }else{
           this.$refs.noticelist.loadMore();
        }
        break;
      }
       
      
    }
  },
  mounted() {

  },
  activated(){
      console.log(this.$refs.alllist);
  }
};
</script>
<style>
  div.custom-radio div.mint-cell-title {
    min-width: 100%;
  }

  .mint-radiolist-label {
    padding: 0!important;
  }

  .yearStyle {
    text-align: center;
    margin-top: 12px;
  }

  .normal {
    color: #337ab0;
    margin: 0;
  }




  /*cell 自定义样式*/

  li.page-infinite-listitem div.mint-cell-title {
    min-width: 70px;
  }

  .custom-homework div.mint-cell-title,
  .custom-notice div.mint-cell-title {
    min-width: 70px;
  }

  .mint-cell-value {
    width: 80%;
    white-space:nowrap;
    text-overflow:ellipsis;overflow:hidden;
  }




  /*底部栏动画*/

  .mint-tabbar.is-fixed {
    top: 100%;
  }

  .diaphaneity {
    width: 100%;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
    height: 30px;
    position: fixed;
    z-index: 1;
    right: 0;
    bottom: 0;
    left: 0;
  }




  /*无线滚动样式*/

  .mint-tab-container {
    /*top:-35px;*/
    /*bottom: 35px;*/
  }

  .page-infinite-list {
    margin: 0;
  }

  .page-infinite-loading div {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }

  .page-infinite-wrapper {
    margin-top: -1px;
    /*margin-bottom: 55*/
    overflow: scroll;
  }

  .page-infinite-loading {
    text-align: center;
    height: 40px;
    line-height: 25px;
    margin: 0;
  }

  .page-infinite-listitem {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

  .page-infinite-desc,
  .page-infinite-listitem {
    text-align: center;
    border-bottom: 1px solid #eee;
    margin: 0;
  }

  .breadcrumb>.active {
    color: #777;
  }

  .breadcrumb>li+li:before {
    padding: 0 5px;
    box-sizing: border-box;
    color: #ccc;
    content: "/\00a0";
  }

  .breadcrumb>li>a {
    color: #337ab7;
    text-decoration: none;
  }

  .breadcrumb>li {
    display: inline-block;
  }

  .breadcrumb {
    margin-top: 0;
    padding: 8px 15px;
    margin-bottom: 0;
    list-style: none;
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  .page-tabbar {
    overflow: hidden;
    /*height: 100vh;*/
  }

  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }
</style>



// WEBPACK FOOTER //
// tabbar.vue?c674a2da