<template>
  <div class="activity">
    <Nav></Nav>
    <div class="content w1200">
      <div class="huodong">
        <h2></h2>
        <ul>
          <li v-for="item in activityList" @click="activityDetailFun(item)">
            <div class="img">
              <img :src="item.img_path" alt="">
            </div>
            <h3>{{item.title}}</h3>
            <div class="txt">
              <span v-if="item.status==0">进行中</span>
              <span class="cur" v-else-if="item.status==1">已结束</span>
              <div class="time"><b></b>{{item.create_time}} </div>
            </div>
          </li>
        </ul>
        <div class="more" @click="moreFun1()">更多活动</div>
      </div>
      <div class="huigu">
        <h2></h2>
        <ul>
          <li v-for="item in activityReviewList" @click="ReviewDetailFun(item)">
            <div class="img">
              <img :src="item.img_path" alt="">
            </div>
            <p>{{item.title}}</p>
          </li>
        </ul>
        <div class="more" @click="moreFun2()">更多回顾</div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
  import Nav from '~/components/Nav/Nav';
  import Footer from '~/components/Footer/Footer';
    export default {
      name: "",
      data() {
        return {
          activityList:"",//活动
          activityReviewList: "",//回顾
          pageSize1: 8,
          pageNum1: 1,
          pageSize2: 8,
          pageNum2: 1
        }
      },
      components: {
        Nav,
        Footer,
      },
      mounted(){
        this.activityFun();//活动
        this.selectFun();//回顾
      },
      methods: {
        activityFun(){
          axios({
            url: '/activity/selectActivityList',
            method: "post",
            params: {
              pageSize: this.pageSize1,
              pageNum: this.pageNum1,
              type: 1
            }
          }).then(function(res){
            console.log(res)
            this.activityList  = res.data.activityList;
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        moreFun1(){
          this.pageNum1++;
          axios({
            url: '/activity/selectActivityList',
            method: "post",
            params: {
              pageSize: this.pageSize1,
              pageNum: this.pageNum1,
              type: 1 //活动
            }
          }).then(function(res){
            console.log(res)
            if(res.data.activityList.length){
              this.activityList  = this.activityList.concat(res.data.activityList);
            }else{
              this.$message('没有更多数据了');
            }
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        activityDetailFun(item){
          window.open("/activityDetail/"+item.id)
        },
        selectFun(){
          axios({
            url: '/activity/selectActivityReviewList',
            method: "post",
            params: {
              pageSize: this.pageSize2,
              pageNum: this.pageNum2,
            }
          }).then(function(res){
            console.log(res)
            this.activityReviewList  = res.data.activityReviewList;
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        moreFun2(){
          this.pageNum2++;
          axios({
            url: '/activity/selectActivityReviewList',
            method: "post",
            params: {
              pageSize: this.pageSize2,
              pageNum: this.pageNum2,
            }
          }).then(function(res){
            console.log(res)
            if(res.data.activityReviewList.length){
              this.activityReviewList  = this.activityReviewList.concat(res.data.activityReviewList);
            }else{
              this.$message('没有更多数据了');
            }
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        ReviewDetailFun(item){
          window.open("/lookbackDetail/"+item.id)
        }
      }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/activity.less';
</style>
