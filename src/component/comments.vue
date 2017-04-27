<template>
   <div>
      {{ homeworkId }}
   </div>
</template>
<script>
 import { mapState } from 'vuex'

   export default {
        created(){

        },
    
        computed: {
    
            ...mapState({
                homeworkId: state => state.comments_hid,
            })
    
    
    
        },
    
        data() {
    
    
    
            return {
    
    
    
                loading: false,
    
    
    
                allLoaded: false,
    
    
    
                wrapper2Height: 0
    
    
    
            };
    
    
    
        }
   }
</script>