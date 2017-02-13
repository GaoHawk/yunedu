<template>
<div class="page-tabbar">
  <div class="page-wrap">
    <div class="page-title"></div>
    <div>
      <mt-cell class="page-part" title="当前选中" :value="selected" />
      <ol class="breadcrumb">
        <li><a href="#">教师首页</a></li>
        <li><a href="#">2017</a></li>
        <li class="active">{{ selected }}</li>
      </ol>
    </div>

    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="全部">
        <mt-cell v-for="n in 10" :title="'全部 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="作业">
        <mt-cell v-for="n in 5" :title="'作业 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="通知">
        <mt-cell v-for="n in 7" :title="'通知 ' + n" />
      </mt-tab-container-item>

    </mt-tab-container>
  </div>

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
  data() {
    return {
      selected: '全部'
    };
  }
};
</script>
<style>
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
    margin-bottom: 20px;
    list-style: none;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }
</style>
