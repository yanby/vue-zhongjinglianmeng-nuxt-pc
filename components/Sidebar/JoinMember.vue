<template>
<div class="joinMember">
    <div class="joinMemberNav">
        <i><img src="~/assets/images/home/memberIcon.png" class="memberIcon"></i>
        <p>新加入会员</p>
    </div>
    <div class="wrap" id="wrap">
        <ul class="inner" id="inner">
            <li v-for="(item,index) in memberList">
                <span class="cur1" v-if="item.level==1">{{item.title}}</span>
                <span class="cur2" v-else-if="item.level==2">{{item.title}}</span>
                <span class="cur3" v-else-if="item.level==3">{{item.title}}</span>
                {{item.tel}}
            </li>
        </ul>
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
                }).then(function(data){
                    this.memberList = data.data.memberList;
                    this.memberList.forEach(function (item,index) {
                        var str = item.phone
                        var str2 = str.substr(0,3)+"****"+str.substr(7);
                        item.tel = str2;
                    }) 
                }.bind(this)).catch(function(err){
                  console.log("商店列表页面错误：",err)
                })
            }
        }
    }
</script>

<style lang="less" type="text/less" scoped>
.joinMember{
    height: 305px;
    width: 320px;
    background: #f4f7f5;
    border: 1px solid #eaeaea;
    box-sizing: border-box;
    .joinMemberNav{
        width: 319px;
        height: 46px;
        background: #3c915c;
        position: relative;
        .memberIcon{
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
}
.wrap {
    position: relative;
    overflow: hidden;
    height: 245px;
    padding: 0px 16px;
    text-align: center;
    ul{
        position: absolute;
        li{
            font-size: 14px;
            width: 288px;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px dashed #D4D4D4;
            span{
                margin-right: 20px;
                &.cur1{
                    color: #009457;
                }
                &.cur2{
                    color: #D7B000;
                }
                &.cur3{
                    color: #00A5C9;
                }
            }
        }
    }
}
</style>
