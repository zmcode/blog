<template>
  <div class="comment-form" :class="{'focused': isShowAcitonBox}" :style="{'background-color': color}">
      <div class="avatar-box" v-if='isShowAvavtar'>
        <div :style="{'background': 'url(' + userInfo.avatar+ ')'}" class="avatar"></div>
      </div>
      <div class="form-box" ref="commentForm">
        <div class="input-box">
          <div class="auth-card">
            <div contenteditable="true" spellcheck="false" class="rich-input" ref="richInput" 
              @input="changeValue($event)"
            ></div>
          </div>
        </div>
        <div class="action-box" v-if="isShowAcitonBox">
          <div class="expression-box" ref="expressionBox">
            <Icon type="md-happy" size='20' @click="expressionSelect = !expressionSelect"/>
            <div class="expression-select" v-if="expressionSelect">
              <div class="triangle"></div>
              <div class="expression-content">
                <div class="expression-picker">
                  <div class="expressions">
                    <ul class="category">
                      <li class="item" v-for="(item, index) in expressionUrl[imgPathName].alias" :key="index" >
                        <img :src="expressionUrl[imgPathName].path + item + expressionUrl[imgPathName].file"  @click.stop='addExpressions'>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="otherPage">
                <li class="pageItem" @click="changeImgList('tieba')" :class="{'active': this.imgPathName === 'tieba'}"></li>
                <li class="pageItem" @click="changeImgList('wendao')" :class="{'active': this.imgPathName === 'wendao'}"></li>
                <li class="pageItem" @click="changeImgList('wendaovip')" :class="{'active': this.imgPathName === 'wendaovip'}"></li>
              </div>
            </div>
          </div>
          <div class="submit">
            <Button type='success' @click="comment">评论</Button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Button from '../../components/Button'
import { puArComment, arCommentList } from '../../axios/api/article'
import { expressionUrl } from '../../assets/js/expression'
export default {
  data () {
    return {
      expressionSelect: false,
      expressionUrl: expressionUrl,
      forbidAdd: false,
      imgPathName: 'tieba'
    }
  },  
  components: { Button },
  props: {
    userInfo: [Object], // 当前评论用户数据
    replyUserInfo: [Object], // 回复目标用户数据
    isShowAvavtar: {
      type: Boolean,
      default: true
    },
    color: {
      type:String,
      default: '#fafbfc'
    },
    arUserID: {
      type: String
    },
    clearSubComment: [Function],
    blurHidden: [Boolean],
    isShowAcitonBox: {
      type: Boolean,
      default: false
    },
    parentId: [String]
  },
  methods:{
    comment () {
      // 添加评论
      puArComment(
        { id: this.$route.params.id }, 
        {
          content: this.$refs.richInput.innerHTML.replace(/<(?!img|p|\/p).*?>/g, ''),
          replyUserId: this.replyUserInfo.id,
          parentId: this.parentId ? this.parentId : ''
        }
      )
        .then(res => {
          if (res.code === 200) {
            this.forbidAdd = false
            this.$refs.richInput.innerHTML = ''
            arCommentList({ id:this.$route.params.id }).then(res => {
              this.$parent.changeCommentList(res.data.list)
              this.clearSubComment()
            })
          }
        })
    },
    // 改变内容区
    changeValue () {
      let arr = [...this.$refs.richInput.childNodes].filter(item => {
        return item.nodeType === 1 && item.tagName.toLocaleLowerCase() === 'img'
      })
      arr.length >= 10 ? this.forbidAdd = true : this.forbidAdd = false
    },
    // 添加表情
    addExpressions (e) {
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
      if (arr.length > 10) {
        this.forbidAdd = true
      } else {
        this.forbidAdd = false
      }
    },
    // 控制表情发送框是否显示(不能通过焦点,因为点了表情会消失)
    showBox (ev) {
      if (this.$refs.commentForm.contains(ev.target)) {
        this.$emit('handle', true)
        // this.isShowAcitonBox = true 
      } else {
        if (this.$refs.richInput.innerHTML === '' && this.blurHidden === true) {
          this.$emit('handle', false)
          // this.isShowAcitonBox = false
        } else if (this.$refs.richInput.innerHTML === '' && this.blurHidden !== true && document.hasFocus() &&
          document.activeElement !== this.$refs.richInput) {
          this.clearSubComment()
        }
      }
    },
    // 表情选择界面隐藏显示,只要不是点自己的儿子,就隐藏
    HandleshowExpressionsBox (ev) {
      if (!this.$refs.expressionBox) return
      if (!this.$refs.expressionBox.contains(ev.target)) {
        this.expressionSelect = false 
      }
    },
    changeImgList (name) {
      this.imgPathName = name
    }
  },
  mounted () {
    this.$refs.richInput.focus()
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
    // this.$refs.richInput.addEventListener('blur', () => {
    //   if (this.clearSubComment && this.$refs.richInput.innerHTML === '') {
    //     this.clearSubComment()
    //   }
    // })
    document.documentElement.addEventListener('click', this.showBox, false)
    document.documentElement.addEventListener('click', this.HandleshowExpressionsBox, false)
  },
  destroyed () {
    document.documentElement.removeEventListener('click', this.showBox, false)
    document.documentElement.removeEventListener('click', this.HandleshowExpressionsBox, false)
  }
}
</script>

