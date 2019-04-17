<template>
  <div class="aboutLeague">
    <Nav></Nav>
    <div class="content w1200">
      <AboutNav/>
      <div class="msg">
        <div class="jieshao">
          <h2><span>中经联盟介绍</span> <b>| Brief introductior</b><i></i></h2>
          <p class="txt">中经联盟，定位于【连接、互助、赋能、共生】的开发商主流社群，成立于2008年。注册会员总数近3000人，其中包括开发商集团公司董事长、总裁、总经理96位，开发商副总裁级别以上常务理事会员588位，担任俱乐部或专委会主席副主席职务的执委会成员285位，秘书处工作人员139位，下设34个专业委员会和俱乐部，囊括了中国房地产领域TOP200房企的近70%从业者、50%开发商企业。</p>
          <div class="jieshao-msg clearfix">
            <div class="left fl">
              <div class="img">
                <img src="../../assets/images/about/about.png" alt="">
              </div>
              <p>通过成员之间的相关交流与学习、相互合作与共享、专业的教育与培训等多种形式，以规范中国房地产职业经理人市场发展，以提高中国房地产行业从业人员的整理实力和专业素质；从而为中国房地产行业提供更为丰富、更为专业的人才需求，促进中国房地产行业健康、专业、持续的发展。</p>
              <h4>机构定位：连接、互助、赋能、共生</h4>
            </div>
            <div class="right fr">
              <ul>
                <li class="clearfix">
                  <dl class="fl">
                    <dt></dt>
                    <dd>发展</dd>
                  </dl>
                  <p class="fl">
                            主要发展各个企业和机构中，70%老总级别,20%中层级别和10%老板级别人员。</p>
                </li>
                <li class="clearfix">
                  <dl class="fl">
                    <dt></dt>
                    <dd>授权</dd>
                  </dl>
                  <p class="fl">中经联盟（天津）文化传播有限公司作为执行机构</p>
                </li>
                <li class="clearfix">
                  <dl class="fl">
                    <dt></dt>
                    <dd>号召</dd>
                  </dl>
                  <p class="fl">要以开放的胸怀，发展的眼光，包容的心态，专业的精神，规范化运行，企业化运做，制度先行，打造行业内最具生命力的社群。</p>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="dingwei">机构定位：公益公信、专业团体、学习园地、交流平台、友情家园、人才宝库</div> -->
        </div>
        <div class="jiagou">
          <h2><span>组织架构</span> <b>| Framework</b><i></i></h2>
          <div class="jiagou-msg"></div>
        </div>
        <div class="zhidu">
          <h2><span>规章制度</span> <b>| System</b><i></i></h2>
          <div class="zhidu-msg">
            <ul>
              <li v-for="item in institutionList" @click="goFun(item)">
                <div class="img">
                  <img :src="item.img_path" alt="">
                </div>
                <p>{{item.title}}</p>
              </li>
            </ul>
            <div class="more" @click="moreFun()">查看更多</div>
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
      head () {
        return {
          title: '中经联盟',
          meta: [
            { hid: 'description', name: 'description', content: '中经联盟，定位于【连接、互助、赋能、共生】的开发商主流社群，成立于2008年。注册会员总数近3000人，其中包括开发商集团公司董事长、总裁、总经理96位，开发商副总裁级别以上常务理事会员588位，担任俱乐部或专委会主席副主席职务的执委会成员285位，秘书处工作人员139位，下设34个专业委员会和俱乐部，囊括了中国房地产领域TOP200房企的近70%从业者、50%开发商企业。' },
            { hid: 'title', name: 'title', content: '中经联盟— 连接、互助、赋能、共生' },
            { hid: 'keywords', name: 'keywords', content: '中经联，中经联盟，中国房地产经理人联盟，房地产经理人，创业平台，分盟，轮值主席，中经汇，北京中经汇科技，北京中经联盟，天津中经联盟'}
          ]
        }
      },
      data() {
        return {
          institutionList: "",
          pageSize: 4,
          pageNum: 1,
          more: false,
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
            url: '/introduce/selectInstitution',
            method: "post",
            params: {
              pageSize: this.pageSize,
              pageNum: this.pageNum
            }
          }).then(function(res){
            console.log(res)
            this.institutionList = res.data.institutionList;
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        moreFun(){
          this.pageNum++;
          console.log(this.pageNum)
          axios({
            url: '/introduce/selectInstitution',
            method: "post",
            params: {
              pageSize: 4,
              pageNum: this.pageNum
            }
          }).then(function(res){
            console.log(res)

            if(res.data.institutionList.length){
              this.institutionList = this.institutionList.concat(res.data.institutionList);
            }else{
              this.$message('没有更多数据了');
            }
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },
        goFun(item){
          window.open("/ruleDetail/"+item.id)
        }
      }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/aboutDetail.less';
</style>
