
<template>
<div>
  <li v-for="(item, index) in catalogData" :key="index" :class='classObj'>
    <a :href="'#header-' + item.name">{{item.name}}</a>
    <ul v-if="item.children.length > 0">
      <catelog :catalogData='item.children' :num='num + 1'></catelog>
    </ul>
  </li>
</div>
   
</template>

<script>
export default {
  name: 'catelog',
  props: {
    catalogData: {
      type: Array
    },
    num: {
      type: Number
    }
  },
  computed: {
    classObj () {
      return {
        item: true,
        d1: this.num === 1,
        d2: this.num === 2,
        d3: this.num === 3
      }
    }
  }
}
</script>
<style lang="less" scoped>
  // .item {
  //   font-size
  // }
</style>