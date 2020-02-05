<template>
  <div class="utilWrap">
    <div>
      <div style="position:fixed">
         <nav class="sideWrap">
            <ul class="ContentWrap">
                <h3 class="title"> <Icon type="ios-folder-open-outline" :size="22" style="margin-right: 10px;"/>分类</h3>
                <!-- <li class="sideItem">
                    <myButton :active="0 === active" @click='CateGoryArticle(-1, "")'>
                        全部
                    </myButton>
                </li> -->
                <li class="sideItem" v-for="(item, index) in source" :key='index'  @click='CateGoryArticle(index, item.name)'>
                    <myButton >
                      <Icon type="ios-paper-outline" />
                      {{ item.name }}
                    </myButton>
                    <span class="num">{{item.count}}</span>
                </li>
            </ul>
        </nav>
      <!-- <div class="searchWrap" v-if="type === 'topic'">
        <Input 
          placeholder="搜索速记" 
          icon="md-search" 
          @on-enter='searchShortList'
          @on-click='searchShortList'
          v-model="searchValue"
        />
      </div> -->
      </div>
    </div>  
  </div>
</template>

<script>
import myButton from '../../components/Button'
export default {
  data() {
    return {
      active: -1,
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
      this.active = index
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
  width: 150px;
  .sideWrap {
    min-width: 210px;
    // position: fixed;
    border-radius: 0.2rem;
    background-color: #fff;
    transition: all 0.2s linear;
    .ContentWrap {
      height: 100%;
      display: flex;
      flex-direction: column;
      // text-align: center;
      padding: 20px;
      .title {
        text-align: center;
        border-bottom: 1px solid #eee;
        color: #666;
        padding-bottom: 10px;
        margin-bottom: 10px;
        overflow: hidden;
      }
      .sideItem {
        width: 100%;
        height: 30px;
        font-size: 13px;
        // display: flex;
        // align-items: center;
        padding: 0 5px;
        &.active {
          .my-btn {
              color:#777
          }
        }
        cursor: pointer;
          &:hover {
            .my-btn {
                color:#777
            }
        }
        .num {
          float: right;
          background-color: #eee;
          color: #666;
          padding: 1px 6px;
          font-size: 12px;
          border-radius: 2px
        }
        .my-btn {
          color: #333;
          padding: 0;
        }
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