<template>
  <div class="FixWrap">
    <div class="ContentWrap container">
      <div class="PageTitle">
        <a class="logo-title" href="http://www.yjdzm.com">
          <h1>个人博客</h1>
          <!-- <span>yjdzm.com</span> -->
        </a>
      </div>
      <div class="Content">
        <PageMenu />
        <div class="actionWrap">
          <div class="Search">
            <Input
              v-model="searchValue"
              icon="md-search"
              :placeholder="`搜索${searchName}`"
              style="width: 200px"
              @on-enter="searchArticle"
              @on-click="searchArticle"
            />
          </div>
          <nuxt-link
            to="/login"
            class="LoginBtn"
            v-if="!userInfo.hasOwnProperty('avatar')"
            >登录</nuxt-link
          >
          <!-- <Badge :count="3" class="message">
                            <nuxt-link
                                key='message'
                                to="/message"
                                exact
                            >
                                <Icon type="md-notifications" size="28"/>
                            </nuxt-link>
                        </Badge> -->
          <div class="User" v-if="userInfo.hasOwnProperty('avatar')">
            <div class="UserHeader">
              <Avatar icon="ios-person" :src="userInfo.avatar" />
            </div>
            <DropList class="Special" @click="showLayoutModal">
              <DropListItem :source="userDropData" :size="14" />
            </DropList>
          </div>
        </div>
      </div>
    </div>
    <Modal
      :mask="true"
      title="退出登录"
      :visible="showModal"
      @onOk="goLogin"
      @onCancle="hiddenModal"
    >
      <p>博客有你的贡献将会更加强大,确定退出吗?</p>
    </Modal>
  </div>
</template>

<script>
/*eslint-disable no-prototype-builtins */
import { getUserId } from '../../axios/api/common'
import { mapState } from 'vuex'
import PageMenu from '../PageMenu/index'
import DropList from '../../components/dropList/index'
import DropListItem from '../../components/dropList/dropListItem'
import Modal from '../myModal/index'
export default {
  data() {
    return {
      userId: '',
      searchValue: '',
      showModal: false,
      userDropData: [
        {
          path: '/write',
          icon: 'ios-brush',
          name: '写文章',
          id: 'article',
        },
        {
          path: '/draft',
          icon: 'ios-paper',
          name: '草稿',
          id: 'ios-paper',
          line: true,
        },
        {
          path: '/home:id',
          icon: 'md-person',
          name: '我的主页',
          id: 'article',
          a: true, // path里面写表达式的话,就会报错,不知道为什么,用了a标签防止
        },
        // {
        //     path: '/myPraise',
        //     icon: "md-thumbs-up",
        //     name: '我赞过的',
        //     id: 'article',
        //     line: true,
        // },
        {
          path: '/setting/person',
          icon: 'ios-settings',
          name: '设置',
          id: 'setting',
        },
        {
          path: '',
          icon: 'md-walk',
          name: '登出',
          id: 'login',
          a: true,
        },
      ],
      searchType: 'q',
      searchName: '文章',
    }
  },
  components: {
    PageMenu,
    DropList,
    Modal,
    DropListItem,
  },
  methods: {
    showLayoutModal(name) {
      name = name.replace(/\s*/g, '')
      if (name === '登出') {
        this.showModal = true
      }
      if (name === '我的主页') {
        this.$router.replace({
          path: `/home/${this.userId}`,
        })
      }
    },
    goLogin() {
      this.$store.dispatch('login/handleClearLoginOut').then(() => {
        this.$router.replace('/login')
      })
    },
    hiddenModal() {
      this.showModal = false
    },
    searchArticle() {
      if (!this.searchValue) {
        this.$Message.error('不能搜索空的文本')
        return
      }
      this.$router.push(`/search?${this.searchType}=${this.searchValue}`)
    },
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo,
      UserToken: state => state.login.UserToken,
    }),
  },
  watch: {
    $route({ path, query }) {
      if (path === '/shorthand' || query.hasOwnProperty('topic')) {
        this.searchType = 'topic'
        this.searchName = '速记'
      } else if (path === '/codeshare' || query.hasOwnProperty('type')) {
        this.searchType = 'type'
        this.searchName = '代码'
      } else {
        this.searchType = 'q'
        this.searchName = '文章'
      }
      //    path === '/shorthand' || query.hasOwnProperty('topic') ? this.searchType = 'topic' : this.searchType = 'q'
      this.searchValue = ''
    },
  },
  mounted() {
    // 可有可无, home已经做了限制,这了为了提高体验
    getUserId({
      token: this.UserToken,
    }).then(res => {
      if (res.code === 200) this.userId = res.id
    })
  },
}
</script>

<style lang="less" scoped>
.FixWrap {
  z-index: 999;
  height: 64px;
  background-color: #fff;
  left: 0;
  top: 0;
  right: 0;
  position: fixed;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  .ContentWrap {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    height: 100%;
    max-width: 1200px;
    padding: 0 20px;
    .PageTitle {
      .logo {
        height: 64px;
        padding-right: 10px;
        img {
          height: 100%;
        }
      }
      .logo-title {
        // height: 64px;
        text-align: center;
        color: black;
        line-height: normal;
        h1 {
          margin: 4px 0 5px 0;
          font-size: 22px;
        }
        span {
          user-select: none;
          font-size: 13px;
        }
      }
    }
    .Content {
      height: 100%;
      display: flex;
      align-items: center;
      flex: auto;
      justify-content: space-evenly;
      // margin-left: 340px;
      .actionWrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .Search {
          height: 100%;
          flex: 0.5;
          justify-content: flex-end;
          cursor: auto;
          display: flex;
          align-items: center;
          margin-right: 40px;
          .ivu-input-wrapper {
            ::v-deep .ivu-input {
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              color: black;
              border: 1.5px solid #e2e6ea;

              &:focus {
                border-color: #e2e6ea;
                box-shadow: 0 0 0 2px #e2e6ea;
              }

              &:hover {
                border-color: #e2e6ea;
              }
            }

            ::v-deep .ivu-icon {
              height: 40px;
              width: 40px;
              line-height: 40px;
              font-size: 20px;
              cursor: pointer;
            }
          }
        }

        .LoginBtn {
          display: inline-block;
          padding: 11px 6px;
          line-height: 15px;
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
          color: rgba(0, 0, 0, 0.65);
          background-color: #fff;
          border: 1.5px solid #e2e6ea;
          width: 80px;
          border-radius: 10px;
          font-weight: bold;
          &:hover {
            background-color: #e2e6ea;
          }
        }
        .User {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          .UserHeader {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            img {
              border-radius: 50%;
              height: 100%;
              width: 100%;
            }
          }
          .Special {
            display: none;
            width: 100px;
            margin-left: -120%;
          }
          &:hover {
            .Special {
              display: block;
            }
          }
        }
        .message {
          margin: 0 20px 0 15px;
          a {
            color: #71777c;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.ivu-input-wrapper {
  ::v-deep .ivu-input {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: black;
    border: 1.5px solid #e2e6ea;

    &:focus {
      border-color: #e2e6ea;
      box-shadow: 0 0 0 2px #e2e6ea;
    }

    &:hover {
      border-color: #e2e6ea;
    }
  }

  ::v-deep .ivu-icon {
    height: 40px;
    width: 40px;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
