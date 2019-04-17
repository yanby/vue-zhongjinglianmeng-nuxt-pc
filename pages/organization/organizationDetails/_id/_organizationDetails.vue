<template>
<section class="container">
<nav-bar/>
<div class="organizationDetails">
    <div class="organizationDetailsMain">
        <div class="organizationDetailsNav">
            <h1>{{listObj.committee_name}}</h1>
            <ul>
                <li v-if="listObj.img_path != ''">
                    <img :src="listObj.img_path">
                </li>
            </ul>
        </div>
        <div class="organizationDetailsCenter">
            <div class="organizationBox" v-html="listObj.description"></div>
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
        listObj: {}
       
    }
  },
  components: {
    NavBar,
    Footer
  },
  methods:{  
    postData(){
        axios({
            url: '/show/selectCommitteeDetail',
            method: "post",
            params: {
                id: this.$route.params.id,
            }
        }).then(function(data){
            console.log(data);
            this.listObj = data.data.committeeDetail;
            console.log(this.listObj);
        }.bind(this)).catch(function(err){
            console.log("页面错误：",err)
        })
    }, 

  },
  mounted() {
    this.postData();
        
  },
  created () {
    
  },
}
</script>
<style lang="less" type="text/less" scoped>
.organizationDetails{
    width: 100%;
    background: #fff;
}
.organizationDetailsMain{
    width: 1200px;
    margin: 0 auto;
}
.organizationDetailsNav{
    height: 110px;
    width: 1200px;
    border-bottom: 1px solid #eaeae8;
    h1{
        color: #333;
        font-size: 24px;
        line-height: 110px;
        float: left;
    }
    ul{
        float: right;
        li{
            width: 120px;
            height: 100px;
            margin-top: 5px;
            /*border: 1px solid #eaeaea;*/
            float: left;
            margin-left: 10px;
            img{
                display: inline-block;
                width: 120px;
                height: 100px;
            }
        }
    }
}
</style>
<style>
.organizationDetailsCenter{
    width: 1200px;
    padding: 50px 0;
    overflow: hidden;
}   
.organizationBox >>> img{
   max-width: 1200px;

}
</style>



