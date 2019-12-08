<template>
  <div>
    <contentLayout>
      <template slot="main">
        <articleList 
          v-for='(item, index) in listData' 
          :item='item' 
          :key='index'
        />
        <Skeleton v-if="loading"/>
        <div class="noArticle" v-if="!loading && listData.length === 0"> 
          <p>目前没有文章哦</p>
        </div>
      </template>
      <template slot="side">
        <sideList :source='categoryData' :path='path'>

        </sideList>
      </template>
    </contentLayout>
  </div>
</template>

<script>
import sideList from '../../../components/sideList'
import Skeleton from '../../../components/Skeleton'
import articleList from '../../../components/articleList'
import contentLayout from '../../../components/contentLayout'
export default {
  data() {
    return {
      loading:true,
      active: 0,
      path: '/learn/article'
    }
  },
  layout: 'blog',
  components: {
    contentLayout,
    articleList,
    Skeleton,
    sideList
  },
  methods: {
    // CateGoryArticle(index, name) {
    //   this.listData = []
    //   this.active = index + 1
    //   // 点击的时候,改变样式,并且改变路由,从而触发再次请求对应的数据
    //   this.$router.push({
    //     path: `/learn/article?category=${name}`
    //   })
    // },
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
          this.getListData(this.listData)
        } 
    },
    getListData(list) {
      this.loading = true
          this.$store.dispatch('article/getArticle', {
            page: this.nextPage,
            category: this.activeName
          })
            .then(res => {
              if(res.code === 200)
              setTimeout(() => {
              this.loading = false
              this.nextPage = res.data.next
              this.hasNextPage = res.data.hasNextPage
              this.listData = list.concat(res.data.list)
              }, 500)
            })
    }
  },
  async asyncData({ store, query }) {
    const categoryData = await store.dispatch('category/getCateGory')
    const { data } = await store.dispatch('article/getArticle', {
      category: query.category
    })
    return {
      categoryData,
      listData: data.list,
      hasNextPage: data.hasNextPage,
      nextPage: data.next,
      loading: false,
      activeName: query.category || ''
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  watch: {
    $route({ query }) {
      this.listData = []
      this.nextPage = 1
      this.activeName = query.category || ''
      this.getListData(this.listData)
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
  background: #fff;
  text-align: center;
  margin-top: 20px;
}
</style>
