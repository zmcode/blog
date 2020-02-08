<template>
  <div>
    <div v-if='activeName' class="cateBox">
      <nuxt-link to='/learn/article' class="cateBox-link">文章</nuxt-link> / 分类为 <span style="color: red">{{activeName}}</span> 的文章
    </div>
    <contentLayout>
      <template slot="main" >
        <div v-if="!loading">
        <articleList 
          v-for='(item, index) in listData' 
          :item='item' 
          :key='index'
          :itemsss="item"
        />
        </div>
        <!-- <Skeleton v-if="loading"/> -->
        <loadingBox :loading='loading'></loadingBox>
        <div class="noArticle" v-if="!loading && listData.length === 0"> 
          <p>目前没有文章哦</p>
        </div>
      <div class="pageWrap">
        <Page size="small" :total='total' :pageSize='5' @on-change='getMoreList' v-if="total && !loading" :current="currentPage"/>
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
// import Skeleton from '../../../components/Skeleton'
import articleList from '../../../components/articleList'
import contentLayout from '../../../components/contentLayout'
import loadingBox from '../../../components/loadingBox'
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
    // Skeleton,
    sideList,
    loadingBox
  },
  methods: {
    getMoreList (value) {
      this.loading = true
      this.$store.dispatch('article/getArticle', {
            pageSize: 5,
            page: value,
            category: this.activeName
          })
            .then(res => {
              if(res.code === 200)
                setTimeout(() => {
                this.loading = false
                this.nextPage = res.data.next
                this.hasNextPage = res.data.hasNextPage
                this.listData = res.data.list
                this.total = res.data.total
                this.currentPage = res.data.currentPage
                }, 500)
                document.documentElement.scrollTop = 0
            })
    },
    // CateGoryArticle(index, name) {
    //   this.listData = []
    //   this.active = index + 1
    //   // 点击的时候,改变样式,并且改变路由,从而触发再次请求对应的数据
    //   this.$router.push({
    //     path: `/learn/article?category=${name}`
    //   })
    // },
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
      pageSize: 5,
      category: query.category
    })
    return {
      categoryData,
      listData: data.list,
      hasNextPage: data.hasNextPage,
      nextPage: data.next,
      loading: false,
      activeName: query.category || '',
      total: data.total,
      currentPage: data.currentPage
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll)
  },
  watch: {
    $route({ query }) {
      this.listData = []
      this.nextPage = 1
      this.activeName = query.category || ''
      this.getMoreList(1)
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
}
.pageWrap {
  margin-top: 20px;
  text-align: center;
  // ::v-deep .ivu-page {
  //   .ivu-page-item {
  //     a {
  //       color: #666
  //     }
  //     &:hover {
  //       a {
  //         color: black
  //       }
  //     }
  //   }
  // }
  ::v-deep.ivu-page-prev, ::v-deep.ivu-page-next,  ::v-deep.ivu-page-item {
    background: rgba(0, 0, 0, 0);
  }
}
.cateBox {
  padding: 20px 20px 0 20px;
}
</style>
