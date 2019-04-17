<template>
<div class="hotArticleWrap">
    <!-- 活动 -->
    <div class="activity">
        <div class="activityTop">
            <img src="~/assets/images/common/activityIcom.png" class="activityIcom">
            <h2>活动</h2>
        </div>
        <dl v-for="(item,index) in activityArr" @click="goActivityDetail(item.id)">
            <img :src="item.img_path" v-if="index == 0">
            <dt>{{item.title}}</dt>
            <dd>{{item.create_time}}</dd>
        </dl>
    </div>
    <!-- 热文 -->
    <div class="hotArticle">
        <div class="hotArticleTop">
            <img src="~/assets/images/common/wenzhang.png" class="hotArticleTopIcom">
            <h2>热文</h2>
        </div>
        <dl v-for="(item,index) in hotArticleArr" @click="goNewsDetails(item.id)">
            <dt><img :src="item.img_path"></dt>
            <dd>{{item.title}}</dd>
        </dl>
    </div>
</div>
</template>

<script>
import axios from '~/plugins/axios.js';
export default {
  data() {
    return {
        activityArr: [], //活动列表
        hotArticleArr: [], //热文列表
    }
  },
  methods: {
    postData() {
        let _this = this
        axios({
            url: '/information/selectInformationShowPC',
            method: 'post',
        }).then(data => {
            console.log("获取图片");
            console.log(data);
            this.activityArr = data.data.informationShowList.activityList;
            this.hotArticleArr = data.data.informationShowList.hotInfoList;
        }).catch(err => {
            console.log(err)
        });
    }, 
    // 跳转活动详情
    goActivityDetail(id){
        // window.open('/news/newsDetails/'+id,'_self');
        window.open('/activityDetail/'+id);
    },
    // 跳转新闻详情
    goNewsDetails(id){
        window.open('/news/newsDetails/'+id);
    }

  },
  mounted(){
    this.postData();
  },
}
</script>

<style lang="less" type="text/less" scoped>
.hotArticleWrap{
    width: 234px;
}

.activity{
        width: 234px;
        height: 368px;
        background: #f3f7f5;
        padding: 16px;
        .activityTop{
            width: 68px;
            height: 26px;
            border-bottom: 2px solid #666;
            .activityIcom{
                margin-right: 10px;
                float: left;
            }
            h2{
                position: relative;
                top: -2px;
                left: 0px;
            }
        }
        dl{
            width: 202px;
            border-top: 1px solid #e4e4e4;
            padding: 10px 0px;
            cursor: pointer;
            img{
                width: 202px;
                height: 132px;
                margin-bottom: 6px;
            }
            dt{
                width: 202px;
                color: #333;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            dd{
                color: #898989;
                font-size: 12px;
            }
        }
    }
.hotArticle{
    width: 234px;
    padding: 16px;
    background: #f3f7f5;
    margin-top: 12px;
    .hotArticleTop{
        width: 68px;
        height: 26px;
        border-bottom: 2px solid #666;
        .hotArticleTopIcom{
            margin-right: 10px;
            float: left;
        }
        h2{
            position: relative;
            top: -2px;
            left: 0px;
        }
    }
    dl{
        width: 202px;
        border-top: 1px solid #e4e4e4;
        padding: 10px 0px;
        cursor: pointer;
        img{
            width: 202px;
            height: 132px;
            margin-bottom: 6px;
        }
        dt{
            img{
                width: 202px;
                height: 132px;
                margin-bottom: 6px;
            }
        }
        dd{

            width: 202px;
            color: #333;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

}
</style>
