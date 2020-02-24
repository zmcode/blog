<template>
    <div class="comment-list">
      <div class="item">
        <div class="comment">
          <div class="user-avatar">
            <nuxt-link :to="`/home/${ commentItem.userInfo.id }`">
              <div :style="{'background': !commentItem.userInfo.avatar ? 'url(' + `${baseUrl}/default-avatar.e30559a.svg` + ')' : 'url(' + commentItem.userInfo.avatar + ')'}"></div>
            </nuxt-link>
          </div>
          <div class="content-box">
            <div class="meta-box">
              <span>{{commentItem.userInfo.name}}</span>
              <span class="author" v-if="commentItem.userInfo.id === arUserInfo.id">作者</span>
            </div>
            <div class="content" v-html="commentItem.content">
            </div>
            <div class="reply">
              <div class="time">
                <span>{{ commentItem.created | dateFormat }}</span>
                <span class="deleteBtn" v-if="loginUserId === commentItem.userInfo.id" @click="ShowdeleteModal(commentItem._id, false)">删除</span>
              </div>
              <div class="action-box">
                <div class="reply-box" @click='showSubComment(commentItem._id)'  v-if="UserToken">
                    <Icon type="ios-undo" size='13'/>
                    <span>回复</span>
                </div>
                <span class="reply-num-box" v-if="replyNum !== 0" @click="seeTopCommentList(commentItem._id, itemIndex)">{{isShowCommentList?  '收起回复' : `查看回复 ${replyNum}`}}</span>
              </div>
            </div>
            <div class="comment-form-reply">
              <contentEdit 
                :isShowAvavtar='false' 
                :userInfo='userInfo' 
                v-if='subCommentIndex === commentItem._id'
                :arUserID='arUserInfo.id'
                :clearSubComment='clearSubComment'
                :isShowAcitonBox='true'
                :replyUserInfo='commentItem.userInfo'
                :parentId='commentItem._id'
                :subReply="true"
                :changeSubCommentList='changeSubCommentList'
                :articleId='articleId'
                :changeReviewNum='changeReviewNum'
                :reviewNum='reviewNum'
              ></contentEdit>
            </div>
            <div class="sub-comment-list" v-if="isShowCommentList">
              <div class="item" v-for="(item, index) in topCommentListData" :key="index">
                <div class="sub-comment">
                  <div class="sub-comment-row">
                    <div class="sub-comment-content-row">
                      <div class="sub-comment-content-box">
                        <div class="sub-user-avatar">
                          <nuxt-link :to="`/home/${item.userInfo.id}`">
                            <div :style="{'background': !item.userInfo.avatar ? 'url(' + `${baseUrl}/default-avatar.e30559a.svg` + ')' : 'url(' + item.userInfo.avatar + ')'}"></div>
                          </nuxt-link>
                        </div>
                        <div class="sub-user-content-box">
                          <div class="sub-user-name">
                            <span>{{ item.userInfo.name }}</span>
                            <span class="author" v-if="item.userInfo.id === arUserInfo.id">作者</span>
                          </div>
                          <div class="sub-user-content">
                            <span class="sub-user-conetent-reply-text">回复</span>
                            <div class="replyUserName">
                              <nuxt-link :to="`/home/${ item.respUserInfo.id }`">{{item.respUserInfo.name}}: </nuxt-link>
                            </div>
                            <span class="replyContent" v-html="item.content"></span>
                          </div>
                          <div class="sub-user-reply-box">
                            <div class="sub-time">
                              <span>{{ item.created | dateFormat }}</span>
                              <span class="deleteBtn" v-if="loginUserId === item.userInfo.id" @click="ShowdeleteModal(item._id, true, item.parent_id)">删除</span>
                              </div>
                            <div class="sub-action-box"  @click='showSubComment(item._id)' v-if="UserToken">
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
                             :subReply="true"
                             :changeSubCommentList='changeSubCommentList'
                             :articleId='articleId'
                             :changeReviewNum='changeReviewNum'
                            :reviewNum='reviewNum'
                          ></contentEdit>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span class="more" @click="getMoreSubList(commentParentId)" v-if="hasNextPage"> {{loading ? '加载中...' : '加载更多 > '}}</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        :visible='isShowDelete'
        title='删除评论'
        :mask='true'
        @onOk='deleteComment'
        @onCancle='isShowDelete = false'
      >
          {{deleteContent}}
      </Modal>
    </div>
</template>

