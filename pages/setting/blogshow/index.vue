<template>
  <div>
    <settingLayout title='博客秀'>
      <div class="skeletonBorder"> 
        <!-- <h3 class="title">可以在个人主页以及个人卡片中显示你的图片</h3> -->
        <userCard/>
      </div>
    </settingLayout>
  </div>
</template>

<script>
import userCard from '@/components/userCard'
import settingLayout from '../../../components/settingLayout'
export default {
  layout: 'blog',
  components: { settingLayout, userCard }
  }
</script>

<style lang="less" scoped>
.skeletonBorder {
  // border: 0.5px solid rgba(57, 62, 70, 0.25098);
  display: flex;
  border-top: none;
  background: #fff;
  flex-direction: column;
  // align-items: center;
  min-height: 350px;
  padding: 25px 0;
  .title {
    margin-bottom: 20px;
  }
}
</style>