<template>
<section class="container">
<nav-bar/>
<div class="home">
    <div class="homeTop clearfix">
        <div class="homeTopLeft">
            <div class="homeLbt">
                <img src="~/assets/images/home/newsNavBar.png" class="newsNavBar">
                <div class="tab">
                    <ul id="tab_head">
                        <li class="current" @click="goNewsDetails(lbtTxtId1)"><i></i><p>{{lbtTxt1}}</p></li>
                        <li @click="goNewsDetails(lbtTxtId2)"><i></i><p>{{lbtTxt2}}</p></li>
                        <li @click="goNewsDetails(lbtTxtId3)"><i></i><p>{{lbtTxt3}}</p></li>
                        <li @click="goNewsDetails(lbtTxtId4)"><i></i><p>{{lbtTxt4}}</p></li>
                        <li @click="goNewsDetails(lbtTxtId5)"><i></i><p>{{lbtTxt5}}</p></li>
                    </ul>
                    <div id="tab_body">
                        <div v-for="(item,index) in lbtArr" v-if="index == 0" @click="goNewsDetails(item.id)"><img :src="item.img_path"></div>
                        <div class="hide" v-for="(item,index) in lbtArr" v-if="index == 1" @click="goNewsDetails(item.id)"><img :src="item.img_path"></div>
                        <div class="hide" v-for="(item,index) in lbtArr" v-if="index == 2" @click="goNewsDetails(item.id)"><img :src="item.img_path"></div>
                        <div class="hide" v-for="(item,index) in lbtArr" v-if="index == 3" @click="goNewsDetails(item.id)"><img :src="item.img_path"></div>
                        <div class="hide" v-for="(item,index) in lbtArr" v-if="index == 4" @click="goNewsDetails(item.id)"><img :src="item.img_path"></div>
                    </div>
                </div>
            </div>
            <!-- 新闻 -->
            <div class="newsList">
                <ul>
                    <div class="newsListTitle">
                        <span v-for= "(item,index) in topListArr" v-if="index == 0" @click="goNewsDetails(item.id)">{{item.title}}</span>
                    </div>
                    <li v-for = "(item,index) in topInfoListArr" v-if = "index < 4" @click="goNewsDetails(item.id)">
                        <p>{{item.title}}</p>
                    </li>
                </ul>
                <ul>
                    <div class="newsListTitle">
                        <span v-for= "(item,index) in topListArr" v-if="index == 1" @click="goNewsDetails(item.id)">{{item.title}}</span>
                    </div>
                    <li v-for = "(item,index) in topInfoListArr" v-if = "index > 3 && index < 8" @click="goNewsDetails(item.id)">
                        <p>{{item.title}}</p>
                    </li>
                </ul>
                <ul>
                    <div class="newsListTitle">
                        <span v-for= "(item,index) in topListArr" v-if="index == 2" @click="goNewsDetails(item.id)">{{item.title}}</span>
                    </div>
                    <li v-for = "(item,index) in topInfoListArr" v-if = "index > 7 && index < 12" @click="goNewsDetails(item.id)">
                        <p>{{item.title}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="homeTopRight">
            <div class="homeTopRightBox1">
                <div class="homeTopRightBoxNav">
                    <i><img src="~/assets/images/home/noticeIcon.png" class="noticeIcon"></i>
                    <p>通知公告</p>
                </div>
                <div class="noticeList">
                    <dl>
                        <dt><img src="~/assets/images/home/strip.png" class="strip"></dt>
                        <dd>
                            <ul>
                                <li v-for = "(item,index) in noticeArr" @click="goAnnouncementDetails(item.id)">{{item.title}}</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="homeTopRightBox2">
                <img src="~/assets/images/home/joinUs.png" @click="showJoinUsPopover = true">
            </div>
            <div class="homeTopRightBox3">
                <JoinMember></JoinMember>
            </div>
        </div>
    </div>
    <!-- 最新活动 -->
    <div class="latestActivities">
        <div class="latestActivitiesNav">
            <div class="latestActivitiesNavBg1"></div>
            <div class="latestActivitiesNavBg2">
                <img src="~/assets/images/home/latestActivitiesNavText.png">
            </div>
        </div>
        <div class="latestActivitiesMain">
            <div class="latestActivitiesMainTop" v-for="(item,index) in activityListArr" v-if="index == 0" @click="goActivityDetail(item.id)">
                <div class="latestActivitiesMainTopLeft">
                    <img src="~/assets/images/home/latestActivitiesArrow.png" class="latestActivitiesArrow">
                    <img :src="item.img_path">
                </div>
                <div class="latestActivitiesMainTopRight">
                    <dl>
                        <dt>
                            <h2>{{item.title}}</h2>
                            <i></i>
                        </dt>
                        <dd>
                            <h4>{{item.abstract}}</h4>
                            <i></i>
                        </dd>
                        <div class="dateDiv">
                            <p>{{item.time}}</p>
                            <h6>{{item.date}}</h6>
                        </div>
                    </dl>
                </div>
            </div>
            <div class="latestActivitiesMainList clearfix">
                <dl v-for="(item,index) in activityListArr" v-if="index >= 1" @click="goActivityDetail(item.id)">
                    <dt>
                        <h4>{{item.time}}</h4>
                        <h6>{{item.date}}</h6>
                        <i></i>
                    </dt>
                    <dd>
                        <h2>{{item.title}}</h2>
                        <p>{{item.abstract}}</p>
                        <div class="detailsBtn">详情</div>
                    </dd>
                </dl>
            </div>
            <div class="moreActivities">
                <nuxt-link :to="{name:'activity-activityList'}">更多活动</nuxt-link>
            </div>
            <!-- 精彩回顾 -->
            <div class="wonderfulReview">
                <h3>精彩回顾</h3>
                <div class="wonderfulReviewMain">
                    <div class="leftBtn" @click="leftBtn()"><img src="~/assets/images/home/leftBtn.png"></div>
                    <div class="rightBtn" @click="rightBtn()"><img src="~/assets/images/home/rightBtn.png"></div>
                    <div class="wonderfulReviewMainBox">
                        <ul class="wonderfulReviewList">
                            <li v-for="(item,index) in activityReviewListArr" @click="goLookbackDetail(item.id)">
                                <img :src="item.img_path">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 关于联盟 -->
    <div class="aboutUs">
        <div class="aboutUsNavWrap">
            <div class="aboutUsNav">
                <div class="aboutUsNavBg1"></div>
                <div class="aboutUsNavBg2">
                    <img src="~/assets/images/home/aboutUsNavText.png" class="aboutUsNavText">
                    <!-- <img src="~/assets/images/home/aboutUsNavText1.png" class="aboutUsNavText1"> -->
                    <div class="aboutUsNavText1">
                        <nuxt-link :to="{name:'about-aboutLeague'}"><span></span></nuxt-link>
                        <nuxt-link :to="{name:'about-unionLeaders'}"><span></span></nuxt-link>
                        <nuxt-link :to="{name:'about-aboutLeague'}"><span></span></nuxt-link>
                        <nuxt-link :to="{name:'about-aboutLeague'}"><span></span></nuxt-link>
                        <nuxt-link :to="{name:'about-secretariat'}"><span class="fourthSapn"></span></nuxt-link>
                        <nuxt-link :to="{name:'about-cooperation'}"><span class="lastSapn"></span></nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="aboutUsMain">
            <div class="aboutUsMainTop">
                <h5>中经联盟，定位于【连接、互助、赋能、共生】的开发商主流社群，成立于2008年。注册会员总数近<span>3000</span>人，其中包括开发商集团公司董事长、总裁、总经理<span>96</span>位，开发商副总裁级别以上常务理事会员<span>588</span>位，担任俱乐部或专委会主席副主席职务的执委会成员<span>285</span>位，秘书处工作人员<span>139</span>位，下设<span>34</span>个专业委员会和俱乐部，囊括了中国房地产领域TOP200房企的近70%从业者、50%开发商企业。</h5>
            </div>
            <div class="aboutUsLeft">
                <img src="~/assets/images/home/aboutUsMap.png" class="aboutUsMap">
            </div>
            <!-- <div class="aboutUsRight">
                <h5>中经联盟，全称中国房地产经理人联盟，定位于主体是开发商的社群组织。成立于2008年，注册会员总数近3000人，其中包括开发商集团公司董事长、总裁、总经理96位，开发商副总裁级别以上常务理事会员581位，担任俱乐部或专委会主席副主席职务的执委会成员285位，秘书处工作人员109位，下设28个专业委员会和俱乐部，囊括了中国房地产领域TOP200房企的近70%从业者、50%开发商企业。</h5>
                <h5>成立10年来，始终定位于“公益公信、专业团体、学习园地、交流平台、友情家园、人才宝库”，致力于打造5大平台---事业平台、健康平台、资本平台、舆论平台、人才平台，房地产从业者都以能够加入中经联盟为荣，国内主流房地产企业的董事长、总经理、副总经理、总监、乃至经理，品牌商家，知名学者、投融资机构成为联盟的主力人群。</h5>
            </div> -->
        </div>
    </div>
    <!-- 中经联盟发展大事记 -->
    <div class="chronicleOfEvents">
        <div class="chronicleOfEventsNav">
            <div class="chronicleOfEventsNavBg1"></div>
            <div class="chronicleOfEventsNavBg2">
                <img src="~/assets/images/home/chronicleOfEventsText.png">
            </div>
        </div>
        <div class="chronicleOfEventsMain">
            <img src="~/assets/images/home/chronicleOfEvents.png" class="chronicleOfEventsImg">
        </div>
        <img src="~/assets/images/home/chronicleOfEventsBg.png" class="chronicleOfEventsBg">
    </div>
    <!-- 合作单位 -->
    <div class="cooperation">
        <div class="cooperationImg">
            <img src="~/assets/images/home/cooperation.png">
        </div>
        <div class="cooperationLbt">
            <FooterLbt></FooterLbt>
        </div>
    </div>
</div>

<!-- 下载APP -->
<div class="joinUsWrap" v-if="showJoinUsPopover">
    <div class="joinUsPopover">
        <span @click="showJoinUsPopover = false"></span>
    </div>
</div>

<Footer></Footer>
<BackTop></BackTop>

</section>
</template>

<script>
import axios from '~/plugins/axios.js';
import NavBar from '~/components/Nav/Nav.vue';
import Footer from '~/components/Footer/Footer';
import BackTop from '~/components/Nav/BackTop.vue';
import JoinMember from '~/components/Sidebar/JoinMember.vue';
import FooterLbt from '~/components/Footer/FooterLbt';
export default {
  data(){
    return{
        leftIndex: 0,
        rightIndex: -1,
        // top3List
        topListArr: [],
        topInfoListArr: [], //新闻
        noticeArr: [], //通知公告
        lbtArr: [], // 新闻轮播
        activityListArr: [], //活动列表
        activityReviewListArr: [], //精彩回顾
        showJoinUsPopover: false, //请下载APP
        lbtTxt1: {},
        lbtTxt2: {},
        lbtTxt3: {},
        lbtTxt4: {},
        lbtTxt5: {},
        lbtTxtId1: "",
        lbtTxtId2: "",
        lbtTxtId3: "",
        lbtTxtId4: "",
        lbtTxtId5: "",
    }
  },
  components: {
    NavBar,
    Footer,
    BackTop,
    JoinMember,
    FooterLbt
  },
  methods:{
        // 精彩回顾左边按钮
        leftBtn(){
            var _this = this;
            var imgWidth = 182;
            var index = this.leftIndex++;
            var dlLength = $(".wonderfulReviewList li").length;

            console.log(dlLength);
            var _dlLength = dlLength - dlLength * 2 + 5;
            // 左边
            if(index < 1){
                $('.wonderfulReviewList').css('left', index * 192 + 'px');
            }
            if(index == 0 || index > 0 ){
                this.leftIndex = 0;
                _this.rightIndex = -1;
            }else if(index > _dlLength){
                this.rightIndex = this.leftIndex - 2;
            }
        },
        // 精彩回顾右边按钮
        rightBtn(){
            var imgWidth = 182;
            var index = this.rightIndex--;
            var dlLength = $(".wonderfulReviewList li").length;
            var _dlLength = dlLength - dlLength * 2 + 5;

            if(index == _dlLength){
                this.rightIndex = _dlLength;
                this.leftIndex = index + 2;
            }
            if(index > _dlLength){
                $('.wonderfulReviewList').css('left', index * 192 + 'px');
                this.leftIndex = index + 1;
            }
        },
        // 首页数据
        homeListData(){
            let _this = this
            axios({
                url: '/show/getShowInfoPC',
                method: 'post',
            }).then(data => {
                console.log("列表");
                console.log(data);
                this.topListArr = data.data.data.top3List;
                this.topInfoListArr = data.data.data.topInfoList; // 新闻
                this.lbtArr = data.data.data.infoBannerList; // 首页轮播

                this.lbtTxt1 = data.data.data.infoBannerList[0].title;
                this.lbtTxt2 = data.data.data.infoBannerList[1].title;
                this.lbtTxt3 = data.data.data.infoBannerList[2].title;
                this.lbtTxt4 = data.data.data.infoBannerList[3].title;
                this.lbtTxt5 = data.data.data.infoBannerList[4].title;

                this.lbtTxtId1 = data.data.data.infoBannerList[0].id;
                this.lbtTxtId2 = data.data.data.infoBannerList[1].id;
                this.lbtTxtId3 = data.data.data.infoBannerList[2].id;
                this.lbtTxtId4 = data.data.data.infoBannerList[3].id;
                this.lbtTxtId5 = data.data.data.infoBannerList[4].id;



                this.activityListArr = data.data.data.activityList; //活动列表
                this.activityReviewListArr = data.data.data.activityReviewList; //精彩回顾
                console.log("活动");
                console.log(this.activityListArr);
            }).catch(err => {
                console.log(err)
            });
        },
        // 通知公告
        noticeData(){
            let _this = this
            axios({
                url: '/information/selectInformationList',
                method: 'post',
                params: {
                    pageSize: 5, //每页数据量
                    pageNum: 1, //页码从1开始
                    type: 1 //0 资讯 1 公告
                }
            }).then(data => {
                console.log(data);
                this.noticeArr = data.data.informationList;
                // console.log(this.noticeArr);
            }).catch(err => {
                console.log(err)
            });
        },

        // 跳转新闻详情
        goNewsDetails(id){
            // window.open('/news/newsDetails/'+id,'_self');
            window.open('/news/newsDetails/'+id);
        },
        // 跳转活动详情
        goActivityDetail(id){
            window.open("/activityDetail/"+id);
        },
        // 跳转精彩回顾
        goLookbackDetail(id){
            window.open("/lookbackDetail/"+id);
        },
        // 跳转联盟公告
        goAnnouncementDetails(id){
            window.open('/announcement/announcementDetails/'+id,);
        },

  },
  mounted() {
    this.homeListData();
    this.noticeData();
    // 新闻轮播
    var tab_head = document.getElementById("tab_head");
    var tab_head_li = tab_head.getElementsByTagName("li");
    var tab_body = document.getElementById("tab_body");
    var tab_body_div = tab_body.getElementsByTagName("div");
    var len = tab_head_li.length;
    var i=0;
    var timer = null;
    var num=0;
    //1.进行初始化设置，设置每个导航的onmouseover和onmouseout的事件
    for(i=0; i<len; i++){
        tab_head_li[i].index = i;
        tab_head_li[i].onmouseover = function(){
             clearInterval(timer);
             num = this.index;
             tab_bodychange();
        }
        tab_head_li[i].onmouseout = function(){ autoplay(); }
    }
    //辅助函数，将num当前置为显示
    function tab_bodychange(){
        for(i=0; i<len; i++){
            tab_head_li[i].className = '';
            tab_body_div[i].className = 'hide';
        }
        tab_head_li[num].className = 'current';
        tab_body_div[num].className = '';
    }
    //辅助函数，自动循环改变
    function autoplay(){
        timer = setInterval(function(){num=(++num)%len;tab_bodychange();},3000);
    }
    autoplay();//2.进入自动循环
  },
  created () {

  },
}
</script>
<style lang="less" type="text/less" scoped>
/*@import '~/assets/css/index.less';*/
.clearfix:before,.clearfix:after {
  content:"";
  display:table;
}
.clearfix:after{clear:both;}
.clearfix{
  *zoom:1;/*IE/7/6*/
}
.home{
    width: 100%;
    background: #fff;
}
.homeTop{
    width: 1200px;
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 50px;
    .homeTopLeft{
        width: 860px;
        float: left;
        .homeLbt{
            .newsNavBar{
                width: 860px;
                height: 40px;
            }

        }
        .newsList{
            width: 860px;
            ul{
                width: 860px;
                height: 96px;
                border-bottom: 1px solid #eaeaea;
                .newsListTitle{
                    padding-top: 8px;
                    padding-bottom: 8px;
                    span{
                        color: #333333;
                        font-size: 18px;
                        font-weight: 600;
                        margin-top: 16px;
                        cursor: pointer;
                        &:hover{
                            color: #3c915c;
                        }
                    }
                }
                li{
                    width: 400px;
                    display: inline-block;
                    height: 20px;
                    margin-right: 20px;
                    cursor: pointer;
                    p{
                        max-width: 400px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        &:hover{
                            max-width: 400px;
                            color: #3c915c;
                        }

                    }

                }
            }
            ul:last-child{
                border-bottom: none;
            }
        }
    }
    .homeTopRight{
        width: 320px;
        float: right;
        .homeTopRightBox1{
            height: 260px;
            width: 320px;
            background: #f4f7f5;
            border: 1px solid #eaeaea;
            box-sizing: border-box;
            .homeTopRightBoxNav{
                width: 319px;
                height: 46px;
                background: #3c915c;
                position: relative;
                .noticeIcon{
                    width: 18px;
                    height: 16px;
                    position: absolute;
                    left: 12px;
                    top: 15px;
                }
                p{
                    color: #fff;
                    font-size: 18px;
                    line-height: 46px;
                    margin-left: 50px;
                }
            }
            .noticeList{
                width: 320px;
                height: 224px;
                padding: 10px;
                dl{
                    margin-top: 10px;
                    dt{
                        width: 20px;
                        height: 180px;
                        float: left;
                        text-align: center;
                        margin-right: 8px;
                        margin-top: 1px;
                    }
                    dd{
                        width: 270px;
                        float: left;
                        ul{
                            li{
                                color: #333;
                                font-size: 14px;
                                width: 270px;
                                margin-bottom: 18px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                cursor: pointer;
                                &:hover{
                                    color: #3c915c;
                                }
                            }
                        }
                    }
                }
            }
        }
        .homeTopRightBox2{
            width: 320px;
            height: 150px;
            margin-top: 10px;
            margin-bottom: 10px;
            img{
                width: 320px;
                height: 150px;
                cursor: pointer;
            }
        }
        .homeTopRightBox3{
            height: 305px;
            width: 320px;
        }
    }
}
/* 最新活动 */
.latestActivities{
    width: 100%;
    .latestActivitiesNav{
        width: 100%;
        height: 110px;
        position: relative;
        .latestActivitiesNavBg1{
            width: 50%;
            height: 110px;
            background: #00945B;
        }
        .latestActivitiesNavBg2{
            width: 1200px;
            height: 110px;
            background: url(../assets/images/home/latestActivitiesNav.png);
            background-size: 1200px 110px;
            position: absolute;
            left: 50%;
            top: 0px;
            margin-left: -600px;
            img{
                width: 240px;
                position: absolute;
                left: 50%;
                top: 28px;
                margin-left: -120px;
            }
        }
    }
    .latestActivitiesMain{
        width: 1200px;
        margin: 0 auto;
        padding-top: 46px;
        padding-bottom: 60px;
        .latestActivitiesMainTop{
            width: 1200px;
            height: 340px;
            position: relative;
            cursor: pointer;
            .latestActivitiesMainTopLeft{
                width: 432px;
                height: 260px;
                background: pink;
                z-index: 10;
                position: absolute;
                left: 0px;
                top: 30px;
                .latestActivitiesArrow{
                    width: 34px;
                    height: 34px;
                    position: absolute;
                    right: -20px;
                    top: 110px;
                }
                img{
                    width: 432px;
                    height: 260px;
                }
            }
            .latestActivitiesMainTopRight{
                width: 806px;
                height: 330px;
                background: url(../assets/images/home/latestActivitiesBg.png);
                background-repeat: no-repeat;
                background-size: 806px 330px;
                position: absolute;
                right: 0px;
                top: 0px;
                z-index: 9;
                dl{
                    width: 640px;
                    height: 224px;
                    position: absolute;
                    right: 74px;
                    top: 56px;
                    dt{
                        height: 70px;
                        h2{
                            color: #333;
                            font-size: 20px;
                        }
                        i{
                            display: block;
                            width: 88px;
                            height: 3px;
                            background: #3c915c;
                            border-radius: 2px;
                            position: relative;
                            top: 10px;
                            left: -20px;
                        }
                    }
                    dd{
                        height: 76px;
                        position: relative;
                        h4{
                            color: #333;
                            font-size: 16px;
                            line-height: 26px;
                        }
                        i{
                            display: block;
                            width: 88px;
                            height: 3px;
                            background: #3c915c;
                            border-radius: 2px;
                            position: absolute;
                            bottom: 0px;
                            right: -20px;
                        }
                    }
                    .dateDiv{
                        width: 100px;
                        height: 50px;
                        position: absolute;
                        right: -20px;
                        bottom: 0;
                        text-align: right;
                        p{
                            color: #3c915c;
                            font-size: 24px;
                            margin-bottom: 8px;
                        }
                        h6{
                            color: #3c915c;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
        .latestActivitiesMainList{
            dl{
                width: 568px;
                height: 120px;
                cursor: pointer;
                margin-bottom: 20px;
                dt{
                    width: 100px;
                    height: 68px;
                    background: #fff;
                    float: left;
                    color: #fff;
                    position: relative;
                    color: #333;
                    h4{
                        /*color: #333;*/
                        font-size: 24px;
                        font-weight: 600;
                        position: absolute;
                        right: 20px;
                        top: 12px;
                    }
                    h6{
                        /*color: #333;*/
                        font-size: 14px;
                        font-weight: 600;
                        position: absolute;
                        right: 20px;
                        top: 40px;
                    }
                    i{
                        display: block;
                        width: 14px;
                        height: 4px;
                        background: #3C915C;
                        border-radius: 2px;
                        position: absolute;
                        right: 4px;
                        top: 12px;
                    }
                }
                dd{
                    width: 468px;
                    height: 120px;
                    padding: 10px 20px;
                    float: left;
                    position: relative;
                    h2{
                        color: #333333;
                        font-size: 18px;
                        margin-bottom: 8px;
                    }
                    p{
                        width: 428px;
                        color: #898989;
                        font-size: 14px;
                        text-align: justify;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .detailsBtn{
                        width:54px;
                        height:20px;
                        background:rgba(60,145,92,1);
                        border-radius:10px;
                        color: #fff;
                        line-height: 20px;
                        text-align: center;
                        font-size: 14px;
                        color: #fff;
                        cursor: pointer;
                        position: absolute;
                        right: 20px;
                        bottom: 10px;
                        display: none;
                    }
                }
                &:hover{
                    dt{
                        background: #3c915c;
                        box-shadow: 0px 3px 4px 0px rgba(60, 145, 92, 0.14);
                        color: #fff;
                        border-radius: 2px;
                        i{
                            background: #fff;
                        }
                    }
                    dd{
                        background: #eaeeec;
                        box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.14);
                        border-radius: 2px;
                        .detailsBtn{
                            display: block;
                        }
                    }
                }
            }
            dl:nth-child(odd){/*奇数行*/
                float: left;
            }
            dl:nth-child(even){/*偶数行*/
                float: right;
            }
        }
        .moreActivities{
            width: 262px;
            height: 50px;
            line-height: 50px;
            background: #3c915c;
            box-shadow:0px 5px 16px 0px rgba(60,145,92,0.15);
            border-radius:2px;
            margin: 50px auto 30px;
            text-align: center;
            cursor: pointer;
            a{
                display: inline-block;
                width: 262px;
                height: 50px;
                color: #fff;
                font-size: 18px;
            }
        }
        .wonderfulReview{
            width: 1200px;
            height: 150px;
            h3{
                color: #3C915C;
                font-size: 18px;
                margin-left: 30px;
            }
            .wonderfulReviewMain{
                width: 1200px;
                height: 120px;
                position: relative;
                margin-top: 10px;
                .leftBtn{
                    width: 10px;
                    cursor: pointer;
                    position: absolute;
                    left: 0px;
                    top: 46px;
                    z-index: 9;
                }
                .rightBtn{
                    cursor: pointer;
                    position: absolute;
                    right: 0px;
                    top: 46px;
                    z-index: 9;
                }
                .wonderfulReviewMainBox{
                    width: 1260px;
                    height: 120px;
                    margin-left: 30px;
                    overflow: hidden;
                    position: relative;
                    .wonderfulReviewList{
                        width: auto;
                        height: 120px;
                        position: absolute;
                        left: 0px;
                        z-index: 1;
                        li{
                            width: 182px;
                            height: 120px;
                            /*background: pink;*/
                            margin-right: 10px;
                            float: left;
                            img{
                                width: 182px;
                                height: 120px;
                            }
                        }
                    }
                }
            }
        }
    }
}
/*关于联盟*/
.aboutUs{
    width: 100%;
    height: 860px;
    background: #eaeeec;
    .aboutUsNavWrap{
        width: 100%;
        height: 192px;
        position: relative;
        .aboutUsNavBg1{
            width: 50%;
            height: 192px;
            background: #00945B;
            position: absolute;
            right: 0;
        }
        .aboutUsNavBg2{
            width: 1200px;
            height: 192px;
            background: url(../assets/images/home/aboutUsNav.png);
            background-size: 1200px 192px;
            position: absolute;
            left: 50%;
            top: 0px;
            margin-left: -600px;
            .aboutUsNavText{
                width: 146px;
                position: absolute;
                left: 50%;
                top: 28px;
                margin-left: -72px;
            }
            .aboutUsNavText1{
                width: 580px;
                height: 56px;
                position: absolute;
                left: 40%;
                bottom: 28px;
                margin-left: -284px;
                background: url(../assets/images/home/aboutUsNavText1.png);
                background-size: 568px 56px;
                background-repeat: no-repeat;
                span{
                    display: inline-block;
                    width: 50px;
                    height: 56px;
                    margin-right: 48px;
                    cursor: pointer;
                }
                .fourthSapn{
                    margin-right: 50px;
                }
                .lastSapn{
                    margin-right: 0px;
                }
            }
        }
    }
    .aboutUsMain{
        width: 1200px;
        margin: 30px auto 0;
        /*text-align: center;*/
        .aboutUsMainTop{
            width: 990px;
            margin: 0 auto;
            text-indent: 2em;
            h5{
                text-align: justify;
                color: #333;
                font-size: 14px;
                span{
                    color: #3c915c;
                }
            }
        }
        .aboutUsLeft{
            width: 600px;
            height: 550px;
            /*float: left;*/
            margin: 30px auto;
            .aboutUsMap{
                width: 600px;
                height: 498px;
            }
        }
       /* .aboutUsRight{
            width: 556px;
            height: 230px;
            margin-left: 40px;
            margin-top: 130px;
            h5{
                color: #333333;
                font-size: 14px;
                text-align: justify;
                text-indent: 2em;
                line-height: 24px;
            }
        }*/
    }
}
/*中经联盟发展大事记*/
.chronicleOfEvents{
    width: 100%;
    /*height: 500px;*/
    position: relative;
    .chronicleOfEventsNav{
        width: 100%;
        height: 110px;
        position: relative;
        .chronicleOfEventsNavBg1{
            width: 50%;
            height: 110px;
            background: #00945B;
        }
        .chronicleOfEventsNavBg2{
            width: 1200px;
            height: 110px;
            background: url(../assets/images/home/latestActivitiesNav.png);
            background-size: 1200px 110px;
            position: absolute;
            left: 50%;
            top: 0px;
            margin-left: -600px;
            img{
                width: 240px;
                position: absolute;
                left: 50%;
                top: 28px;
                margin-left: -120px;
            }
        }
    }
    .chronicleOfEventsMain{
        width: 1200px;
        height: 2636px;
        margin: 50px auto 0px;
        img{
          width: 100%;
          height: 100%;
        }
        .chronicleOfEventsImg{
            z-index: 9;
            position: relative;
        }
    }
    .chronicleOfEventsBg{
        display: inline-block;
        width: 100%;
        height: 448px;
        position: absolute;
        bottom: -94px;
        left: 0;
        z-index: 1;
    }
}
/*合作单位*/
.cooperation{
    width: 100%;
    height: 290px;
    background: #eaeeec;
    margin-top: 94px;
    .cooperationImg{
        width: 256px;
        height: 100px;
        margin: 0 auto;
        padding-top: 40px;
        img{
            width: 236px;
            height: 64px;
        }
    }
    .cooperationLbt{
        width: 1200px;
        height: 80px;
        margin: 50px auto 0;
        overflow: hidden;
        /*background: red;*/
    }
}
/*新闻轮播图*/
.tab {
    width: 860px;
    height: 350px;
    background: #eaeeec;
    margin-top: 20px;
    position: relative;
}
.hide {
    display:none;
}
#tab_head {
    width: 310px;
    height: 350px;
    position: absolute;
    right: 0px;
    top: 0px;
}
#tab_head li {
    width: 310px;
    height: 70px;
    cursor: pointer;
    line-height: 70px;
    /*padding: 10px;*/
    padding-left: 16px;
    padding-right: 16px;
    background: #eaeeec;
    p{
        width: 280px;
        height: 70px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
}
#tab_head .current {
    position:relative;
    height: 70px;
    margin-bottom:-1px;
    background: #3c915c;
    color: #fff;
    i{
        display: block;
        position: absolute;
        left: -55px;
        top: 0px;
        display: inline-block;
        width:0;
        height:0;
        border-width: 20px 40px 0;
        border-style:solid;
        width:0;
        height:0;
        border-top:35px solid transparent;
        border-bottom:35px solid transparent;
        border-left: 35px solid transparent;
        border-right:20px solid #3c915c;
    }
    p{
        color: #fff;
    }
}
#tab_body {
    width: 550px;
    height: 350px;
    float: left;
    img{
        width: 550px;
        height: 350px;
        cursor: pointer;
    }
}

/*下载APP*/
.joinUsWrap{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999999999999;
    .joinUsPopover{
        width: 430px;
        height: 365px;
        margin: 140px auto 0;
        background: url(../assets/images/common/download.png);
        background-size: 430px 365px;
        background-repeat: no-repeat;
        position: relative;
        span{
            display: inline-block;
            width: 30px;
            height: 30px;
            position: absolute;
            right: 0px;
            top: 0px;
            cursor: pointer;
        }
    }
}

</style>



