<script>
  import VueHowler from 'vue-howler'

  export default {
    mixins: [VueHowler],
    filters:{
        durationFix:function(value){
            return value.toFixed(1);
        }
    }
  }
</script>

<template>
  <div>
    <button @click="togglePlayback">{{ playing ? 'Pause' : 'Play' }}</button>
     <span>{{ duration | durationFix }}s</span>
   <!-- <button @click="stop">Stop</button> -->
  </div>
</template>