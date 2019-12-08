<template>
  <contentLayout>
    <div slot='main'>
      <codeList :ListData='item' v-for='(item, index) in list' :key="index"></codeList>
      <div class="pageWrap">
        <Page size="small" :total='total' :pageSize='5' @on-change='getMoreList'/>
      </div>
    </div>
    <div slot="side">
      <myButton to="/contribute" type='success' style="font-size: 16px; font-weight: bold; width: 100%">创建</myButton>
      <span>更多功能正在开发中.....</span>
    </div>
  </contentLayout>
</template>

<script>
import myButton from '../../components/Button'
import { CodeShareList } from '../../axios/api/codeShare'
import codeList from '../../components/codeList'
import contentLayout  from '../../components/contentLayout'
export default {
  layout: 'blog',
  data() {
  },
  components: {
    contentLayout,
    codeList,
    myButton
  },
  mounted() {
  },
  async asyncData({ error }) {
    try {
      const { data: { list, total, currentPage, pageSize, hasNextPage } } = await CodeShareList()
      return {
        list,
        total,
        currentPage,
        pageSize,
        hasNextPage
      }
    } catch {
      error({ statusCode: 404 })
    }
  },
  methods: {
    getMoreList(value) {
      CodeShareList({
        page: value
      })
       .then(res => {
         this.list = res.data.list
       })
    }
  } 
}
</script>

<style lang="less" scoped>
.pageWrap {
  text-align: center;
  /deep/.ivu-page-prev, /deep/.ivu-page-next,  /deep/.ivu-page-item {
    background: rgba(0, 0, 0, 0);
  }
}
</style>