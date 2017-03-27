<template>
<div class="page-tabbar" >
  <div class="page-wrap">
    <div class="page-title"></div>
    <div>
      <ol class="breadcrumb">
        <li><a href="#">教师首页</a></li>
        <li><a href="#">2017</a></li>
        <li class="active">{{ selected }}</li>
      </ol>
    </div>
    <mt-tab-container class="page-tabbar-container" v-model="selected" @touchmove.native="hidetab">
      <mt-tab-container-item id="全部">
        <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <ul class="page-infinite-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <li v-for="item in list" class="page-infinite-listitem">
          <mt-cell v-if="item.title" :title="item.title"  :value="item.value?item.value:item.homeworks[0].first" @click.native="testclick" is-link>
          </li>
        </ul>
        <p v-show="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
          加载中...
        </p>
      </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="作业">
        <mt-cell v-for="m in homework" :title="m.title" :value="m.homeworks[0].first" @click.native="testclick" is-link/>
      </mt-tab-container-item>
      <mt-tab-container-item id="通知">
      <mt-cell v-for="n in notice" :title="n.title"  :value="n.value" @click.native="testclick(n.index)" is-link>
<!--          <p style="height:110px;text-indent:2em;">周三临时放假,大家不用到学校,周三临时放假,大家不用到学校,</p>
         <span style="color:#gray;position:absolute;right:5px;line-hight:80px;top:114px;">2月22日 星期二</span> -->

      </mt-cell>
      </mt-tab-container-item>

    </mt-tab-container>
  </div>
  <button class="diaphaneity" @click="showTab"></button>
  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="全部">
      <img slot="icon" src="../assets/person.png">
      全部
    </mt-tab-item>
    <mt-tab-item id="作业">
      <img slot="icon" src="../assets/find.png">
      作业
    </mt-tab-item>
    <mt-tab-item id="通知">
      <img slot="icon" src="../assets/search.png">
      通知
    </mt-tab-item>
  </mt-tabbar>
</div>

</template>
<script>
export default {
  name: 'page-tabbar',
  computed:{
     list:function(){
       return this.notice.concat(this.homework);
     }
  },
  data() {
    return {
      selected: '全部',
      notice:[
         { index:1, title:"高三通知", value:"临时放假"},
         { index:2,title:"高二通知",value:"下周期中考"},
         { index:3,title:"高一通知",value:"周四下午实践"}
      ],
      homework:[
         {title:"语文作业",homeworks:[
            {first:"抄《天马》两遍"},
            {second:"背诵课文"}
         ]},
         {title:"数学作业",homeworks:[
            {first:"几何体课后题"}
         ]}
      ],

      loading: false,
      allLoaded: false,
      wrapperHeight: 0
    };
  },
  methods:{
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list.length;
          console.log(last)
          if(last<40){

          }else{
            return;
          }
          for (let i = 1; i <= 10; i++) {
            var objj = { title:"高三通知", value:"临时放假"};
            this.list.push(objj);
          }
          this.loading = false;
        }, 2500);
      },
      showTab(){
          var mintTab = document.querySelector('.mint-tabbar.is-fixed');
          mintTab.style.setProperty('top','auto');
      },
      hidetab(){
          var mintTab = document.querySelector('.mint-tabbar.is-fixed');
          mintTab.style.setProperty('top','100%');
      },
      testclick(index){
        console.log(index)
        var data = this.notice[index]
        console.log(data)
        this.$parent.showHome = !this.$parent.showHome;
        this.$store.commit('SET_DATA',data)
         this.$store.commit('NEW_TITLE','通知');
         this.$store.commit('ROUT_PATH','/notice')

      }
  },
  mounted(){
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      for (let i = 1; i <= 20; i++) {
        var obj = { title:"高三通知", value:"临时放假"};
        this.list.push(obj);
      }
  }
};
</script>
<style>
   /*cell 自定义样式*/
   .mint-cell-title{
      min-width: 70px;
   }
   .mint-cell-value{
       width:80%;
   }
   /*底部栏动画*/
   .mint-tabbar.is-fixed{
      top:100%;
   }
  .diaphaneity{
     width: 100%;
     filter:alpha(opacity=0);
     -moz-opacity:0;
     -khtml-opacity: 0;
     opacity: 0;
     height: 30px;
     position: fixed;
     z-index: 1;
     right:0;
     bottom: 0;
     left: 0;
  }
  /*无线滚动样式*/
  .mint-tab-container{
     /*top:-35px;*/
     /*bottom: 35px;*/
  }
/*  .hold{
     height: 35px;
     width: 100%;
  }*/
  .page-infinite-list{
      margin:0;
  }
  .page-infinite-loading div{
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
  }
  .page-infinite-wrapper{
     margin-top:-1px;
     /*margin-bottom: 55*/
     overflow: scroll;
  }
  .page-infinite-loading{
      text-align: center;
      height: 40px;
      line-height: 25px;
      margin:0;
  }
  .page-infinite-listitem{
      width: 100%;
      height:50px;
      line-height:50px;
  }
  .page-infinite-desc,
  .page-infinite-listitem{
      text-align: center;
      border-bottom: 1px solid #eee;
      margin: 0;
  }
  .breadcrumb>.active{
     color:#777;
  }
  .breadcrumb>li+li:before{
      padding:0 5px;
      box-sizing: border-box;
      color:#ccc;
      content:"/\00a0";
  }
  .breadcrumb>li>a {
     color:#337ab7;
     text-decoration: none;
  }
  .breadcrumb>li{
     display: inline-block;
  }
  .breadcrumb{
    margin-top:0;
    padding:8px 15px;
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
