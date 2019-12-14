<template>
  <div class="codeListWrap" >
    <div class="codeHeader">
      <p class='title'>{{ ListData.title}}</p>
      <Icon type="md-copy" class="copyIcon" title="复制代码" @click="copyCode"/>
    </div>
    <div class="ListItem" :style="{ height: showIcon ? '150px' : ItemHgith + 10 + 'px'}">
        <pre v-highlightjs="ListData.content" ref="code" class="code"><code class="javascript"></code></pre>
    </div>
    <div class="iconWrap" v-if="showIcon || upIcon"  @click='showMore'>  
      <Icon :type="upIcon ? 'ios-arrow-up' : 'ios-arrow-down'"/>
    </div>
    <div class="otherInfo">
      <div class="userInfo">
        <nuxt-link :to="`/home/${ListData.user_info.id}`">
          <img :src="ListData.user_info.avatar">
        </nuxt-link>
        <p>{{ ListData.user_info.name }}</p>
      </div>
      <div class="typeInfo">
        <span>所属类型: {{ ListData.type }}</span>
      </div>
      <div class="timeInfo">
        <span>{{ ListData.created | dateFormat }}</span>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  props: {
    ListData: {
      type: Object,
    }
  },
  data() {
    return {
      ItemHgith: 0, // 总的高度
      showIcon: false, // icon是否显示
      upIcon: false,
    }
  },
  mounted() {
    this.ItemHgith = this.$refs.code.offsetHeight
    this.ItemHgith > 150 ? this.showIcon = true : this.showIcon = false
  },
  methods: {
    showMore() {
      this.showIcon = !this.showIcon
      this.upIcon = !this.upIcon
    },
    copyToClipboardAsync(text) {
      let textArea = document.createElement('textarea')
      textArea.style.position = 'fixed'
      textArea.style.top = '0'
      textArea.style.left = '0'
      textArea.style.width = '2em'
      textArea.style.height = '2em'
      textArea.style.padding = '0'
      textArea.style.border = 'none'
      textArea.style.outline = 'none'
      textArea.style.boxShadow = 'none'
      textArea.style.background = 'transparent'
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()

      return new Promise((res, rej) => {
        try {
          let successful = document.execCommand('copy')
          if (!successful) throw Error('该浏览器不支持js复制到剪贴板')
          res()
        } catch (err) {
          rej(err)
        } finally {
          document.body.removeChild(textArea)
        }
      })
    },
    copyCode() {
      this.copyToClipboardAsync(this.ListData.content)
        .then(() => {
          this.$Message.success('复制成功')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.codeListWrap {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  &:hover {
    .codeHeader {
      .copyIcon {
        opacity: 1;
      }
    }
  }
  .codeHeader {
    display:flex;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: bold;
      color:black;
    }
    .copyIcon {
      cursor: pointer;
      transition: all .3s;
      opacity: 0;
    }
  }
  .ListItem {
    overflow: hidden;
    transition: all .3s ease-in-out;
  }
  .iconWrap {
    position: relative;
    text-align: center;
    box-shadow: inset 0 -15px 30px #fff;
    top: -10px;
    cursor: pointer;
  }
  .otherInfo {
    font-size: 13px;
    display: flex;
    align-items: center;
    .userInfo {
      display: flex;
      align-items: center;
      img {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        border-radius: 50%
      }
    };
    .typeInfo {
      margin-left: 20px;
    }
    .timeInfo {
      margin-left: 20px;
    }
  }
}
.code {
  font-size: 14px;
  padding: 0;
  margin: 5px 0;
  .hljs {
    padding: 0;
    margin: 5px 0;
    background: #fff;
  }
}
</style>