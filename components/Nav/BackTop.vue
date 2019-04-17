<template>
  <div class="backTop">
    <ul>
        <li>
            <dl class="dl1">
                <dt>
                    <!-- <img src="~/assets/images/common/wechatBlack.png"> -->
                </dt>
                <dd>公众号</dd>
                <div class="wechatBox">
                    <img src="~/assets/images/common/wechat.png" class="wechatCode">
                    <p>关注中经联盟公众号</p>
                </div>
            </dl>
        </li>
        <li>
            <dl class="dl2">
                <dt></dt>
                <dd>APP</dd>
                <div class="zjlmBox">
                    <img src="~/assets/images/home/zjlmApp.png" class="zjlmCode">
                    <p>中经联盟APP下载</p>
                </div>
            </dl>
        </li>
        <li>
            <dl class="top">
                <dt><img src="~/assets/images/common/backTop.png"></dt>
                <dd>TOP</dd>
            </dl>
        </li>
    </ul>
</div>
</template>

<script>
export default {
  data () {
    return {
        // tel: false
    }
  },
  mounted(){
    $(".top").on("click",function () {
      $('html , body').animate({scrollTop: 0},300);
    })
  },
  methods:{

  }
}
</script>
<style lang="less" type="text/less" scoped>
.backTop{
    width: 68px;
    height: 210px;
    background: #fff;
    position: fixed;
    right: 0px;
    top: 220px;
    z-index: 1000000000;
    border:1px solid #eaeaea;
    ul{
        li{
            width: 68px;
            height: 70px;
            border-bottom: 1px solid #eaeaea;
            cursor: pointer;
            text-align: center;
            dl{
                padding-top: 14px;
                dd{
                    color: #333;
                    font-size: 14px;
                }
            }
            .dl1{
                width: 68px;
                height: 70px;
                text-align: center;
                position: relative;
                dt{
                    width: 22px;
                    height: 20px;
                    margin: 0px auto 4px;
                    background: url(../../assets/images/common/wechatBlack.png);
                    background-repeat: no-repeat;
                }
                .wechatBox{
                    width: 130px;
                    height: 120px;
                    background: #3c915c;
                    position: absolute;
                    top: 0px;
                    left: -130px;
                    display: none;
                    .wechatCode{
                        display: inline-block;
                        width: 80px;
                        height: 80px;
                        margin: 14px auto 2px;
                    }
                    p{
                        color: #fff;
                        font-size: 12px;
                    }
                }

            }
            .dl2{
                width: 68px;
                height: 70px;
                text-align: center;
                position: relative;
                /*background: red;*/
                dt{
                    width: 20px;
                    height: 22px;
                    margin: 0px auto 4px;
                    background: url(../../assets/images/common/phoneBlack.png);
                    background-repeat: no-repeat;
                }
                .zjlmBox{
                    width: 130px;
                    height: 120px;
                    background: #3c915c;
                    position: absolute;
                    top: 0px;
                    left: -130px;
                    display: none;
                    .zjlmCode{
                        display: inline-block;
                        width: 80px;
                        height: 80px;
                        margin: 14px auto 2px;
                    }
                    p{
                        color: #fff;
                        font-size: 12px;
                    }
                }
            }

            &:hover{
                .dl1{
                    dt{
                        background: url(../../assets/images/common/wechatGreen.png);
                        background-repeat: no-repeat;
                    }
                    dd{
                        color: #3c915c;
                    }
                    .wechatBox{
                        display: block;
                    }
                }
                .dl2{
                    dt{
                        background: url(../../assets/images/common/phoneGreen.png);
                        background-repeat: no-repeat;
                    }
                    dd{
                        color: #3c915c;
                    }
                    .zjlmBox{
                        display: block;
                    }
                }

            }
        }
    }
}

</style>
