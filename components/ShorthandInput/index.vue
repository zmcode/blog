<template>
<div>
    <div class="publishWrap" v-if='UserToken' :class="{editPadding: isEdit}">
      <div class="titleBox" v-if="isEdit">
        <h3 class="title">修改速记</h3>
        <Icon type="md-close" class="titleIcon" size='20' @click="changeEditVis(false)"/>
      </div>
      <div class="content" :class="{'whiteBg': whiteBg}">
        <div class="textWrap" >
            <div class="textCard"> 
              <div
                contenteditable="true" 
                class="Richedit"
                ref="richInput"
                :class="[{ empty: placeholderText === '' }]"
                :placeholder="placeholderText"
                @input="changeValue($event)"
                spellcheck="false"
                @blur="whiteBg = false"
                @focus="whiteBg = true"
              >
              </div>
            </div>
        </div>
        <div class="imgWrap">
          <div class="previewImage" 
            v-for="(item, index) in imgUrlData" 
            :key="index"
          >
            <div class="imgContent"  :style="{background: 'url('+ item +')'}"></div>
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
            :on-progress="() => loading = true"
          > 
          <div style="cursor: pointer;">
            <Icon type="md-images" />
            <span>图片</span>
          </div>
          </Upload>
          <div class="TopicHandle">
            <myButton class="TopicChoose">选择分类</myButton>
            <DropList @click='changeTopic' class="TopicSelect">
                <DropListItem
                    :source='selectData'
                    :size="14"
                />
            </DropList>
          </div>
        </div>
      <myButton type='success' @click='publish' :loading='loading'>{{isEdit ? '确定修改' : '发布'}}</myButton>
      </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import expressionBox from '../../components/expressionBox'
