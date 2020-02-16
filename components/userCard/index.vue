<template>
  <div class="cardWrap">
    <div class="userInfoWrap">
      <div class="avatar" :style="{background: `url(${userInfo.avatar})`}" v-if="!listUserData"></div>
      <div class="avatar" :style="{background: `url(${listUserData.avatar})`}" v-else></div>
      <div class="info">
        <span class="text">{{ !listUserData ? userInfo.name : listUserData.name}}</span>
        <!-- <span class="text">{{userInfo.summary}}</span> -->
        </div>
    </div>
    <div class="showWrap">
      <Upload 
        :action="`${baseUrl}/upload`"
        :data="{ dir: 'blogshow/'}"
        :show-upload-list='false'
        :before-upload='checkFile'
        :on-success='upLoadsuccess'
        :disabled='loading'
        :headers='header'
        :accept="`${uploadType.join(',')}`"
        v-if="!onlyImg"
      >
        <div class="upload-img" :style="{'background': 'url(' + showUrl+ ')'}"></div>
      </Upload>
      <div class="upload-img noborder" :style="{'background': 'url(' + listUserData.blogshow+ ')'}" 
      v-if='listUserData.blogshow && onlyImg'/>

      <div class="noImg" v-if="!listUserData.blogshow && onlyImg">
        该用户未设置博客秀
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable no-prototype-builtins */
import { UserInfoUpdata } from '@/axios/api/common.js'
import { mapState } from 'vuex'
export default {
  props: {
    onlyImg: {
      type: Boolean,
      default: false
    },
    listUserData: {
      type: [Object, String],
      default: () => {
        return ''
      }
    }
  },
  data () {
    return {
      loading: false,
      showUrl: '',
      baseUrl: process.env.VUE_APP_API,
      uploadType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
      // empty: true
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo,
      UserToken: state => state.login.UserToken,
    }),
    header(){
      return {
        'Authorization': 'Bearer' + ' ' + this.UserToken
      }
    }
  },
  methods: {
    checkFile(event) {
      this.loading = true
      const result = this.uploadType.some(item => {
          return item === event.type && event.size / 1024 / 1024 <= 3
      })
      if (!result) {
        this.$Message.error('文件格式有误或过大')
        this.loading = false
        return false
      }
    },
    upLoadsuccess(response) {
      this.loading = false
      if(response.code === 200) {
        // 更新用户数据
        UserInfoUpdata({ field: 'blogshow', value:response.data.url})
          .then(res => {
              this.$store.commit('login/changeUserInfo', {userInfo: res.data})
              this.showUrl = res.data.blogshow
              this.$Message.success('设置成功')
        })
      }     
    },
    // isEmpty(obj) {
    //   for(var key in obj) {
    //       if(obj.hasOwnProperty(key))
    //       return false
    //   }
    //   return true
    // }
  },
  mounted () {
    // this.empty = this.isEmpty(this.listUserData)
    this.showUrl = this.userInfo.blogshow
  }
}
</script>

<style lang="less" scoped>
.cardWrap {
  border-radius: 10px;
  background: #eee;
  padding: 20px;
  max-width: 240px;
  width: 240px;
  color: black;
  text-align: center;
  .userInfoWrap {
    align-items: center;
    display: flex;
    .avatar {
      width: 35px;
      height: 35px;
      background-repeat: no-repeat !important;
      background-size: cover !important;
      border-radius: 50%
    }
    .info {
      max-width: 100px;
      margin-left: 10px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
      }
    }
  }
  .showWrap {
    margin-top: 10px;
    .upload-img {
      background: #fff;
      border: 1px dashed #dcdee2;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 200px;
      height: 250px;
      max-width: 200px;
      max-height: 250px;
      line-height: 250px;
      background-repeat: no-repeat !important;
      background-size: cover !important;
      &.noborder {
        cursor: auto;
        border: none;
      }
    }
  }
}
</style>