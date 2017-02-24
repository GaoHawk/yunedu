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
          title: state => state.title
        })
     },
     methods:{
        back:function(){
           // console.log(this);
           console.log('back')
           // this.$router.go(-1);
           this.$store.commit('GO_BACK');
           this.$parent.$parent.showHome = !this.$parent.$parent.showHome;
           sessionStorage.showHome = this.$parent.$parent.showHome;
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
