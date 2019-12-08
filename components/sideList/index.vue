<template>
  <div class="utilWrap">
    <div>
      <div style="position:fixed">
         <nav class="sideWrap">
            <ul class="ContentWrap">
                <p>分类</p>
                <li class="sideItem">
                    <myButton :active="0 === active" @click='CateGoryArticle(-1, "")'>
                        全部
                    </myButton>
                </li>
                <li class="sideItem" v-for="(item, index) in source" :key='index'>
                    <myButton 
                      :active="index + 1 === active" 
                      @click='CateGoryArticle(index, item.name)'
                    >
                      {{ item.name }}
                    </myButton> 
                </li>
            </ul>
        </nav>
      <div class="searchWrap" v-if="type === 'topic'">
        <Input 
          placeholder="搜索速记" 
          icon="md-search" 
          @on-enter='searchShortList'
          @on-click='searchShortList'
          v-model="searchValue"
        />
      </div>
      </div>
    </div>  
  </div>
</template>

<script>
import myButton from '../../components/Button'
export default {
  data() {
    return {
      active: 0,
      type: '',
      searchValue: '',
      showSearch: true
    }
  },
  components: {
    myButton,
  },
  props: {
    source:{
      type: Array
    },
    path: {
      type: String
    },
    search: {
      type:Function
    }
  },
  methods: {
    CateGoryArticle(index, name) {
      this.active = index + 1
      // 点击的时候,改变样式,并且改变路由,从而触发再次请求对应的数据
      this.$router.push({
        path: `${this.path}?${this.type}=${name}`
      })
    },
    searchShortList() {
      this.$router.push(`/search?topic=${this.searchValue}`)
    }
  },
  mounted() {
    this.path === '/learn/article' ? this.type = 'category' : this.type  = 'topic'
  }
}
</script>

<style lang="less" scoped>
.utilWrap {
  margin-top: 20px;
  width: 150px;
  .sideWrap {
    // position: fixed;
    max-width: 150px;
    border-radius: 0.2rem;
    background-color: #fff;
    transition: all 0.2s linear;
    .ContentWrap {
      height: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 20px;
      .sideItem {
        height: 30px;
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
      }
    }
  }
  .searchWrap {
    position: fixed;
    margin-top: 10px;
    max-width: 150px;
  }
}
</style>