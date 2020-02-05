<template>
  <div class="articleSkeleton">
    <div class="skeleton-row"></div>
    <div class="skeleton-row"></div>
    <div class="skeleton-row"></div>
    <div class="skeleton-row"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.articleSkeleton {
  padding: 20px;
  background-color: #fff;
  border-radius: 0 0 .2rem .2rem;
  overflow: hidden;
  .skeleton-row {
    height: 1.2rem;
    margin-bottom: 16px;
    background: linear-gradient(90deg,#fff,#edeff1,#fff);
    background-size: 480px 480px;
    animation: skeleton-stripes-move .6s linear infinite;
    &:first-of-type {
      width: 30%;
    }
    &:nth-of-type(2) {
      width: 80%;
    }
    &:nth-of-type(3) {
      width: 70%;
    }
    &:nth-of-type(4) {
      width: 50%;
    }
  }
  @keyframes skeleton-stripes-move {
    0% {
    background-position: 0 0;
    }
    100% {
      background-position: 480px 0;
    }
  }
}
</style>