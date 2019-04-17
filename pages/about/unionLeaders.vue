<template>
  <div class="unionLeaders">
    <Nav></Nav>
    <div class="content w1200">
      <AboutNav/>
      <div class="msg">
        <div class="zhuxi">
          <h2><span>荣誉主席</span> <b>| Honor Chairman</b><i></i></h2>
          <div class="zhuxi-msg">
            <ul class="cur">
              <li v-for="item in honerChairman" @click="chairmanFun(item)">
                <div class="img">
                  <img :src="item.img_path" alt="">
                  <div class="txt">
                    <h3>{{item.leader_name}}</h3>
                    <p>{{item.league_position}}</p>
                    <p>{{item.social_position}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="zhuxi">
          <h2><span>监事会及秘书处</span> <b>| Board of Supervisors and Secretariat</b><i></i></h2>
          <div class="zhuxi-msg">
            <ul class="cur">
              <li v-for="item in supervisors" @click="chairmanFun(item)">
                <div class="img">
                  <img :src="item.img_path" alt="">
                  <div class="txt">
                    <h3>{{item.leader_name}}</h3>
                    <p>{{item.league_position}}</p>
                    <p>{{item.social_position}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="zhuxi">
          <h2><span>主席团</span> <b>| Presidium</b><i></i></h2>
          <div class="zhuxi-msg">
            <ul>
              <li v-for="item in chairman" @click="chairmanFun(item)">
                <div class="img">
                  <img :src="item.img_path" alt="">
                  <!--<div class="txt">-->
                    <!--<h3>{{item.leader_name}}</h3>-->
                    <!--<p>{{item.social_position}}</p>-->
                  <!--</div>-->
                </div>
                <div class="txt">
                  <h3>{{item.leader_name}}</h3>
                  <p>{{item.league_position}}</p>
                  <p>{{item.social_position}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="lishi">
          <h2><span>常务理事</span> <b>| Standing director</b><i></i></h2>
          <div class="zhuxi-msg">
            <ul class="lishi">
              <li v-for="item in StandingDirector" @click="chairmanFun(item)">
                <div class="img">
                  <img :src="item.img_path" alt="">
                  <div class="txt">
                    <h3>{{item.leader_name}}</h3>
                    <p>{{item.league_position}}</p>
                    <p>{{item.social_position}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
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
          chairman : "",//主席
          StandingDirector: "",//常务理事
          honerChairman: "",//荣誉主席
          supervisors: "",//监事会
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
      methods: {
        init(){
          axios({
            url: '/introduce/selectLeaders',
            method: "post",
          }).then(function(res){
            console.log(res)
            this.chairman = res.data.chairman;
            this.StandingDirector = res.data.StandingDirector;
            this.honerChairman = res.data.honerChairman;
            this.supervisors = res.data.supervisors;

          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        chairmanFun(item){//主席
          window.open("/chairmanDetail/"+item.leader_type+"/"+item.id)
        },
        // honorFun(item){//荣誉主席
        //   window.open("/honorDetail/"+item.id)
        // },
        // boardFun(item){//监事会
        //   window.open("/boardDetail/"+item.id)
        // },
        // routineFun(item){
        //   window.open("/routineDetail/"+item.id)
        // }
      }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/aboutDetail.less';
</style>
