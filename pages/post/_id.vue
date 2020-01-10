<template>
<div class="PageWrap">
  <div class="acticle-panel">
    <div class="like panel-btn"></div>
    <div class="comment panel-btn"></div>
  </div>
  <div class="ArticleWrap">
    <div class="ArticleDetail">
      <h1 style='color: black; text-align: center'>{{ detail.title }}</h1>
      <div class="authorInfo">
        <nuxt-link :to="`/home/${detail.user_info.id}`">
          <img :src="detail.user_info.avatar" >
        </nuxt-link>
        <div class="otherInfo">
          <p class="name">{{detail.user_info.name}}</p>
          <div class="time">
            <span>{{ detail.created | dateFormat }}</span>
            <span style="margin-left: 5px">阅读: {{ detail.review }}</span>
          </div>
        </div>
      </div>
      <div v-html='detail.content' class="content"></div>
    </div>
  </div>
  <div class="title-panel">
    <div class="catalog-body"> 
      <ul class="catalog-list">
        <catelog :catalogData='catalogData' :num='1'></catelog>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import catelog from '../../components/catelog'
import { articleDetail } from '../../axios/api/article'
export default {
  components: { catelog },
  data () {
    return {
      currName: ['h1', 'h2', 'h3'],
      catalogData: [],
      aIndex: 0
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
  mounted () {
    this.$nextTick(() => {
      // 获取所有el元素 (v-show-content)
      const AllElNode = [...document.getElementsByClassName('content')[0].childNodes].filter(item => {
          return item.nodeType === 1
      })
      // 获取所有h1 2 3 标签
      const titleNode = AllElNode.filter(item => {
        return this.currName.includes(item.tagName.toLocaleLowerCase())
      })
      console.log(titleNode)
      if (titleNode.length <= 0) return
      // 给元素加自定义属性
      titleNode.forEach((item, index) => {
        console.log(item)
        item.setAttribute('id', `header-${item.innerText}`)
        if (index === 0) {
          item.style = 'padding-top: 60px; margin-top: -40px'
        } else {
          item.style = 'padding-top: 80px; margin-top: -40px'
        }
      })
      console.log(titleNode)
      // 获取包裹区域距离顶部的距离
      const wrapTop = this.getElementToPageTop(titleNode[0].parentElement.offsetTop, titleNode[0].parentElement)
      console.log(wrapTop)
      // 初始化数据结构
      const initialize = [{
        titleLev: parseInt(titleNode[0].tagName.slice(1)),
        name: titleNode[0].innerText,
        offsetTop: titleNode[0].offsetTop + wrapTop,
        children: []
      }]
      
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
              children: []
            })
          } else if (prev[pervLength].children[childLength].titleLev >= parseInt(curr.tagName.slice(1))) {
            this.pushObj(prev[pervLength], curr, wrapTop, prev)
          }
        } else {
          this.pushObj(prev[pervLength], curr, wrapTop, prev)
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
    })
  },
  methods: {
    getElementToPageTop (num, el) {
      if (el.parentElement) {
        return this.getElementToPageTop(num + el.parentElement.offsetTop, el.parentElement)
      } else {
        return num
      }
    },
    pushObj (arr, next, top, all) {
      if (arr.titleLev < parseInt(next.tagName.slice(1))) {
          arr.children.push({
            titleLev: parseInt(next.tagName.slice(1)),
            name: next.innerText,
            offsetTop: next.offsetTop + top,
            children: []
          })
        } else if (arr.titleLev >= parseInt(next.tagName.slice(1))) {
          all.push({
            titleLev: parseInt(next.tagName.slice(1)),
            name: next.innerText,
            offsetTop: next.offsetTop + top,
            children: []
          })
        }
        return arr
    }
  }
}
</script>
<style lang="less" scoped>
.PageWrap {
  position: relative;
  margin: 40px;
  display: block;
  height: auto;
  overflow: hidden;
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
    }
    .comment {
      background-image: url(https://img.yjdzm.com/comment.7fc22c2.svg);
      background-position: 50% 55%;
      &:hover {
        background-image: url(https://img.yjdzm.com/comment-hover.1074e67.svg);
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
          }
        }
      }
    }
  }
  .title-panel {
    float: left;
    .catalog-body {
      position: fixed;
      margin: 6px 0;
      overflow: hidden;
      .catalog-list {
        position: relative;
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
