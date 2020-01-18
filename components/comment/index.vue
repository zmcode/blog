<template>
  <div class="commentWrap">
    <!-- <div class="comment-form" :class="{'focused': isShowAcitonBox}">
      <div class="avatar-box">
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
          <div class="expression-box">
            <Icon type="md-happy" size='20' @click="expressionSelect = !expressionSelect"/>
            <div class="expression-select" v-if="expressionSelect">
              <div class="triangle"></div>
              <div class="expression-content">
                <div class="expression-picker">
                  <div class="expressions">
                    <ul class="category">
                      <li class="item" v-for='(item, index) in expressionUrl.tieba.alias' :key="index" @click='addExpressions'>
                        <img :src="expressionUrl.tieba.path + item + expressionUrl.tieba.file" alt="">
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="otherPage">
                <li class="pageItem">贴吧表情</li>
                <li class="pageItem">问道表情</li>
              </div>
            </div>
          </div>
          <div class="submit">
            <Button type='success' @click="comment">评论</Button>
          </div>
        </div>
      </div>
    </div> -->
    <div v-if="!userInfo.avatar" class="noUser">
      <div class="comment-clear">
        <p>创作不易, 登录给作者点评下吧!</p>
        <nuxt-link to='/login' class="login-btn">
        登录
      </nuxt-link>
      <img :src="`${baseUrl}/wendaovip/shuai.gif`" alt="">
      </div>
    </div>
    <contentEdit 
      :userInfo='userInfo' 
      :arUserID='arUserInfo.id' 
      :blurHidden='true' 
      :isShowAcitonBox='isShowAcitonBox'
      :replyUserInfo='arUserInfo'
      @handle='handleShowSend'
      v-if='userInfo.avatar'
      :clearSubComment='clearSubComment'
      :noFocus='true'
    >
    </contentEdit>
    <div class="comment-list">
      <div class="item" v-for="(item, index) in allComment" :key="index">
        <div class="comment">
          <div class="user-avatar">
            <nuxt-link :to="`/home/${ item.userInfo.id }`">
              <div :style="{'background': 'url(' + item.userInfo.avatar+ ')'}"></div>
            </nuxt-link>
          </div>
          <div class="content-box">
            <div class="meta-box">
              {{item.userInfo.name}}
            </div>
            <div class="content" v-html="item.content">
            </div>
            <div class="reply">
              <div class="time">{{ item.created | dateFormat }}</div>
              <div class="action-box" @click='showSubComment(item._id)' v-if="userInfo.avatar">
                <Icon type="ios-undo" size='13'/>
                <span>回复</span>
              </div>
            </div>
            <div class="comment-form-reply">
              <contentEdit 
                :isShowAvavtar='false' 
                :userInfo='userInfo' 
                v-if='subCommentIndex === item._id'
                :arUserID='arUserInfo.id'
                :clearSubComment='clearSubComment'
                :isShowAcitonBox='true'
                :replyUserInfo='item.userInfo'
                :parentId='item._id'
              ></contentEdit>
            </div>
            <div class="sub-comment-list" v-if="item.topComment.length > 0">
              <div class="item" v-for="(item, index) in item.topComment" :key="index">
                <div class="sub-comment">
                  <div class="sub-comment-row">
                    <div class="sub-comment-content-row">
                      <div class="sub-comment-content-box">
                        <div class="sub-user-avatar">
                          <nuxt-link :to="`/home/${item.userInfo.id}`">
                            <div :style="{'background': 'url(' + item.userInfo.avatar+ ')'}"></div>
                          </nuxt-link>
                        </div>
                        <div class="sub-user-content-box">
                          <div class="sub-user-name">
                            {{ item.userInfo.name }}
                          </div>
                          <div class="sub-user-content">
                            <span class="sub-user-conetent-reply-text">回复</span>
                            <div class="replyUserName">
                              <nuxt-link :to="`/home/${ item.respUserInfo.id }`">{{item.respUserInfo.name}}: </nuxt-link>
                            </div>
                            <span class="replyContent" v-html="item.content"></span>
                          </div>
                          <div class="sub-user-reply-box">
                            <div class="sub-time">{{ item.created | dateFormat }}</div>
                            <div class="sub-action-box"  @click='showSubComment(item._id)' v-if="userInfo.avatar">
                              <Icon type="ios-undo" size='13'/>
                              <span >回复</span>
                            </div>
                          </div>
                          <contentEdit 
                            :isShowAvavtar='false' 
                            :userInfo='userInfo' 
                            color='#fff' 
                            v-if='subCommentIndex === item._id'
                            :arUserID='arUserInfo.id'
                            :clearSubComment='clearSubComment'
                            :isShowAcitonBox='true'
                            :replyUserInfo='item.userInfo'
                            :parentId='item.parent_id'
                          ></contentEdit>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable no-useless-escape */
import { mapState } from 'vuex'
import { expressionUrl } from '../../assets/js/expression'
// import Button from '../../components/Button'
import { arCommentList } from '../../axios/api/article'
import contentEdit from '../../components/contentEdit'
export default {
  props: {
    arUserInfo: [Object]
  },
  data () {
    return {
      isShowAcitonBox: false,
      commentValue: '',
      expressionUrl: expressionUrl,
      expressionSelect: false,
      allComment: [],
      subCommentIndex: null,
      baseUrl: process.env.VUE_APP_IMG
    }
  },
  components: { contentEdit },
  methods: {
    showSubComment (id) {
      this.subCommentIndex = id
    },
    clearSubComment () {
      this.subCommentIndex = null
    },
    // 控制第一个是否显示发送框
    handleShowSend (value) {
      this.isShowAcitonBox = value
    },
    changeCommentList (data) {
      this.allComment = data
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    })
  },
  mounted () {

    arCommentList({ id: this.$route.params.id })
      .then(res => {
        this.allComment = res.data.list
      })
  }
}
</script>

