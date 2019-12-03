<template>
<div> 
   <div v-if='listData.length > 0' class="SearchInfo"> 
      含 
      <span style="color: red">{{ keyword }} </span>
      关键字的{{ isArticle ? '文章' : '速记' }}一共有 <span style="color: black">{{ total }}</span> 篇
    </div>
    <div class="ListWrap"> 
      <div v-if='isArticle'> 
        <articleList 
          v-for='(item, index) in listData' 
          :item='item' 
          :key='index'
        />
      </div>
      <div v-if='!isArticle'>
        <shorthandList :source='listData'/>
      </div>
      <Skeleton v-if="loading"/>
      <div class="noArticle" v-if="!loading && listData.length === 0"> 
        <p>目前没有{{isArticle ? '文章' : '速记' }}哦</p>
      </div>
    </div>
</div>
</template>

<script>
/*eslint-disable no-prototype-builtins */
import shorthandList from '../../components/shorthandList'
import { GetRecordSelect } from '.././../axios/api/common'
import { ShortHandSearch } from '../../axios/api/shorthand'
import articleList from  '../../components/articleList'
import { SearchArticle } from '../../axios/api/article'
import Skeleton from '../../components/Skeleton'
import { cateGory } from '../../axios/api/common'
// import sideList from '../../components/sideList'
// import contentLayout from '../../components/contentLayout/index'
export default {
  layout: 'blog',
  components: {
    // contentLayout,
    // sideList,
    Skeleton,
    articleList,
    shorthandList
  },
  data() {
    return {
      
    }
  },
  watch: {
    $route({ query }) {
      this.listData = []
      this.nextPage = 1
      this.keyword = query.q || query.topic || ''
      if(query.q) {
        this.isArticle = true
        this.hadleLoadMore([], this.isArticle)
      } else {
        this.isArticle = false
        this.hadleLoadMore([], this.isArticle)
      }
    }
  },
  methods: {
    hadleLoadMore(list= [], isArticle) {
      this.loading = true
      if(isArticle) {
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
      } else {
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
            this.hadleLoadMore(this.listData, false)
          } else {
            this.hadleLoadMore(this.listData, true)
          }
        } 
    },
  },
  async asyncData({ query, error }) {
    const keyword = query.q || query.topic || ''
    try {
      // 搜索文章
      if(query.q) {
        const {data: { list, next, hasNextPage, total }} = await SearchArticle({
            keyword
        })
        const { data } = await cateGory()
        return {
          listData:list,
          nextPage:next,
          hasNextPage,
          total,
          loading: false,
          keyword: query.q,
          sideData: data,
          isArticle: true,
          s: query
        }
      } else {
        const {data: { list, next, hasNextPage, total }} = await ShortHandSearch({
            keyword
        })
        const { data } = await GetRecordSelect()
        return {
          listData:list,
          nextPage:next,
          hasNextPage,
          total,
          loading: false,
          keyword: query.topic,
          sideData: data,
          isArticle: false,
          x: query
        }
      }
    } catch {
      error({ statusCode: 404 })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
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