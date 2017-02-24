<template>
  <div class="page-button">
  <mt-button type="default" @click.native="router_h">布置作业</mt-button>
  <mt-button type="primary" @click.native="router_n">发布通知</mt-button>
  </div>
</template>

<script>
import Bus from '../common/bus.js'
export default {
  name: 'button',

  methods:{
    router_h:function(event){
         this.$store.commit('NEW_TITLE','作业');
         // this.$parent.$router.push({path:'/foo'})
         this.$store.commit('ROUT_PATH','/foo');
         this.$parent.showHome = !this.$parent.showHome;

    },
    router_n:function(){
        this.$store.commit('NEW_TITLE','通知');
        this.$store.commit('ROUT_PATH','/bar')
        // this.$parent.$router.push({path:'/bar'})
        this.$parent.showHome = !this.$parent.showHome;
    }
  }
};
</script>

<style lang="css">

  @component-namespace page {
    @component button {
      padding: 0 15px 15px;

      @descendent group {
        margin-bottom: 15px;

        & > * {
          margin-bottom: 15px;
        }
      }
    }
  }
</style>