<style lang="less" scoped>
.comment-form {
    margin: 18px 0;
    display: flex;
    position: relative;
    padding: 1rem 1.333rem;
    background-color: #fafbfc;
    border-radius: 3px;
    &.focused {
      .input-box {
        border-color: #e2e6ea;
        box-shadow: 0 0 0 1px #e2e6ea;
      }
    }
    .avatar-box {
      flex: 0 0 auto;
      .avatar {
        margin: 0 1rem 0 0;
        width: 2.667rem;
        height: 2.667rem;
        display: inline-block;
        border-radius: 50%;
        position: relative;
        background-position: 50%;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        background-color: #eee !important;
      }
    }
    .form-box {
      flex: 1 1 auto;
      position: relative;
      .input-box {
        font-size: 0;
        background-color: #fff;
        border: 1px solid #e2e6ea;
        border-radius: 3px;
        .auth-card {
          position: relative;
          .rich-input {
            position: relative;
            padding: .6rem 1rem;
            font-size: 14px;
            line-height: 1.7;
            color: #17181a;
            outline: none;
            min-height: 1.3em;
            ::v-deep img {
              max-width: 40px;
              max-height: 40px
            }
          }
        }
      }
      .action-box {
        display: flex;
        align-items: center;
        margin: .65rem 0 0;
        .expression-box {
          position: relative;
          cursor: pointer;
          .expression-select {
            padding: 1rem;
            position: absolute;
            top: 40px;
            left: -30px;
            z-index: 1;
            bottom: 0;
            width: 280px;
            height: 250px;
            border-radius: 2px;
            background-color: #fff;
            box-shadow: 0 5px 18px 0 rgba(0,0,0,.16);
            .triangle {
              position: absolute;
              top: -.7rem;
              left: 15%;
              width: 0;
              height: 0;
              transform: translate(-50%,-50%);
              border: .8rem solid transparent;
              border-bottom-color: #fff;
            }
            .expression-content {
              overflow: auto;
              margin-bottom: 10px;
              .expression-picker {
                .expressions {
                  .category {
                    max-width: 280px;
                    max-height: 225px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: flex-start;
                    .item {
                      font-size: 1.4rem;
                      padding: 5px 4.5px;
                      cursor: pointer;
                      img {
                        width: 22px;
                        height: 22px;
                        display: block;
                        &:hover {
                          transform: scale(1.2)
                        }
                      }
                    }
                  }
                }
              }
            }
            .otherPage {
              width: 100%;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              bottom: 10px;
              left: 50%;
              transform: translate(-50%,-50%);
              .pageItem {
                margin: 0 5px;
                width: 6px;
                height: 6px;
                border-radius: 100%;
                background-color: #f0f0f0;
                cursor: pointer;
                list-style: none;
                &.active {
                  background-color: #d8d8d8;
                }
              }
            }
          }
        }
        .submit {
          flex: 0 0 auto;
          margin-left: auto;
        }
      }
    }
  }
</style>