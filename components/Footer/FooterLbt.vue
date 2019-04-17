<template>
<div class="FooterLbt">
    <div class="wrap1" id="wrap1">
        <ul class="inner1" id="inner1">
            <li v-for="(item,index) in cooperationListArr">
                <img :src="item.img_path" @click="goUrl(item.link_url)">
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import axios from '~/plugins/axios.js';
export default {
  name: 'Footer',
  data () {
    return {
        cooperationListArr: []
    }
  },
  methods:{
    // 轮播数据
    homeListData(){
        let _this = this
        axios({
            url: '/show/getShowInfoPC',
            method: 'post',
        }).then(data => {
            console.log(data);
            this.cooperationListArr = data.data.data.cooperationList; //合作单位 
            console.log("合作单位");
            console.log(this.cooperationListArr);
        }).catch(err => {
            console.log(err)
        });
    },
    goUrl(url){
        window.open(url);
    }

  },
  mounted(){
    this.homeListData();
    ScrollImgLeft();
    function ScrollImgLeft(){
        var wrap1 = document.getElementById("wrap1");
        var inner1 = document.getElementById("inner1");
        function Marquee(){
            var innerWidth1 = inner1.offsetWidth;//获取外围盒子的宽度
            var oldleft1 = inner1.offsetLeft;//当前距离左侧的记录
            // console.log(oldleft1);
            var newleft1 = oldleft1-1;//向左移动后的距离
            inner1.style.left = newleft1 + "px";
            //滚动完后继续滚动,滚动的值<=内容的值时，让left值变为0
            if(innerWidth1 + parseInt(inner1.style.left) <= 1200){
                inner1.style.left = 0 + 'px'
            }
        }
        var MyMar=setInterval(Marquee,30);
        wrap1.onmouseover=function() {clearInterval(MyMar);}
        wrap1.onmouseout=function() {MyMar=setInterval(Marquee,30);}
    }


  },
  created(){
    
  }
}
</script>

<style lang="less" type="text/less" scoped>
.FooterLbt{
    width: 1200px;
    height: 80px;
}
.wrap1 {
    width: 1500px;
    height: 80px;
    margin: 0px auto;
    text-align: center;
    position: relative;
    ul{
        position: absolute;
        li{
            float:left;
            width: 180px;
            height: 80px; 
            margin-right:20px; 
            list-style: none;
            position: relative;
            img{
                display: inline-block;
                width: 180px;
                height: 80px; 
                cursor: pointer;
            }
        }
    }
}
</style>
