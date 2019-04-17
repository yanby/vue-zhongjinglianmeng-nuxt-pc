<template>
<div class="FooterLbt">
    <div id="div1">
        <ul>
            <li v-for="(item,index) in cooperationListArr" @click="goUrl(item.link_url)">
                <img :src="item.img_path">
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
    // 首页数据
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
        // alert(1);
        // window.open(url);
    },
    

  },
  updated(){
        var oDiv = document.getElementById('div1');
        var oUl=oDiv.getElementsByTagName('ul')[0];
        var aLi=oUl.getElementsByTagName('li');
        oUl.innerHTML=oUl.innerHTML+oUl.innerHTML;//变成两副图，然后才能实现无缝滚动     
        oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';//随便获取一个li的宽度，这里用第一个代表计算出ul的长度
        setInterval(function(){
            if(oUl.offsetLeft<-oUl.offsetWidth/2){//offsetLeft是负数，而offsetWidth是一个最小大于0的数，所以加个-号才能进行比较
                oUl.style.left='0';//当所有图片滚动完之后将left设置为0意味着后面无缝地接着第一张图片，这个过程如果看见两副图片就会看见有些变化，但实际上只会看见一副，所以几乎没有变化
            }
            oUl.style.left=oUl.offsetLeft-2+'px';//每次向左移动2px
        },30);

  },
  mounted(){

  },
  created(){
    this.homeListData();
  }
}
</script>

<style lang="less" type="text/less" scoped>
.FooterLbt{
    width: 1200px;
    height: 100px;
}
#div1{
    width: 1200px;
    height: 80px;
    margin: 50px auto;
    position: relative;
    overflow: hidden;
    ul{
        position: absolute;
        left: 0;top: 0;
        li{
            float:left;
            width:180px;
            height: 80px; 
            margin-right:20px; 
            list-style: none;
            img{
                display: inline-block;
                width:180px;
                height: 80px; 
                cursor: pointer;
            }
        }
    }
}
</style>
