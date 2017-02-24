<template>
  <mt-header :title="name">
    <div slot="left" >
      <mt-button icon="back" @click.native="back"></mt-button>
    </div>
    <mt-button slot="right" icon="more"></mt-button>
  </mt-header>
</template>
<script>
  import Bus from '../common/bus.js'

  export default {
     data(){
        return {
           name:'Top'
        }
     },
     methods:{
        back:function(){
           console.log(this);
           console.log('back')
           this.$router.go(-1);
           this.$parent.$parent.showHome = !this.$parent.$parent.showHome;
           sessionStorage.showHome = this.$parent.$parent.showHome;
        },
        setTitle:function(){

        }
     }

  }
</script>
