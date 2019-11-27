<template>
<contentLayout>
  <div slot='main'>
    <div class="publishWrap">
      <div class="content">
        <div class="textWrap" >
            <div class="textCard"> 
                 <div 
                  contenteditable="true" 
                  class="Richedit" 
                  ref="text"
                  placeholder='快速记录你遇到的问题或者分享你的小技巧'
                  :class="[{ empty: value }]"
                  @input="changeValue($event)"
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
    </div>
    <shorthandList :source='listData'/>
    <Skeleton v-if='loading' />
    <div class="NoList" v-if='listData.length === 0 && !loading'>
       <p>当前没有内容</p>
    </div>
  </div>
  <div slot="side">
    <sideList :source='topicData' :path='path'></sideList>
  </div>
</contentLayout>
</template>

<script>
import shorthandList from '../../components/shorthandList'
import Skeleton from '../../components/Skeleton'
import { publishShortHand, ShortHandList } from '../../axios/api/shorthand'
import { GetRecordSelect } from '../../axios/api/common'
import sideList from '../../components/sideList'
import DropList from '../../components/dropList/index'
import DropListItem from '../../components/dropList/dropListItem'
import { mapState } from 'vuex'
import { upload } from '../../axios/api/common'
import myButton from '../../components/Button'
import contentLayout  from '../../components/contentLayout'
export default {
  layout: 'blog',
  components: {
    contentLayout,
    myButton,
    DropList,
    DropListItem,
    sideList,
    Skeleton,
    shorthandList,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_API,
      path: '/shorthand',
      topic: '', // 默认的主题
      value: '',
      defaultTopic: '摸鱼/生活',
      imgUrlData: [],
      uploadType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
      selectData: [
        {
          name: '摸鱼/生活'
        },
        {
          name: 'bug/踩坑'
        },
        {
          name: '技巧/资源'
        },
        {
          name: '笔记/记录'
        }
      ] // 先创建,后期删除
    }
  },
  async asyncData({ query, error }) {
    try {
      const { data: { list, hasNextPage, next, } } = await ShortHandList({
            topic: query.topic
      })
      const { data } = await GetRecordSelect()
      console.log(data)
      return {
        listData: list,
        hasNextPage: hasNextPage,
        nextPage: next,
        loading: false,
        topicData: data
      }
    } catch {
     error({ statusCode: 404 })
    }
  },
  methods: {
    // 监听value变化
    changeValue(e) {
      this.value = e.target.innerText
    },
    // 删除图片后删除对应的地址数组
    deleteImg(index) {
      this.imgUrlData.splice(index, 1)
    },
    // 上传照片成功后增加地址数组
    upLoadsuccess(response) {
      this.loading = false
      if(response.code === 200) {
         this.imgUrlData.push(response.data.url)
      }
    },
    // 改变类型
    changeTopic (name) {
      name = name.replace(/\s*/g,'')
      this.topic = name
      this.showSelect = false
    },
    // 发布
    publish() {
      if(!this.value && this.imgUrlData.length === 0) {
        this.$Message.error('不能发布空内容')
        return
      } 
      let ShortHandInfo = {
        content: this.value,
        topic: this.topic || this.defaultTopic,
        status: 'online',
        imgData: this.imgUrlData
      }
      publishShortHand(ShortHandInfo)
        .then(res => {
          if(res.code === 200)
          this.$Message.success('发布成功')
          this.imgUrlData = []
          this.value = ''
          this.$refs.text.innerText = ''
          this.loading = true
          this.nextPage = 1
          this.topic = ''
          this.getShortHandList([])
        })
    },
    // 获取文章的列表
    getShortHandList(list= []) {
      this.loading = true
      ShortHandList({
        page: this.nextPage,
        topic: this.topic
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
    },
    // 滚动请求
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
          this.getShortHandList(this.listData)
        } 
    },
    // 模糊搜索

  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    let _this = this
    // 设置粘贴上传图片
    document.addEventListener('paste', function (event) { 
      var items = (event.clipboardData || window.clipboardData).items
      console.log(items)
      var file = null
      if (items && items.length) {
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {  
                file = items[i].getAsFile()
                break
            } else {
              return 
            }
        }
      }
      var formData = new FormData()
      formData.append('file', file)
      upload(formData)
        .then(res => {
          _this.imgUrlData.push(res.data.url)
        })
    })
  },
  computed: {
        ...mapState({
            UserToken: state => state.login.UserToken
        }),
        header(){
            return {
                'Authorization': 'Bearer' + ' ' + this.UserToken
            }
        },
         ...mapState({
            userInfo: state => state.login.userInfo
        })
    },
    watch: {
      $route({ query }) {
        this.listData = []
        this.nextPage = 1
        this.topic = query.topic || ''
        this.getShortHandList(this.listData)
      }
    }
}
</script>

<style lang="less" scoped>
.publishWrap {
    margin-top: 20px;
    padding: 1.333rem 1.666rem 0;
    background: #fff;
    position: relative;
    border-radius: 2px;
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
.NoList {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
}
</style>