<script>
import contentEdit from '../../components/contentEdit'
import { topCommentList, deleteCom } from '../../axios/api/article'
import Modal from '../../components/myModal'
export default {
  components: { contentEdit, Modal },
  props: {
    commentItem: [Object],
    UserToken: [String],
    userInfo: [Object],
    subCommentIndex: [String],
    showSubComment: [Function],
    itemIndex: [Number],
    arUserInfo: [Object],
    clearSubComment: [Function],
    commentParentId: [String],
    loginUserId: [String],
    articleId: [String],
    changeCommentList:[Function],
    changeReviewNum: [Function],
    reviewNum: [Number]
  },
  data () {
    return {
      isShowCommentList: false,
      topCommentListData: [],
      replyNum: 0,
      hasNextPage: false, // 是否还有一级评论
      loading: false, // 加载评论中
      next: null,
      isShowDelete: false,
      deleteContent: '',
      deleteId: '',
      hasParent: false,
      parentId: '',
      baseUrl: process.env.VUE_APP_IMG
    }
  },
  methods: {
    seeTopCommentList (id) {                                                                                                                                                                                  
      this.isShowCommentList = !this.isShowCommentList
      if (this.topCommentListData.length > 0) return
      topCommentList({id: id})
        .then(res => {
          this.topCommentListData = res.data.list
          this.hasNextPage = res.data.hasNextPage
          this.next = res.data.next
        })
    },
    changeSubCommentList (data,id) {
      this.isShowCommentList = true
      if (this.topCommentListData.length <= 0) {
        topCommentList({id: id})
        .then(res => {
          this.topCommentListData = res.data.list
          this.replyNum = this.replyNum + 1
        })
      } else {
          let arr = this.topCommentListData
          arr.unshift(data)
          this.topCommentListData = arr
          this.replyNum = this.replyNum + 1
      }
    },
    getMoreSubList (id) {
      this.loading = true
      topCommentList({id: id}, {page: this.next})
        .then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.topCommentListData = this.topCommentListData.concat(res.data.list)
              this.hasNextPage = res.data.hasNextPage
              this.next = res.data.next
              this.loading = false
            }, 500)
          }
      })
    },
    ShowdeleteModal (id, hasParent, parentId) {
      this.isShowDelete = true
      this.deleteId = id
      this.hasParent = hasParent
      this.parentId = parentId
      if (!hasParent) {
        this.deleteContent = '删除评论后, 评论下的所有回复都会被删除'
      } else {
        this.deleteContent = '确定要删除该评论吗?'
      }
    },
    deleteComment () {
      deleteCom ({ id: this.deleteId }, { hasParent: this.hasParent, parentId:this.parentId, articleId: this.articleId})
        .then(res => {
          if (res.code === 200) {
            this.isShowDelete = false
            this.$Message.success('删除评论成功')
            if (this.hasParent) {
              topCommentList({id: this.parentId})
                .then(res => {
                  this.changeReviewNum(this.reviewNum - 1)
                  this.topCommentListData = res.data.list
                  this.hasNextPage = res.data.hasNextPage
                  this.next = res.data.next
                  this.replyNum = this.replyNum - 1
                })
            } else {
              if (this.replyNum > 0) {
                this.changeReviewNum(this.reviewNum - this.replyNum - 1)  
              } else {
                this.changeReviewNum(this.reviewNum - 1)
              }
              this.changeCommentList()
            }
          }
        })
    }
  },
  mounted () {
    this.replyNum = this.commentItem.replyNum
  }
}
</script>

<style lang="less" scoped>
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
          &:hover {
            .reply {
              .time {
                .deleteBtn {
                  display: inline-block
                }
              }
              .action-box {
                  .reply-box {
                    display: block;
                  }
              }
            }
          }
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
            margin: 5px 0 8px 0 ;
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
              .reply-box {
                display: none;
              }
              .reply-num-box {
                margin-left: 15px;
              }
              .reply-box, .reply-num-box {
                &:hover {
                  display: block;
                  opacity: 0.8;
                }
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
                        &:hover {
                          .sub-user-reply-box {
                            .sub-time {
                              .deleteBtn {
                                display: inline-block;
                              }
                            }
                            .sub-action-box {
                              opacity: 1;
                            }
                          }
                        }
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
                            opacity: 0;
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
            .more {
              font-size: 14px;
              width: 100%;
              display: block;
              text-align: center;
              padding-bottom: 15px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .author {
    display: inline-block;
    padding: 1px 6px;
    font-size: 12px;
    text-align: center;
    background-color: #FF5722;
    color: #fff;
    border-radius: 2px;
    margin-left: 5px;
  }
  .deleteBtn {
    display: none;
    font-size: 12px;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }

  }
</style>