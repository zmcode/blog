<template>
  <div>
    <contentLayout >
      <template slot="main">
        <articleList v-for='(item, index) in listData' 
          :item='item' 
          :key='index' 
          @getdraftlist='clearDrafList'
          :showHandle='true'
        />
        <Skeleton v-if="loading"/>
        <div class="noArticle" v-if="!loading && listData.length === 0"> 
          <p>目前没有草稿</p>
        </div>
      </template>
    </contentLayout>
  </div>
</template>

<script>
import { draftList } from '../../axios/api/article'
import Skeleton from '../../components/Skeleton'
import articleList from '../../components/articleList'
import contentLayout from '../../components/contentLayout'
export default {
  layout: 'blog',
  data() {
    return {
      nextPage: 1,
      listData: [],
      loading: true,
      hasNextPage: false
    }
  },
  components: {
    Skeleton,
    articleList,
    contentLayout
  },
  mounted() {
    this.getDraftList([])
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    getDraftList (list = []) {
      this.loading = true
      draftList({
        page: this.nextPage
      })
        .then(res => {
          if(res.code === 200)
          this.loading = false
          this.nextPage = res.data.next
          this.hasNextPage = res.data.hasNextPage
          this.listData = list.concat(res.data.list)
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
          if(this.loading)return
          if(!this.hasNextPage)return
          this.getDraftList(this.listData)
        } 
    },
    clearDrafList() {
      this.nextPage = 1,
      this.hasNextPage = false,
      this.listData = []
      this.getDraftList(this.listData)
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  
}
</script>

<style lang="less" scoped>
.noArticle {
  padding: 20px;
  background-color: #fff;
  text-align: center;
}
</style>