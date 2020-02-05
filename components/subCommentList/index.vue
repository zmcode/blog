<template>
              <div class="sub-comment-list" v-if="isShowCommentList">
              <div class="item" v-for="(item, index) in topCommentListData" :key="index">
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
</template>

<script>
export default {
  data () {
    return {
      topCommentListData: []
    }
  }
}
</script>

<style lang="less" scoped>
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
              // font-weight: 700;
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
                  // font-weight: 400;
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
</style>