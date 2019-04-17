<template>
<section class="container">
<!-- <nav-bar/ :childLogin="login" @loginFun="showLoginFun()"> -->
<nav-bar :childLogin="login" @loginFun="showLoginFun()"></nav-bar>
<div class="newsDetails">
    <div class="newsDetailsMain clearfix">
        <div class="newsDetailsL">
            <div class="newsDetailsNav">
                <h1>{{newsDetailsObj.title}}</h1>
                <ul>
                    <li class="firstLi" v-if="newsDetailsObj.information_type == 0">联盟新闻</li>
                    <li class="firstLi" v-else>联盟公告</li>
                    <li>{{newsDetailsObj.createTime}}</li>
                    <li>
                        收藏
                        <img src="~/assets/images/common/shoucang.png" @click="collectBtn()" v-if="collectId == 0">
                        <img src="~/assets/images/common/shoucang-bg.png" @click="cancelCollectBtn()" v-else>
                    </li>
                </ul>
            </div>
            <div class="newsDetailsInfo">
                <div v-html="newsDetailsObj.content"></div>
            </div>
        </div>
        <div class="announcementMainR">
            <HotArticle></HotArticle>
        </div>
    </div>
</div>
<Footer></Footer>
</section>
</template>

<script>
import axios from '~/plugins/axios.js';
import NavBar from '~/components/Nav/Nav.vue';
import Footer from '~/components/Footer/Footer';
import HotArticle from '~/components/Sidebar/HotArticle.vue';
export default {
  head () {
    return {
      title: '中经联盟',
      meta: [
        { hid: 'description', name: 'description', content: '中经联盟' },
        { hid: 'title', name: 'title', content: '中经联盟' },
        { hid: 'keywords', name: 'keywords', content: '中经联盟' }
      ]
    }
  },
  data(){
    return{
        listArr:[],
        newsDetailsObj: {},
        collectId: 0, // 0 未收藏 1 已收藏
        login: false,
    }
  },
  components: {
    NavBar,
    Footer,
    HotArticle,
  },
  methods:{   
    listData() {
        let _this = this
        axios({
            url: '/information/detail',
            method: 'post',
            params: {
                id: this.$route.params.id,
            }
        }).then(data => {
            console.log(data);
            this.newsDetailsObj = data.data.informationDetail;
            this.collectId = data.data.informationDetail.is_collect;
        }).catch(err => {
            console.log(err)
        });
    },

    // 点击收藏按钮
    collectBtn(){
        if(!localStorage.token){
           this.login = true;
        }else{
            let _this = this
            axios({
                url: '/member/auth/collect',
                method: 'post',
                params: {
                    type: "0", //新闻和公告都传 0 活动传1
                    id: this.$route.params.id,//收藏内容的id
                }
            }).then(data => {
                console.log(data);
                if(data.data.code == 101){
                    this.collectId = 1;
                    this.$message({
                        message: '收藏成功',
                        type: 'success'
                    });
                }else{
                    this.$message.error(data.data.message);
                }
            }).catch(err => {
                console.log(err)
            });
        }
    },

    // 点击取消收藏
    cancelCollectBtn(){
        if(!localStorage.token){
            this.login = true;
        }else{
            let _this = this;
            axios({
                url: '/member/auth/cancelCollect',
                method: 'post',
                params: {
                    collectType: "0", //新闻和公告都传 0 活动传1
                    id: this.$route.params.id,//收藏内容的id
                }
            }).then(data => {
                console.log(data);
                if(data.data.code == 101){
                    this.collectId = 0;
                    this.$message({
                        message: '取消收藏',
                        type: 'success'
                    });
                }else{
                    this.$message.error(data.data.message);
                }
            }).catch(err => {
                console.log(err)
            });
        }
    },

    showLoginFun(){
        this.login = false;
    }

  },
  mounted() {
    this.listData();
  },
  created() {

  },
}
</script>
<style lang="less" type="text/less" scoped>
.clearfix:before,.clearfix:after {
  content:"";
  display:table;
}
.clearfix:after{clear:both;}
.clearfix{
  *zoom:1;/*IE/7/6*/
}
.newsDetails{
    width: 100%;
    background: #fff;
    padding-top: 20px;
    padding-bottom: 80px;
}
.newsDetailsMain{
    width: 1200px;
    margin: 0 auto;
}
.newsDetailsL{
    width: 945px;
    overflow: hidden;
    float: left;
    .newsDetailsNav{
        width: 945px;
        height: 80px;
        margin-top: 10px;
        border-bottom: 1px solid #eaeae8;
        h1{
            color: #333;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 14px;
        }
        ul{
            height: 20px;
            li{
                float: left;
                margin-right: 20px;
                color: #898989;
                font-size: 16px;
                img{
                    position: relative;
                    top: -2px;
                    left: 2px;
                }
            }
            .firstLi{
                color: #3c915c;
            }
        }
    }
    .newsDetailsInfo{
        margin: 50px 0;
    }
}
/*右边盒子*/
.announcementMainR{
    width: 234px;
    float: right;
}
</style>
<style type="text/css">
.newsDetailsInfo >>> img{
    max-width: 945px;
}
</style>

