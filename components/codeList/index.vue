<template>
  <div class="codeListWrap" >
    <p class='title'>{{ ListData.title}}</p>
    <div class="ListItem" :style="{ height: showIcon ? '150px' : ItemHgith + 10 + 'px'}">
      <div v-highlight ref="code">  
        <pre class="code">{{ ListData.content }}</pre>
      </div>
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
    }
  }
}
</script>

<style lang="less" scoped>
.codeListWrap {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color:black;
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
  background: #fff;
  pre {
    padding: 0;
    margin: 5px 0
  }
  .hljs {
    padding: 0;
    margin: 5px 0
  }
}
</style>