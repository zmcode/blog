<template>
    <div class="temporary">
        <img :src="cover404" />
        <p>开发中...</p>
    </div>
</template>

<script>
import cover404 from '../../assets/img/404.svg'
export default {
  layout: 'blog',
  data() {
    return {
      cover404
    }
  }
}
</script>

<style lang="less" scoped>
.temporary {
  margin-top:20px;
  background-color: #ffffff;
  text-align: center;
  padding: 100px 20px 100px 20px;
  img {
    height: 200px;
    margin-bottom: 20px;
  }
}
</style>