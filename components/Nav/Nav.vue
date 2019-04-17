<template>
<div class="navWrap">
    <div class="nav">
        <nuxt-link to="/"><img src="~/assets/images/nav/zjlmLogo.png" alt="卖铺宝" class="logoImg"></nuxt-link>
        <ul>
            <li>
                <nuxt-link to="/">
                    <span :class="{active: isActive1}">首页</span>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{name:'about-aboutLeague'}">
                    <span :class="{active: isActive2}">我们</span>
                </nuxt-link>
            </li>
            <li class="newsLi">
                <p :class="{active: isActive3}">新闻<b></b></p>
                <div class="newsLiBox">
                    <p><nuxt-link :to="{name:'news-news'}">联盟新闻</nuxt-link> </p>
                    <p><nuxt-link :to="{name:'announcement-announcement'}">联盟公告</nuxt-link></p>
                </div>
            </li>
            <li class="li3">
                <nuxt-link :to="{name:'activity-activityList'}">
                    <span :class="{active: isActive4}">活动</span>
                </nuxt-link>
            </li>
            <li class="li4">
                <nuxt-link :to="{name:'organization-organization'}">
                    <span :class="{active: isActive5}">分支机构</span>
                </nuxt-link>
            </li>
            <i class="triangle"></i>
        </ul>
        <div class="floatRight">
            <div class="hoverDiv">
                <p>APP下载</p>
                <div class="hoverBox">
                    <img src="~/assets/images/home/zjlmApp.png" class="zjlmCode">
                    <h5>微信扫一扫</h5>
                    <h6>下载联盟APP</h6>
                </div>
            </div>
            <dl class="loginDl">
                <dd v-if="token == null" @click="showLogin = true">登录注册</dd>
                <dd class="loginDd" v-else>
                    <p class="headSculptureBox">
                        <img :src="userIconPath" :onerror="defaultImg"><b></b>
                        <!-- <img src="~/assets/images/common/headSculpture.png"><b></b> -->
                    </p>
                    <div class="loginDiv">
                        <p>
                            <nuxt-link :to="{name:'mine-myJoin'}">个人中心</nuxt-link>
                        </p>
                        <p>
                            <nuxt-link :to="{name:'mine-myOrder'}">我的订单</nuxt-link>
                        </p>
                        <p @click="loginOutFun()">退出登录</p>
                    </div>
                </dd>
            </dl>
        </div>
    </div>

    <div class="navBottom">
        <div class="navBottomBox">
            <img src="~/assets/images/nav/navbarText.png" class="navbarText">
        </div>

    </div>

    <!-- 登录弹窗 -->
    <div class="login" v-if="showLogin">
        <div class="loginBox">
            <div class="loginBoxOne">
                <div class="loginTop">
                    <img src="~/assets/images/nav/headPortraits.png" class="headPortraits">
                </div>
                <h3>登录/注册</h3>
                <h4>验证即登录，未注册则自动创建新账号！</h4>
                <div class="input1 inputDiv">
                    <input type="tel" placeholder="手机号" v-model="phoneVal" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')">
                </div>
                <div class="input2 inputDiv">
                    <input type="tel" v-model="securityCode" placeholder="短信验证码" maxlength="6" onkeyup="this.value=this.value.replace(/\D/g,'')">
                    <button type="button" :disabled="disabled" @click="sendcode" class="btns" :class="{'codeColor':chengaColor}">{{btntxt}}</button>
                </div>
            </div>
            <div class="loginBtn" @click="loginBtn">登录</div>
            <img src="~/assets/images/home/blackClose.png" class="blackClose" @click="closeFun()">
        </div>
    </div>
