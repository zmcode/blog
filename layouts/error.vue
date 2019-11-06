<template>
   <div class="container">
     <div v-if="error.statusCode === 404" class="noPageWrap">
        <h1>页面不存在</h1>
        <img src="../assets/img/404.png" alt="">
         <nuxt-link to="/">返回首页</nuxt-link>
     </div>   
    <h1 v-else>服务出错了</h1>
  </div>
</template>

<script>
export default {
    props: ['error'],
}
</script>

<style lang="less" scoped>
.container {
      height: 100%;
      background: #ececec;
      display: flex;
      justify-content: center;
      align-items: center;
      .noPageWrap {
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column
      }
}
img {
  margin: 20px 0;
  width: 300px;
  height: 300px;
  border-radius: 5px;
}
</style>