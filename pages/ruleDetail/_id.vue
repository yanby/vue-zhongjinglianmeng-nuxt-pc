<template>
  <div class="systemDetail">
    <Nav :childLogin="login" @loginFun="myFun()"></Nav>
    <div class="content w1200">
      <div class="msg clearfix">
        <div class="left fl">
          <div class="title">
            <h3>{{leaderDetail.title}}</h3>
            <p><span>章程制度</span><b>{{leaderDetail.createTime}}</b>
              <!--<i class="myshou" @click="shoucang($event)">收藏</i>-->
            </p>
          </div>
          <div class="detail">
            <div class="txt" v-html="leaderDetail.content"></div>
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
        login: false
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
    },
    methods: {
      init(){
        axios({
          url: '/introduce/detail',
          method: "post",
          params:{
            id: this.$route.params.id,
            type: 5 //  5 章程制度详情
          }
        }).then(function(res){
          console.log(res)
          this.leaderDetail = res.data.institutionDetail;
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
                collectType: "6", //章程制度 6
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
                type: "6", //章程制度 6
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
  @import '../../assets/css/aboutDetail.less';
</style>
