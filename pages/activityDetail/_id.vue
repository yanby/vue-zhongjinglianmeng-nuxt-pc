<template>
  <div class="activityDetail">
    <Nav :childLogin="login" @loginFun="myFun()"></Nav>
    <div class="download" v-if="download"><span @click="download=false"></span></div>
    <div class="content w1200">
      <div class="msg">
        <div class="title">
          <div class="left">
            <img :src="activityDetail.img_path" alt="">
          </div>
          <div class="right">
            <h3>{{activityDetail.title}}</h3>
            <p>地点：{{activityDetail.location}}</p>
            <p>时间：{{activityDetail.create_time}}</p>
            <p>票种：<span v-if="activityDetail.cost=='免费'"></span><b v-else>{{activityDetail.cost}}</b></p>
            <div class="baoming">
              <span class="myshou" @click="shoucang($event)"></span> <i v-if="activityDetail.status == 0" @click="download=true">报名</i> <i v-else="activityDetail.status == 1" class="cur">报名</i>
            </div>
          </div>
        </div>
        <!--<div class="pingpai">-->
          <!--<div class="swiper-container">-->
            <!--<div class="swiper-wrapper">-->
              <!--<div class="swiper-slide">Slide 1</div>-->
              <!--<div class="swiper-slide">Slide 2</div>-->
              <!--<div class="wiper-slide">Slide 3</div>-->
              <!--<div class="swiper-slide">Slide 4</div>-->
              <!--<div class="swiper-slide">Slide 5</div>-->
              <!--<div class="swiper-slide">Slide 6</div>-->
              <!--<div class="swiper-slide">Slide 7</div>-->
              <!--<div class="swiper-slide">Slide 8</div>-->
              <!--<div class="swiper-slide">Slide 9</div>-->
              <!--<div class="swiper-slide">Slide 10</div>-->
            <!--</div>-->
            <!--&lt;!&ndash; Add Pagination &ndash;&gt;-->
            <!--&lt;!&ndash; Add Arrows &ndash;&gt;-->
            <!--<div class="swiper-button-next"></div>-->
            <!--<div class="swiper-button-prev"></div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div class="detail">
        <h3><span :class="{'cur':tab==1}" @click="tab=1"><b></b>活动详情</span><span :class="{'cur':tab==2}" @click="tab=2"><b></b>报名须知</span></h3>
        <ul class="xuzhi">
          <li v-if="tab==1">
            <div v-html="activityDetail.content"></div>
          </li>
          <li v-if="tab==2">
            <div v-html="activityDetail.instructions"></div>
          </li>
        </ul>
        <div class="queding">
          <h4>已报名（{{totalCount}}）</h4>
          <ul>
            <li v-for="item in activityList">
              <div class="img"><img :src="item.img_path" alt="" :onerror="defaultImg"></div>
              <div class="name">{{item.memberName}}</div>
              <div class="time">{{item.create_time}}</div>
            </li>
          </ul>
          <div class="more" @click="moreFun()">展开更多报名</div>
        </div>
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
    export default {
      name: "",
      data() {
        return {
          login: false,
          totalCount:"",
          tab: 1,
          pageSize : 8,
          pageNum: 1,
          activityDetail: "",//活动详情
          activityList: "",//报名人数
          download: false,//下载弹窗
          defaultImg: 'this.src="' + require('../../assets/images/mine/user.png') + '"'
        }
      },
      components: {
        Nav,
        Footer,
        AboutNav
      },
      mounted(){
        this.swiper();
        this.init();
      },
      methods: {
        init(){
          axios({
            url: '/activity/selectActivityDetail',
            method: "post",
            params: {
              id: this.$route.params.id,
              type : 1,
              pageSize: this.pageSize,
              pageNum: this.pageNum
            }
          }).then(function(res){
            console.log(res)
            this.activityDetail  = res.data.activityDetail;
            this.activityList  = res.data.activityList;
            this.totalCount =  res.data.totalCount;
            if(this.activityDetail.is_collect == 1){
              $(".myshou").addClass("cur");
            }
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        swiper(){
          var swiper = new Swiper('.swiper-container', {
            slidesPerView: 6,
            spaceBetween: 30,
            slidesPerGroup: 6,
            loop: true,
            loopFillGroupWithBlank: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        },
        moreFun(){
          this.pageNum++;
          axios({
            url: '/activity/selectActivityDetail',
            method: "post",
            params: {
              id: this.$route.params.id,
              type : 1,
              pageSize: this.pageSize,
              pageNum: this.pageNum
            }
          }).then(function(res){
            console.log(res)
            if(res.data.activityList.length){
              this.activityList = this.activityList.concat(res.data.activityList);
            }else{
              this.$message('没有更多数据了');
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
                  collectType: "1", //新闻和公告都传 0 活动传1
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
                  type: "1", //新闻和公告都传 0 活动传1
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
  @import '../../assets/css/activity.less';
</style>
