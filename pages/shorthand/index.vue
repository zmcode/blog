<template>
<div>
<div v-if='topic && !this.LoginUserId' class="cateBox">
  <nuxt-link to='/shorthand' class="cateBox-link">速记</nuxt-link> / 分类为 <span style="color: red">{{topic}}</span> 的速记
</div>
<contentLayout>
  <div slot='main'>
    <!-- <div class="publishWrap" v-if='UserToken'>
      <div class="content">
        <div class="textWrap" >
            <div class="textCard"> 
                 <div 
                  contenteditable="true" 
                  class="Richedit" 
                  ref="richInput"
                  :class="[{ empty: value }]"
                  :placeholder='placeholderVis'
                  @input="changeValue($event)"
                  spellcheck="false"
                 >
              </div>
            </div>
        </div>
        <div class="imgWrap">
          <div class="previewImage" 
            v-for="(item, index) in imgUrlData" 
            :key="index" 
          >
            <div class="imgContent"  :style="{background: 'url('+item+')'}"></div>
            <Icon type="md-close" class="CloseIcon" size='12' @click="deleteImg(index)"/>
          </div>
        </div>
        <div class="topic">
          <span class="topicTitle">{{ topic ? topic : defaultTopic }}</span>
        </div>
      </div>
      <div class="toolWrap">
        <div class="tool">
          <expressionBox  
            :expressionSelect='expressionSelect'
            :changeShow='changeShow'
            :addExpressions='addExpressions'
            style="margin-right: 10px"
          ></expressionBox>
          <Upload 
            :action="`${baseUrl}/upload`"
            :data="{ dir: 'image/'}"
            :show-upload-list='false'
            :on-success='upLoadsuccess'
            :disabled='loading'
            :headers='header'
            :accept="`${uploadType.join(',')}`"
          > 
          <div style="cursor: pointer;">
            <Icon type="md-images" />
            <span>图片</span>
          </div>
          </Upload>
          <div class="TopicHandle">
            <myButton class="TopicChoose"> 选择分类</myButton>
            <DropList @click='changeTopic' class="TopicSelect">
                <DropListItem
                    :source='selectData'
                    :size="14"
                />
            </DropList>
          </div>
        </div>
      <myButton type='success' @click='publish'>发布</myButton>
      </div>
    </div> -->
    <shorthandInput :getShortHandList='getShortHandList'></shorthandInput>
    <div v-if='topic && this.LoginUserId' style="padding-bottom: 10px">
      <nuxt-link to='/shorthand' class="cateBox-link">速记</nuxt-link> / 分类为 <span style="color: red">{{topic}}</span> 的速记
    </div>
    <shorthandList 
    :source='listData' 
    :LoginUserId='LoginUserId' 
    :changeEditVis="changeEditVis" 
    :changeItemData="changeItemData"
    :getShortHandList="getShortHandList"
     v-if="!loading"/>
    <div class="pageWrap">
      <Page size="small" :total='total' :pageSize='5' @on-change='changePage' v-if="total && !loading" :current="currentPage"/>
    </div>
    <shorthandEdit :getShortHandList="getShortHandList" :isShowEdit='isShowEdit'  :changeEditVis="changeEditVis" :itemData="itemData"></shorthandEdit>
    <loadingBox :loading='loading' />
    <div class="NoList" v-if='listData.length === 0 && !loading'>
       <p>当前没有内容</p>
    </div>
  </div>
  <div slot="side">
    <sideList :source='topicData' :path='path' :changeCateGory='changeCateGory'></sideList>
  </div>
</contentLayout>
<!-- <Modal
  title='提示'
  :visible='showModal'
  :mask='true'
  @onOk='goLogin'
  @onCancle='showModal = false'
  okText='去登陆'
>
    <p>检测到你没有登录账号或者账号验证过期,需要登陆才可以发布速记</p>
</Modal> -->
</div>

</template>

