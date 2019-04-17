<template>
  <div class="mine">
    <div class="download" v-if="download"><span @click="download=false"></span></div>
    <Nav></Nav>
    <div class="content w1200">
      <MineNav></MineNav>
      <div class="order">
        <h3><span :class="{'cur':tab==1}" @click="tab1Fun()"><b></b>未支付</span><span :class="{'cur':tab==0}" @click="tab0Fun()"><b></b>已支付</span></h3>
        <ul>
          <li v-for="item in orderList">
            <b v-if="item.pay_status == 0" class="cur">已支付</b>
            <b v-else-if="item.pay_status == 2" class="cur">已退款（审核未通过）</b>
            <span v-else-if="item.pay_status == 1" class="cur" @click="download=true">支付</span>
            <h4>{{item.title}}</h4>
            <p>{{item.orderTime}}</p>
          </li>
          <div class="nodata" v-if="orderList.length==0">暂无数据</div>
        </ul>
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
          tab: 1,
          page: true,
          pageSize: 3,//条数
          pageNum: 1,//第几页
          curPage: 1,//初始化第几页
          totalCount:0,//铺源总数
          orderList: "",//收藏
          download: false
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
            url: '/memberOrder/auth/selectOrderList',
            method: "post",
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              type : this.tab
            }
          }).then(function(res){
            console.log(res)
            if(res.data.code=="101"){
              if(res.data.orderList.length){
                this.orderList = res.data.orderList;
                this.totalCount = Number(res.data.totalCount);
              }else{
                this.page = false;
                this.orderList = "";
                this.totalCount = 0;
              }
            }else{
              this.$message(res.data.message)
            }
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        tab1Fun(){
          this.tab = 1;
          this.init();
        },
        tab0Fun(){
          this.tab = 0;
          this.init();
        },
        handleCurrentChange(val){//分页
          console.log(val)
          this.pageNum = val;
          $('html,body').animate({scrollTop: 100},100);
        }
      }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/mine.less';
</style>
