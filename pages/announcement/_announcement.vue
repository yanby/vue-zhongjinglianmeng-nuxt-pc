<template>
<section class="container">
<nav-bar/>
<div class="announcement">
    <div class="announcementMain clearfix">
        <div class="announcementMainL">
            <img src="~/assets/images/common/announcementNav.png" class="announcementNavImg">
            <div class="announcementMainLBox" v-for="(item,index) in listArr" @click="goAnnouncementDetails(item.id)">
                <b class="borderGray" v-if="index >= 1"></b>
                <div class="announcementMainLdate">
                    <p>{{item.time}}</p>
                    <h5>{{item.date}}</h5>
                    <i></i>
                </div> 
                <dl>
                    <dt v-if="item.img_path != ''">
                        <img :src="item.img_path">
                    </dt>
                    <dd v-if="item.img_path != ''">
                        <h2>{{item.title}}</h2>
                        <h3>{{item.digest}}</h3>
                        <h6>详情</h6>
                    </dd>
                    <dd v-else class="listDd">
                        <h2>{{item.title}}</h2>
                        <h3>{{item.digest}}</h3>
                        <h6>详情</h6>
                    </dd>
                </dl>
            </div>
            <!-- 分页 -->
            <div class="page">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="8"
                    :total="total1">
                </el-pagination>
            </div>
        </div>
        <div class="announcementMainR">
            <HotArticle></HotArticle>
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
import HotArticle from '~/components/Sidebar/HotArticle.vue';
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
        listArr:[],
        pageSize: 8, // 每页的数量
        pageNum: 1, // 页码
        total1: 0,  //接收渲染数据总数的参数
    }
  },
  components: {
    NavBar,
    Footer,
    HotArticle
  },
  methods:{   
    listData() {
        let _this = this
        axios({
            url: '/information/selectInformationList',
            method: 'post',
            params: {
                pageSize: this.pageSize, //每页数据量
                pageNum: this.pageNum, //页码从1开始
                type: 1 //0 资讯 1 公告
            }
        }).then(data => {
            console.log(data);
            this.listArr = data.data.informationList;
            
            _this.total1 = parseInt(data.data.totalCount);
            console.log(this.total1);

        }).catch(err => {
            console.log(err)
        });
    },

    postData() {
        let _this = this
        axios({
            url: '/information/selectInformationShowPC',
            method: 'post',
        }).then(data => {
            console.log(data);
            this.activityArr = data.data.informationShowList.activityList;
            this.hotArticleArr = data.data.informationShowList.hotInfoList;
        }).catch(err => {
            console.log(err)
        });
    }, 

    //分页
    handleCurrentChange(val) {
        console.log(val);
        this.pageNum = val;
        $('html , body').animate({scrollTop: 100},1200);
        this.listData();
    },

    // 跳转联盟公告
    goAnnouncementDetails(id){
        window.open('/announcement/announcementDetails/'+id,); 
    },
    // 跳转新闻详情
    goNewsDetails(id){
        window.open('/news/newsDetails/'+id,'_self');
    },

  },
  mounted() {
    this.listData();
    this.postData();
  },
  created() {

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
.announcement{
    width: 100%;
    background: #fff;
    padding-top: 20px;
    padding-bottom: 80px;
}
.announcementMain{
    width: 1200px;
    margin: 0 auto;
}
.announcementMainL{
    width: 945px;
    /*height: 300px;*/
    float: left;
    .announcementNavImg{
        /*width: 945px;*/
        margin-bottom: 20px;
    }
    .announcementMainLBox{
        width: 945px;
        height: 162px;
        padding: 20px;
        background: #fff;
        position: relative;
        cursor: pointer;
        .borderGray{
            display: block;
            width: 945px;
            height: 1px;
            background: #e4e4e4;
            position: absolute;
            top: 0px;
            left: 0px;
            /*border-top: 1px solid #e4e4e4;*/
        }
        
        .announcementMainLdate{
            width: 100px;
            height: 122px;
            float: left;
            position: relative;
            p{
                color: #333333;
                font-size: 24px;
                font-weight: 600;
                position: absolute;
                top: 12px;
                right: 28px;
            }
            h5{
                color: #333333;
                font-size: 14px;
                font-weight: 400;
                position: absolute;
                top: 40px;
                right: 30px;
            }
            i{
                display: block;
                width: 14px;
                height: 4px;
                background: #009457;
                border-radius: 2px;
                position: absolute;
                top: 8px;
                right: 8px;
            }
        }
        dl{
            width: 800px;
            height: 122px;
            float: left;
            dt{
                width: 186px;
                height: 122px;
                float: left;
                margin-left: 14px;
                margin-right: 20px;
                img{
                    width: 186px;
                    height: 122px;
                }
            }
            dd{
                width: 580px;
                height: 122px;
                float: left;
                position: relative;
                h2{
                    width: 580px;
                    color: #333333;
                    font-size: 18px;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap
                }
                h3{
                    width: 580px;
                    color: #898989;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    line-height: 22px;
                }
                h6{
                    width:54px;
                    height:20px;
                    background: #009457;
                    border-radius:10px;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    line-height: 20px;
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                    display: none;
                }
            }
            .listDd{
                width: 786px;
                margin-left: 14px;
                h2{
                    width: 786px;
                }
                h3{
                    width: 786px;
                }
            }
        }
        &:hover{
            background: #eaeeec;
            h6{
                display: block;
            }
        }
    }     
}

.announcementMainR{
    width: 234px;
    float: right;
}
/*分页*/
.page{
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 26px 0;
}
</style>
<style>
.page .el-pagination {
    font-weight: normal;
}
.page .el-pagination .btn-prev, .page .el-pagination .btn-next, .page .el-pagination .el-pager li {
    height: 38px;
    width: 38px;
    line-height: 38px;
    border: 1px solid #D8D8D8;
}
.page .el-pagination .el-pager li.active {
    background: #009457 !important;
    border: 1px solid #D8D8D8;
}   
/*.page .el-pagination .el-pager li:last-child{
    display: none;
}*/
</style>

