<template>
  <div class="right fr">
    <div class="jieshao">
      <h3><span></span>中经联盟 <b></b></h3>
      <p>中经联盟定位于【连接、互助、赋能、共生】的开发商主流社群，成立于2008年。注册会员总数近3000人，其中包括开发商集团公司董事长、总裁、总经理96位，开发商副总裁级别以上常务理事会员588位，担任俱乐部或专委会主席副主席职务的执委会成员285位，秘书处工作人员139位，下设34个专业委员会和俱乐部，囊括了中国房地产领域TOP200房企的近70%从业者、50%开发商企业。</p>
    </div>
    <div class="map"></div>
    <div class="txt">
      中经联盟各地分盟地区分布
    </div>
    <div class="jiaru">
      <h3><span></span>最新加入 <b></b></h3>
      <div class="wrap" id="wrap">
        <ul class="inner" id="inner">
          <li v-for="item in memberList">
            <span class="cur1" v-if="item.level==1">{{item.title}}</span>
            <span class="cur2" v-else-if="item.level==2">{{item.title}}</span>
            <span class="cur3" v-else-if="item.level==3">{{item.title}}</span>
            {{item.phone}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
    export default {
        data() {
            return {
              memberList: ""
            }
        },
        mounted(){
          this.scroll();
          ScrollImgLeft();
          function ScrollImgLeft(){
            var wrap = document.getElementById("wrap");
            var inner = document.getElementById("inner");

            function Marquee(){
              var innerWidth = inner.offsetHeight;//获取外围盒子的宽度
              var oldleft = inner.offsetTop;//当前距离左侧的记录
              var newleft = oldleft-1;//向左移动后的距离
              inner.style.top = newleft + "px";
              //滚动完后继续滚动,滚动的值<=内容的值时，让left值变为0
              if(innerWidth + parseInt(inner.style.top) <= 245){
                inner.style.top = 0
              }

            }
            var MyMar=setInterval(Marquee,50);
            wrap.onmouseover=function() {clearInterval(MyMar);}
            wrap.onmouseout=function() {MyMar=setInterval(Marquee,50);}
          }
        },
        methods: {
          scroll(){
            axios({
              url: '/show/getJoinList',
              method: "post"
            }).then(function(res){
              console.log(res)
              this.memberList   = res.data.memberList ;
            }.bind(this)).catch(function(err){
              console.log("商店列表页面错误：",err)
            })
          }
        }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/aboutDetail.less';
</style>
