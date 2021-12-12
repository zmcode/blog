<template>
  <div>
    <div class="main">
      <!-- <div class="content">
      <h1 style="margin-top: 20px;">与世界分享知识</h1>
      
      <div class="footerWrap">
         <PageFooter />
      </div>
    </div> -->
      <Row class="content">
        <div class="LeftInfoWrap">
          <div class="MostUsersWrap">
            <div class="MostUsersHead">
              <img
                src="https://avatars.githubusercontent.com/u/48686959?v=4"
                alt=""
              />
              <div class="Winner"></div>
            </div>
            <div class="GoodList">
              <a href="https://github.com/yaojin2070" target="_blank">github</a>
              <a href="https://juejin.cn/user/2365804755288878" target="_blank"
                >掘金</a
              >
            </div>
          </div>
          <div class="BlogIntr">
            <h3>其他</h3>
            <myButton @click="showHistoy">创站记录</myButton>
          </div>
        </div>
        <div class="ArticleWrap">
          hi, 谢谢你来看我, 这里是我的个人博客,
          从19年开始这里记录我的文章以及笔记, 我想记录一个成长的过程,
          如果你感兴趣可以注册账号, 分享你的东西, 它会展示到我的博客上,
          博客会一直在线持续到我的职业生涯结束!
          <!-- <ListItem /> -->
        </div>
      </Row>
      <div class="footerWrap">
        <PageFooter />
      </div>
    </div>

    <Modal
      :visible="isShow"
      :mask="true"
      :line="true"
      title="创站记录"
      @onOk="isShow = false"
      @onCancle="isShow = false"
      :scroll="true"
    >
      <p>2019-11-27: 博客正式上线</p>
      <br />
      <p>2019-12-03: 优化搜索功能, 修复搜索页下拉不能加载的bug</p>
      <br />
      <p>2019-12-05: 修复速记粘贴上传图片会多次的bug, 增加回车换行显示</p>
      <br />
      <p>2019-12-08: 片段, 优化了速记粘贴代码显示样式的问题, 网站seo优化</p>
      <br />
      <p>2019-12-27: 修复低版本浏览器无法注册登录的问题</p>
      <br />
      <p>
        2020-01-04: 修复可以随意修改用户文章的bug, 修复不登陆无法查看主页的问题,
        优化了用户的体验
      </p>
      <br />
      <p>2020-01-16: 添加了评论、点赞、统计阅读量功能、文章目录</p>
      <br />
      <p>
        2020-02-05: 评论删除、分页功能, 速记删除、编辑功能,
        修改了列表样式和等待动画, 修复了部分bug
      </p>
      <br />
      <p>
        2020-02-16: 增加博客秀, 分页分类查询数据增加在url中进行显示,方便跳转
      </p>
    </Modal>
  </div>
</template>

<script>
import Modal from '../components/myModal'
import myButton from '../components/Button'
import PageFooter from '../components/footer/index'
// import ListItem from '../components/list/index'
export default {
  layout: 'blog',
  components: {
    // ListItem,
    PageFooter,
    myButton,
    Modal,
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    showHistoy() {
      this.isShow = true
    },
  },
  mounted() {
    console.log(
      '\n%c遥近博客%c  2020-02-16 \n',
      'color: #fadfa3; background: #030307; padding:5px;',
      'background: #fadfa3; padding:5px 0;'
    )
  },
}
</script>

<style lang="less" scoped>
.main {
  text-align: center;
  max-width: 1200px;
  margin: auto;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 80px);

  .content {
    // padding: 30px 20px;
    // justify-content: center;
    display: flex;
    width: 95%;
    margin-top: 80px;
    flex: 1;
    padding: 0 20px;
    /deep/ .ivu-col-offset-1 {
      margin: 0;
    }
    .ArticleWrap {
      width: 75%;
      text-align: left;
      font-size: 24px;
      // padding: 0 100px;
      // box-shadow: 0 1px 3px 0 rgba(4, 5, 13, 0.23);
      padding: 25px 100px;
      // margin-top: 30px;
      background-color: #fff;
    }
    .LeftInfoWrap {
      height: 100%;
      //  height: 800px;
      width: 25%;
      // border-radius: 8px;
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
            background-image: url('../assets/img/ranking.png');
          }
          img {
            border-radius: 50%;
            border: 1px solid #e2e6ea;
            display: block;
            margin: auto;
            height: 100px;
            width: 100px;
            object-fit: cover;
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
              border-right: 1.5px solid #e2e6ea;
            }
          }
        }
        .GoodList {
          padding-bottom: 8px;
          text-align: center;
          margin-top: 10px;
          border-top: 1.5px solid#e2e6ea;
          border-bottom: 1.5px solid#e2e6ea;
          font-size: 15px;
          a {
            color: black;
            font-weight: bold;
            margin-top: 10px;
            display: block;
            &:hover {
              color: red;
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
  bottom: 20px;
  background-color: #f6f7f8;
  text-align: center;
  width: 100%;
}
.HistoryModal {
  height: 200px;
  overflow-y: auto;
}
</style>