import DropList from '../../components/dropList/index'
import DropListItem from '../../components/dropList/dropListItem'
import myButton from '../../components/Button'
import { publishShortHand, editShortHand } from '../../axios/api/shorthand'
import { upload } from '../../axios/api/common'
export default {
  components: { expressionBox, DropList, DropListItem, myButton },
  data () {
    return {
      placeholderText: '快速记录你的笔记',
      defaultTopic: '摸鱼/生活',
      imgUrlData: [],
      uploadType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
      selectData: [
        {
          name: '摸鱼/生活',
          a: true
        },
        {
          name: 'bug/踩坑',
          a: true
        },
        {
          name: '技巧/资源',
          a: true
        },
        {
          name: '笔记/记录',
          a: true
        }
      ],// 先创建,后期删除
      expressionSelect: false,
      forbidAdd: false,
      baseUrl: process.env.VUE_APP_API,
      loading: false,
      topic: '',
      whiteBg: false
    }
  },
  props: {
    getShortHandList: [Function],
    changeEditVis: [Function],
    itemData:[Object],
    isEdit : {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      UserToken: state => state.login.UserToken
    }),
    header(){
      return {
        'Authorization': 'Bearer' + ' ' + this.UserToken
      }
    }
  },
  methods: {
      addExpressions (e) {
        // if(!this.UserToken) {
        //   this.showModal = true
        //   return
        // }
        this.placeholderText = ''
        if (this.forbidAdd === true) {
          this.$Message.error('不能添加过多表情')
          return
        }
        const url = `<img src=${e.target.src}>`
        const template = document.createElement('template')
        if(url !== undefined) {
          template.innerHTML = url
          this.$refs.richInput.appendChild(template.content)
        }
        let arr = [...this.$refs.richInput.childNodes].filter(item => {
          return item.nodeType === 1 && item.tagName.toLocaleLowerCase() === 'img'
        })
        if (arr.length >= 10) {
          this.forbidAdd = true
        } else {
          this.forbidAdd = false
        }
      },
      changeValue() {
        this.placeholderText = ''
        // if(!this.UserToken) {
        //   this.showModal = true
        //   return
        // }
        if (!this.$refs.richInput.innerHTML) {
          this.placeholderText = '快速记录你的笔记'
        }
        let arr = [...this.$refs.richInput.childNodes].filter(item => {
          return item.nodeType === 1 && item.tagName.toLocaleLowerCase() === 'img'
        })
        arr.length >= 10 ? this.forbidAdd = true : this.forbidAdd = false
      },
      deleteImg(index) {
        this.imgUrlData.splice(index, 1)
      },
      // 上传照片成功后增加地址数组
      upLoadsuccess(response) {
        if(response.code === 200) {
          this.imgUrlData.push(response.data.url)
          setTimeout(() => {
            this.loading = false
          }, 200)
        }
      },
      // 发布
    publish() {
      if (!this.$refs.richInput.innerHTML && this.imgUrlData.length <= 0) {
        this.$Message.error('内容不能为空')
        return
      } 
      this.loading = true
      let ShortHandInfo = {
        content: this.$refs.richInput.innerHTML.replace(/<(?!img|p|div|\/p).*?>/g, '') || ' ',
        topic: this.topic || this.defaultTopic,
        status: 'online',
        imgData: this.imgUrlData
      }
      if (this.isEdit) {
        let _this = this
        editShortHand({id: this.itemData._id}, ShortHandInfo)
         .then(res => {
            if(res.code === 200)
            this.$Message.success('修改成功')
            this.imgUrlData = []
            this.$refs.richInput.innerHTML = ''
            this.nextPage = 1
            this.topic = ''
            this.placeholderText = '快速记录你的笔记'
            this.getShortHandList(_this.$route.query.page, _this.$route.query.topic)
            this.changeEditVis(false)
            setTimeout(() => {
              this.loading = false
            }, 200)
          })
      } else {
        // let _this = this
        publishShortHand(ShortHandInfo)
        .then(res => {
          if(res.code === 200)
          this.$Message.success('发布成功')
          this.imgUrlData = []
          this.$refs.richInput.innerHTML = ''
          this.nextPage = 1
          this.topic = ''
          this.placeholderText = '快速记录你的笔记'
          this.getShortHandList(1, '')
          // _this.$router.replace('/shorthand')
          setTimeout(() => {
            this.loading = false
          }, 200)
        })
      }
    },
      changeShow (value) {
        this.expressionSelect = value
      },
      // 改变类型
      changeTopic (name) {
        name = name.replace(/\s*/g,'')
        this.topic = name
        this.showSelect = false
      }
  },
    mounted() {
      if (this.isEdit) {
        let data = Object.assign({}, this.itemData)
        this.imgUrlData = data.imgData
        this.$refs.richInput.innerHTML = data.content
        this.topic = data.topic
        this.placeholderText = ''
      }
      let _this = this
      // 设置粘贴上传图片
      if (this.UserToken) {
        this.$refs.richInput.addEventListener('paste', function (event) {
          var items = (event.clipboardData || window.clipboardData).items
          var file = null
          if (items && items.length) {
            // 检索剪切板items
            for (var i = 0; i < items.length; i++) {
              if (items[i].type.indexOf('image') !== -1) {
                          _this.loading = true
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
              setTimeout(() => {
                _this.loading = false
              }, 200)
              _this.imgUrlData.push(res.data.url)
            })
        })

        // 粘贴代码处理
        this.$refs.richInput.addEventListener('paste', (e) => {
          e.stopPropagation()
          e.preventDefault()
          var text = '', event = (e.originalEvent || e)
          if (event.clipboardData && event.clipboardData.getData) {
              text = event.clipboardData.getData('text/plain')
          } else if (window.clipboardData && window.clipboardData.getData) {
              text = window.clipboardData.getData('Text')
          }
          if (document.queryCommandSupported('insertText')) {
              document.execCommand('insertText', false, text)
          } else {
              document.execCommand('paste', false, text)
          }
        })
      }
    }
}
</script>
<style lang="less" scoped>
  .publishWrap {
    padding: 1.333rem 1.666rem 0;
    // padding: 10px 25px;
    background: #fff;
    position: relative;
    border-radius: 2px;
    margin-bottom: 20px;
    &.editPadding {
      padding: 10px 25px;
    }
    .titleBox {
        text-align: center;
        margin-bottom: 10px;
        .title {
          display: inline-block;
          text-align: center;
        }
        .titleIcon {
          margin-top: 6px;
          float: right;
          cursor: pointer;
          font-size: 24px;
        }
    }
  .content {
    position: relative;
    border-radius: 2px;
    border: 1px solid hsla(0,0%,59.2%,.2);
    background-color: rgba(226,230,235,.2);
    .Richedit {
      max-height: 200px;
      overflow-y: auto;
      &:after {
        opacity: 0.7;
      }
    }
    &.whiteBg {
      background-color: #fff;
      border: 1px solid hsla(0,0%,59.2%,.5);
    }
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
          border: 1px solid #666;
          border-radius: 14px;
          text-align: center;
          color: #666;
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
</style>