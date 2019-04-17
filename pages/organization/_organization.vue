<template>
<section class="container">
<nav-bar/>
<div class="organization">
    <!-- 分支机构 -->
    <div class="organizationTop">
        <h2>中经联盟各地分盟地区分布</h2>
        <i></i>
        <ul class="clearfix">
            <li v-for= "(item,index) in cityArr">{{item.areaname}}<img src="~/assets/images/common/whiteDelta.png"></li>
        </ul>
        <h2>专委会和俱乐部</h2>
        <i></i>
    </div>
    <div class="organizationMain">
        <ul class="clearfix">
            <li :class="{'on':tab===0}" @click="zongbuFun()">北京总部</li>
            <li :class="{'on':tab===1}" @click="fenmengFun()">各地分盟</li>
        </ul>
        <!-- 北京总部 -->
        <div class="organizationMainList clearfix" v-if="tab == 0">
            <div class="headquarters organizationList clearfix">
                <dl class="clearfix" v-for= "(item,index) in zongbuArr" @click="goOrganizationDetails(item.id)" >
                    <dt>
                        <img :src="item.img_path" :onerror="defaultImg">
                    </dt>
                    <dd>
                        <h3>{{item.committee_name}}</h3>
                        <p>主席：{{item.chairman}}</p>
                        <h5>{{item.duty}}</h5>
                    </dd>
                </dl>
            </div>
            <div class="moreBtn" @click="moreBtnFun()">点击继续预览</div>
        </div>

        <!-- 各地分盟 -->
        <div class="organizationMainList clearfix" v-if="tab == 1">
            <div class="headquarters organizationList clearfix">
                <dl class="clearfix" v-for= "(item,index) in fenmengArr" @click="goOrganizationDetails(item.id)" >
                    <dt>
                        <img :src="item.img_path" :onerror="defaultImg">
                    </dt>
                    <dd>
                        <h3>{{item.committee_name}}</h3>
                        <p>主席：{{item.chairman}}</p>
                        <h5>{{item.duty}}</h5>
                    </dd>
                </dl>
            </div>
            <div class="moreBtn" @click="moreBtnFun1()">点击继续预览</div>
        </div>
    </div>
</div>
<Footer></Footer>
</section>
</template>

