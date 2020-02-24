<template>
<div class="pageWrap">
  <div class="articleSkeleton">
    <div class="acticle-panel">
      <div class="like panel-btn" @click="handleLike" :class="{'isLike': isLike}" :badge='detail.praise'></div>
      <div class="comment panel-btn" @click='changePath' :badge='reviewNum'></div>
    </div>
    <div class="ArticleWrap">
      <div class="ArticleDetail">
        <h1 style='color: black; text-align: center'>{{ detail.title }}</h1>
        <div class="authorInfo">
          <nuxt-link :to="`/home/${detail.user_info.id}`">
            <img :src="!detail.user_info.avatar ? `${baseUrl}/default-avatar.e30559a.svg` : detail.user_info.avatar" >
          </nuxt-link>
          <div class="otherInfo">
            <p class='name'>{{detail.user_info.name}}</p>
            <div class='time'>
              <span>{{ detail.created | dateFormat }}</span>
              <span style="margin: 0 6px">阅读: {{ detail.read }}</span>
              <nuxt-link :to="`/write?draftId=${detail._id}`" class="draftIdBox" v-if="loginUserId === detail.user_info.id">
                编辑
              </nuxt-link>
            </div>
          </div>
        </div>
        <div v-html='detail.content' class='content'></div>
        <p style="text-align: center" class="commentTitle">评论</p>
        <comment id="comment" :arUserInfo='detail.user_info' :loginUserId='loginUserId' :articleId='detail._id' :changeReviewNum='changeReviewNum' :reviewNum='reviewNum'></comment>
      </div>
    </div>
    <div class="title-panel">
      <div class="catalog-body"> 
        <ul class="catalog-list">
          <catelog :catalogData='catalogData' :num='1' :activeTop='activeTop' :changeTop='changeTop' :wrapTop='wrapTop'></catelog>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Storage } from '../../assets/untils/assist'
