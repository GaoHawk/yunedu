<template>
   <div>
     <child></child>
      <div class="panel-body">
        <div class="page-infinite-wrapper" ref="wrapper3" :style="{ height: wrapper3Height + 'px' }">
        
            <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        
                <li v-for="n in commentsData" class="page-infinite-listitem">
        
                    <mt-cell :title="n.user_name+`:`" :value="n.content" >
        
                    </mt-cell>
        
                </li>
        
            </ul>
        
            <p v-show="loading" class="page-infinite-loading">
        
        
                <mt-spinner type="fading-circle"></mt-spinner>
        
        
                加载中...
        
            </p>
        
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
 import Bus from '../common/bus.js'
   export default {
        created(){

        },
    
        computed: {
    
            ...mapState({
                homeworkId: state => state.comments_hid,
                userName: state => state.comments_name,
                commentsPage: state => state.comment_page,
                commentEnd: state => state.commentEnd,
                commentsData: state => state.comments
            })
    
    
    
        },
    
        data() {
    
    
    
            return {
    
    
    
                loading: false,
    
                userId: '236942',

    
                allLoaded: false,
    
                sendMsg:'',
    
                wrapper3Height: 0,
                
                comments:[
                    { name: 'hube',content:'123123' }
                    
                ],

                pageSize:3,

                starting_before:''
    
    
    
            };
    
    
    
        },
        components:{
           'child':Header,

        },
        methods:{
            loadMore(){
                console.log('load comments');
    
                if(!this.commentEnd){
                    this.loading = true;
                    var commentsNum = this.commentsPage?this.commentsPage:1;
                    var start_bf = this.starting_before;
                    console.log(start_bf);
                    var hid = this.homeworkId;
                    this.$http.get('/commentList_appweb',{
                        // headers:{"X-Session":session},
                        params: {
                        homework_id: hid,
                        pageSize: 3,
                        starting_after:start_bf
                        }
                    }).then(response => {
                        console.log(response);
                        this.starting_before = response.data.pagination.ending_before;
                        if(start_bf){
                            for (let i = 0;i< response.data.data.length; i++) {
                                this.$store.commit('PUSH_COMMENT_LIST', response.data.data[i]);
                            }
                        }

                        let noticeLen = response.data.data.length;
                        console.log(noticeLen)
                        if(noticeLen <3){
                            this.$store.commit('SET_COMMENT_END',true);
                        }
                        // this.$store.commit('SET_COMMENT_PAGE',commentsNum+1);
                        this.loading = false;

                    }, response => {
                        // this.$store.commit('OPEN_DIALOG1');
                        // this.$store.commit('SET_RESPONSE', '提交失败')
                        console.log(response)
                    })
                }else{
                    console.log(this.commentEnd);
                    return;
                }
            },
            sendContent:function(value){
                let now = new Date();
                var dateStr = now.toLocaleString();
                let comment = {
                    user_name: this.userName,
                    create_time:dateStr,
                    id:this.userId,
                    homework_id:this.homeworkId,
                    content:value
                }
                var hid = this.homeworkId;
                var uid = this.userId;
                this.$store.commit('SET_COMMENT_CONTENT', comment);
                console.log(comment);
                this.sendMsg = '';
                this.$http({
                    method: 'post',
                    url:'/sendComment',
                    data:{
                        homework_id:hid,
                        user_id:uid,
                        content:value
                    },
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {
                    console.log(response);

                }, response => {
                    // this.$store.commit('OPEN_DIALOG1');
                    // this.$store.commit('SET_RESPONSE', '提交失败')
                    console.log(response)
                })
            }
        },
        mounted() {
            this.wrapper3Height = document.documentElement.clientHeight - this.$refs.wrapper3.getBoundingClientRect().top - 60;
    
    
        },
        activated(){
            // this.$refs.myUnique.dropzone.removeAllFiles(true);
            console.log(this.commentsData);
            console.log(this.homeworkId);
            if(this.commentsData.length>0 && (this.commentsData[0].homework_id==this.homeworkId)){
                console.log(123);
                this.loadMore();
            }else{
                this.$store.commit('CLEAR_OUT_CONTENT');
                 this.$store.commit('SET_COMMENT_END',false);
                this.loadMore();
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