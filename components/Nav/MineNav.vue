<template>
  <div>
    <div class="download" v-if="download"><span @click="download=false"></span></div>
    <div class="msg clearfix">
      <div class="left fl">
        <div class="user">
          <div class="img">
            <img :src="imgsrc" alt="" :onerror="defaultImg">
          </div>
          <div class="txt" @click="downloadFun()">加入联盟</div>
        </div>
        <div class="list">
          <ul>
            <li :class="{cur: isCur1}"><nuxt-link :to="{name:'mine-myJoin'}"><span></span>我的加盟</nuxt-link></li>
            <li :class="{cur: isCur2}"><nuxt-link :to="{name:'mine-myFavorite'}"><span></span>我的收藏</nuxt-link></li>
            <li :class="{cur: isCur3}"><nuxt-link :to="{name:'mine-myOrder'}"><span></span>我的订单</nuxt-link></li>
            <li :class="{cur: isCur4}"><nuxt-link :to="{name:'mine-myActivity'}"><span></span>我的活动</nuxt-link></li>
          </ul>
        </div>
      </div>
      <div class="right fr">
        <div class="xinxi">
          <h3>
            <div class="xiugai" @click="download='true'"><span></span>修改资料</div>
          </h3>
          <ul>
            <li><span></span><b>姓名：</b><i>{{memberInfo.name}}</i></li>
            <li><span></span><b>公司：</b><i>{{memberInfo.company}}</i></li>
            <li><span></span><b>职位：</b><i>{{memberInfo.position}}</i></li>
            <li><span></span><b>手机：</b><i>{{iphone}}</i></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
    export default {
        name: "",
        data() {
          return {
            isCur1: false,
            isCur2: false,
            isCur3: false,
            isCur4: false,
            download: false,
            memberInfo: "",//个人信息
            iphone: "",//手机号
            imgsrc: "",
            defaultImg: 'this.src="' + require('../../assets/images/mine/user.png') + '"',
          }
        },
        mounted(){
          this.init();
          this.page();
        },
        methods: {
          downloadFun(){
            this.download = true;
          },
          init(){
            axios({
              url: '/member/auth/getMemberInfo',
              method: "post"
            }).then(function(res){
              console.log(res)
              if(res.data.code=="101"){
                this.memberInfo = res.data.memberInfo;
                this.iphone = this.memberInfo.phone.substr(0,3)+"****"+this.memberInfo.phone.substr(7);
                this.imgsrc = this.memberInfo.iconPath;
              }else if(res.data.code=="201"){
                this.$message('请先登录');
                this.$router.push({path: '/login'});
              }else{
                this.$message(res.data.message);
              }
            }.bind(this)).catch(function(err){
              console.log("商店列表页面错误：",err)
            })
          },
          page(){
            var url = window.location.href;
            if(url.indexOf("myJoin") != -1){
              this.isCur1 = true;
            }else if(url.indexOf("myFavorite") != -1){
              this.isCur2 = true;
            }else if(url.indexOf("myOrder") != -1){
              this.isCur3 = true;
            }else if(url.indexOf("myActivity") != -1){
              this.isCur4 = true;
            }
          },
        }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/mine.less';
</style>
