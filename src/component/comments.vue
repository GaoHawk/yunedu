<template>
   <div>
     <child></child>
      <div class="panel-body">
         <div class="msg-list-body msg-content">
            <mt-cell  v-for="item in comments" :title="item.name +` :`" :value="item.content">
    
             </mt-cell>

         </div>
      </div>
      <div class="panel-footer">
        <div class="input-group">
           <input type="text" id="msg" placeholder="请输入评论内容" class="form-control" v-model="sendMsg">
            <span class="input-group-btn">
               <button id="sendMsg" type="button" class="btn btn-primary" @click="sendContent(sendMsg)">发送/Send</button>
            </span>
        </div>
      </div>
   </div>
</template>
<script>
 import { mapState } from 'vuex'
import Header from './header.vue'
   export default {
        created(){

        },
    
        computed: {
    
            ...mapState({
                homeworkId: state => state.comments_hid,
                userName: state => state.comments_name
            })
    
    
    
        },
    
        data() {
    
    
    
            return {
    
    
    
                loading: false,
    
    
    
                allLoaded: false,
    
                sendMsg:'',
    
                wrapper2Height: 0,
                
                comments:[
                    { name: 'hube',content:'123123' }
                    
                ]
    
    
    
            };
    
    
    
        },
        components:{
           'child':Header,

        },
        methods:{
            sendContent:function(value){
                let comment = {
                    name: this.userName,
                    content:value
                }
                this.comments.unshift(comment);
                this.sendMsg = '';
            }
        }
   }
</script>
<style>
    .panel-body{
        height:500px;
        width:100%;
        padding:8px;
        margin-top:25px;
    }
    .panel-footer{
        padding:5px 8px;
        background:#f5f5f5;
        border-top:1px solid #ddd;
        border-bottom-right-radius:3px;
        border-bottom-left-radius:3px;
        position:fixed;
        bottom:1px;
        width:96%;
    }
    .input-group{
        position:relative;
        display:table;
        border-collapse:separate;
        width:100%;
        text-align:center;
    }
    input.form-control{
        width:65%;
        border-radius:0;
        display:table-cell;
        position:relative;
        z-index:2;
        margin-bottom:0;
        height:34px;
        padding:6px 12px;
        font-size:14px;
        line-height:1/42857;
        color:#555;
        background:#fff;
        border:1px solid #ccc;
        box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);
        transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }
    .input-group-btn{
        position:relative;
        white-space:nowrap;
        width:1%;
        vertical-align:middle;
    }
    button.btn-primary{
        color:#fff;
        background:#428bca;
        border-color:#357ebd;
        border-style:solid;
        border-bottom-right-radius:5px;
        border-top-right-radius:5px;

    }
</style>