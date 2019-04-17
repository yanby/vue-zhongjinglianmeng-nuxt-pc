<template>
  <div class="title">
    <ul>
      <li :class="{cur: isCur1}"><nuxt-link :to="{name:'about-aboutLeague'}"><span></span>关于联盟</nuxt-link></li>
      <li :class="{cur: isCur2}"><nuxt-link :to="{name:'about-unionLeaders'}"><span></span>联盟领导</nuxt-link></li>
      <li :class="{cur: isCur3}"><nuxt-link :to="{name:'about-secretariat'}"><span></span>秘书处</nuxt-link></li>
      <li :class="{cur: isCur4}"><nuxt-link :to="{name:'about-cooperation'}"><span></span>战略合作</nuxt-link></li>
      <li :class="{cur: isCur5}"><nuxt-link :to="{name:'about-JoinProcess'}"><span></span>入会流程及收费标准</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "",
        data() {
          return {
            isCur1: false,
            isCur2: false,
            isCur3: false,
            isCur4: false,
            isCur5: false,
          }
        },
        mounted(){
          this.init();
        },
        methods: {
          init(){
            var url = window.location.href;
            if(url.indexOf("aboutLeague") != -1){
              this.isCur1 = true;
            }else if(url.indexOf("unionLeaders") != -1){
              this.isCur2 = true;
            }else if(url.indexOf("secretariat") != -1){
              this.isCur3 = true;
            }else if(url.indexOf("cooperation") != -1){
              this.isCur4 = true;
            }else if(url.indexOf("JoinProcess") != -1){
              this.isCur5 = true;
            }
          },
        }
    }
</script>

<style lang="less" type="text/less" scoped>
  .title{
    border-bottom: 1px solid #ddd;
    ul{
      overflow: hidden;
      padding: 0 100px;
      li{
        float: left;
        text-align: center;
        width: 130px;
        height: 60px;
        font-size: 14px;
        color: #999;
        line-height: 60px;
        margin: 0 35px;
        position: relative;
        a{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        span{
          display: none;
          position: absolute;
          left: 50%;
          margin-left: -60px;
          bottom: 0;
          width: 120px;
          height: 3px;
          background: #588F61;
        }
        &.cur{
          span{
            display: block;
          }
        }
      }
    }
  }
</style>
