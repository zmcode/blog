
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
    // font-weight: 400;
    padding: 5px 0;
    a {
      display: block;
      position: relative;
      padding: 0px 0 0px 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: inherit;
      text-decoration: none;
      cursor: pointer;
      border-radius: 6px;
      font-size: 13px;
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
    }
    &.d1 {
      // font-weight: 600;
      color: #000;
       > a {
        padding: 0px 0 0px 21px;
        &:before {
          left: 5px;
          margin-top: -3px;
          width: 6px;
          height: 6px;
        }
        &:hover {
          > a {
            color: #007fff;
          }
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
      &:hover {
          > a {
            color: #007fff;
          }
        }
    }
    &.d3 {
      a {
        padding-left: 51px;
        margin: 4px 0;
        &:before {
          left: 39px;
        }
      }
      &:hover {
          > a {
            color: #007fff;
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
      }
    }
  }
</style>