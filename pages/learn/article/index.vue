<template>
  <div>
    <div v-if="activeName" class="cateBox">
      <nuxt-link to="/learn/article" class="cateBox-link">文章</nuxt-link> /
      分类为 <span style="color: red">{{ activeName }}</span>
    </div>
    <contentLayout>
      <template slot="main">
        <div v-if="!loading">
          <articleList
            v-for="(item, index) in listData"
            :item="item"
            :key="index"
            :itemsss="item"
          />
        </div>
        <!-- <Skeleton v-if="loading"/> -->
        <loadingBox :loading="loading"></loadingBox>
        <div class="noArticle" v-if="!loading && listData.length === 0">
          <p>目前没有文章哦</p>
        </div>
        <div class="pageWrap">
          <Page
            size="small"
            :total="total"
            :pageSize="5"
            @on-change="changePage"
            v-if="total && !loading"
            :current="currentPage"
          />
        </div>
      </template>
      <template slot="side">
        <div class="handleFixedWrap">
          <sideList
            :source="categoryData"
            :path="path"
            :changeCateGory="changeCateGory"
          />
        </div>
      </template>
    </contentLayout>
  </div>
</template>

<script>
/*eslint-disable no-prototype-builtins */
import sideList from '../../../components/sideList'
import articleList from '../../../components/articleList'
import contentLayout from '../../../components/contentLayout'
import loadingBox from '../../../components/loadingBox'
export default {
  data() {
    return {
      loading: true,
      active: 0,
      path: '/learn/article'
    }
  },
  layout: 'blog',
  components: {
    contentLayout,
    articleList,
    sideList,
    loadingBox
  },
  methods: {
    getMoreList(page, category) {
      if (page <= 0) page = 1
      this.loading = true
      this.$store
        .dispatch('article/getArticle', {
          pageSize: 5,
          page: page || 1,
          category: category || this.activeName
        })
        .then(res => {
          if (res.code === 200)
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
    changePage(value) {
      this.$router.push(
        `/learn/article?page=${value}&category=${this.activeName}`
      )
    },
    changeCateGory(value) {
      this.activeName = value
    }
  },
  async asyncData({ store, query }) {
    const categoryData = await store.dispatch('category/getCateGory')
    const { data } = await store.dispatch('article/getArticle', {
      pageSize: 5,
      category: query.category,
      page: query.page
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
  watch: {
    $route({ query }) {
      this.listData = []
      this.activeName = query.category || ''
      this.getMoreList(query.page, query.category)
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
  ::v-deep.ivu-page-prev,
  ::v-deep.ivu-page-next,
  ::v-deep.ivu-page-item {
    font-weight: bold;
    background: rgba(0, 0, 0, 0);
  }
}
.cateBox {
  padding: 20px 20px 0 20px;
}
.handleFixedWrap {
  position: fixed;
}
</style>
