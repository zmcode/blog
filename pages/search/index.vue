<template>
<div> 
   <div v-if='listData.length > 0' class="SearchInfo"> 
      含 
      <span style="color: red">{{ keyword }} </span>
      关键字的{{ isArticle ? '文章' : '速记' }}一共有 <span style="color: black">{{ total }}</span> 篇
    </div>
    <contentLayout>
      <template slot="main">
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
      </template>
      <template slot="side">
        <sideList :source='sideData'/>
      </template>
  </contentLayout>
</div>
</template>

<script>
import shorthandList from '../../components/shorthandList'
import { GetRecordSelect } from '.././../axios/api/common'
import { ShortHandSearch } from '../../axios/api/shorthand'
import articleList from  '../../components/articleList'
import { SearchArticle } from '../../axios/api/article'
import Skeleton from '../../components/Skeleton'
import { cateGory } from '../../axios/api/common'
import sideList from '../../components/sideList'
import contentLayout from '../../components/contentLayout/index'
export default {
  layout: 'blog',
  components: {
    contentLayout,
    sideList,
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
            }, 500)
          })
      } else {
        console.log('嘴周执行')
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
            }, 500)
          })
      }
    }
  },
  async asyncData({ query, error }) {
    const keyword = query.q || query.topic || ''
    console.log(keyword,3333)
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
          isArticle: true
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
          isArticle: false
        }
      }
    } catch {
      error({ statusCode: 404 })
    }
  },
  mounted() {
    console.log(this.isArticle,233333333333)
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
  width: 90%;

}
.noArticle {
  padding: 20px;
  background: #fff;
  text-align: center;
  margin-top: 20px;
}
</style> 