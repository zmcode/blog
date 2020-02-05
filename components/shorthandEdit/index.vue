<template>
  <div v-if='isShowEdit'>
      <div class="mask"></div>
      <div class="main">
        <div class="shEditBox">
          <shorthandInput 
            :getShortHandList="getShortHandList"
            :changeEditVis='changeEditVis'
            :itemData='itemData'
            :isEdit='true'
          ></shorthandInput>
        </div>
      </div>
  </div>
</template>

<script>
import shorthandInput from '../../components/ShorthandInput'
export default {
  props: {
    getShortHandList:[Function],
    itemData: [Object],
    isShowEdit: [Boolean],
    changeEditVis: [Function]
  },
  components: { shorthandInput }
}
</script>

<style lang="less" scoped>
.mask {
   position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.65);
    z-index: 9998;
    overflow-x: hidden;
    overflow-y: hidden;
}
.main {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    height: 100%;
    max-width: 960px;
    z-index: 9999;
    .shEditBox {
      top: -70px;
      min-width: 900px;
      margin: 0 auto;
      position: relative;
    }
}

</style>