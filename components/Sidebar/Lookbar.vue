<template>
  <div class="right fr">
      <!-- 活动 -->
    <div class="activity">
      <div class="activityTop">
        <img src="~/assets/images/common/activityIcom.png" class="activityIcom">
        <h2>活动</h2>
      </div>
      <dl v-for="(item,index) in activityArr" @click="activeFun(item)">
        <img :src="item.img_path" v-if="index == 0">
        <dt>{{item.title}}</dt>
        <dd>{{item.create_time}}</dd>
      </dl>
    </div>
    <!-- 热文 -->
    <div class="hotArticle">
      <div class="hotArticleTop">
        <img src="~/assets/images/common/wenzhang.png" class="hotArticleTopIcom">
        <h2>热文</h2>
      </div>
      <dl v-for="(item,index) in hotArticleArr" @click="articleFun(item)">
        <dt><img :src="item.img_path"></dt>
        <dd>{{item.title}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
    export default {
        data() {
            return {
              activityArr: [], //活动列表
              hotArticleArr: [], //热文列表
            }
        },
        mounted(){
          this.init();
        },
        methods: {
          init() {
            axios({
              url: '/information/selectInformationShowPC',
              method: 'post',
            }).then(res => {
              console.log(res);
              this.activityArr = res.data.informationShowList.activityList;
              this.hotArticleArr = res.data.informationShowList.hotInfoList;
            }).catch(err => {
              console.log(err)
            });
          },
          activeFun(item){
            window.open("/activityDetail/"+item.id)
          },
          articleFun(item){
            window.open("/news/newsDetails/"+item.id)
          }
        }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/aboutDetail.less';
</style>