<script>
/*eslint-disable no-prototype-builtins */
/*eslint-disable no-useless-escape */
import shorthandList from '../../components/shorthandList'
// import Skeleton from '../../components/Skeleton'
import { ShortHandList } from '../../axios/api/shorthand'
import { GetRecordSelect, getUserId } from '../../axios/api/common'
import sideList from '../../components/sideList'
import { mapState } from 'vuex'
import contentLayout  from '../../components/contentLayout'
import shorthandInput from '../../components/ShorthandInput'
import shorthandEdit from '../../components/shorthandEdit'
import loadingBox from '../../components/loadingBox'
export default {
  layout: 'blog',
  components: {
    contentLayout,
    sideList,
    // Skeleton,
    shorthandList,
    shorthandInput,
    shorthandEdit,
    loadingBox
  },
  data() {
    return {
      showModal:false,
      path: '/shorthand',
      LoginUserId: '',
      isShowEdit: false,
      itemData: {},
      topic: ''
    }
  },
  async asyncData({ query, error }) {
    try {
      const { data: { list, hasNextPage, next, total, currentPage } } = await ShortHandList({
        topic: query.topic,
        page: query.page
      })
      const { data } = await GetRecordSelect()
      return {
        listData: list,
        hasNextPage: hasNextPage,
        nextPage: next,
        loading: false,
        topicData: data,
        total,
        currentPage,
        topic: query.topic
      }
    } catch {
     error({ statusCode: 404 })
    }
  },
  methods: {
    // 获取文章的列表
    getShortHandList(page, topic) {
      if(page <= 0) page = 1
      this.loading = true
      ShortHandList({
        page: page || 1,
        topic: topic || ''
      })
        .then(res => {
          if(res.code === 200) {
            this.nextPage = res.data.next
            this.hasNextPage = res.data.hasNextPage
            this.listData = res.data.list
            this.currentPage = res.data.currentPage
            this.total = res.data.total
            setTimeout(() => {
              this.loading = false
            }, 500)
            if (!topic) {
              this.topic = ''
            }
          }
        })
    },
    goLogin() {
      this.$router.replace('/login')
    },
    changeEditVis (value) {
      this.isShowEdit = value
    },
    changeItemData (data) {
      this.itemData = data
    },
    changePage (value) {
      this.$router.push(`/shorthand?page=${value}&topic=${this.topic}`)
    },
    changeCateGory (name) {
      this.topic = name
    }
  },
  mounted() {
    getUserId({
      token: this.UserToken
    })
      .then(res => {
        if (res.code === 200) {
          this.LoginUserId = res.id
        }
      })
  },
  computed: {
        ...mapState({
          UserToken: state => state.login.UserToken
        }),
         ...mapState({
          userInfo: state => state.login.userInfo
        })
    },
    watch: {
      $route({ query }) {
        this.listData = []
        this.topic = query.topic || ''
        this.getShortHandList(query.page,query.topic)
      }
    }
}
</script>

<style lang="less" scoped>
.publishWrap {
    padding: 1.333rem 1.666rem 0;
    background: #fff;
    position: relative;
    border-radius: 2px;
    margin-bottom: 20px;
  .content {
    position: relative;
    border-radius: 2px;
    border: 1px solid hsla(0,0%,59.2%,.2);
    background-color: rgba(226,230,235,.2);
    .textWrap {
      position: relative;
      .textCard {
        position: relative;
        .Richedit {
          font-size: 16px;
          position: relative;
          height: 100%;
          outline: none;
          border-radius: 2px;
          color: #17181a;
          min-height: 75px;
          padding: 8px 10px;
          min-height: 37px;
          &:after {
            content: attr(placeholder);
            position: absolute;
            top: 8px;
            color: rgba(23,24,26,.4);
            pointer-events: none;
            user-select: none;
            display: inline-block;
          }
          &.empty {
             &:after {
              display: none;
            }
          }
          ::v-deep img{
            max-width: 40px;
            max-height: 40px;
          }
        }
      }
    }
    .imgWrap {
      display: flex;
      flex-wrap: wrap;
      padding: 12px;
      position: relative;
      .previewImage {
        position: relative;
        cursor: pointer;
        .imgContent {
          background-size: cover !important;
          flex: 0 0 auto;
          width: 80px;
          height: 80px;
          border-radius: 1.4px;
          border: 1px dashed #c5c5c5;
          background: #f8f8f9;
          margin: 0 .666rem .666rem 0;
          &:hover {
            filter: brightness(.8);
          }
        }
        .CloseIcon {
          position: absolute;
          right: 15px;
          top: 5px;
          border-radius: 50%;
          border: 1px solid #c5c5c5;
          background: rgba(0,0,0,.4);
          &:hover {
            opacity: .8;
          }
        }
      }
        .file-upload {
        position: relative;
        overflow: hidden;
        border: 1px solid #C5B7B7;
        display: inline-block;
        padding: 10px 10px;
        border-radius: 3px;
        margin-top: 10px;
      }
      .file-upload-input {
        position: absolute;
        width: 999px;
        height: 999px;
        top: 0;
        right: 0;
        cursor: pointer;
      }
    }
    .topic {
      padding: 0 12px 12px;
      .topicTitle {
          font-size: 13px;
          display: inline-block;
          line-height: 22px;
          height: 22px;
          padding: 0 12px;
          border: 1px solid #007fff;
          border-radius: 14px;
          text-align: center;
          color: #007fff;
          user-select: none;
      }
    }
  }
  .toolWrap {
    padding: 10px 0;
    display: flex;
    justify-content:space-between;
    .tool {
      display:flex;
      align-items: center;
      .TopicHandle {
        position:relative;
        &:hover {
          .TopicSelect {
            display: block;
          }
        }
        .TopicSelect {
          display: none;
        }
        .TopicChoose {
            color: #515a6e;
        }
      }
    }
  }
}
.cateBox {
  padding: 20px 20px 0 20px;
}
.NoList {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
}
.pageWrap {
  margin-top: 20px;
  text-align: center;
  ::v-deep.ivu-page-prev, ::v-deep.ivu-page-next,  ::v-deep.ivu-page-item {
    background: rgba(0, 0, 0, 0);
  }
}
</style>