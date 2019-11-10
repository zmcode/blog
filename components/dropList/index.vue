/*
下拉框内容组件, 外层要有ul包裹
@parmas: source [Array] 数据源
@parmas: size 文本大小
*/
<template>
 <ul class="UserList">
    <li v-for="(item, index) in source" :key="index" class="ListItem" :class="{splitLine: item.line}">
      <nuxt-link
        :key='item.id'
        :to="item.path"
        exact
      >
        <Icon :type="item.icon" class="NavIcon" :size='size' color='black'/>
        <span class="NavText">{{ item.name }}</span>
      </nuxt-link>
    </li>
 </ul>
</template>

<script>
export default {
  props:{
    splitLine: {
      type: Boolean,
      default: false,
    },
    source: {
      type: Array
    },
    size: {
      type: Number,
      default: 16,
    }
  },
  data() {
    return {
      ListData: this.source
    }
  },
  mounted() {
    console.log(this.source);
  }
}
</script>

<style lang="less" scoped>
.UserList {
    left: 50%;
    text-align: center;
    width: 100%;
    font-size: 12px;
    font-family: 'hotFont';
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(177, 180, 185, 0.45);
    background-color: #fff;
    list-style: none;
    position: absolute;
    top: 105%;
    margin-left: -50%;
  .splitLine {
    border-bottom: 1px solid rgba(0,0,0,.04);
  }
  .ListItem {
    font-family: 'hotFont';
    line-height: 40px;
    height: 40px;
    &:hover {
        background-color: hsla(0,0%,94.9%,.5);
    }
    a {
      height: 100%;
      width: 100%;
      display: inline-block;
      font-size: 14px;
      color: #808695;
    }
  }
}
</style>