import comment from '../../components/comment'
import catelog from '../../components/catelog'
// LikeArticle, remoteLikeAr
import { mapState } from 'vuex'
import { articleDetail, arIsLike, LikeArticle, remoteLikeAr, upArRead } from '../../axios/api/article'
import { getUserId } from '../../axios/api/common'
export default {
  components: { catelog, comment },
  data () {
    return {
      currName: ['h1', 'h2', 'h3'],
      catalogData: [],
      activeTop: 0,
      wrapTop: 0,
      ScrollMap: '',
      isLike: false,
      remainTime: 0,
      hidden: '', // hidden名称(兼容浏览器)
      storage: '', // 初始化storage对象
      visibilityChange: '', // 页面切换事件名称(兼容浏览器)
      timer: '', // 定时器标识
      loginUserId: '',
      reviewNum: 0,
      baseUrl: process.env.VUE_APP_IMG
    }
  },
  layout: 'blog',
  async asyncData ({ params, error }) {
    try {
      const { data } = await articleDetail({ id: params.id }, { isDraft: 0 })
        return {
          detail: data
        }
    } catch (e){
     error({ statusCode: 404, message: '文章不存在' })
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo,
      UserToken: state => state.login.UserToken
    })
  },
  mounted () {
    this.reviewNum = this.detail.review
  getUserId({
    token: this.UserToken
  })
    .then(res => {
      if (res.code === 200) {
        this.loginUserId = res.id
        this.handleVisibilityChange()
        document.addEventListener(this.visibilityChange, this.handleVisibilityChange, false)
      }
      
    })
  this.storage = new Storage()
    // 上来检查文章是否给点赞了
    arIsLike({
      id: this.$route.params.id
    })
      .then(res => {
        if(res.code === 200) this.isLike = res.data.isPraise
      })
    this.$nextTick(() => {
      // 获取所有el元素 
      const AllElNode = [...document.getElementsByClassName('content')[0].childNodes].filter(item => {
          return item.nodeType === 1
      })
      // 获取所有h1 2 3 标签
      const titleNode = AllElNode.filter(item => {
        return this.currName.includes(item.tagName.toLocaleLowerCase())
      })
      if (titleNode.length <= 0) return
      // 获取包裹区域距离顶部的距离
      const wrapTop = this.getElementToPageTop(titleNode[0].parentElement.offsetTop, titleNode[0].offsetParent)
      // 给元素加自定义属性
      titleNode.forEach((item, index) => {
        if (index === 0) {
          item.style = 'padding-top: 60px; margin-top: -40px'
        } else {
          item.style = 'padding-top: 80px; margin-top: -40px'
        }
        // 先设置属性,在添加id
        item.setAttribute('id', `header-${ item.offsetTop + wrapTop }`)
      })

      // 初始化数据结构
      const initialize = [{
        titleLev: parseInt(titleNode[0].tagName.slice(1)),
        name: titleNode[0].innerText,
        offsetTop: titleNode[0].offsetTop + wrapTop,
        children: [],
        itemTop: titleNode[0].offsetTop
      }]
      var ScrollData = []
      ScrollData.push(initialize[0].offsetTop)
      
      const result = titleNode.slice(1).reduce((prev, curr) => {
        let pervLength = prev.length - 1
        // 有儿子
        if (prev[pervLength].children.length > 0 ) {
          let childLength = prev[prev.length - 1].children.length - 1
          if (prev[pervLength].children[childLength].titleLev < parseInt(curr.tagName.slice(1))) {
            prev[pervLength].children[childLength].children.push({
              titleLev: parseInt(curr.tagName.slice(1)),
              name: curr.innerText,
              offsetTop: curr.offsetTop + wrapTop,
              children: [],
              itemTop: curr.offsetTop
            })
            ScrollData.push(curr.offsetTop + wrapTop)
          } else if (prev[pervLength].children[childLength].titleLev >= parseInt(curr.tagName.slice(1))) {
            this.pushObj(prev[pervLength], curr, wrapTop, prev, ScrollData)
          }
        } else {
          this.pushObj(prev[pervLength], curr, wrapTop, prev, ScrollData)
        }
        
        // 没有儿子
        // if (perv[perv.length - 1].titleLev < parseInt(curr.tagName.slice(1))) {
        //   perv[perv.length - 1].children.push({
        //     titleLev: parseInt(curr.tagName.slice(1)),
        //     name: curr.innerText,
        //     offsetTop: curr.offsetTop + wrapTop,
        //     children: []
        //   })
        // } else if (perv[perv.length - 1].titleLev === parseInt(curr.tagName.slice(1)) || 
        //   perv[perv.length - 1].titleLev > parseInt(curr.tagName.slice(1))
        // ) {
        //   perv.push({
        //     titleLev: parseInt(curr.tagName.slice(1)),
        //     name: curr.innerText,
        //     offsetTop: curr.offsetTop + wrapTop,
        //     children: []
        //   })
        // }
        return prev
      }, initialize)
      this.catalogData = result
      this.activeTop = result[0].offsetTop
      this.wrapTop = wrapTop
      const handle = (index) => {
        if (index === ScrollData.length - 1)index = ScrollData.length
        if(this.activeTop === ScrollData[index]) return
        this.changeTop(ScrollData[index - 1])
      }
      const data = ScrollData.reduce((prev, curr, index) => {
        if (prev.length <= 0) {
          prev.push([{pervNum: 0, nextNum: ScrollData[0] - 20, index: 1}, handle])
        } else {
          prev.push([{pervNum: ScrollData[index - 1], nextNum: ScrollData[index] - 20, index: index}, handle])
        }
        return prev
      }, [])
      this.ScrollMap = new Map([...data])
      window.addEventListener('scroll', () => {
        [...this.ScrollMap].forEach(([key, value]) => {
          key.pervNum < document.documentElement.scrollTop 
          && document.documentElement.scrollTop < key.nextNum 
          ? value.call(this, key.index) : ''
        })
      })
    })
  },
  methods: {
    handleVisibilityChange() {
      // 初始化可见数据(兼容)
      if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
        this.hidden = 'hidden'
        this.visibilityChange = 'visibilitychange'
      } else if (typeof document.msHidden !== 'undefined') {
        this.hidden  = 'msHidden'
        this.visibilityChange = 'msvisibilitychange'
      } else if (typeof document.webkitHidden !== 'undefined') {
        this.hidden  = 'webkitHidden'
        this.visibilityChange = 'webkitvisibilitychange'
      }
      if (!document[this.hidden]) {
        if (this.loginUserId !== this.detail.user_info.id) {
          this.remainTime = 0
          this.upPageView()
        } else {
          return
        }
      }
    },
    upPageView () {
      // 每秒钟更新
      this.timer = setInterval(() => {
        if (document[this.hidden] || this.remainTime >= 60) {
          clearTimeout(this.timer)
          return
        }
        if (!document[this.hidden]) this.remainTime += 1
        // 在页面中停留某个时间发送浏览量更新
        if (this.remainTime >= 60) {
          // 设置cookie,防止某个时间段多次更新(分钟)
          let arr = this.storage.get('articleReaded')
          if (!arr) arr = []
          const hasSame = arr.some(item => {
            return item.id === this.$route.params.id && item.userId
          })
          if (!hasSame) {
            arr.push({ 
              id: this.$route.params.id, 
              expires: Date.now() + 1000 * 60 * 10
            })
            this.storage.set('articleReaded', arr)
            upArRead({ id: this.$route.params.id })
          } else {
            return
          }
        }
      }, 1000)
    },
    getElementToPageTop (num, el) {
      if (el.offsetParent) {
        return this.getElementToPageTop(num + el.parentElement.offsetTop, el.offsetParent)
      } else {
        return num
      }
    },
    pushObj (arr, next, top, all, ScrollData) {
      if (arr.titleLev < parseInt(next.tagName.slice(1))) {
        arr.children.push({
          titleLev: parseInt(next.tagName.slice(1)),
          name: next.innerText,
          offsetTop: next.offsetTop + top,
          children: [],
          itemTop: next.offsetTop
        })
        ScrollData.push(next.offsetTop + top)
      } else if (arr.titleLev >= parseInt(next.tagName.slice(1))) {
        all.push({
          titleLev: parseInt(next.tagName.slice(1)),
          name: next.innerText,
          offsetTop: next.offsetTop + top,
          children: [],
          itemTop: next.offsetTop
        })
        ScrollData.push(next.offsetTop + top)
      }
        return arr
    },
    changeTop (top) {
      this.activeTop = top
    },
    changePath () {
      // 清空,让再次点击可以生效
      window.location.hash = ''
      window.location.hash = 'comment'
    },
    // 操控点赞
    handleLike () {
      if (!this.userInfo.id) {
        this.$Message.error('登录后才可点赞')
        return
      }
      if (this.loginUserId === this.detail.user_info.id) {
        this.$Message.error('不能给自己点赞哦!')
        return
      }
      if (this.isLike) {
        remoteLikeAr ({
          id: this.$route.params.id
        })
          .then(res => {
            if (res.code === 200) {
              this.isLike = false
              this.detail.praise -= 1
            }
          })
      } else {
        LikeArticle({
          id: this.$route.params.id
        })
          .then(res => {
            if (res.code === 200) {
              this.isLike = true
              this.detail.praise += 1
            }
          })
      }
    },
    changeReviewNum (value) {
      this.reviewNum = value
    }
  },
  destroyed () {
    clearTimeout(this.timer)
    document.removeEventListener(this.visibilityChange, this.handleVisibilityChange, false)
  }
}
</script>
<style lang="less" scoped>
.pageWrap {
  position: relative;
  margin: 40px;
  display: block;
  height: auto;
  float: left;
  .articleSkeleton {
    float: left;
    .acticle-panel {
      position: fixed;
      top: 130px;
      margin-left: 40px;
      .like {
        background-image: url(https://img.yjdzm.com/zan.b4bb964.svg);
        background-position: 53% 46%;
        animation: tada_4891 3.6s linear infinite;
        &:hover {
          background-image: url( https://img.yjdzm.com/zan-hover.91657d6.svg);
        }
        &::after {
          content: attr(badge);
          position: absolute;
          top: 0;
          left: 75%;
          padding: .1rem .4rem;
          font-size: 13px;
          text-align: center;
          line-height: 1;
          white-space: nowrap;
          color: #fff;
          background-color: #b2bac2;
          border-radius: .7rem;
          transform-origin: left top;
          transform: scale(.75);
        }
      }
      .isLike {
        background-image:url(https://img.yjdzm.com/zan-active.svg);
        animation: none;
        &:hover {
          background-image:url(https://img.yjdzm.com/zan-active.svg);
        }
        &::after {
          content: attr(badge);
          position: absolute;
          top: 0;
          left: 75%;
          padding: .1rem .4rem;
          font-size: 13px;
          text-align: center;
          line-height: 1;
          white-space: nowrap;
          color: #fff;
          background-color: #74ca46;
          border-radius: .7rem;
          transform-origin: left top;
          transform: scale(.75);
        }
      }
      .comment {
        background-image: url(https://img.yjdzm.com/comment.7fc22c2.svg);
        background-position: 50% 55%;
        &:hover {
          background-image: url(https://img.yjdzm.com/comment-hover.1074e67.svg);
        }
        &::after {
          content: attr(badge);
          position: absolute;
          top: 0;
          left: 75%;
          padding: .1rem .4rem;
          font-size: 13px;
          text-align: center;
          line-height: 1;
          white-space: nowrap;
          color: #fff;
          background-color: #b2bac2;
          border-radius: .7rem;
          transform-origin: left top;
          transform: scale(.75);
        }
      }
      .panel-btn {
        position: relative;
        margin-bottom: .7rem;
        width: 40px;
        height: 40px;
        background-color: #fff;
        background-repeat: no-repeat;
        border-radius: 50%;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.04);
        cursor: pointer;
      }
    }
    .ArticleWrap {
      float: left;
      max-width: 750px;
      min-width: 750px;
      padding: 20px;
      background: #fff;
      margin: 0px 50px 0 120px;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
      border-radius: 12px;
      .authorInfo {
        display: flex;
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .otherInfo {
          text-align: left;
          margin-left: 10px;
          flex-direction: column;
          display: flex;
          align-items: flex-start;
          color: #909090;
          font-size: 13px;
          .name {
            font-size: 15px;
            color: #333;
            font-weight: bold
          }
          .time {
            font-size: 13px;
            display: flex;
          }
        }
      }
      .ArticleDetail {
        .content {
          margin-top: 40px;
          font-size:16px;
          padding: 15px;
          position: relative;
          ::v-deep p {
            word-break: break-all;
            color: #333;
          }
          ::v-deep span {
            font-weight: normal;
            font-family: 'Consolas' !important
          }
          ::v-deep h1 {
              color: black;
              padding-bottom: 10px;
              border-bottom: 1px solid #eaecef;
              margin-bottom: 10px;
          }
          ::v-deep h2 {
              padding-bottom: 12px;
              font-size: 24px;
              border-bottom: 1px solid #eaecef;
              color: black;
              margin-top: 24px;
              margin-bottom: 16px;
          };
          ::v-deep pre {
            .hljs {
              display: block;
              overflow-x: auto;
              padding: 01em;
              color: #333;
              background: #f8f8f8;
              font-size: 12px;
              border-radius: 6px;
              ::-webkit-scrollbar {
                  display: none !important
              }
            }
          }
          ::v-deep img {
          max-width: 100%;
          }
          ::v-deep ol {
            margin-left: 20px;
          }
        }
        .commentTitle {
          text-align: center;
          color: #8a9aa9; 
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          padding: 1.67rem 0 5px;
        }
        #comment {
          padding-top: 60px;
          margin-top: -60px
        }
      }
    }
    .title-panel {
      float: left;
      .catalog-body {
        position: fixed;
        margin: 6px 0;
        overflow: scroll;
        height: 600px;
        width: 240px;
        .catalog-list {
          position: relative;
          &:before {
              content: "";
              position: absolute;
              top: 0;
              left: 7px;
              bottom: 0;
              width: 2px;
              background-color: #ebedef;
              opacity: .5;
          }
        }
      }
    }
  }
}
@keyframes tada_4891 {
  0% { transform: scale(1) }
  5.55556% { transform:scale(.9) rotate(-8deg) }
  11.11111% { transform:scale(.9) rotate(-8deg) }
  16.66667% { transform:scale(1.3) rotate(8deg) }
  22.22222% { transform:scale(1.3) rotate(-8deg) }
  27.77778% { transform:scale(1.3) rotate(8deg) }
  33.33333% { transform:scale(1.3) rotate(-8deg) }
  38.88889% { transform:scale(1.3) rotate(8deg) }
  44.44444% { transform:scale(1) rotate(0) }
  100% { transform:scale(1) rotate(0) }
}
</style>
