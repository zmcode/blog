<template>
 <div class="main">
      <Row class="content">
        <Col span="17" style="border-radis: 10px;">
          <Carousel  loop :height="300" class="Banner" easing='linear' dots='none' autoplay>
            <CarouselItem class="CarouselItem">
              <a href="/">
                <img src="~/assets/img/banner.png" alt="">
              </a>  
            </CarouselItem>
            <CarouselItem>
              <a href="/">
                <img src="~/assets/img/banner2.png" alt="">
              </a>
            </CarouselItem>
          </Carousel>

          <div class="ArticleWrap"> 
              <ListItem/>  
          </div>
        </Col>
          <Col span="6" offset='1'>
            <div class="LeftInfoWrap">
                <div class='MostUsersWrap'>
                    <div class="MostUsersHead">
                        <img src="" alt="">
                        <div class="Winner"></div>
                    </div>
                    <div class="MostUsersInfo">
                        <h3>敬请期待</h3>
                        <p>???</p>
                    </div>
                    <div class="MostUsersData">
                      <div class="DataInfo">
                          <h4>文章</h4>
                          <span>???</span>
                      </div>
                      <div class="DataInfo">
                          <h4>获赞</h4>
                          <span>???</span>
                      </div>
                    </div>
                    <div class="GoodList">
                      <nuxt-link to="">完整榜单<Icon type="ios-arrow-forward" size='17' style="margin-top: -4px"/></nuxt-link>
                    </div>
                </div>
                <div class="BlogIntr">
                  <h3>其他</h3>
                  <myButton @click='showHistoy'>创站记录</myButton>
                  <h3>友链</h3>
                   <p>
                    <a href="https://uizph.com/">小辉哥</a>
                  </p>
                  <p>
                    <a href="https://www.microanswer.cn/">Microanswer</a>
                  </p>
                  
                </div>
            </div>
          </Col>
    </Row>
    <div class="footerWrap">
        <PageFooter/>
    </div>
    <Modal 
      :visible='isShow'
      :mask='true'
      :line='true'
      title='创站记录'
      @onOk='isShow = false'
      @onCancle='isShow = false'
      :scroll='true'
    >
      <p>2018-10-20: 购买了域名yjdzm.com</p><br>
      <p>2019-10-20: 想创建一个让很多人都喜欢使用的博客平台</p><br>
      <p>2019-11-16: 购买了云服务器, 申请了备案</p><br>
      <p>2019-11-17: 顺利通过阿里云的初审，提交了审局</p><br>
      <p>2019-11-21: 备案通过,备案号: 粤ICP备19145621号-1</p><br>
      <p>2019-11-27: 博客1.0版本正式上线</p><br>
      <p>2019-12-03: 优化搜索功能,增加发布功能必须登录的提示,修复搜索页下拉不能加载的bug,增加没有登录我的主页跳转到登录页</p><br>
      <p>2019-12-05: 修复速记,粘贴上传会多次上传图片的bug, 增加回车换行显示</p><br>
      <p>2019-12-08: 代码分享第一版上线, 优化了速记粘贴代码显示样式的问题, 增加没有登录显示登录按钮,seo优化, 更改了网站标题和图标,增加回到顶部功能</p><br>
    </Modal>
  </div>
</template>

<script>

import Modal from '../components/myModal'
import myButton from '../components/Button'
import PageFooter from '../components/footer/index'
import ListItem from '../components/list/index'
export default {
  
  layout: 'blog',
  components: {
    ListItem,
    PageFooter,
    myButton,
    Modal
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    showHistoy() {
      this.isShow = true
    },
  },
  mounted() {
console.log('\n%c(づ￣ ³￣)づヾ 作者：遥近%c 1.01版本 2019-12-8 \n', 'color: #fadfa3; background: #030307; padding:5px;', 'background: #fadfa3; padding:5px 0;')
  }
}
</script>

<style lang="less" scoped>
  .main {
    max-width: 1200px;
    margin: auto;
   .Banner {
     border-radius: 20px;
     img {
       width: 100%;
       height: 100%;
       object-fit: cover;
     }
     /deep/.ivu-carousel-list {
       border-radius: 10px;
     }
   }
   .content {
     padding: 30px 20px;
     .ArticleWrap {
       box-shadow: 0 1px 3px 0 rgba(4,5,13,.23);
       border-radius: 5px;
      //  padding: 5px 0 0 0;
       margin-top: 30px;
       background-color: #fff;
     }
     .LeftInfoWrap {
      //  height: 800px;
       width: 80%;
       border-radius: 8px;
       padding: 25px 0;
       background-color: #fff;
       .MostUsersWrap {
         padding: 15px;
         position: relative;
         .MostUsersHead {
           margin-top: 50px;
           position: relative;
           .Winner {
             position: absolute;
             top: -30px;
             left: 50%;
             margin-left: -22px;
             width: 44px;
             height: 32px;
            background-position: 0 -42px;
            background-repeat: no-repeat;
            transform: scale(1.3);
            background-image: url('../assets/img/ranking.png')
          }
          img {
            border-radius: 50%;
            border: 1px solid #e2e6ea;
            display: block;
            margin: auto;
            height: 100px;
            width: 100px;
            object-fit:cover;
          }
         }
           .MostUsersInfo {
            text-align: center;
            p {
              font-size: 13px;
            }
          }
          .MostUsersData {
            width: 80%;
            padding-top: 10px;
            display: flex;
            margin: 0 auto;
            .DataInfo {
              text-align: center;
              flex: auto;
              &:nth-child(1) {
                border-right:1.5px solid  #e2e6ea;
              }
            }
          }
          .GoodList {
            padding: 8px 0;
            text-align: center;
            margin-top: 10px;
            border-top: 1.5px solid#e2e6ea;
            border-bottom: 1.5px solid#e2e6ea;
            font-size: 15px;
            a {
              color: black;
              font-weight: bold;
              &:hover { 
                color:red;
              }
            } 
          }
       }
       .BlogIntr {
         margin-top: 80px;
         text-align: center;
       }
     }
   }
 }
 .footerWrap {
    background-color: #f6f7f8;
    text-align: center;
    width: 100%;
  }
  .HistoryModal {
    height: 200px;
    overflow-y: auto;
  }

</style>
 
