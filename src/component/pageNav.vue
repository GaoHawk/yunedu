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
          st:state => state.stoName
        })
     },
     methods:{
        tabTo(msg) {
             this.$store.commit('SET_INDEX_STA', msg);

            this.$store.commit('ROUT_PATH','/home');
            this.$store.commit('SET_PREPATH','/home/pageNav');
       
        },
     },
    activated(){
        if(this.path == '/home'){
           this.$store.commit('SET_INDEX_STA', '');
        }
    }
  }
</script>