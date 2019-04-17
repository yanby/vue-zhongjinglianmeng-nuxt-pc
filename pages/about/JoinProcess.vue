<template>
  <div class="JoinProcess">
    <Nav></Nav>
    <div class="content w1200">
      <AboutNav/>
      <div class="msg">
        <div class="liucheng">
          <h2><span>入会流程</span> <b>| Process</b><i></i></h2>
          <div class="liucheng-msg"></div>
        </div>
        <div class="shoufei">
          <h2><span>收费标准</span> <b>| Standard</b><i></i></h2>
          <div class="shoufei-msg"></div>
          <div class="shoufei-txt">
            会费标准需对应会员权益。会员分类为开发商会员和非开发商会员。开发商会员企业原则上是给予过联盟赞助合作的企业，联盟对其提供企业服务。非开发商常务理事，首年入会12000，次年以后年费6000。享有联盟活动的参与权。非开发商企业会员，赞助联盟专委会的企业，联盟为其提供企业服务。
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Nav from '~/components/Nav/Nav';
  import AboutNav from '~/components/Nav/AboutNav';
  import Footer from '~/components/Footer/Footer';
    export default {
      name: "",
      data() {
        return {}
      },
      components: {
        Nav,
        Footer,
        AboutNav
      },
      mounted(){
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
        navBack() {
            this.$router.push({path: "/"})
        }
      },
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/aboutDetail.less';
</style>
