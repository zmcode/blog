<template>
<div> 
   <div v-if='listData.length > 0' class="SearchInfo"> 
      含 
      <span style="color: red">{{ keyword }} </span>
      关键字的{{ typeName }}一共有 <span style="color: black">{{ total }}</span> 篇
    </div>
    <div class="ListWrap"> 
      <div v-if='requestType === "article"'> 
        <articleList 
          v-for='(item, index) in listData' 
          :item='item' 
          :key='index'
        />
      </div>
      <div v-if='requestType === "shorthand"'>
        <shorthandList :source='listData'/>
      </div>
      <div v-if="requestType === 'type'">
        <codeList :ListData='item' v-for='(item, index) in listData' :key="index"></codeList>
      </div>
      <Skeleton v-if="loading"/>
      <div class="noArticle" v-if="!loading && listData.length === 0"> 
        <p>找不到相关的{{typeName }}哦</p>
      </div>
    </div>
</div>
</template>

<script>
/*eslint-disable no-prototype-builtins */
import shorthandList from '../../components/shorthandList'
import { ShortHandSearch } from '../../axios/api/shorthand'
import articleList from  '../../components/articleList'
import { SearchArticle } from '../../axios/api/article'
import Skeleton from '../../components/Skeleton'
import { CodeShareSearch } from '../../axios/api/codeShare'
import codeList from '../../components/codeList'
export default {
  layout: 'blog',
  components: {
    // contentLayout,
    // sideList,
    Skeleton,
    articleList,
    shorthandList,
    codeList
  },
  data() {
    return {
      
    }
  },
  watch: {
    $route({ query }) {
      console.log(query)
      this.listData = []
      this.nextPage = 1
      this.keyword = query.q || query.topic || query.type || ''
      if(query.q) {
        this.requestType = 'article'
      } else if(query.topic) {
        this.requestType = 'shorthand'
      } else {
        this.requestType = 'type'
      }
      this.hadleLoadMore([], this.requestType)
    }
  },
  methods: {
    hadleLoadMore(list= [], isArticle) {
      this.loading = true
      switch (isArticle) {
        case 'article':
          SearchArticle({
            page: this.nextPage,
            keyword: this.keyword
          })
          .then(res => {
            if(res.code === 200)
            setTimeout(() => {
              this.listData = list.concat(res.data.list)
              this.loading = false
              this.nextPage = res.data.next
              this.total = res.data.total
              this.hasNextPage = res.data.hasNextPage
            }, 500)
          })
          break
        case 'shorthand':
          ShortHandSearch({
            page: this.nextPage,
            keyword: this.keyword
          })
          .then(res => {
            if(res.code === 200)
            setTimeout(() => {
              this.listData = list.concat(res.data.list)
              this.loading = false
              this.nextPage = res.data.next
              this.total = res.data.total
              this.hasNextPage = res.data.hasNextPage
            }, 500)
          })
          break
        case 'type':
          CodeShareSearch({
            page: this.nextPage,
            keyword: this.keyword
          })
          .then(res => {
            if(res.code === 200)
            setTimeout(() => {
              this.listData = list.concat(res.data.list)
              this.loading = false
              this.nextPage = res.data.next
              this.total = res.data.total
              this.hasNextPage = res.data.hasNextPage
            }, 500)
          })
      }
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
          if(this.loading)return
          if(!this.hasNextPage)return
          if(this.$route.query.hasOwnProperty('topic')) {
            this.hadleLoadMore(this.listData, 'shorthand')
          } else if(this.$route.query.hasOwnProperty('q')) {
            this.hadleLoadMore(this.listData, 'article')
          } else {
            this.hadleLoadMore(this.listData, 'type')
          }
        } 
    },
  },
  async asyncData({ query, error }) {
    const keyword = query.q || query.topic || query.type || ''
    try {
      // 搜索文章
      if(query.q) {
        const {data: { list, next, hasNextPage, total }} = await SearchArticle({
            keyword
        })
        return {
          listData:list,
          nextPage:next,
          hasNextPage,
          total,
          loading: false,
          keyword: query.q,
          isArticle: true,
          requestType: 'article',
          typeName: '文章'
        }
      } else if(query.topic) {
        const {data: { list, next, hasNextPage, total }} = await ShortHandSearch({
            keyword
        })
        return {
          listData:list,
          nextPage:next,
          hasNextPage,
          total,
          loading: false,
          keyword: query.topic,
          isArticle: false,
          requestType: 'shorthand',
          typeName: '速记'
        }
      } else {
        const {data: { list, next, hasNextPage, total }} = await CodeShareSearch({
            keyword
        })
        return {
          listData:list,
          nextPage:next,
          hasNextPage,
          total,
          loading: false,
          keyword: query.topic,
          isArticle: false,
          requestType: 'type',
          typeName: '代码'
        }
      }
    } catch {
      error({ statusCode: 404 })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.SearchInfo {
  margin-top:20px;
  box-shadow: 0 2px 8px rgba(0,0,0,.03);
  background: #fff;
  padding: 20px;
  text-align: center;

}
.noArticle {
  padding: 20px;
  background: #fff;
  text-align: center;
  margin-top: 20px;
}
.ListWrap {
  width: 95%;
  margin: auto;
  padding: 20px 0
}
</style> 