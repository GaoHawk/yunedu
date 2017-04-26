<template>
        <div class="yearStyle">
        <mt-button size="normal"
                   type="default"
                   @click="tabTo('全部')">全部</mt-button>
        <mt-button size="normal"
                   type="default"
                   @click="tabTo('作业')">作业</mt-button>
        <mt-button size="normal"
                   type="default"
                   @click="tabTo('通知')">通知</mt-button>
      </div>
</template>
<style
  .yearStyle {
    text-align: center;
    margin-top: 12px;
  }
    
</style>
<script>
  import { mapState, mapActions } from 'vuex'
  import Bus from '../common/bus.js'
  export default {
     data(){
        return {
           name:'Top'
        }
     },
     computed:{
        ...mapState({
          title: state => state.title,
          path:state => state.path,
          prePath:state => state.prevPath,
          // 上传文件使用的间隔函数
          st:state => state.stoName,
          homework: state => state.homeworks,
          notice: state => state.notices,
        })
     },
     methods:{
        tabTo(msg) {
             this.$store.commit('SET_INDEX_STA', msg);

            this.$store.commit('ROUT_PATH','/home');
            this.$store.commit('SET_PREPATH','/home/pageNav');
            switch(msg)
            {
              case '全部':
              if(this.homework.length>15){

              }else{
                Bus.$emit('goToAll','hehe');
              }
              break;
              case '作业':
              if(this.homework.length>15){

              }else{
                Bus.$emit('goToHomework');
              }
              break;
              case '通知':
              if(this.notice.length>15){

              }else{
                Bus.$emit('goToNotice');
              }
              break;
            }

            
        },
     },
    activated(){
        if(this.path == '/home'){
           this.$store.commit('SET_INDEX_STA', '');
        }
    }
  }
</script>