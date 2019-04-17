<template>
  <div class="cooperation">
    <Nav></Nav>
    <div class="content w1200">
      <AboutNav/>
      <div class="msg">
        <ul>
          <li v-for="item in strategicCooperationList" @click="goFun(item)">
            <div class="img">
              <img :src="item.img_path" alt="">
            </div>
            <div class="txt">
              <h3>{{item.title}}</h3>
              <p>{{item.digest}}</p>
            </div>
          </li>
        </ul>
        <div class="more" @click="moreFun()">浏览更多</div>
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
          strategicCooperationList: "",
          pageSize: 8,
          pageNum: 1,
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
            url: '/introduce/selectStrategicCooperation',
            method: "post",
            params: {
              pageSize: this.pageSize,
              pageNum: this.pageNum
            }
          }).then(function(res){
            console.log(res)
            this.strategicCooperationList  = res.data.strategicCooperationList;
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        moreFun(){
          this.pageNum++;
          axios({
            url: '/introduce/selectStrategicCooperation',
            method: "post",
            params: {
              pageSize: 4,
              pageNum: this.pageNum
            }
          }).then(function(res){
            console.log(res)
            if(res.data.strategicCooperationList.length){
              this.strategicCooperationList = this.strategicCooperationList.concat(res.data.strategicCooperationList);
            }else{
              this.$message('没有更多数据了');
            }
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        goFun(item){
          window.open("/reviewDetail/"+item.id)
        }
      }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/aboutDetail.less';
</style>
