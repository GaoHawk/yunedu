<template>
    <div>
      <Btn></Btn>
      <mt-radio 
                title="选择学年信息"
                v-model="value"
                :options="options"
                @change.native="clickR(value)"
                class="custom-radio">
      </mt-radio>
    </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import Btn from './button.vue'
  export default {
     data(){
        return {
           name:'Top',
           options:['2017','2016','2015'],
           value:''
        }
     },
     components: { Btn },
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
        clickR(value){
            console.log(value);
            let store = this.$store;

            var mintTab = document.querySelector('.mint-tabbar.is-fixed');
            mintTab.style.setProperty('top', 'auto');

             store.commit('SET_YEAR',value);
             store.commit('SET_INDEX_STA', '');
             store.commit('SET_YEAR_ACTIVE',false);
            setTimeout(function(){
                store.commit('ROUT_PATH','/home/pageNav');
                store.commit('SET_PREPATH','/home/yearIndex');
            },500) 
       
        }
     },
    activated(){
       this.value = '';
    }
  }
</script>
<style >
   div.custom-radio div.mint-cell-title {
    min-width: 100%;
  }
</style>