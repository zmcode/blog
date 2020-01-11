
<template>
<div>
  <li v-for="(item, index) in catalogData"
    :key="index"
    :class="[classObj, { 'active': item.itemTop + wrapTop === activeTop }]"
    @click.stop='changeActive(item)'
  >
    <a :href="'#header-' + item.offsetTop">{{item.name}}</a>
    <ul v-if="item.children.length > 0" class="sub-list">
      <catelog :catalogData='item.children' :num='num + 1' :activeTop='activeTop' :changeTop='changeTop' :wrapTop='wrapTop'></catelog>
    </ul>
  </li>
</div>

</template>

<script>
export default {
  name: 'catelog',
  data () {
    return { 
    }
  },
  props: {
    catalogData: {
      type: Array
    },
    num: {
      type: Number
    },
    activeTop: [Number],
    changeTop: [Function],
    wrapTop: [Number]
  },
  computed: {
    classObj () {
      return {
        item: true,
        d1: this.num === 1,
        d2: this.num === 2,
        d3: this.num === 3,
      }
    }
  },
  methods: {
    changeActive (item) {
      this.changeTop(item.itemTop + this.wrapTop)
    }
  }
}
</script>
<style lang="less" scoped>
  .item {
    margin: 0;
    padding: 0;
    list-style: none;
    color: #333;
    font-weight: 400;
    a {
      display: block;
      position: relative;
      padding: 4px 0 4px 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: inherit;
      text-decoration: none;
      cursor: pointer;
      border-radius: 6px;
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -2px;
        width: 4px;
        height: 4px;
        background-color: currentColor;
        border-radius: 50%;
      }
      &:hover {
        background-color: #ebedef;
      }
    }
    &.d1 {
      font-weight: 600;
      color: #000;
       > a {
        margin: 6px 0;
        padding: 4px 0 4px 21px;
        &:before {
          left: 5px;
          margin-top: -3px;
          width: 6px;
          height: 6px;
        }
      }
    }
    &.d2 {
      a {
        padding-left: 36px;
        &:before {
          left: 24px;
        }
      }
    }
    &.d3 {
      a {
        padding-left: 51px;
        &:before {
          left: 39px;
        }
      }
    }
    .sub-list {
      margin: 0;
      padding: 0;
      color: #000;
    }
    &.active {
      > a {
        color: #007fff;
        background-color: #ebedef;
      }
    }
  }
</style>