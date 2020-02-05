/*

  下拉框组件
  @parmas: source [Array] 数据源(元素中含有line属性,将会其下方显示下划线)
  @parmas: size icon大小

*/

<template>
<div>   
    <li 
        v-for="(item, index) in source" 
        :key="index" class="ListItem" 
        :class="{splitLine: item.line}" 
        @click='handleClick($event)'
    >
        <component
            :is="item.a ? 'a' : 'nuxt-link'"
            :key='item.id'
            :to='{ path: item.path }'
            exact
            append
        >
            <Icon :type="item.icon" class="NavIcon" :size='size' color='black'/>
            <span class="NavText">{{ item.name }}</span>
        </component>     
    </li>
</div>
</template>

<script>
export default {
    props: {
        source: {
            type: Array
        },
        size: {
            type: Number,
            default: 16,
        },
    },
    methods: {
        handleClick(event) {
            let name = event.target.innerText
            this.$parent.$emit('on-click', name)
        }
    },
    mounted () {
        console.log(this.source)
    }


}
</script>

<style lang="less" scoped >
     .splitLine {
    border-bottom: 1px solid rgba(0,0,0,.04);
  }
  .ListItem {
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
</style>