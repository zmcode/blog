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
    <div v-if="!UserToken" class="noUser">
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
      v-if='UserToken'
      :clearSubComment='clearSubComment'
      :noFocus='true'
      :articleId='articleId'
      :changeReviewNum='changeReviewNum'
      :reviewNum='reviewNum'
    >
    </contentEdit>
    <div v-if="show"> 
      <commentList 
      :commentItem="item" 
      :subCommentIndex="subCommentIndex" 
      :showSubComment="showSubComment"
      :UserToken="UserToken"
      :userInfo='userInfo' 
      v-for='(item, index) in allComment'
      :key="index"
      :itemIndex="index"
      :arUserInfo='arUserInfo'
      :clearSubComment='clearSubComment'
      :changeCommentList="changeCommentList"
      :commentParentId="item._id"
      :loginUserId="loginUserId"
      :articleId='articleId'
      :changeReviewNum='changeReviewNum'
      :reviewNum='reviewNum'
    >
    </commentList>
    </div>
    <div v-else class="loading">加载评论中.....</div>
    <div v-if="allComment.length <= 0 && show" class="noCommentBox">
      <img :src='`${baseUrl}/null-1.png`' style="width: 300px">
      <div>暂无评论</div>
      </div>
    <span class="more" v-if="hasNextPage && show" @click="getmoreComment"> {{loading ? '加载中...' : '查看更多 > '}} </span>
  </div>
</template>

<script>
/*eslint-disable no-useless-escape */
import { mapState } from 'vuex'
import { expressionUrl } from '../../assets/js/expression'
// import Button from '../../components/Button'
import { arCommentList } from '../../axios/api/article'
import contentEdit from '../../components/contentEdit'
import commentList from '../../components/commentList'
// import subCommentList from '../../components/subCommentList'
export default {
  props: {
    arUserInfo: [Object],
    loginUserId: [String],
    articleId: [String],
    changeReviewNum: [Function],
    reviewNum: [Number]
  },
  data () {
    return {
      isShowAcitonBox: false, // 是否显示评论表情区域
      commentValue: '', // 评论内容
      expressionUrl: expressionUrl,
      expressionSelect: false,
      allComment: [],
      subCommentIndex: null,
      baseUrl: process.env.VUE_APP_IMG,
      TopCommentIndex: -1, // 是否显示二级评论
      topCommentListData: [], // 二级评论数据
      hasNextPage: false, // 是否还有一级评论
      loading: false, // 加载评论中
      next: null,
      show: false
    }
  },
  components: { contentEdit, commentList },
  methods: {
    changeCommentList () {
      this.show = false
      arCommentList({ id: this.$route.params.id })
          .then(res => {
            setTimeout(() => {
              this.allComment = res.data.list
              this.hasNextPage = res.data.hasNextPage
              this.next = res.data.next
              this.show = true
            }, 500)
          })
    },
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
    getmoreComment () {
      this.loading = true
      if(this.next) {
        arCommentList({ id: this.$route.params.id }, {page: this.next})
          .then(res => {
            if (res.code === 200) {
              setTimeout(() => {
                this.allComment = this.allComment.concat(res.data.list)
                this.hasNextPage = res.data.hasNextPage
                this.next = res.data.next
                this.loading = false
              }, 500)
            }
          })
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo,
      UserToken: state => state.login.UserToken
    })
  },
  mounted () {

    arCommentList({ id: this.$route.params.id })
      .then(res => {
        setTimeout(() => {
          this.allComment = res.data.list
          this.hasNextPage = res.data.hasNextPage
          this.next = res.data.next
          this.show = true
        }, 500)
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
  .loading, .noCommentBox {
    text-align: center;
    font-weight: bold

  }
  .more {
    font-size: 14px;
    width: 100%;
    display: block;
    text-align: center;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>