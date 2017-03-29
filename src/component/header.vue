<template>
  <mt-header :title="title">
    <div slot="left" >
      <mt-button icon="back" @click.native="back"></mt-button>
    </div>
    <mt-button slot="right" icon="more"></mt-button>
  </mt-header>
</template>
<script>
  import Bus from '../common/bus.js'
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
          prevPath:state => state.prevPath
        })
     },
     methods:{
        back:function(){
           // console.log(this);
           console.log('back')
           this.$store.commit('SET_PREPATH',this.path);
           this.$store.commit('ROUT_PATH',this.prevPath);
           console.log(this.$store)
           // this.$router.go(-1);
          //  this.$store.commit('GO_BACK');
          //  this.$store.commit('SET_HOME',true);
          //  sessionStorage.showHome = true;
        },
        setTitle:function(){

        }
     },
     destroyed(){
         const path = this.$router.currentRoute.path;

         this.$store.commit('GET_CURRENTROUTER',path)
     }
  }
</script>