</div>
</template>
<script>
import axios from '~/plugins/axios.js';
export default {
  head () {
    return {
      attribute: null,
      title: '中经联盟',
      meta: [
        { hid: 'description', name: 'description', content: '中经联盟，定位于【连接、互助、赋能、共生】的开发商主流社群，成立于2008年。注册会员总数近3000人，其中包括开发商集团公司董事长、总裁、总经理96位，开发商副总裁级别以上常务理事会员588位，担任俱乐部或专委会主席副主席职务的执委会成员285位，秘书处工作人员139位，下设34个专业委员会和俱乐部，囊括了中国房地产领域TOP200房企的近70%从业者、50%开发商企业。' },
        { hid: 'keywords', name: 'keywords', content: '中经联，中经联盟，中国房地产经理人联盟，房地产经理人，创业平台，分盟，轮值主席，中经汇，北京中经汇科技，北京中经联盟，天津中经联盟'}
      ]
    }
  },
  data(){
    return{
        token: null,
        num: "",
        phoneVal: "", // 手机号
        securityCode: "", // 短信验证码
        btntxt: "获取验证码",
        disabled:false,
        time:0,
        chengaColor: false, // 倒计时出现
        showLogin: false, // 是否出现登录弹窗
        ballWrap: false, // 吐司
        ballWrapTxt: "", // 吐司文字
        userIconPath: "", // 用户头像
        defaultImg: 'this.src="' + require('../../assets/images/common/headSculpture.png') + '"', //默认图片
        isActive1: false,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        isActive5: false
    }
  },
  watch:{
    childLogin(val){
      this.showLogin = val;
    }
  },
  // props: ['childLogin'],
  props: {
    childLogin: Boolean
  },
  components: {

  },
  methods:{

    // 获取页面路径
    achieveUrl(){
        var filename = window.location.href;
        if(filename.indexOf("about") != -1){
            this.isActive2 = true;
        }else if(filename.indexOf("ruleDetail") != -1){
            this.isActive2 = true;
        }else if(filename.indexOf("chairmanDetail") != -1){
            this.isActive2 = true;
        }else if(filename.indexOf("secretariatDetail") != -1){
            this.isActive2 = true;
        }else if(filename.indexOf("reviewDetail") != -1){
            this.isActive2 = true;
        }else if(filename.indexOf("news") != -1){
            this.isActive3 = true;
        }else if(filename.indexOf("announcement") != -1){
            this.isActive3 = true;
        }else if(filename.indexOf("activity") != -1){
            this.isActive4 = true;
        }else if(filename.indexOf("activityDetail") != -1){
            this.isActive4 = true;
        }else if(filename.indexOf("organization") != -1){
            this.isActive5 = true;
        }else if(filename.indexOf("mine") != -1){
            this.isActive1 = false;
        }else{
            this.isActive1 = true;
        }
    },

    //获取验证码
    sendcode() {
        let _this = this;
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(this.phoneVal==''){
            this.$message.error('请输入手机号码');
        }else if(!reg.test(this.phoneVal)){
            this.$message.error('请输入正确的手机号');
        }else{
            // 接口调用
            axios({
                url: '/sendsms',
                method: 'post',
                params: {
                    mobile: _this.phoneVal,
                    type: 1
                }
            }).then(data => {
                console.log(data);
                if(data.data.code = 200){
                    this.chengaColor = true;
                    this.time=60;
                    this.disabled=true;
                    this.timer();
                }
            }).catch(err => {
                console.log(err)
            });
        }
    },

    // 倒计时
    timer() {
        if (this.time > 0) {
            this.time--;
            // this.btntxt=this.time+"s后重新获取";
            this.btntxt= "重新获取(" + this.time + ")";
            setTimeout(this.timer, 1000);
        } else{
            this.time=0;
            this.chengaColor = false;
            this.btntxt="获取验证码";
            this.disabled=false;
        }
    },
    // 获取头像
    userData(){
        let _this = this
        axios({
            url: '/member/auth/getMemberInfo',
            method: 'post',
        }).then(data => {
            // console.log("data");
            this.userIconPath = data.data.memberInfo.iconPath;
        }).catch(err => {
            console.log(err)
        });
    },

    // 点击登录按钮
    loginBtn() {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let _this = this;
        // alert(2);
        if(this.phoneVal==''){
            this.$message.error('请输入手机号码');
        }else if(!reg.test(this.phoneVal)){
            this.$message.error('请输入正确的手机号');
        }else if(this.securityCode == ""){
            this.$message.error('请输入验证码');
        }else{
            axios({
                url: '/login',
                method: 'post',
                params: {
                    mobile: this.phoneVal,
                    validCode: this.securityCode,
                    source: "3"
                }
            }).then(data => {
                console.log(data);
                console.log(data.data.code);
                if(data.data.code == "101"){
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    let tel = data.data.memberInfo.mobile;
                    let token1 = data.data["access-token"];
                    window.localStorage.setItem("iphone",tel);
                    window.localStorage.setItem("token",token1);
                    window.localStorage.setItem("memberId",data.data.memberInfo.id);
                    window.location.reload();

                }else if(data.data.code == "102"){
                    this.$message.error("登录失败，验证码错误");
                }else{
                    this.$message.error(data.data.message);
                }
            }).catch(err => {
                console.log(err)
            });
        }
    },
    closeFun(){
      this.showLogin = false;
      this.$emit('loginFun','false');
    },
    // 退出登录
    loginOutFun(){
        var that = this;
        this.$confirm('确定要退出登录么？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$message({
                message: '退出成功',
                type: 'success'
            });
            window.localStorage.clear();
            that.$router.push({name:"index"});
        }).catch(() => {
          this.$message("取消退出！")
        });
    }

  },
  mounted() {
    this.achieveUrl();
    this.showLogin = this.childLogin;
    this.token = localStorage.token;
    this.sessionCityId = sessionStorage.cityId;
    this.sessionProvinceId = sessionStorage.provinceId;
    // 获取头像
    this.userData();

  },
  updated() {

  },
}
</script>
<style lang="less" type="text/less" scoped>
/*@import '../../assets/css/nav.less';*/
.navWrap{
    width: 100%;
    height: 206px;
    background: #fff;
}
.nav{
    width: 1200px;
    height: 56px;
    margin: 0 auto;
    position: relative;
    .logoImg{
        width: 178px;
        height: 52px;
        float: left;
        margin-top: 2px;
    }
    ul{
        float: left;
        margin-left: 40px;
        position: relative;
        li{
            width: 78px;
            float: left;
            line-height: 60px;
            font-size: 14px;
            cursor: pointer;
            font-weight: 400;
            text-align: center;
            a{
                color: #333;
                span{
                    color: #333;
                    &.active{
                        color: #3c915c;
                        font-weight: bold;
                    }
                }
            }
        }
        .newsLi{
            position: relative;
            p{
                color: #333;
                &.active{
                    color: #3c915c;
                    font-weight: bold;
                }
            }
            b{
                display: inline-block;
                width:0;
                height:0;
                border-width: 4px 4px 0;
                border-style:solid;
                border-color: #ccc transparent transparent;
                position:relative;
                top: -3px;
                left: 3px;
            }
            .newsLiBox{
                width: 112px;
                height: 66px;
                background: #fff;
                z-index: 999;
                position: absolute;
                top: 56px;
                text-align: left;
                padding-left: 20px;
                display: none;
                p{
                    color: #333;
                    font-size: 14px;
                    line-height: 30px;
                }
                a{
                    color: #333;
                    font-size: 14px;
                }
            }
            &:hover{
                background: #3c915c;
                p{
                    color: #fff;
                }
                b{
                    border-color: #fff transparent transparent;
                }
                .newsLiBox{
                    display: block;
                }
            }
        }

    }
    .floatRight{
        width: 210px;
        float: right;
        height: 56px;
        line-height: 56px;
        .loginDl{
            width: 78px;
            height: 56px;
            display: inline-block;
            line-height: 56px;
            font-size: 14px;
            position: relative;
            dd{
                color: #333;
                font-size: 14px;
                cursor: pointer;
            }
            .loginDd{
                width: 78px;
                height: 56px;
                position: relative;
                padding-left: 14px;
                .headSculptureBox{
                    position: relative;
                    img{
                        width: 34px;
                        height: 34px;
                        border-radius: 50%;
                    }
                    b{
                        display: inline-block;
                        width:0;
                        height:0;
                        border-width: 4px 4px 0;
                        border-style:solid;
                        border-color: #ccc transparent transparent;
                        position:relative;
                        top: 0px;
                        left: 6px;
                    }
                }
                .loginDiv{
                    width: 112px;
                    height: 110px;
                    background: #fff;
                    z-index: 9999999999;
                    position: absolute;
                    top: 56px;
                    left: 0px;
                    text-align: left;
                    padding-left: 20px;
                    padding-top: 10px;
                    display: none;
                    p{
                        color: #333;
                        font-size: 14px;
                        line-height: 30px;
                    }
                    a{
                        color: #333;
                        font-size: 14px;
                    }
                }
                &:hover{
                    background: #3c915c;
                    b{
                        border-color: #fff transparent transparent;
                    }
                    .loginDiv{
                        display: block;
                    }
                }
            }
        }
    }
}
.navBottom{
    width: 100%;
    height: 150px;
    /*background: #3c915c;*/
    background: url(../../assets/images/nav/navbar.png);
    background-repeat: no-repeat;
    background-size: 100% 150px;
    position: relative;
    .navBottomBox{
        width: 1200px;
        height: 150px;
        /*background: red;*/
        margin: 0 auto;
    }
    .navbarText{
        display: block;
        width: 270px;
        height: 66px;
        position: absolute;
        top: 50px;
        left: 60%;
        /*margin-left: -302px;*/
    }
}
/* 登录弹窗 */
.login{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99999999999;
    .loginBoxOne{
        width: 324px;
        height: 262px;
        margin: 0 auto;
    }
    .loginBox{
        width: 378px;
        height: 310px;
        background: #fff;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -150px;
        margin-top: -122px;
        .blackClose{
            position: absolute;
            right: 8px;
            top: -40px;
            cursor: pointer;
        }
    }
    .loginTop{
        width: 324px;
        height: 56px;
        margin: 0 auto;
        border-bottom: 2px solid #3c915c;
        position: relative;
        .headPortraits{
            width: 60px;
            height: 60px;
            position: absolute;
            left: 132px;
            top: -22px;
        }
    }
    h3{
        color: #333;
        font-size: 16px;
        font-weight: 600;
        margin-top: 20px;
        margin-bottom: 6px;
    }
    h4{
        color: #898989;
        font-size: 14px;
    }
    .inputDiv{
        width: 324px;
        height: 38px;
        border-radius: 2px;
        margin-top: 14px;
        background: #f2f3f7;
    }
    input{
        padding-left: 10px;
        color: #898989;
        font-size: 14px;
        background: #f2f3f7;
    }
    .input1{
        padding-top: 7px;
        input{
            height: 18px;
        }
    }
    .input2{
        padding-top: 10px;
        input{
            height: 18px;
            width: 180px;
            float: left;
            box-sizing: border-box;
        }
        .btns{
            width: 60px;
            height: 20px;
            color: #3c915c;
            font-size: 12px;
            cursor: pointer;
            text-align: center;
            float: right;
            display: block;
            background: #f2f3f7;
            border-bottom: 1px solid #3c915c;
            margin-right: 10px;
        }
        .codeColor{
            width: 78px;
            color: #898989;
            border-bottom: 1px solid #f2f3f7;
        }
    }
    .loginBtn{
        width: 100%;
        height: 48px;
        border: none;
        background: #3c915c;
        color: #fff;
        font-size: 14px;
        line-height: 48px;
        font-weight: 600;
        text-align: center;
        cursor: pointer;
        position: absolute;
        bottom: 0px;
        font-size: 16px;
        border-radius: 0px 0px 10px 10px;
    }
}
/* APP下载 */
.hoverDiv{
    width: 124px;
    /*line-height: 56px;*/
    position: relative;
    display: inline-block;
    background: #fff;
    cursor: pointer;
    p{
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: #333;
    }
    .hoverBox{
        width: 124px;
        height: 175px;
        box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.14);
        background: #fff;
        position: absolute;
        left: 0px;
        top: 56px;
        z-index: 10000;
        border-radius: 2px;
        text-align: center;
        /*动画*/
        opacity: 0;
        -webkit-transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        -moz-transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        -webkit-transform-origin: 50% 0;
        -moz-transform-origin: 50% 0;
        -ms-transform-origin: 50% 0;
        -o-transform-origin: 50% 0;
        transform-origin: 50% 0;
        -webkit-transform: translateY(0) scale(0);
        -moz-transform: translateY(0) scale(0);
        -ms-transform: translateY(0) scale(0);
        -o-transform: translateY(0) scale(0);
        transform: translateY(0) scale(0);
        h5{
            color: #333;
            font-size: 14px;
            line-height: 20px;
        }
        h6{
            color: #333;
            font-size: 14px;
            line-height: 30px;
        }
        .zjlmCode{
            width: 80px;
            height: 80px;
            margin-top: 20px;
            margin-bottom: 10px;
        }
    }
}
.hoverDiv:hover{
    p{
        background: #3c915c;
        color: #fff;
    }
    .hoverBox{
        opacity: 1;
        -webkit-transform: translateY(0) scale(1);
        -moz-transform: translateY(0) scale(1);
        -ms-transform: translateY(0) scale(1);
        -o-transform: translateY(0) scale(1);
        transform: translateY(0) scale(1);
    }
}
</style>