<script>
import axios from '~/plugins/axios.js';
import NavBar from '~/components/Nav/Nav.vue';
import Footer from '~/components/Footer/Footer';
export default {
  head () {
    return {
      title: '中经联盟',
      meta: [
        { hid: 'description', name: 'description', content: '中经联盟' },
        { hid: 'title', name: 'title', content: '中经联盟' },
        { hid: 'keywords', name: 'keywords', content: '中经联盟' }
      ]
    }
  },
  data(){
    return{
        tab: 0,
        cityArr: [],
        // 总部
        zongbuArr: [],
        pageSize: 4, // 每次请求的数量
        numIndex: 1, // 页码
        // 分盟
        fenmengArr: [],
        pageSize1: 4, // 每次请求的数量
        numIndex1: 1, // 页码
        defaultImg: 'this.src="' + require('../../assets/images/common/organizationError.png') + '"', //默认图片
    }
  },
  components: {
    NavBar,
    Footer
  },
  methods:{   
        // 跳转分支机构详情
        goOrganizationDetails(id){
            window.open('/organization/organizationDetails/'+id,'_self'); 
            // window.location.href = '/news/newsDetails/'+id,;
        },
        // 接口调用
        postData(){
            let _this = this
            axios({
                url: '/show/getOrgListPC',
                method: 'post',
                params: {
                    pageSize: 5,  // string  是   每页数据量
                    pageNum: 1,// string  是   页码从1开始
                    type: 0//    string  是   0 总部 1 分盟
                }
            }).then(data => {
                console.log(data);
                // this.
                this.cityArr = data.data.orgName;
                console.log(this.cityArr);
                // console.log(this.noticeArr);
            }).catch(err => {
                console.log(err)
            });
        },
        // 总部
        zongbuFun(){
            this.tab = 0;
            let _this = this;
            axios({
                url: '/show/getOrgListPC',
                method: 'post',
                params: {
                    pageSize: 10,  // string  是   每页数据量
                    pageNum: 1,// string  是   页码从1开始
                    type: 0//    string  是   0 总部 1 分盟
                }
            }).then(data => {
                console.log(data);
                this.zongbuArr = data.data.orgList;
            }).catch(err => {
                console.log(err)
            });
        },
        moreBtnFun(){
            let _this = this;
            this.numIndex++;
            console.log(this.numIndex);
            axios({
                url: '/show/getOrgListPC',
                method: 'post',
                params: {
                    pageSize: this.pageSize,  // string  是   每页数据量
                    pageNum: this.numIndex,// string  是   页码从1开始
                    type: 0//    string  是   0 总部 1 分盟
                }
            }).then(data => {
                console.log(data);
                if(data.data.orgList.length){
                    this.zongbuArr = this.zongbuArr.concat(data.data.orgList);
                }else{
                    this.$message('没有更多数据了');
                }
                // _this.brandListData = _this.brandListData.concat(data.data.brandList);
            }).catch(err => {
                console.log(err)
            });
        },

        fenmengFun(){
            this.tab = 1;
            let _this = this
            axios({
                url: '/show/getOrgListPC',
                method: 'post',
                params: {
                    pageSize: 10,  // string  是   每页数据量
                    pageNum: 1,// string  是   页码从1开始
                    type: 1//    string  是   0 总部 1 分盟
                }
            }).then(data => {
                console.log(data);
                this.fenmengArr = data.data.orgList;
                console.log(this.zongbuArr);
            }).catch(err => {
                console.log(err)
            });
        },

        moreBtnFun1(){
            let _this = this;
            this.numIndex1++;
            console.log(this.numIndex1);
            axios({
                url: '/show/getOrgListPC',
                method: 'post',
                params: {
                    pageSize: this.pageSize1,  // string  是   每页数据量
                    pageNum: this.numIndex1,// string  是   页码从1开始
                    type: 0//    string  是   0 总部 1 分盟
                }
            }).then(data => {
                console.log(data);

                if(data.data.orgList.length){
                    this.fenmengArr = this.fenmengArr.concat(data.data.orgList);
                }else{
                    this.$message('没有更多数据了');
                }
            }).catch(err => {
                console.log(err)
            });
        },
  },
  mounted() {
    this.postData();

    this.zongbuFun();
        
  },
  created () {
    
  },
}
</script>
<style lang="less" type="text/less" scoped>
.clearfix:before,.clearfix:after {
  content:"";
  display:table;
}
.clearfix:after{clear:both;}
.clearfix{
  *zoom:1;/*IE/7/6*/
}
.organization{
    width: 100%;
    background: #fff;
}
.organizationTop{
    width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    h2{
        color: #558f61;
        font-size: 20px;
        padding-bottom: 30px;
    }
    i{
        display: block;
        width: 40px;
        height: 2px;
        background: #558f61;
        position: relative;
        left: 0px;
        top: -28px;
    }
    ul{
        padding-bottom: 30px;
        li{
            height: 28px;
            background-size: 50px 28px;
            background-repeat: no-repeat;
            padding-left: 12px;
            padding-right: 14px;
            background: #558f61;
            color: #fff;
            font-size: 16px;
            line-height: 28px;
            float: left;
            margin-right: 12px;
            padding-left: 5px;
            border-radius: 4px 0 0 4px;
            position: relative;
            img{
                position: absolute;
                right: 0px;
                top: 0;
            }
        }
    }
}
.organizationMain{
    width: 1200px;
    margin: 0 auto;
    ul{
        width: 1200px;
        height: 35px;
        border-bottom: 1px solid #eaeaea;
        margin-bottom: 20px;
        li{
            width: 94px;
            height: 34px;
            float: left;
            background: #fff;
            margin-right: 30px;
            line-height: 34px;
            text-align: center;
            color: #333;
            font-size: 16px;
            border-radius: 6px 6px 0 0;
            cursor: pointer;  
            &.on{
                background: #558f61;
                color: #fff;
            }         
        }
    }
    .organizationList{
        width: 1200px;
        margin: 0 auto;
        dl{
            width: 568px;
            float: left;
            margin-bottom: 20px;
            cursor: pointer;
            dt{
                width: 214px;
                height: 146px;
                border: 1px solid #eaeaea;
                float: left;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            dd{
                width: 354px;
                height: 146px;
                float: left;
                background: #fff;
                padding-left: 20px;
                h3{
                    color: #333;
                    font-size: 16px;
                    margin-top: 16px;
                    margin-bottom: 20px;
                }
                p{
                    color: #558f61;
                    font-size: 14px;
                    margin-bottom: 6px;
                }
                h5{
                    color: #333;
                    font-size: 14px;
                }
            }
            &:hover{
                dd{
                    background: #eaeeec; 
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
    .moreBtn{
        width: 1200px;
        height: 40px;
        color: #558f61;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        background: #eceeec;
        margin-top: 10px;
        margin-bottom: 80px;
    }
}
</style>



