<template>
  <div class="systemDetail">
    <Nav :childLogin="login" @loginFun="myFun()"></Nav>
    <div class="content w1200">
      <div class="msg clearfix">
        <div class="left fl">
          <div class="title">
            <h3>{{leaderDetail.leader_name}}</h3>
            <p>
              <span v-if="leaderDetail.leader_type == 0">常务理事</span>
              <span v-else-if="leaderDetail.leader_type == 1">监事会</span>
              <span v-else-if="leaderDetail.leader_type == 2">荣誉主席</span>
              <span v-else-if="leaderDetail.leader_type == 3">主席</span>
              <span v-else>副秘书长</span>
              <b>{{leaderDetail.createTime}}</b>
              <!--<i class="myshou" @click="shoucang($event)">收藏</i>-->
            </p>
          </div>
          <div class="detail">
            <div v-if="type!=0" class="img"><img :src="leaderDetail.img_path" alt=""></div>
            <div v-if="type!=0" class="name">{{leaderDetail.leader_name}}</div>
            <p v-if="type!=0">{{leaderDetail.league_position}}</p>
            <p v-if="type!=0">{{leaderDetail.social_position}}</p>
            <div class="txt" v-html="leaderDetail.description"></div>
          </div>
        </div>
        <Sidebar></Sidebar>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
  import Nav from '~/components/Nav/Nav';
  import AboutNav from '~/components/Nav/AboutNav';
  import Footer from '~/components/Footer/Footer';
  import Sidebar from '~/components/Sidebar/Sidebar';
  export default {
    name: "",
    data() {
      return {
        leaderDetail:"",
        animate:true,
        txt:"",
        login: false,
        type: ""
      }
    },
    components: {
      Nav,
      Footer,
      AboutNav,
      Sidebar
    },
    mounted(){
      this.init();
      this.type = this.$route.params.type;
      console.log(this.type )
    },
    methods: {
      init(){
        axios({
          url: '/introduce/detail',
          method: "post",
          params:{
            id: this.$route.params.id,
            type: this.$route.params.type
          }
        }).then(function(res){
          console.log(res)
          this.leaderDetail = res.data.leaderDetail;
          if(res.data.isColleted.isCollected == 1){
            $(".myshou").addClass("cur");
          }
        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      },
      shoucang(e){// 点击收藏
        var that = this;
        if(localStorage.token){
          if($(e.srcElement).hasClass("cur")){//取消收藏
            axios({
              url: '/member/auth/cancelCollect',
              method: 'post',
              params: {
                collectType: this.$route.params.type, //新闻和公告都传 0 活动传1
                id: this.$route.params.id //收藏内容的id
              }
            }).then(res => {
              console.log(res);
              if(res.data.code == 101){
                $(".myshou").removeClass("cur");
                this.$message('取消收藏');
              }else{
                this.$message(res.data.message);
              }
            }).catch(err => {
              console.log(err)
            });
          }else{
            axios({
              url: '/member/auth/collect',
              method: 'post',
              params: {
                type: this.$route.params.type, //新闻和公告都传 0 活动传1
                id: this.$route.params.id //收藏内容的id
              }
            }).then(res => {
              console.log(res);
              if(res.data.code == 101){
                this.$message('收藏成功');
                $(".myshou").addClass("cur");
              }else{
                this.$message(res.data.message)
              }
            }).catch(err => {
              console.log(err)
            });
          }
        }else{
          this.login = true;
        }
      },
      myFun(){
        this.login = false;
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../../assets/css/aboutDetail.less';
</style>
