<template>
  <div>
    <contentLayout>
      <div slot="main">
        <div class="userWrap">
          <div class="userInfoWrap">
            <img :src="!userInfo.avatar ? `${baseUrl}/default-avatar.e30559a.svg` : userInfo.avatar" />
            <div class="userInfo">
              <h2>{{ userInfo.name }}</h2>
              <span>简介: {{ userInfo.summary }}</span>
            </div>
          </div>
          <div class="userSetting">
            <myButton to='/setting/person' v-if="userInfo.id === userId">编辑个人资料</myButton>
          </div>
        </div>
        <div class="articleWrap">
            <div class="ListWrap"> 
              <articleList 
                v-for="(item, index) in listData" 
                :item='item' 
                :key='index'
                @getArticleList='clearList'
                :showHandle='userInfo.id === userId'
              >
              </articleList>
            </div>
            <Skeleton v-show="loading"/>
            <div v-if="listData.length === 0 && !loading" class="noArticle">
              <p>{{ userInfo.id === userId ? '你' : 'TA' }}很懒,什么也没写</p>
            </div>
        </div>
      </div>
      <div slot="side">
        <div class="handleFixedWrap">
          <div class="userOtherInfo">
            <div class="countWrap">
              <div class="articleCountInfo">
                <p>发布了</p>
                <p>{{ userInfo.articleCount }}</p>
              </div>
              <div class="likeCountInfo">
                <p>喜欢</p>
                <p>{{ userInfo.likeCount }}</p>
              </div>
            </div>
            <div class="joinInfo"> 
              <span style='float: left'>加入于: </span>
                {{ userInfo.created | dateFormat('day') }}
            </div>
          </div>
          <div class="blogShow" v-if="userInfo.blogshow">
            <p style="font-size: 18px; margin-bottom: 10px">博客秀</p>
            <div class="upload-img" :style="{'background': 'url(' + userInfo.blogshow+ ')'}"/>
            <!-- <div class="imgContent"  :style="{background: 'url(http://test.yjdzm.com/6666.gif)'}"></div> -->
            <!-- <img src="http://test.yjdzm.com/6666.gif" alt="" class="imgContent"> -->
          </div>
        </div>
      </div>
    </contentLayout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import articleList from '../../components/articleList'
import Skeleton from '../../components/Skeleton'
import { userArticle, getUserId } from '../../axios/api/common'
import myButton from '../../components/Button'
import { otherInfo } from '../../axios/api/common'
import contentLayout from '../../components/contentLayout'
export default {
  data() {
    return {
      listData: [],
      loading: true,
      nextPage: 1,
      hasNextPage: false,
      userId: '',
      baseUrl: process.env.VUE_APP_IMG
    }
  },
  layout: 'blog',
  components: {
    contentLayout,
    myButton,
    Skeleton,
    articleList
  },
  async asyncData({ params, error }) {
    try {
      const { data } = await otherInfo({ id: params.id })
      return {
        userInfo: data || {},
        id: params.id
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  mounted() {
    // 获取用户文章信息
    this.getArticle([])
    window.addEventListener('scroll', this.handleScroll)
    getUserId({
      token: this.UserToken
    })
      .then(res => {
        if (res.code === 200)
        this.userId = res.id
      })
  }, 
  methods: {
    getArticle(list= []) {
      this.loading = true
      userArticle({id: this.userInfo.id}, { page: this.nextPage})
        .then(res => {
          if(res.code === 200)
          setTimeout(() => {
            this.listData = list.concat(res.data.list)
            this.loading = false
            this.nextPage= res.data.next
            this.hasNextPage = res.data.hasNextPage
          }, 500)
        })
    },
    handleScroll() {
        // 变量scrollTop是滚动条滚动时，距离顶部的距离
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        //变量windowHeight是可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        //变量scrollHeight是滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
          //滚动条到底部的条件
          if(scrollTop + windowHeight > scrollHeight - 1){
            if(this.loading) return
            if(!this.hasNextPage)return
            this.getArticle(this.listData) 
          } 
    },
    clearList() {
      this.nextPage = 1,
      this.hasNextPage = false,
      this.listData = []
      this.getArticle(this.listData)
      otherInfo({ id: this.id })
        .then(res => {
           if(res.code === 200)
           this.userInfo = res.data
        })
    }
  },
  computed: {
    ...mapState({
      // 获取当前登录账号的id,跟当前页面的id进行对比,以确定是否显示编辑
      // userID: state => state.login.userInfo.id,
      UserToken: state => state.login.UserToken
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="less" scoped>
.userWrap {
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  background-color: #fff;
  border-radius: 2px;
  display: flex;
  justify-content:space-between;
  .userInfoWrap {
    display: flex;
    padding: 20px;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .userInfo {
      margin-left: 20px;
      h2 {
        color: black;
        font-size: 30px;
      }
    }
  }
  .userSetting {
    padding: 20px;
    button {
      margin-top: 55px;
    }
    a {
      margin-top: 55px;
    }
  }
}
.handleFixedWrap {
  position: fixed;
  .userOtherInfo {
    position: relative;
    text-align: center;
    width: 240px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    background-color: #fff;
    padding: 20px;
    .countWrap {
      display: flex;
      justify-content: center;
      .articleCountInfo {
        padding: 0 5px;
        text-align: center;
        border-right: 0.5px solid #f3f3f4;
        flex: 1 1;
      }
      .likeCountInfo {
        padding: 0 5px;
        text-align: center;
        flex: 1 1;
      }
    }
    .joinInfo {
      text-align: right;
      margin-top: 20px;
    }
  }
  .blogShow {
    margin-top: 30px;
    border-radius: 10px;
    width: 240px;
    background: #fff;
    padding: 20px;
    text-align: center;
    .upload-img {
      background: #fff;
      border: none;
      border-radius: 4px;
      text-align: center;
      cursor: auto;
      position: relative;
      overflow: hidden;
      width: 200px;
      height: 250px;
      max-width: 200px;
      max-height: 250px;
      line-height: 250px;
      background-repeat: no-repeat !important;
      background-size: cover !important
    }
    // .imgContent {
    //   max-width: 200px;
    //   border-radius: 5px;
    //   margin-top: 10px;
    //   max-height: 300px;
    // }
  }
}

.articleWrap {
  min-height: 100px;
  margin-top: 20px;
  .noArticle {
    background:#fff;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
