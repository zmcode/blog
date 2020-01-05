<template>
  <div class="contentWrap">
    <EditorCode></EditorCode>
    <div class="right-box">
      <div class="cell">
        <div>
          语言类型
        </div>
        <Select v-model="type" @on-change='changeType'>
          <Option v-for="item in SelectData" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <!-- <div class="cell">
        <div>
          权限控制
        </div>
        <Select v-model="power">
          <Option v-for="item in powerSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div> -->
      <div class="cell">
        <div>
          标题
        </div>
        <input type="text" class="title" v-model="title">
      </div>
      <myButton 
        type='success' 
        size='large' 
        style="font-size: 16px; font-weight: bold"
        @click="publish"
        :loading='loading'  
      >
        发布
      </myButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { publishCodeShare } from '../../axios/api/codeShare'
import myButton from '../../components/Button'
import EditorCode from '../../components/MonacoEditor'
export default {
  layout: 'blog',
  components: {
    EditorCode,
    myButton
  },
  data() {
    return {
      // 语言类型
      SelectData: [
        {
            value: 'Vue',
            label: 'Vue'
        },
        {
            value: 'React',
            label: 'React'
        },
        {
            value: 'JavaScript',
            label: 'JavaScript'
        },
        {
            value: 'HTML',
            label: 'HTML'
        },
        {
            value: 'CSS',
            label: 'CSS'
        },
        {
            value: 'Node',
            label: 'Node'
        },
         {
          value: 'TypeScript',
          label: 'TypeScript'
        },
        {
          value: 'Flutter',
          label: 'Flutter'
        },
      ],
      // 权限类型
      // powerSelect: [
      //   {
      //     value: 'online',
      //     label: '所有人可以查看'
      //   },
      //   // {
      //   //   value: 'only',
      //   //   label: '仅自己查看'
      //   // }
      // ],
      // power: 'online',
      type: '',
      title: '',
      loading: false
    }
  },
  methods: {
    publish() {
      if(!this.$children[0].content ||!this.type || !this.title) {
        this.$Message.error('缺少需要填写的信息') 
        return
      }
      this.loading = true
      publishCodeShare({
        // 直接拿子组件的内容
        content: this.$children[0].content,
        type: this.type,
        title: this.title,
        // status: this.power
      })
        .then(res => {
          if(res.code === 200)  
          // this.loading = false
          this.$router.replace('/essay')
        })
    },
    changeType(value) {
      this.type = value
    }
  },
  computed: {
      ...mapState({
          UserToken: state => state.login.UserToken
      }),
  },
  mounted() {
    if(!this.UserToken) {
      this.$Message.error('需要登陆才可以分享代码')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.contentWrap {
  margin-top: 20px;
  display: flex;
  .vue-codemirror {
    flex: 1;
    height: 100%
  }
  .right-box {
    width: 300px;
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    .cell {
      margin: 0px 0 15px 0;
      .title {
        border-width: 0;
        outline: 0;
        flex: 1;
        display: inline-block;
        border: none;
        outline: none;
        color: black;
        font-size: 18px;
        border-bottom: 0.5px solid;
        background: #f6f7f8;
        height: 40px;
        width: 100%;
        &:active {
          outline: 0;
        }
      }
    }
  }
}
</style>