<style lang="less" scoped>
.commentWrap{
  .noUser{
    margin: 20px;
    .comment-clear {
      width: 100%;
      height: 86px;
      padding: 22px 30px;
      background-color: #fafbfc;
      border: 1px solid #e2e6ea;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      p {
        float: left;
        font-size: 16px;
        color: black;
        line-height: 40px;
        font-weight: 600;
      }
      .login-btn {
        float: right;
        display: inline-block;
        padding: 10px 20px;
        line-height: 20px;
        letter-spacing: 1px;
        font-size: 15px;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: none;
        color: rgba(0, 0, 0, .65);
        background-color: #fff;
        border: 1px solid #e2e6ea;
        width: 100px;
        padding: 10px 0;
        border-radius: 5px;
        font-weight: bold;
        &:hover {
          background-color: #e2e6ea;
        }
      }
      img {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        border-radius: 50%;
      }
    }
  }
  .comment-list {
    margin: 0 1.666rem 0 4.85rem;
    .item {
      margin-bottom: 1.333rem;
      .comment {
        display: flex;
        .user-avatar {
          width: 40px;
          height: 40px;
          display: inline;
          a {
            text-decoration: none;
            cursor: pointer;
            color: #909090;
            flex: 0 0 auto;
            width: 100%;
            display: inline-block;
            height: 100%;
            div {
              margin: 0 1rem 0 0;
              width: 40px;
              height: 40px;
              display: inline-block;
              border-radius: 50%;
              position: relative;
              background-position: 50%;
              background-size: cover !important;
              background-repeat: no-repeat !important;
              background-color: #eee !important;
            }
          }
        }
        .content-box {
          margin-left: .833rem;
          flex: 1 1 auto;
          border-bottom: 1px solid #f1f1f1;
          .meta-box {
            display: flex;
            align-items: center;
            font-size: 16px;
            line-height: 1.2;
            white-space: nowrap;
            font-weight: 700;
            margin-top: 5px;
          }
          .content {
            margin-top: .55rem;
            font-size: 16px;
            line-height: 1.833rem;
            word-wrap: break-word;
            white-space: pre-wrap;
            word-break: break-all;
            color: #505050;
            ::v-deep img {
              max-width: 40px;
              max-height: 40px; 
            }
          }
          .reply {
            display: flex;
            margin: 1rem 0;
            font-weight: 400;
            justify-content: space-between;
            align-items: center;
            .time {
              font-size: 13px;
              color: #8a9aa9;
              cursor: default;
            }
            .action-box {
              display: flex;
              align-items: center;
              cursor: pointer;
              font-size: 13px;
              color: #8a93a0; 
              &:hover {
                opacity: 0.8;
              }
              span {
                margin-left:5px
              }
            }
          }
          .sub-comment-list {
            margin: 1rem 0;
            padding: 0 0 0 1rem;
            background-color: #fafbfc;
            border-radius: 3px;
            .item {
              .sub-comment {
                position: relative;
                padding: 1rem 0 0;
                .sub-comment-row {
                  display: flex;
                  align-items: flex-start;
                  .sub-comment-content-row {
                    display: flex;
                    width: 100%;
                    .sub-comment-content-box {
                      display: flex;
                      width: 100%;
                      .sub-user-avatar {
                        width: 35px;
                        height: 35px;
                         a {
                          text-decoration: none;
                          cursor: pointer;
                          color: #909090;
                          flex: 0 0 auto;
                          width: 100%;
                          display: inline-block;
                          height: 100%;
                          div {
                            margin: 0 1rem 0 0;
                            width: 35px;
                            height: 35px;
                            display: inline-block;
                            border-radius: 50%;
                            position: relative;
                            background-position: 50%;
                            background-size: cover !important;
                            background-repeat: no-repeat !important;
                            background-color: #eee !important;
                          }
                        }
                      }
                      .sub-user-content-box {
                        margin-left: .833rem;
                        margin-right: 1rem;
                        padding-bottom: 12px;
                        font-size: 1.083rem;
                        color: #17181a;
                        width: 100%;
                        border-bottom: 1px solid #f1f1f1;
                        .sub-user-name {
                          display: flex;
                          align-items: center;
                          font-size: 16px;
                          line-height: 1.2;
                          white-space: nowrap;
                          font-weight: 700;
                          margin-top: 5px;
                        }
                        .sub-user-content {
                          display: inline-block;
                          margin-top: .5rem;
                          .sub-user-conetent-reply-text {
                            color: #17181a;
                            font-size: 13px
                          }
                          .replyUserName {
                            display: inline-block;
                            a {
                              color: #406599;
                              font-weight: 400;
                              font-size: 14px
                            }
                          }
                          .replyContent {
                            white-space: pre-wrap;
                            color: #505050;
                            line-height: 1.833rem;
                            ::v-deep img {
                              max-width: 40px;
                              max-height: 40px;
                            }
                          }
                        }
                        .sub-user-reply-box {
                          display: flex;
                          margin-top: 7px;
                          font-size: 13px;
                          color: #8a93a0;
                          justify-content: space-between;
                          .sub-time {
                            font-size: 12px;
                            color: #8a93a0;
                          }
                          .sub-action-box {
                            flex: 0 0 auto;
                            display: flex;
                            font-size: 12px;
                            color: #8a93a0;
                            user-select: none;
                            align-items: center;
                            cursor: pointer;
                            &:hover {
                              opacity: 0.8;
                            }
                            span {
                              margin-left: 5px
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>