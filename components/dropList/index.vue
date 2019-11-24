
<template>
 <ul class="UserList">
   <slot></slot>
 </ul>
</template>

<script>
/*eslint-disable no-prototype-builtins */
export default {
  mounted() {
    this.$on('on-click', (name) => {
      // 将我对应的那么传递给父,想不到还有什么比较好的方法,暂时先这样
      if (this.$listeners.hasOwnProperty('click')) {
        this.$listeners.click(name)
      }
    })
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
    top: 100.5%;
    margin-left: -50%;
}
</style>
