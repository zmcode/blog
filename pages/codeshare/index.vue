<template>
  <div>
    <div v-if="type" class="cateBox">
      <nuxt-link to="/codeshare" class="cateBox-link">片段</nuxt-link> / 分类为
      <span style="color: red">{{ type }}</span>
    </div>
    <contentLayout>
      <div slot="main">
        <loadingBox :loading="loading"></loadingBox>
        <div v-if="reFresh && !loading">
          <codeList
            :ListData="item"
            v-for="(item, index) in list"
            :key="index"
          ></codeList>
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
      </div>
      <div slot="side">
        <div class="handleFixedWrap">
          <sideList
            class="typeList"
            :source="codeTypeData"
            path="/codeshare"
            :changeCateGory="changeCateGory"
          />
          <!-- <div class="createWrap" @click='create'>
            <Icon type="md-create" />
            <span>创建</span>
          </div> -->
          <!-- <myButton to="/contribute" type='success'  class="create">创建</myButton> -->
          <div class="btnWrap" @click="create">
            <div>
              <span class="btnText">分享</span>
              <span class="btnText">片段</span>
              <span class="btnText">分享</span>
              <span class="btnText">片段</span>
            </div>
          </div>
        </div>
      </div>
    </contentLayout>
  </div>
</template>

<script>
import loadingBox from '@/components/loadingBox'
import sideList from '@/components/sideList'
import { getCodeType } from '@/axios/api/common.js'
// import myButton from '@/components/Button'
import { CodeShareList } from '@/axios/api/codeShare.js'
import codeList from '@/components/codeList'
import contentLayout from '@/components/contentLayout'
export default {
  layout: 'blog',
  data() {
    return {
      reFresh: true
    }
  },
  components: {
    contentLayout,
    codeList,
    // myButton,
    sideList,
    loadingBox
  },
  mounted() {},
  async asyncData({ error, query }) {
    try {
      const {
        data: { list, total, currentPage, pageSize, hasNextPage }
      } = await CodeShareList({
        pageSize: 5,
        type: query.type,
        page: query.page
      })
      const { data } = await getCodeType()
      return {
        loading: false,
        list,
        total,
        currentPage,
        pageSize,
        hasNextPage,
        codeTypeData: data,
        type: query.type || ''
      }
    } catch {
      error({ statusCode: 404 })
    }
  },
  methods: {
    getMoreList(page, type) {
      if (page <= 0) page = 1
      this.loading = true
      CodeShareList({
        pageSize: 5,
        type: type || '',
        page
      }).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        setTimeout(() => {
          document.documentElement.scrollTop = 0
          this.currentPage = res.data.currentPage
          this.loading = false
        }, 500)
      })
    },
    changeCateGory(value) {
      this.type = value
    },
    create() {
      this.$router.push('/contribute')
    },
    changePage(value) {
      this.$router.push(`/codeshare?page=${value}&type=${this.type}`)
    }
  },
  watch: {
    list() {
      // 重新渲染子组件,让其可以重新计算高度
      this.reFresh = false
      this.$nextTick(() => {
        this.reFresh = true
      })
    },
    $route({ query }) {
      this.list = []
      this.type = query.type || ''
      this.getMoreList(query.page, query.type)
    }
  }
}
</script>

<style lang="less" scoped>
.pageWrap {
  text-align: center;
  ::v-deep.ivu-page-prev,
  ::v-deep.ivu-page-next,
  ::v-deep.ivu-page-item {
    font-weight: bold;
    background: rgba(0, 0, 0, 0);
  }
}
.handleFixedWrap {
  position: fixed;
  .typeList {
    position: relative;
  }
  .createWrap {
    font-size: 15px;
    position: relative;
    padding: 10px 20px;
    border-radius: 10px;
    background: #fff;
    margin-top: 20px;
    color: #333;
    cursor: pointer;
    user-select: none;
    &:active {
      transform: scale(0.95);
    }
    &:hover {
      color: #666;
    }
  }
}
.cateBox {
  padding: 20px 20px 0 20px;
}
</style>

<style scoped>
.btnWrap {
  margin-top: 20px;
  width: 150px;
  height: 50px;
  cursor: pointer;
  perspective: 500px;
  box-sizing: border-box;
  margin: 20px auto;
}

.btnWrap div {
  height: 100%;
  transform-style: preserve-3d;
  transition: 0.25s;
}

.btnWrap div {
  animation: rotateBtn 2s infinite linear;
  /* animation-direction:alternate; */
}

.btnText {
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  border: 3px solid #333;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
}

.btnText:nth-child(1) {
  color: black;
  background: #fff;
  transform: translate3d(0, 0, 25px);
}

.btnText:nth-child(2) {
  color: black;
  background: #fff;
  transform: rotateX(90deg) translate3d(0, 0, 25px);
}
.btnText:nth-child(3) {
  color: black;
  background: #fff;
  transform: rotateX(180deg) translate3d(0, 0, 25px);
}
.btnText:nth-child(4) {
  color: black;
  background: #fff;
  transform: rotateX(270deg) translate3d(0, 0, 25px);
}

@keyframes rotateBtn {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-360deg);
  }
}
</style>
