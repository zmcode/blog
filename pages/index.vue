<template>
 <div class="main">
      <Row class="content">
        <Col span="17" style="border-radis: 10px;">
          <Carousel  loop :height="300" class="Banner" easing='linear' dots='none' autoplay>
            <CarouselItem class="CarouselItem">
              <a href="/">
                <img src="../assets/img/banner.png" alt="">
              </a>  
            </CarouselItem>
            <CarouselItem>
                <a href="/">
                  <img src="../assets/img/banner2.png" alt="">
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
                        <img src="../assets/img/myhead.jpg" alt="">
                        <div class="Winner"></div>
                    </div>
                    <div class="MostUsersInfo">
                        <h3>遥近</h3>
                        <p>信心来自实力,实力来自勤奋</p>
                    </div>
                    <div class="MostUsersData">
                      <div class="DataInfo">
                          <h4>文章</h4>
                          <span>33</span>
                      </div>
                      <div class="DataInfo">
                          <h4>获赞</h4>
                          <span>666</span>
                      </div>
                    </div>
                    <div class="GoodList">
                      <nuxt-link to="/ranking">完整榜单<Icon type="ios-arrow-forward" size='17' style="margin-top: -4px"/></nuxt-link>
                    </div>
                </div>
                <div class="BlogIntr">
                  <h3>其他</h3>
                  <p>
                    <nuxt-link to="/">博客纪念碑</nuxt-link>
                  </p>
                  <p>
                    <nuxt-link to="/">你提我改</nuxt-link>
                  </p>
                  <p>
                    <nuxt-link to="/">关于我</nuxt-link>
                  </p>
                </div>
            </div>
          </Col>
    </Row>
  </div>
</template>

<script>
import ListItem from '../components/list/listItem'
export default {
  layout: 'blog',
  components: {
    ListItem
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

</style>
 
