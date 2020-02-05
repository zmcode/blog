<template>
   <div class="container">
     <div v-if="error.statusCode === 404 || error.statusCode === 500" class="noPageWrap">
        <img src="../assets/img/feidie.png" alt="">
        <img src="../assets/img/img-404.png" alt="" v-if="error.statusCode === 404">
        <h1 v-if="error.statusCode !== 404">服务器出错了</h1>
        <p v-if="error.statusCode !== 404">错误码: 500</p>
        <nuxt-link to="/" class="go">返回首页</nuxt-link>
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
      height: 100vh;
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
      .go {
        margin-top: 50px;
        color: #666;
        &:hover {
          color:#666
        }
      }
}
img {
  margin: 20px 0;
  width: 300px;
  border-radius: 5px;
}
</style>