<template>
  <div class="mine">
    <Nav></Nav>
    <div class="content w1200">
      <MineNav></MineNav>
      <div class="favorite">
        <ul>
          <li v-for="item in collectList" @click="goFun(item)">
            <span @click.stop="removeFun(item)"></span>
            <h4>{{item.title}}</h4>
            <p>{{item.createTime}}</p>
          </li>
        </ul>
        <div class="nodata" v-if="collectList.length==0">暂无数据</div>
        <div class="page" v-if="page">
          <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="pageSize" :total="totalCount" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
  import Nav from '~/components/Nav/Nav';
  import MineNav from '~/components/Nav/MineNav';
  import AboutNav from '~/components/Nav/AboutNav';
  import Footer from '~/components/Footer/Footer';
    export default {
      name: "",
      data() {
        return {
          page: true,
          pageSize: 3,//条数
          pageNum: 1,//第几页
          curPage: 1,//初始化第几页
          totalCount:0,//铺源总数
          collectList: "",//收藏
        }
      },
      components: {
        Nav,
        Footer,
        AboutNav,
        MineNav
      },
      mounted(){
        this.init();
      },
      methods: {
        init(){
          axios({
            url: '/member/auth/selectCollectList',
            method: "post",
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize
            }
          }).then(function(res){
            console.log(res)
            if(res.data.code=="101"){
              if(res.data.collectList.length){
                this.collectList = res.data.collectList;
                this.totalCount = Number(res.data.totalCount);
              }else{
                this.page = false;
              }
            }else{
              Toast(res.data.message)
            }
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        removeFun(item){
          axios({
            url: "/member/auth/cancelCollect",
            method: "post",
            params: {
              id: item.collect_id,
              collectType: item.collect_type
            }
          }).then(function(res){
            console.log(res);
            if(res.data.code=="101"){
              this.$message("删除成功！")
              this.init();
            }else{
              this.$message(res.data.message)
            }
          }.bind(this)).catch(function(err){
            console.log("收藏页面错误：",err)
          })
        },
        handleCurrentChange(val){//分页
          console.log(val)
          this.pageNum = val;
          this.init();
          $('html,body').animate({scrollTop: 100},100);
        },
        goFun(item){
          //0新闻和公告都传 0 活动报名1 活动精彩回顾 2 联盟领导 3 秘书处 4 战略合作 5 章程制度 6
          if(item.collect_type == 0){
            window.open("/news/newsDetails/"+item.collect_id)
          }else if(item.collect_type == 1){
            window.open("/activityDetail/"+item.collect_id)
          }else if(item.collect_type == 2){
            window.open("/lookbackDetail/"+item.collect_id)
          }else if(item.collect_type == 3 || item.collect_type ==4){
            window.open("/chairmanDetail/"+item.collect_type+"/"+item.collect_id)
          }else if(item.collect_type == 5){
            window.open("/reviewDetail/"+item.collect_id)
          }else if(item.collect_type == 6){
            window.open("/ruleDetail/"+item.collect_id)
          }
        }
      }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/mine.less';
</style>
