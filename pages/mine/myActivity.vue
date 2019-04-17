<template>
  <div class="mine">
    <Nav></Nav>
    <div class="content w1200">
      <MineNav></MineNav>
      <div class="activity">
        <ul>
          <li v-for="item in activityAuditLis" @click="goFun(item)">
            <span v-if="item.flag==2">{{item.status}}</span>
            <span v-else class="cur">{{item.status}}</span>
            <h4>{{item.title}}</h4>
            <p>{{item.create_time}}</p>
          </li>
        </ul>
        <div class="nodata" v-if="activityAuditLis.length==0">暂无数据</div>
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
          activityAuditLis: "",//收藏
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
            url: '/member/auth/selectActivityAuditList',
            method: "post",
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize
            }
          }).then(function(res){
            console.log(res)
            if(res.data.code=="101"){
              if(res.data.activityAuditLis.length){
                this.activityAuditLis = res.data.activityAuditLis;
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
          console.log(item)
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
          $('html,body').animate({scrollTop: 100},100);
        },
        goFun(item){
          window.open("/activityDetail/"+item.id)
        }
      }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/mine.less';
</style>
