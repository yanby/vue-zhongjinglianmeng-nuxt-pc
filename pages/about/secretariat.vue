<template>
  <div class="secretariat">
    <Nav></Nav>
    <div class="content w1200">
      <AboutNav/>
      <div class="msg">
        <div class="jiagou">
          <h2><span>秘书处架构</span> <b>| Framework</b><i></i></h2>
          <div class="jiagou-msg"></div>
        </div>
      </div>
    </div>
    <div class="zhidu">
      <div class="w1200">
        <h2><span>秘书处制度</span> <b>| System</b><i></i></h2>
        <div class="zhidu-msg">
          <ul>
            <li v-for="item in secretariat" @click="goFun(item)">
              <div class="img"><img src="../../assets/images/about/txt.png" alt=""></div>
              <div class="txt">
                <h3>{{item.title}}</h3>
                <p>{{item.abstracts}}</p>
              </div>
            </li>
          </ul>
          <div class="more" @click="moreFun()">查看更多</div>
        </div>
      </div>
    </div>
    <div class="renwu w1200">
      <h2><span>副秘书长</span> <b>| Secretary</b><i></i></h2>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="item in secret" class="swiper-slide" @click="secretaryFun(item)">
            <div class="img">
              <img :src="item.img_path" alt="">
            </div>
            <p>{{item.leader_name}}</p>
          </div>
        </div>
        <!-- Add Pagination -->
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
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
          pageSize: 4,
          pageNum: 1,
          secretariat: "",//秘书处制度
          secret : "",//副秘书长列表
        }
      },
      components: {
        Nav,
        Footer,
        AboutNav
      },
      mounted(){
        this.init();
      },
      updated(){
        var swiper = new Swiper('.swiper-container', {
          slidesPerView: 5,
          spaceBetween: 30,
          slidesPerGroup: 5,
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
      methods: {
        init(){
          axios({
            url: '/introduce/selectSecretariat',
            method: "post",
            params: {
              pageSize: this.pageSize,
              pageNum: this.pageNum
            }
          }).then(function(res){
            console.log(res)
            this.secret  = res.data.secret ;
            this.secretariat  = res.data.secretariat;
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        goFun(item){
          window.open("/secretariatDetail/"+item.id)
        },
        secretaryFun(item){
          window.open("/chairmanDetail/"+item.leader_type+"/"+item.id)
        },
        moreFun(){
          this.pageNum++;
          axios({
            url: '/introduce/selectSecretariat',
            method: "post",
            params: {
              pageSize: 4,
              pageNum: this.pageNum
            }
          }).then(function(res){
            console.log(res)
            if(res.data.secretariat.length){
              this.secretariat = this.secretariat.concat(res.data.secretariat);
            }else{
              this.$message('没有更多数据了');
            }
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
      },
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/aboutDetail.less';
</style>
